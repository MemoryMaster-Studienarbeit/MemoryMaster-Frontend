import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

import { Card as CardType } from '../../types/Cards';
import { Difficulty } from '../../types/Difficulty';
import { INTERVALS } from '../../constants/Difficultys';
import Button from "../button/Button";
import {
    LearningPageBody,
    LearningPageContainer,
    LearningPageFooter,
    LearningPageHeader,
    CardBackContainer,
    CardBack, CardFront, CardFrontContainer
} from "./LearningPage.styles";

interface LearningPageProps {
    onLoad: (sessionId: string, deckName?: string) => void
}

const LearningPage:React.FC<LearningPageProps> = ({onLoad}) => {
    const navigate = useNavigate()
    const {sessionId} = useParams<{ sessionId: string }>();
    const {deckName} = useParams<{ deckName: string }>();
    onLoad(sessionId || "", deckName);
    const [flashcards, setFlashcards] = React.useState<{cards: CardType[] }>({cards: []});
    const [shuffledCards, setShuffledCards] = React.useState<{cards: CardType[] }>({cards: []});
    const [currentCardIndex, setCurrentCardIndex] = React.useState<number>(0);
    const [isFlipped, setIsFlipped] = React.useState<boolean>(false);

    useEffect(() => {
        void fetchDeck()
    }, []);

    useEffect(() => {
        filterCards()
    }, [flashcards]);

    const updateCardAfterReview = (card: CardType, difficulty: Difficulty): CardType => {
        const now = new Date().getTime();
        let newStage = card.stage;
        let nextInterval = INTERVALS[difficulty][Math.min(card.stage, INTERVALS[difficulty].length - 1)];

        if (difficulty === "very_hard" && newStage > 0) {
            newStage -= 1;
        } else if (difficulty !== "very_hard") {
            newStage = Math.min(newStage + 1, 4);
        }
        console.log("now", new Date().toISOString())
        const next_learned = new Date(now + nextInterval * 60 * 1000).toISOString();
        console.log(next_learned);

        return {
            ...card,
            last_learned: new Date().toISOString(),
            next_learned: next_learned,
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
                navigate('*')
            });
    }

    const filterCards = () => {
        if (flashcards === undefined) {
            return;
        }

        console.log("flashcards", flashcards);
        const now = new Date().toISOString()
        const filteredCards: CardType[] = flashcards.cards?.filter(card => !card.next_learned || card.next_learned <= now);
        console.log("filtered cards", filteredCards);
        const shuffledCards: CardType[] = filteredCards?.sort(() => Math.random() - 0.5);
        setShuffledCards({ cards: shuffledCards });
    }

    const updateCard = async (card: CardType) => {
        const jsonBody = JSON.stringify(card);
        console.log(jsonBody);
        await fetch(`http://45.81.232.169:8000/api/card?session_uuid=${sessionId}&deck_name=${deckName}`, {
            method: "PUT",
            body: jsonBody,
            headers: {"Content-Type": "application/json", "accept": "application/json"},
        })
            .then(response => response.json())
            .then(data => console.log("Card updated:", data))
            .catch(error => console.error("Update error:", error));
    }

    const handleDifficultyClick = (difficulty: Difficulty) => {
        if (!shuffledCards?.cards[currentCardIndex]) return;

        const updatedCard = updateCardAfterReview(shuffledCards?.cards[currentCardIndex], difficulty);
        updateCard(updatedCard);
        setIsFlipped(false)
        const updatedFlashcards = shuffledCards.cards.filter((_, index) => index !== currentCardIndex);
        setShuffledCards({ cards: updatedFlashcards });
        setCurrentCardIndex((prevIndex) => (prevIndex >= updatedFlashcards.length ? 0 : prevIndex));
    };

    return (
        <LearningPageContainer>
            {shuffledCards?.cards[currentCardIndex] ? (
                <>
                    <LearningPageHeader>Learning Page</LearningPageHeader>
                    <LearningPageBody>
                    {shuffledCards?.cards[currentCardIndex] && (
                        <>
                            <CardFrontContainer>
                                <CardFront>{shuffledCards.cards[currentCardIndex].card_front}</CardFront>
                            </CardFrontContainer>
                            {isFlipped &&
                                <CardBackContainer>
                                    <CardBack>{shuffledCards.cards[currentCardIndex].card_back}</CardBack>
                                </CardBackContainer>
                            }
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
                </>
            ) : (
                <h1>No more cards to learn</h1>
                )
            }
        </LearningPageContainer>
    );
}

export default LearningPage;