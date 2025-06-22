import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { unparse } from 'papaparse';
import { FaFileCsv } from 'react-icons/fa';
import { SiGooglesheets } from 'react-icons/si';

const ArticleExport = () => {
    const { articles } = useAppContext();

    const handleExport = (format) => {
        const dataToExport = articles.map(article => ({
            title: article.title,
            author: article.author,
            source: article.source.name,
            url: article.url,
            publishedAt: article.publishedAt,
            description: article.description,
        }));

        if (format === 'csv') {
            const csv = unparse(dataToExport);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', 'articles.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else if (format === 'gsheets') {
            alert('Exporting articles to Google Sheets is not yet implemented.');
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-xl mb-4 text-gray-800 dark:text-white">Export Articles</h3>
            <div className="flex items-center justify-center space-x-4">
                <button 
                    onClick={() => handleExport('csv')}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors duration-300"
                >
                    <FaFileCsv />
                    <span>Export as CSV</span>
                </button>
                <button 
                    onClick={() => handleExport('gsheets')}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors duration-300"
                >
                    <SiGooglesheets />
                    <span>Google Sheets</span>
                </button>
            </div>
        </div>
    );
};

export default ArticleExport;
