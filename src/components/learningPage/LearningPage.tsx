import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

import { Card as CardType } from '../../types/Cards';
import { Difficulty } from '../../types/Difficulty';
import { INTERVALS } from '../../constants/Difficultys';
import Button from "../button/Button";
import {LearningPageBody, LearningPageContainer, LearningPageFooter, LearningPageHeader} from "./LearningPage.styles";

interface LearningPageProps {
    onLoad: (sessionId: string, deckName?: string) => void
}

const LearningPage:React.FC<LearningPageProps> = ({onLoad}) => {
    const navigate = useNavigate()
    const {sessionId} = useParams<{ sessionId: string }>();
    const {deckName} = useParams<{ deckName: string }>();
    onLoad(sessionId || "", deckName);
    const [flashcards, setFlashcards] = React.useState<{cards: CardType[] }>();
    const [flashcard, setFlashcard] = React.useState<{card: CardType }>();

    useEffect(() => {
        fetchDeck().then(() => {
            filterCards();
        });
    }, []);

    const updateCardAfterReview = (card: CardType, difficulty: Difficulty): CardType => {
        const now = new Date().getTime();
        let newStage = card.stage;
        let nextInterval = INTERVALS[difficulty][Math.min(card.stage, INTERVALS[difficulty].length - 1)];

        if (difficulty === "very_hard" && newStage > 0) {
            newStage -= 1;
        } else if (difficulty !== "very_hard") {
            newStage = Math.min(newStage + 1, 4);
        }

        return {
            ...card,
            last_learned: new Date().toISOString(),
            next_learned: new Date(now + nextInterval * 60 * 1000).toISOString(),
            stage: newStage
        };
    };

    const fetchDeck = async () => {
        await fetch(`http://45.81.232.169:8000/api/deck?session_uuid=${sessionId}&deck_name=${deckName}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setFlashcards({ cards: data.cards });
                console.log('Deck fetch successful');
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    const filterCards = () => {
        if (flashcards === undefined) {
            return;
        }
        const filteredCards: CardType[] = flashcards.cards.filter(card => card.next_learned <= new Date().toISOString());
        setFlashcards({ cards: filteredCards });
    }

    const updateCard = async (card: CardType) => {
        await fetch(`http://45.81.232.169:8000/api/card?session_uuid=${sessionId}&deck_name=${deckName}`, {
            method: "PUT",
            body: JSON.stringify({card}),
            headers: {"content-type": "application/json"}
        })
            .then(response => response.json())
            .then(data => console.log("Card updated:", data))
            .catch(error => console.error("Update error:", error));
    }

    const handleDifficultyClick = (difficulty: Difficulty) => {
        if (!flashcard) return;

        const updatedCard = updateCardAfterReview(flashcard.card, difficulty);
        setFlashcard({ card: updatedCard });
        updateCard(updatedCard);
    };

    return (
        <LearningPageContainer>
            <LearningPageHeader>Learning Page</LearningPageHeader>
            <LearningPageBody>
                {flashcard && (
                    <>
                        <h2>{flashcard.card.card_front}</h2>
                        <p>{flashcard.card.card_back}</p>
                    </>
                )}
            </LearningPageBody>
            <LearningPageFooter>
                <Button text="Sehr schwer" color="red" onClick={() => handleDifficultyClick("very_hard")} />
                <Button text="Schwer" color="orange" onClick={() => handleDifficultyClick("hard")} />
                <Button text="Gut" color="blue" onClick={() => handleDifficultyClick("good")} />
                <Button text="Sehr gut" color="green" onClick={() => handleDifficultyClick("very_good")} />
            </LearningPageFooter>
        </LearningPageContainer>
    );
}

export default LearningPage;