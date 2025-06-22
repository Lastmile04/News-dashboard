import React, { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { useAppContext } from './hooks/useAppContext';
import Dashboard from './pages/Dashboard';
import Login from './components/auth/Login';
import Spinner from './components/common/Spinner';

function Root() {
    const { user, loading, isDarkMode } = useAppContext();

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <Spinner />
            </div>
        );
    }
    
    return user ? <Dashboard /> : <Login />;
}


export default function App() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  );
}
