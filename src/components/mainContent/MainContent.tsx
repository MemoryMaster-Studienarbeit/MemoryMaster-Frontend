import React, {useEffect} from 'react';

import {MainContentContainer} from './MainContent.styles';
import CardsView from '../cardsView/CardsView';
import {useNavbar} from "../../ThemeContext";

interface MainContentProps {
    selectedDeck: string | null;
}

const MainContent: React.FC<MainContentProps> = ({ selectedDeck }) => {
    const { isSidebarOpen } = useNavbar();
    const [addCard, setAddCard] = React.useState(false);

    const handleAdd = (id: number) => {
        console.log(id);
        setAddCard(true);
    }

    return (
        <MainContentContainer $isSidebarOpen={isSidebarOpen}>
            {selectedDeck != null
                ? (<CardsView selectedDeck={selectedDeck} onAdd={handleAdd}/>)
                : (<h2>Select a Deck</h2>)}
            {addCard && <h2>Add Card</h2>}


        </MainContentContainer>
    );
};

export default MainContent;
