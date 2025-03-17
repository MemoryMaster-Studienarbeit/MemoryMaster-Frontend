import React from "react";

import { Card as CardType } from '../../types/Cards';
import {useNavigate, useParams} from "react-router-dom";
import {LearningPageContainer} from "./LearningPage.styles";

interface LearningPageProps {
    onLoad: (sessionId: string, deckName?: string) => void
}

const LearningPage:React.FC<LearningPageProps> = ({onLoad}) => {
    const navigate = useNavigate()
    const {sessionId} = useParams<{ sessionId: string }>();
    const {deckName} = useParams<{ deckName: string }>();
    onLoad(sessionId || "", deckName);


    const updateCardAfterReview = (card: CardType, difficulty: "very_hard" | "hard" | "good" | "very_good"): any => {
        const now = new Date().getTime();

        // Spaced-Repetition-Intervalle für jede Stufe und Schwierigkeit
        const intervals = {
            very_hard: [1, 1, 3, 7, 14],   // Fast Reset oder minimaler Fortschritt
            hard: [1, 3, 7, 14, 30],       // Langsamer Fortschritt
            good: [3, 7, 14, 30, 60],      // Normales Lernen
            very_good: [5, 10, 20, 45, 90] // Starker Boost
        };

        let newStage = card.stage;
        let nextInterval = intervals[difficulty][Math.min(card.stage, intervals[difficulty].length - 1)];

        // Falls die Antwort "sehr schwer" war, eine Stufe zurück (aber nicht unter 0)
        if (difficulty === "very_hard" && newStage > 0) {
            newStage -= 1;
        } else if (difficulty !== "very_hard") {
            newStage = Math.min(newStage + 1, 4); // Maximal bis Stufe 4
        }

        return {
            ...card,
            last_learned: new Date().toISOString(),
            next_learned: new Date(now + nextInterval * 24 * 60 * 60 * 1000).toISOString(),
            stage: newStage
        };
    };

    return (
        <LearningPageContainer>
            <h1>Learning Page</h1>
        </LearningPageContainer>
    );
}

export default LearningPage;