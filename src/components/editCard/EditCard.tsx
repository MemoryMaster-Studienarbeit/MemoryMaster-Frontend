import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

import { EditCardContainer} from "./EditCard.styles";
import {TextAreaInput} from "../frontAndBackView/FrontAndBackView.styles";

import { Card as CardType } from '../../types/Cards';
import Button from "../button/Button";

interface EditCardProps {
    onLoad: (sessionId: string, deckName?: string) => void;
}

const EditCard: React.FC<EditCardProps> = ({onLoad}) => {
    const navigate = useNavigate();
    const { sessionId } = useParams<{ sessionId: string }>();
    const { deckName } = useParams<{ deckName: string }>();
    const { cardId } = useParams<{ cardId: string }>();
    onLoad(sessionId || "", deckName);
    const [flashcard, setFlashcard] = useState<{ deckName: string; card: CardType }>();
    const [cardFront, setCardFront] = useState<string>("");
    const [cardBack, setCardBack] = useState<string>("");

    useEffect(() => {
        fetchDeck();
    }, []);

    const fetchDeck = async () => {
        await fetch(`http://45.81.232.169:8000/api/deck?session_uuid=${sessionId}&deck_name=${deckName}`)
            .then(response => response.json())
            .then(data => {
                const card = data.cards.find((card: CardType) => card.card_uuid === cardId);
                if (card) {
                    setFlashcard({ deckName: data.deck_name, card: card });
                    setCardFront(card.card_front);
                    setCardBack(card.card_back);
                }
                console.log('Deck fetch successful, Card:', data);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    const saveCard = async () => {
        console.log(JSON.stringify({
            card_front: cardFront,
            card_back: cardBack,
            card_uuid: flashcard?.card.card_uuid,
            last_learned: flashcard?.card.last_learned,
            next_learned: flashcard?.card.next_learned,
        }));
        await fetch(`http://45.81.232.169:8000/api/card?session_uuid=${sessionId}&deck_name=${deckName}`, {
            method: "PUT",
            body: JSON.stringify({
                card_front: cardFront,
                card_back: cardBack,
                card_uuid: flashcard?.card.card_uuid,
                last_learned: flashcard?.card.last_learned,
                next_learned: flashcard?.card.next_learned,
            }),
            headers: {
                "content-type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Card created:", data);
            })
    }

    const handleSaveButtonClick = () => {
        saveCard();
        console.log("Save Button clicked");
        navigate(`/${sessionId}/${deckName}`)
    }

    return (
        <EditCardContainer>
            <TextAreaInput
                width={"80%"}
                onChange={(e) => setCardFront(e.target.value)}
                height={"30%"}
                defaultValue={flashcard?.card.card_front}
            />
            <TextAreaInput
                width={"80%"}
                onChange={(e) => setCardBack(e.target.value)}
                height={"50%"}
                defaultValue={flashcard?.card.card_back}
            />
            <div>
                <Button onClick={() => navigate(`/${sessionId}/${deckName}/${cardId}`)} width={"150px"} text={"Abbrechen"}/>
                <Button onClick={handleSaveButtonClick} width={"200px"} text={"Bearbeitung speichern"}/>
            </div>
        </EditCardContainer>
    );
}

export default EditCard;