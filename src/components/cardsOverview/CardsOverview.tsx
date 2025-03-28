import React, {useEffect, useState} from 'react';

import {MainDeckContainer, CardsContainer, Header, NoCards} from './CardsOverview.styles';

import Card from '../card/Card';
import { Card as CardType } from '../../types/Cards';
import Button from '../button/Button';
import {useParams, useNavigate} from "react-router-dom";

interface CardViewProps {
    onLoad: (sessionId: string, deckName?: string) => void;
}

const CardsOverview: React.FC<CardViewProps> = ({onLoad}) => {
    const navigate = useNavigate();
    const { sessionId } = useParams<{ sessionId: string }>();
    const { deckName } = useParams<{ deckName: string }>();
    onLoad(sessionId || "", deckName);
    const [flashcards, setFlashcards] = useState<{ cards: CardType[] }>();
    const [amountCardsToLearn, setAmountCardsToLearn] = useState<number>(0);

    useEffect(() => {
        fetchDeck();
    }, [deckName]);

    const fetchDeck = async () => {
        await fetch(`http://45.81.232.169:8000/api/deck?session_uuid=${sessionId}&deck_name=${deckName}`)
            .then(response => response.json())
            .then(data => {
                setFlashcards({ cards: data.cards });
                const now = new Date().toISOString()
                const cardsToLearn: CardType[] = data.cards.filter((card: CardType) => !card.next_learned || card.next_learned <= now);
                setAmountCardsToLearn(cardsToLearn.length);
                console.log('Deck fetch successful');
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    return(
        <MainDeckContainer>
            <Header>Cards in {deckName}</Header>
            <CardsContainer>
                {flashcards?.cards.map((card) => (
                    <Card key={card.card_uuid} card={card.card_front} onClick={() => {console.log(`Navigating to card view of: ${card.card_uuid}`); navigate(`/${sessionId}/${deckName}/${card.card_uuid}`)}}/>
                ))}
                <Card key={-1} card={"+"} onClick={() => { navigate(`/${sessionId}/${deckName}/add`); }} />
            </CardsContainer>
            {flashcards && flashcards.cards.length > 0 && amountCardsToLearn > 0
                ? <Button onClick={() =>{navigate(`/${sessionId}/${deckName}/learn`)}} width={"auto"} text={`Start learning ${amountCardsToLearn} Cards`} />
                : <NoCards>No Cards to learn</NoCards>
            }
        </MainDeckContainer>
    )
}

export default CardsOverview;