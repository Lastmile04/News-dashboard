import React from 'react';

const ArticleWithSentiment = ({ article }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col">
            {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
            )}
            <div className="flex-grow">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{article.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{article.description}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">{article.source.name}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Read More
                </a>
            </div>
        </div>
    );
};

export default ArticleWithSentiment;
