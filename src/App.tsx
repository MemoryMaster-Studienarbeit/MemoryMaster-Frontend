import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import MainContent from './components/mainContent/MainContent';
import { ThemeContextProvider } from './ThemeContext';
import { AppContainer } from './App.styles';

const App: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <ThemeContextProvider>
            <AppContainer>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
                <MainContent isSidebarOpen={isSidebarOpen} />
            </AppContainer>
        </ThemeContextProvider>
    );
};

export default App;
