import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaSearch } from 'react-icons/fa';

const FilterControls = () => {
    const { setFilters } = useContext(AppContext);
    const [keyword, setKeyword] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setFilters({ keyword, author, date, category });
        }, 500); // Debounce filter changes

        return () => {
            clearTimeout(handler);
        };
    }, [keyword, author, date, category, setFilters]);


    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8">
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search by keyword..." 
                        className="p-2 pl-10 rounded bg-gray-100 dark:bg-gray-700 w-full"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
                <input 
                    type="text" 
                    placeholder="Filter by author..." 
                    className="p-2 rounded bg-gray-100 dark:bg-gray-700"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <input 
                    type="date" 
                    className="p-2 rounded bg-gray-100 dark:bg-gray-700"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <select 
                    className="p-2 rounded bg-gray-100 dark:bg-gray-700"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="business">Business</option>
                    <option value="technology">Technology</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="sports">Sports</option>
                    <option value="science">Science</option>
                    <option value="health">Health</option>
                </select>
            </div>
        </div>
    );
};

export default FilterControls;
