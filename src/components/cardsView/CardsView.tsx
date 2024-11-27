import React, {useEffect, useState} from 'react';

import { MainDeckContainer, CardsContainer, Header, StartButton } from './CardsView.styles';

import Card from '../card/Card';

interface CardsViewProps {
    selectedDeck: string | null;
    onAdd: (id: number) => void;
}

const CardsView: React.FC<CardsViewProps> = ({ selectedDeck, onAdd }) => {
    const [flashcards, setFlashcards] = useState<{ deck: string; cards: string[] }[]>([
        {deck: 'Math', cards: ['Card 1', 'Card 2']},
        {deck: 'Science', cards: ['Card A', 'Card B', 'Card C', 'Card D']},
        {deck: 'Science 2', cards: ['Card A2', 'Card B2', 'Card C2', 'Card D2', 'Card E2', 'Card F2', 'Card G2',
                'Card B2', 'Card C2', 'Card D2', 'Card E2', 'Card F2', 'Card G2']},
    ]);
    const [currentCards, setCurrentCards] = useState<string[]>([]);

    useEffect(() => {
        const deck = flashcards.find((d) => d.deck === selectedDeck);
        setCurrentCards(deck ? deck.cards : []);
    }, [selectedDeck, flashcards]);

    return(
        <MainDeckContainer>
            <Header>{selectedDeck}</Header>
            <CardsContainer>
                {currentCards.map((card, index) => (
                    <Card onCardClick={() => onAdd(index)} key={index} card={card} />
                ))}
                <Card onCardClick={() => onAdd(-1)} key={-1} card={"+"} />
            </CardsContainer>
            <StartButton onClick={() =>{console.log("Start")}}>Start</StartButton>
        </MainDeckContainer>
    )
}

export default CardsView;