import React, {useEffect, useState} from 'react';
import {CardContainer} from "./CardView.styles";
import {useNavigate, useParams} from "react-router-dom";

import { Card as CardType } from '../../types/Cards';
import {TextAreaInput} from "../frontAndBackView/FrontAndBackView.styles";
import Button from "../button/Button";

interface CardViewProps {
    onLoad: (sessionId: string, deckName?: string) => void;
}

const CardView: React.FC<CardViewProps> = ({onLoad}) => {
    const navigate = useNavigate();
    const { sessionId } = useParams<{ sessionId: string }>();
    const { deckName } = useParams<{ deckName: string }>();
    const { cardId } = useParams<{ cardId: string }>();
    onLoad(sessionId || "", deckName);
    const [flashcard, setFlashcard] = useState<{ deckName: string; card: any }>();

    useEffect(() => {
        fetchDeck();
    });

    const fetchDeck = async () => {
        await fetch(`http://45.81.232.169:8000/api/deck?session_uuid=${sessionId}&deck_name=${deckName}`)
            .then(response => response.json())
            .then(data => {
                const card = data.cards.find((cards: CardType) => cards.card_uuid === cardId);
                console.log(card);
                if (card) {
                    setFlashcard({ deckName: data.deck_name, card: card });
                }
                console.log('Deck fetch successful, Card:', flashcard);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    const handleEditButtonClick = () => {
        navigate(`/${sessionId}/${deckName}/edit/${cardId}`);
    }

    return (
        <CardContainer>
            <TextAreaInput
                width={"80%"}
                height={"30%"}
                defaultValue={flashcard?.card.card_front}
                disabled={true}
            />
            <TextAreaInput
                width={"80%"}
                height={"50%"}
                defaultValue={flashcard?.card.card_back}
                disabled={true}
            />
            <Button onClick={handleEditButtonClick} width={"150px"} text={"Karte Bearbeiten"}/>
        </CardContainer>
    );
}

export default CardView;