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
    const [flashcard, setFlashcard] = useState<{ card: CardType }>();

    useEffect(() => {
        fetchDeck();
    }, []);

    const fetchDeck = async () => {
        await fetch(`https://memorymaster.melonigemelone.de/api/deck?session_uuid=${sessionId}&deck_name=${deckName}`)
            .then(response => response.json())
            .then(data => {
                const card = data.cards.find((cards: CardType) => cards.card_uuid === cardId);
                console.log(card);
                if (card) {
                    setFlashcard({ card: card });
                }
                console.log('Deck fetch successful, Card:', card);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    const deleteCard = async () => {
        await fetch(`https://memorymaster.melonigemelone.de/api/card?session_uuid=${sessionId}&deck_name=${deckName}&card_uuid=${cardId}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(data => {console.log("Card deleted: ", data)})
            .catch(error => {
                console.error('Fetch error: ', error);
            });
    }

    const handleDeleteButtonClick = async () => {
        await deleteCard();
        navigate(`/${sessionId}/${deckName}`);
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
            <div>
                <Button onClick={() => {navigate(`/${sessionId}/${deckName}`)}} width={"150px"} text={"Zurück zum Deck"}/>
                <Button onClick={handleDeleteButtonClick} width={"150px"} text={"Karte Löschen"}/>
                <Button onClick={handleEditButtonClick} width={"150px"} text={"Karte Bearbeiten"}/>
            </div>
        </CardContainer>
    );
}

export default CardView;