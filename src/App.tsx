import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import MainContent from './components/mainContent/MainContent';
import { ThemeContextProvider } from './ThemeContext';
import { AppContainer } from './App.styles';

const App: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedDeck, setSelectedDeck] = useState<string | null>(null);

    return (
        <ThemeContextProvider>
            <AppContainer>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} onSelectDeck={setSelectedDeck}/>
                <MainContent isSidebarOpen={isSidebarOpen} selectedDeck={selectedDeck}/>
            </AppContainer>
        </ThemeContextProvider>
    );
};

export default App;
