import React, {useEffect, useState} from 'react';
import { MainContentContainer } from './MainContent.styles';

interface MainContentProps {
    isSidebarOpen: boolean;
    selectedDeck: string | null;
}

const MainContent: React.FC<MainContentProps> = ({ isSidebarOpen, selectedDeck }) => {
    const [flashcards, setFlashcards] = useState<{ deck: string; cards: string[] }[]>([
        { deck: 'Math', cards: ['Card 1', 'Card 2'] },
        { deck: 'Science', cards: ['Card A', 'Card B'] },
    ]);
    const [currentCards, setCurrentCards] = useState<string[]>([]);

    useEffect(() => {
        const deck = flashcards.find((d) => d.deck === selectedDeck);
        setCurrentCards(deck ? deck.cards : []);
    }, [selectedDeck, flashcards]);

    return (
        <MainContentContainer isSidebarOpen={isSidebarOpen}>
            <div>
                <h2>{selectedDeck || 'Select a Deck'}</h2>
                <ul>
                    {currentCards.map((card, index) => (
                        <li key={index}>{card}</li>
                    ))}
                </ul>
            </div>
        </MainContentContainer>
    );
};

export default MainContent;
