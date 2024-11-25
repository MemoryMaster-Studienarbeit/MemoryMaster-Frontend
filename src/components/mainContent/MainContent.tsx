import React from 'react';

import {MainContentContainer} from './MainContent.styles';
import CardsView from './CardsView';

interface MainContentProps {
    isSidebarOpen: boolean;
    selectedDeck: string | null;
}

const MainContent: React.FC<MainContentProps> = ({isSidebarOpen, selectedDeck}) => {

    return (
        <MainContentContainer isSidebarOpen={isSidebarOpen}>
            {selectedDeck != null && (
                <CardsView selectedDeck={selectedDeck} />
            )}
            {selectedDeck == null && (
                <div>
                    <h2>{'Select a Deck'}</h2>
                </div>
            )}
        </MainContentContainer>
    );
};

export default MainContent;
