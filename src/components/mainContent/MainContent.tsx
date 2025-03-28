import React, {useEffect} from 'react';

import {MainContentContainer} from './MainContent.styles';
import {useNavigate, useParams} from "react-router-dom";
import { validateOrCreateUUID } from '../../utils/uuid';


interface MainContentProps {
    onLoad: (sessionId: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({onLoad}) => {
    const navigate = useNavigate();
    const { sessionId } = useParams<{ sessionId: string }>();
    onLoad(sessionId || "");

    useEffect(() => {
        console.log("Session ID:", sessionId);
        void validateOrCreateUUID(sessionId, navigate);
    }, [navigate, sessionId]);

    return (
        <MainContentContainer>
            <h2>Select one of your Decks</h2>
        </MainContentContainer>
    );
};

export default MainContent;
