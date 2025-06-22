import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useAppContext } from '../../hooks/useAppContext';
import { FiSun, FiMoon, FiLogOut, FiSearch } from 'react-icons/fi';

const Header = () => {
    const { user, isDarkMode, setIsDarkMode, setFilters, filters } = useAppContext();
    const [searchQuery, setSearchQuery] = useState(filters.keyword);

    // Debounce search input to avoid excessive API calls
    useEffect(() => {
        const handler = setTimeout(() => {
            setFilters(prev => ({ ...prev, keyword: searchQuery }));
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery, setFilters]);

    // Sync local search query with global filter state
    useEffect(() => {
        if (filters.keyword !== searchQuery) {
            setSearchQuery(filters.keyword);
        }
    }, [filters.keyword, searchQuery]);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center sticky top-0 z-10 gap-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white flex-shrink-0">News Dashboard</h1>
            
            <div className="relative flex-1 max-w-xl mx-auto">
                <input
                    type="text"
                    placeholder="Search articles by keyword..."
                    className="p-2 pl-10 rounded-lg bg-gray-100 dark:bg-gray-700 w-full border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex items-center space-x-4">
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-2xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    {isDarkMode ? <FiSun /> : <FiMoon />}
                </button>
                <div className="hidden md:flex items-center space-x-2">
                    <img src={user.photoURL || '/placeholder.svg'} alt="User avatar" className="w-8 h-8 rounded-full" />
                    <span className="text-gray-800 dark:text-white font-medium">{user.displayName || user.email}</span>
                </div>
                <button onClick={() => signOut(auth)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors duration-300">
                    <FiLogOut />
                    <span>Logout</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
