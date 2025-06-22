import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaFilePdf, FaFileCsv, FaSave } from 'react-icons/fa';
import { SiGooglesheets } from 'react-icons/si';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PayoutDetails = () => {
    const { articles, payoutRate, updatePayoutRate, isAdmin } = useContext(AppContext);
    const [newRate, setNewRate] = useState(payoutRate);
    const [isGapiLoaded, setIsGapiLoaded] = useState(false);
    const [isGisLoaded, setIsGisLoaded] = useState(false);
    const [tokenClient, setTokenClient] = useState(null);

    const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
    const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        script.onload = () => {
            window.gapi.load('client', () => {
                window.gapi.client.init({
                    apiKey: API_KEY,
                    discoveryDocs: [DISCOVERY_DOC],
                });
                setIsGapiLoaded(true);
            });
        };
        document.body.appendChild(script);

        const gisScript = document.createElement("script");
        gisScript.src = "https://accounts.google.com/gsi/client";
        gisScript.onload = () => {
            if (window.google) {
                const client = window.google.accounts.oauth2.initTokenClient({
                    client_id: CLIENT_ID,
                    scope: SCOPES,
                    callback: ''
                });
                setTokenClient(client);
                setIsGisLoaded(true);
            } else {
                console.error("Google Identity Services script loaded, but window.google is not available.");
            }
        };
        document.body.appendChild(gisScript);

    }, [API_KEY, CLIENT_ID]);

    const handleRateChange = (e) => {
        setNewRate(parseFloat(e.target.value));
    };

    const handleSaveRate = () => {
        updatePayoutRate(newRate);
        alert('Payout rate updated!');
    };

    const totalArticles = articles.length;
    const totalPayout = (totalArticles * payoutRate).toFixed(2);

    const exportToPdf = () => {
        const doc = new jsPDF();
        doc.text('Payout Details', 20, 10);
        doc.autoTable({
            head: [['Author', 'Article Title', 'Word Count', 'Payout']],
            body: articles.map(article => [
                article.author || 'N/A',
                article.title,
                article.content ? article.content.split(' ').length : 'N/A',
                `$${payoutRate.toFixed(2)}`
            ]),
        });
        doc.save('payout-details.pdf');
    };

    const exportToCsv = () => {
        const headers = ['Author', 'Article Title', 'Word Count', 'Payout'];
        const rows = articles.map(article => [
            article.author || 'N/A',
            article.title,
            article.content ? article.content.split(' ').length : 'N/A',
            `$${payoutRate.toFixed(2)}`
        ]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "payout-details.csv");
        document.body.appendChild(link);
        link.click();
    };

    const exportToGoogleSheets = async () => {
        if (!isGapiLoaded || !isGisLoaded) {
            alert("Google API is not loaded yet. Please try again in a moment.");
            return;
        }

        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw (resp);
            }
            
            await window.gapi.client.setToken({ access_token: resp.access_token });

            // Create a new spreadsheet
            const spreadsheet = await window.gapi.client.sheets.spreadsheets.create({
                properties: {
                    title: `News Dashboard Payouts - ${new Date().toLocaleDateString()}`
                }
            });

            const spreadsheetId = spreadsheet.result.spreadsheetId;

            // Add data to the sheet
            const values = [
                ['Author', 'Article Title', 'Word Count', 'Payout'],
                ...articles.map(article => [
                    article.author || 'N/A',
                    article.title,
                    article.content ? article.content.split(' ').length : 'N/A',
                    `$${payoutRate.toFixed(2)}`
                ])
            ];

            await window.gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: spreadsheetId,
                range: 'Sheet1!A1',
                valueInputOption: 'RAW',
                resource: { values: values }
            });

            alert(`Successfully created spreadsheet!`);
            window.open(`https://docs.google.com/spreadsheets/d/${spreadsheetId}`, '_blank');
        };

        if (window.gapi.client.getToken() === null) {
            tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
            tokenClient.requestAccessToken({ prompt: '' });
        }
    };

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <h3 className="font-bold text-xl mb-4 text-gray-800 dark:text-white">Payout & Export</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 items-center">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400">Total Articles</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalArticles}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400">Total Payout</p>
                    <p className="text-2xl font-bold text-green-500">${totalPayout}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                     <p className="text-gray-600 dark:text-gray-400">Payout Rate ($)</p>
                    <div className="flex items-center">
                        <input 
                            type="number"
                            value={newRate}
                            onChange={handleRateChange}
                            className="p-2 rounded bg-white dark:bg-gray-600 w-full text-lg font-bold"
                        />
                        <button onClick={handleSaveRate} className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            <FaSave />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-end space-x-2">
                <button onClick={exportToPdf} className="flex items-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">
                    <FaFilePdf className="mr-2" />
                    PDF
                </button>
                <button onClick={exportToCsv} className="flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">
                    <FaFileCsv className="mr-2" />
                    CSV
                </button>
                <button onClick={exportToGoogleSheets} className="flex items-center px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm">
                    <SiGooglesheets className="mr-2" />
                    Google Sheets
                </button>
            </div>
        </div>
    );
};

export default PayoutDetails;
