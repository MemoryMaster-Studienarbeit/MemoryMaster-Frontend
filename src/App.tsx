import React, {useState} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { AppContainer } from './App.styles';
import MainContent from './components/mainContent/MainContent';
import NotFound from './components/notFound/NotFound';
import Sidebar from './components/sidebar/Sidebar';
import { ThemeContextProvider } from "./ThemeContext";
import CardsOverview from "./components/cardsOverview/CardsOverview";
import AddCard from "./components/addCard/AddCard";
import CardView from "./components/cardView/CardView";
import EditCard from "./components/editCard/EditCard";
import LearningPage from "./components/learningPage/LearningPage";

const App: React.FC = () => {
    const [sessionId, setSessionId] = useState('uuid');
    const [deckName, setDeckName] = useState('');
    const setSidebarInfos = (sessionId: string, deckName: any) => {
        setSessionId(sessionId);
        setDeckName(deckName || '');
    }
    return (
        <ThemeContextProvider>
            <AppContainer>
                <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
                    <Sidebar sessionId={sessionId} selectedDeckName={deckName}/>
                    <Routes>
                        <Route path="/" element={<MainContent onLoad={setSessionId}/>} />
                        <Route path="/:sessionId" element={<MainContent onLoad={setSessionId}/>}/>
                        <Route path="/:sessionId/:deckName" element={<CardsOverview onLoad={setSidebarInfos}/>} />
                        <Route path="/:sessionId/:deckName/add" element={<AddCard onLoad={setSidebarInfos} />} />
                        <Route path="/:sessionId/:deckName/:cardId" element={<CardView onLoad={setSidebarInfos} />} />
                        <Route path="/:sessionId/:deckName/edit/:cardId" element={<EditCard onLoad={setSidebarInfos} />} />
                        <Route path="/:sessionId/:deckName/learn" element={<LearningPage onLoad={setSidebarInfos} />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </AppContainer>
        </ThemeContextProvider>
    );
};

export default App;
