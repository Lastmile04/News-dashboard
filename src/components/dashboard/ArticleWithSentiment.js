import React from 'react';

const ArticleWithSentiment = ({ article }) => {
    const title = article.title || "No Title Available";
    const description = article.description || "No Description Available";
    const imageUrl = article.urlToImage;
    const sourceName = article.source?.name || "Unknown Source";
    const articleUrl = article.url;
    const author = article.author || "Unknown Author";
    const publishedDate = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Unknown Date";

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col h-full">
            {imageUrl && (
                <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
            )}
            <div className="flex-grow">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span>By: {author}</span>
                    <span>{publishedDate}</span>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">{sourceName}</p>
                    {articleUrl && (
                        <a href={articleUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            Read More
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArticleWithSentiment;
