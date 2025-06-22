import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in with Google", error);
            alert("Failed to sign in with Google. Please ensure pop-ups are enabled and you have enabled Google Sign-In in your Firebase project.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center w-full max-w-md">
                <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">News Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8">Welcome! Please sign in to access your dashboard.</p>
                <button 
                    onClick={handleGoogleSignIn} 
                    className="w-full flex items-center justify-center bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-white font-bold py-3 px-4 rounded-lg transition duration-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                    <FcGoogle className="mr-3 text-2xl" />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
