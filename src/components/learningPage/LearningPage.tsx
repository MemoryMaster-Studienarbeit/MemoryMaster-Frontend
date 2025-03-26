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
    const [currentCardIndex, setCurrentCardIndex] = React.useState<number>(0);
    const [isFlipped, setIsFlipped] = React.useState<boolean>(false);

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
        const filteredCards: CardType[] = flashcards.cards.filter(card => !card.next_learned || card.next_learned <= new Date().toISOString());
        setFlashcards({ cards: filteredCards });
    }

    const updateCard = async (card: CardType) => {
        console.log(JSON.stringify(card));
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
        if (!flashcards?.cards[currentCardIndex]) return;

        const updatedCard = updateCardAfterReview(flashcards?.cards[currentCardIndex], difficulty);
        setFlashcard({ card: updatedCard });
        updateCard(updatedCard);
    };

    return (
        <LearningPageContainer>
            <LearningPageHeader>Learning Page</LearningPageHeader>
            <LearningPageBody>
                {flashcards?.cards[currentCardIndex] && (
                    <>
                        <h2>{flashcards.cards[currentCardIndex].card_front}</h2>

                        {isFlipped && (
                            <p>{flashcards.cards[currentCardIndex].card_back}</p>
                        )}
                    </>
                )}
            </LearningPageBody>
            <LearningPageFooter>
                {isFlipped && (
                    <>
                        <Button text="very hard" color="learnVeryHard" onClick={() => handleDifficultyClick("very_hard")} />
                        <Button text="hard" color="learnHard" onClick={() => handleDifficultyClick("hard")} />
                        <Button text="good" color="learnGood" onClick={() => handleDifficultyClick("good")} />
                        <Button text="very good" color="learnVeryGood" onClick={() => handleDifficultyClick("very_good")} />
                    </>
                )}
                {!isFlipped && (
                    <Button text="Flip" onClick={() => setIsFlipped(!isFlipped)} />
                )}
            </LearningPageFooter>
        </LearningPageContainer>
    );
}

export default LearningPage;