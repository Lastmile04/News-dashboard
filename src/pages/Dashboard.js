import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Header from '../components/dashboard/Header';
import SentimentChart from '../components/dashboard/SentimentChart';
import ArticleList from '../components/dashboard/ArticleList';

const Dashboard = () => {
    const { articles } = useAppContext();

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header />
            <main className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <div className="md:col-span-2">
                        <ArticleList articles={articles} />
                    </div>
                    <div className="space-y-8">
                        <SentimentChart articles={articles} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
