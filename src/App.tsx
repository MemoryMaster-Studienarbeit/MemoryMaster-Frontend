import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import MainContent from './components/mainContent/MainContent';
import { ThemeContextProvider } from './ThemeContext';
import { AppContainer } from './App.styles';

const App: React.FC = () => {
    const [selectedDeck, setSelectedDeck] = useState<string | null>(null);

    return (
        <ThemeContextProvider>
            <AppContainer>
                <Sidebar onSelectDeck={setSelectedDeck}/>
                <MainContent selectedDeck={selectedDeck}/>
            </AppContainer>
        </ThemeContextProvider>
    );
};

export default App;
