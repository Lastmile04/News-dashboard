import React from 'react';

const Summary = ({ onGenerateBriefing, articles }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">AI News Briefing</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Get a quick summary of the top stories.</p>
            <button 
                onClick={() => onGenerateBriefing(articles)} 
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg"
            >
                Generate Briefing
            </button>
        </div>
    );
};

export default Summary;
