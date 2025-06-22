import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaFileCsv, FaSave } from 'react-icons/fa';
import { SiGooglesheets } from 'react-icons/si';

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

    const authorData = articles.reduce((acc, article) => {
        const author = article.author || "Unknown Author";
        if (author !== "[Removed]") {
            acc[author] = (acc[author] || 0) + 1;
        }
        return acc;
    }, {});

    const totalArticles = Object.values(authorData).reduce((sum, count) => sum + count, 0);
    const totalPayout = (totalArticles * payoutRate).toFixed(2);

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
        
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "payout-details.csv");
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link);
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

            {/* Payout Calculator */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <h4 className="text-gray-600 dark:text-gray-300">Total Articles</h4>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalArticles}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <h4 className="text-gray-600 dark:text-gray-300">Total Payout</h4>
                    <p className="text-2xl font-bold text-green-500">${totalPayout}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="text-gray-600 dark:text-gray-300 mb-2">Payout Rate ($)</h4>
                    <div className="flex items-center">
                        <input 
                            type="number" 
                            value={newRate} 
                            onChange={handleRateChange} 
                            className="p-2 rounded-l-md bg-white dark:bg-gray-600 w-full"
                        />
                        <button onClick={handleSaveRate} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-r-md">
                            <FaSave />
                        </button>
                    </div>
                </div>
            </div>

            {/* Export Buttons */}
            <div className="flex items-center justify-center space-x-4 mb-8">
                <button onClick={exportToCsv} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors duration-300">
                    <FaFileCsv />
                    <span>CSV</span>
                </button>
                <button onClick={exportToGoogleSheets} disabled={!isGapiLoaded || !isGisLoaded} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors duration-300 disabled:opacity-50">
                    <SiGooglesheets />
                    <span>Google Sheets</span>
                </button>
            </div>

            {/* Author Payouts Table */}
            <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Author Payouts</h4>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg">
                    <thead>
                        <tr className="w-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Author</th>
                            <th className="py-3 px-6 text-center">Article Count</th>
                            <th className="py-3 px-6 text-right">Payout</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800 dark:text-gray-200 text-sm font-light">
                        {Object.entries(authorData).map(([author, count]) => (
                            <tr key={author} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{author}</td>
                                <td className="py-3 px-6 text-center">{count}</td>
                                <td className="py-3 px-6 text-right font-medium">${(count * payoutRate).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PayoutDetails;
