import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SentimentChart = ({ articles }) => {
    const data = [
        { name: 'Positive', count: articles.filter(a => a.sentiment > 0.5).length },
        { name: 'Neutral', count: articles.filter(a => a.sentiment >= -0.5 && a.sentiment <= 0.5).length },
        { name: 'Negative', count: articles.filter(a => a.sentiment < -0.5).length },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Sentiment Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SentimentChart;
