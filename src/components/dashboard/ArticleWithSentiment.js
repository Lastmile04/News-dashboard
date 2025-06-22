import React from 'react';

const ArticleWithSentiment = ({ article, onGenerateSummary }) => {
    const getSentimentColor = (score) => {
        if (score > 0.5) return 'text-green-500';
        if (score < -0.5) return 'text-red-500';
        return 'text-yellow-500';
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{article.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{article.description}</p>
                <p className={`text-sm font-semibold ${getSentimentColor(article.sentiment)}`}>
                    Sentiment: {article.sentiment.toFixed(2)}
                </p>
            </div>
            <button 
                onClick={() => onGenerateSummary(article)} 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
                Summarize
            </button>
        </div>
    );
};

export default ArticleWithSentiment;
