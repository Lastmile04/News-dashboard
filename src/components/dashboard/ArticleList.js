import React from 'react';
import ArticleWithSentiment from './ArticleWithSentiment';

const ArticleList = ({ articles, onGenerateSummary }) => {
    return (
        <div className="space-y-4">
            {articles.map(article => (
                <ArticleWithSentiment key={article.id} article={article} onGenerateSummary={onGenerateSummary} />
            ))}
        </div>
    );
};

export default ArticleList;
