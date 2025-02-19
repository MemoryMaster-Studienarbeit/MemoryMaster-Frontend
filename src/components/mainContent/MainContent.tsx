import React, {useEffect, useState} from 'react';

import {MainContentContainer} from './MainContent.styles';
import CardsView from '../cardsView/CardsView';
import {useNavbar} from "../../ThemeContext";
import AddCard from "../addCard/AddCard";
import {useNavigate, useParams} from "react-router-dom";

interface MainContentProps {
    onLoad: (sessionId: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({onLoad}) => {
    const { isSidebarOpen } = useNavbar();
    const navigate = useNavigate();
    const { sessionId } = useParams<{ sessionId: string }>();
    onLoad(sessionId || "");
    const { deckName } = useParams<{ deckName: string }>();
    const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
    const [addCardPage, setAddCardPage] = React.useState(false);

    const handleAdd = (id: number) => {
        console.log(id);
        if (id === -1){
            setAddCardPage(true);
        }
    }

    useEffect(() => {
        console.log("Session ID:", sessionId);
        const validateOrCreateUUID = async () => {
            try {
                const res = await fetch(`http://45.81.232.169:8000/api/uuid?uuid=${sessionId || "new"}`, {
                    method: "POST",
                });

                if (!res.ok) {
                    console.error("Backend Fehler:", res.statusText);
                    return;
                }

                const uuid = await res.text();
                console.log("Backend Response:", uuid);
                const validUUID = uuid.slice(1, -1);

                if (sessionId !== validUUID) {
                    navigate(`/${validUUID}`, { replace: true });
                }
            } catch (error) {
                console.error("Fehler beim Abrufen der UUID:", error);
            }
        };
        validateOrCreateUUID();
    }, []);

    useEffect(() => {
        if (deckName === undefined) {
            setSelectedDeck(null);
        } else {
            setSelectedDeck(deckName);
        }
    }, [deckName]);

    useEffect(() => {
        setAddCardPage(false);
    }, [selectedDeck]);

    return (
        <MainContentContainer $isSidebarOpen={isSidebarOpen}>
            {selectedDeck != null && !addCardPage
                ? (<CardsView selectedDeck={selectedDeck} onAdd={handleAdd}/>)
                : (addCardPage ? <AddCard /> : <h2>Select a Deck</h2>)}

        </MainContentContainer>
    );
};

export default MainContent;
