import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';

const PayoutSettings = () => {
    const { payoutRate, updatePayoutRate } = useAppContext();
    const [rate, setRate] = useState(payoutRate);

    const handleUpdate = () => {
        updatePayoutRate(parseFloat(rate));
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Payout Settings (Admin)</h3>
            <div className="flex items-center space-x-2">
                <input 
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="border rounded px-2 py-1 w-24 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                <button onClick={handleUpdate} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">
                    Update Rate
                </button>
            </div>
        </div>
    );
};

export default PayoutSettings;
