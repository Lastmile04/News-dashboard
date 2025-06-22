import React from 'react';
import ArticleWithSentiment from './ArticleWithSentiment';

const ArticleList = ({ articles }) => {
    return (
        <div className="space-y-4">
            {articles.map(article => (
                <ArticleWithSentiment key={article.id} article={article} />
            ))}
        </div>
    );
};

export default ArticleList;
