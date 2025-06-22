import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentChart = ({ articles }) => {
    const sources = articles.reduce((acc, article) => {
        const sourceName = article.source.name;
        if (sourceName) {
            acc[sourceName] = (acc[sourceName] || 0) + 1;
        }
        return acc;
    }, {});

    const sortedSources = Object.entries(sources).sort(([, a], [, b]) => b - a);
    const topSources = sortedSources.slice(0, 9);
    const otherSourcesCount = sortedSources.slice(9).reduce((acc, [, count]) => acc + count, 0);

    const labels = topSources.map(([name]) => name);
    const dataPoints = topSources.map(([, count]) => count);

    if (otherSourcesCount > 0) {
        labels.push('Other');
        dataPoints.push(otherSourcesCount);
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: '# of Articles',
                data: dataPoints,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(199, 199, 199, 0.7)',
                    'rgba(83, 102, 255, 0.7)',
                    'rgba(255, 102, 203, 0.7)',
                    'rgba(128, 128, 128, 0.7)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',
                    'rgba(83, 102, 255, 1)',
                    'rgba(255, 102, 203, 1)',
                    'rgba(128, 128, 128, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 20,
                    padding: 20,
                },
            },
            title: {
                display: true,
                text: 'Articles by Source',
            },
        },
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Article Sources</h3>
            <Pie data={data} options={options} />
        </div>
    );
};

export default SentimentChart;
