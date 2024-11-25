import React, {useEffect, useState} from 'react';

import { Container, CardsContainer, Header, StartButton } from './CardsView.styles';

import Card from './Card';

interface CardsViewProps {
    selectedDeck: string | null;
}

const CardsView: React.FC<CardsViewProps> = ({ selectedDeck }) => {
    const [flashcards, setFlashcards] = useState<{ deck: string; cards: string[] }[]>([
        {deck: 'Math', cards: ['Card 1', 'Card 2']},
        {deck: 'Science', cards: ['Card A', 'Card B', 'Card C', 'Card D']},
        {deck: 'Science 2', cards: ['Card A2', 'Card B2', 'Card C2', 'Card D2', 'Card E2', 'Card F2', 'Card G2']},
    ]);
    const [currentCards, setCurrentCards] = useState<string[]>([]);

    useEffect(() => {
        const deck = flashcards.find((d) => d.deck === selectedDeck);
        setCurrentCards(deck ? deck.cards : []);
    }, [selectedDeck, flashcards]);

    return(
        <Container>
            <Header>{selectedDeck}</Header>
            <CardsContainer>
                {currentCards.map((card, index) => (
                    <Card key={index} card={card} />
                ))}
                <Card key={-1} card={"+"} />
            </CardsContainer>
            <StartButton>Start</StartButton>
        </Container>
    )
}

export default CardsView;