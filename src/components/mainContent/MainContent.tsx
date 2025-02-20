import React, {useEffect} from 'react';

import {MainContentContainer} from './MainContent.styles';
import {useNavbar} from "../../ThemeContext";
import {useNavigate, useParams} from "react-router-dom";

interface MainContentProps {
    onLoad: (sessionId: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({onLoad}) => {
    const { isSidebarOpen } = useNavbar();
    const navigate = useNavigate();
    const { sessionId } = useParams<{ sessionId: string }>();
    onLoad(sessionId || "");

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

    return (
        <MainContentContainer $isSidebarOpen={isSidebarOpen}>
            <h2>Select one of your Decks</h2>
        </MainContentContainer>
    );
};

export default MainContent;
