import React, {useEffect, useState} from 'react';

import { MainDeckContainer, CardsContainer, Header } from './CardsOverview.styles';

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
    const [flashcards, setFlashcards] = useState<{ deckName: string; cards: CardType[] }>();

    useEffect(() => {
        fetchDeck();
    }, [deckName]);

    const fetchDeck = async () => {
        await fetch(`http://45.81.232.169:8000/api/deck?session_uuid=${sessionId}&deck_name=${deckName}`)
            .then(response => response.json())
            .then(data => {
                setFlashcards({ deckName: data.deck_name, cards: data.cards.map((card: CardType) => (
                        { uuid: card.card_uuid, front: card.card_front, back: card.card_back })) }
                );
                console.log('Deck fetch successful:', data);
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
            <Button onClick={() =>{navigate(`/${sessionId}/${deckName}/learn`)}} text={"Start learning"} />
        </MainDeckContainer>
    )
}

export default CardsOverview;