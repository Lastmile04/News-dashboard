import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Header from '../components/dashboard/Header';
import FilterControls from '../components/dashboard/FilterControls';
import ArticleList from '../components/dashboard/ArticleList';
import SentimentChart from '../components/dashboard/SentimentChart';
import Summary from '../components/dashboard/Summary';
import PayoutDetails from '../components/dashboard/PayoutDetails'; // Corrected import
import AIModal from '../components/common/AIModal';

const Dashboard = () => {
    const { 
        articles, 
        isAdmin, 
        aiModalState, 
        setAiModalState, 
        generateSummary, 
        generateBriefing 
    } = useAppContext();

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header />
            <main className="p-8">
                <FilterControls />
                {isAdmin && <PayoutDetails />} 
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <div className="md:col-span-2">
                        <ArticleList articles={articles} onGenerateSummary={generateSummary} />
                    </div>
                    <div className="space-y-8">
                        <Summary articles={articles} onGenerateBriefing={generateBriefing} />
                        <SentimentChart articles={articles} />
                    </div>
                </div>
            </main>
            <AIModal 
                isOpen={aiModalState.isOpen}
                isLoading={aiModalState.isLoading}
                title={aiModalState.title}
                content={aiModalState.content}
                onClose={() => setAiModalState({ ...aiModalState, isOpen: false })}
            />
        </div>
    );
};

export default Dashboard;
