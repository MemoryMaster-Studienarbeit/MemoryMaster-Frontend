import React, { createContext, useState, useContext } from 'react';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import { lightTheme, darkTheme } from './themes';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

interface NavbarContextType {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const SidebarContext = createContext<NavbarContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const useNavbar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useNavbar must be used within a NavbarProvider');
    }
    return context;
};

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        
        background-color: ${(props) => props.theme.backgroundColor};
        background-image: ${(props) => props.theme.backgroundImage} !important;
        background-size: cover;
        background-repeat: no-repeat;
        transition: all 0.2s ease-in-out;
        backdrop-filter: blur(1px);
    }
`;

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
                <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme} >
                    <GlobalStyle />
                    {children}
                </ThemeProvider>
            </SidebarContext.Provider>
        </ThemeContext.Provider>
    );
};


