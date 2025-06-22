import React from 'react';
import Spinner from './Spinner';

const AIModal = ({ isOpen, isLoading, title, content, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl relative">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{title}</h2>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {isLoading ? <Spinner /> : content}
                </div>
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default AIModal;
