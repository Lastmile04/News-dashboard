import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useAppContext } from '../../hooks/useAppContext';
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi';

const Header = () => {
    const { user, isDarkMode, setIsDarkMode } = useAppContext();

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center sticky top-0 z-10">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">News Dashboard</h1>
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
