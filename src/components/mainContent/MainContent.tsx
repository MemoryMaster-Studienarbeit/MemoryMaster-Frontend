import React, {useEffect} from 'react';

import {MainContentContainer} from './MainContent.styles';
import CardsView from '../cardsView/CardsView';
import {useNavbar} from "../../ThemeContext";
import AddCard from "../addCard/AddCard";
import {darkTheme} from "../../themes";

interface MainContentProps {
    selectedDeck: string | null;
}

const MainContent: React.FC<MainContentProps> = ({ selectedDeck }) => {
    const { isSidebarOpen } = useNavbar();
    const [addCardPage, setAddCardPage] = React.useState(false);

    const handleAdd = (id: number) => {
        console.log(id);
        if (id === -1){
            setAddCardPage(true);
        }
    }

    useEffect(() => {
        setAddCardPage(false);
    }, [selectedDeck]);

    return (
        <MainContentContainer $isSidebarOpen={isSidebarOpen}>
            {selectedDeck != null && !addCardPage
                ? (<CardsView selectedDeck={selectedDeck} onAdd={handleAdd}/>)
                : (addCardPage ? <AddCard /> : <h2>Select a Deck</h2>)}

        </MainContentContainer>
    );
};

export default MainContent;
