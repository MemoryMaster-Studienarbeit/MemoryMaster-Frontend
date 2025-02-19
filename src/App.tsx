import React, {useState} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { AppContainer } from './App.styles';
import MainContent from './components/mainContent/MainContent';
import NotFound from './components/notFound/NotFound';
import Sidebar from './components/sidebar/Sidebar';
import { ThemeContextProvider } from "./ThemeContext";


const App: React.FC = () => {
    const [sessionId, setSessionId] = useState('uuid');
    return (
        <ThemeContextProvider>
            <AppContainer>
                <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
                    <Sidebar sessionId={sessionId} />
                    <Routes>
                        <Route path="/" element={<MainContent onLoad={setSessionId}/>} />
                        <Route path="/:sessionId" element={<MainContent onLoad={setSessionId}/>}>
                            <Route path=":deckName" element={<MainContent onLoad={setSessionId}/>} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </AppContainer>
        </ThemeContextProvider>
    );
};

export default App;
