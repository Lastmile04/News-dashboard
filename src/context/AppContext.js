import React, { useState, useEffect, createContext, useMemo, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { generateContent } from '../lib/gemini';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true); // Only for initial auth load
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [articles, setArticles] = useState([]);
    const [filters, setFilters] = useState({ keyword: '', author: '', date: '', category: '' });
    const [payoutRate, setPayoutRate] = useState(5);
    const [error, setError] = useState(null);
    const [aiModalState, setAiModalState] = useState({ isOpen: false, isLoading: false, title: '', content: '' });

    const generateSummary = useCallback(async (article) => {
        setAiModalState({ isOpen: true, isLoading: true, title: 'Generating Summary...', content: '' });
        const prompt = `Summarize the following news article in three concise bullet points. Title: "${article.title}". Description: "${article.description}"`;
        const summary = await generateContent(prompt);
        if (summary) {
            setAiModalState({ isOpen: true, isLoading: false, title: `✨ Summary for: ${article.title}`, content: summary });
        } else {
            setAiModalState({ isOpen: true, isLoading: false, title: 'Error', content: 'Could not generate summary.' });
        }
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Auth state changed:", currentUser);
            if (currentUser) {
                console.log("User Email:", currentUser.email);
                console.log("Admin Email Env:", process.env.REACT_APP_ADMIN_EMAIL);
                console.log("Is Admin?", currentUser.email === process.env.REACT_APP_ADMIN_EMAIL);
            }
            setUser(currentUser);
            setIsAdmin(currentUser?.email === process.env.REACT_APP_ADMIN_EMAIL);
            setLoading(false); // Stop initial loading once auth state is resolved
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        // Don't fetch until the initial auth check is complete
        if (loading) return;

        const fetchArticles = async () => {
            const { keyword, category, date } = filters;
            const apiKey = process.env.REACT_APP_NEWS_API_KEY;
            let query = keyword || 'technology'; // Default query if no keyword

            if (category) {
                query += ` AND ${category}`;
            }

            let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;

            if (date) {
                url += `&from=${date}&to=${date}`;
            }

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                if (data.status === "ok") {
                    let fetchedArticles = data.articles.map((article, index) => ({
                        ...article,
                        id: `${article.url}-${index}`,
                        sentiment: typeof article.sentiment === 'number' ? article.sentiment : null // Ensure sentiment always exists
                    }));

                    if (filters.author) {
                        fetchedArticles = fetchedArticles.filter(article => 
                            article.author && article.author.toLowerCase().includes(filters.author.toLowerCase())
                        );
                    }
                    
                    setArticles(fetchedArticles);
                    setError(null);
                } else {
                    setError(data.message || "Failed to fetch articles.");
                    setArticles([]);
                }
            } catch (e) {
                console.error("An error occurred while fetching news:", e);
                setError("An error occurred while fetching news. Please check the console for details.");
                setArticles([]);
            }
            // No finally block to toggle loading state
        };

        fetchArticles();
    }, [filters, loading]); // Effect runs when filters change or initial load finishes

    useEffect(() => {
        if (isAdmin && user) {
            const payoutDocRef = doc(db, "settings", "payout");
            const unsubscribe = onSnapshot(payoutDocRef, (docSnap) => {
                if (docSnap.exists()) {
                    setPayoutRate(docSnap.data().rate);
                } else {
                    setDoc(payoutDocRef, { rate: 5 });
                }
            });
            return () => unsubscribe();
        }
    }, [isAdmin, user]);

    const updatePayoutRate = useCallback(async (newRate) => {
        if (isAdmin) {
            const payoutDocRef = doc(db, "settings", "payout");
            await setDoc(payoutDocRef, { rate: newRate });
        }
    }, [isAdmin]);

    const value = useMemo(() => ({
        user, 
        isAdmin, 
        loading, 
        isDarkMode, 
        setIsDarkMode, 
        articles, 
        payoutRate, 
        updatePayoutRate, 
        error, 
        aiModalState, 
        setAiModalState, 
        generateSummary, 
        setFilters,
        filters
    }), [user, isAdmin, loading, isDarkMode, setIsDarkMode, articles, payoutRate, updatePayoutRate, error, aiModalState, setAiModalState, generateSummary, setFilters, filters]);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
