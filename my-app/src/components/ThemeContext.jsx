// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

// Kontekstin yaradılması
export const ThemeContext = createContext();

// ThemeProvider komponenti
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Tema dəyərini localStorage-dan yoxla
    useEffect(() => {
        const savedTheme = localStorage.getItem('isDarkMode');
        if (savedTheme === 'true') {
            setIsDarkMode(true);
        }
    }, []);

    // Tema dəyişərkən localStorage-ə yaz
    useEffect(() => {
        localStorage.setItem('isDarkMode', isDarkMode);
    }, [isDarkMode]);

    // Tema dəyişmə funksiyası
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
