import React, {useState} from 'react';

import {
    AddCardContainer,
    UpperGeneralOptionsContainer,
    LeftOptionsContainer,
    RadioButton,
    RightOptionsContainer,
    PreviewOrAddCardButton,
    ToggleModeButton,
    BackButton,
} from './AddCard.styles';
import FrontAndBackView from "../frontAndBackView/FrontAndBackView";
import FrontAndBackAiOptions from "../frontAndBackAiOptions/FrontAndBackAiOptions";

const AddCard: React.FC = () => {
    const [isManualMode, setIsManualMode] = useState(true); // true: links, false: rechts
    const [previewData, setPreviewData] = useState<string | null>(null); // Vorschau-Daten
    const [isPreviewMode, setIsPreviewMode] = useState(false); // Vorschau anzeigen oder nicht

    const toggleMode = () => {
        setIsManualMode(!isManualMode);
        setIsPreviewMode(false);
    }

    // Vorschau laden
    const handlePreview = async () => {
        setIsPreviewMode(true);
        try {
            const response = await fetch("/api/generate-card", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({prompt: "Dein Prompt hier"}),
            });

            if (response.ok) {
                const data = await response.json();
                setPreviewData(data.content); // KI-generierter Inhalt
            } else {
                console.error("Fehler beim Abrufen der Vorschau.");
            }
        } catch (error) {
            console.error("Fehler:", error);
        }
    };

    const addCardToDeck = async () => {
        console.log("Karte hinzufügefügt");
    }

    const handleBackFromPreview = () => {
        setIsPreviewMode(false);
        setPreviewData(null);
    };

    return (
        <AddCardContainer>
            <UpperGeneralOptionsContainer>
                {isManualMode ? (
                    <>
                        <LeftOptionsContainer>
                            <ToggleModeButton onClick={toggleMode}>🤖</ToggleModeButton>
                            <input type="radio" id="zusammenfassen" value="zusammenfassen" name="mode"
                                   style={{display: 'none'}}/>
                            <RadioButton htmlFor="zusammenfassen">Zusammenfassen</RadioButton>
                            <input type="radio" id="neu_formulieren" value="neu_formulieren" name="mode"
                                   style={{display: 'none'}}/>
                            <RadioButton htmlFor="neu_formulieren">Neu Formulieren</RadioButton>
                        </LeftOptionsContainer>
                        {isPreviewMode ? (
                            <RightOptionsContainer>
                                <BackButton onClick={handleBackFromPreview}>Zurück</BackButton>
                                <PreviewOrAddCardButton onClick={addCardToDeck}>+</PreviewOrAddCardButton>
                            </RightOptionsContainer>
                        ) : (
                            <RightOptionsContainer>
                                <PreviewOrAddCardButton onClick={handlePreview}>Vorschau</PreviewOrAddCardButton>
                            </RightOptionsContainer>
                        )}
                    </>
                ) : (
                    <>
                        <ToggleModeButton onClick={toggleMode}>✒️</ToggleModeButton>
                        <PreviewOrAddCardButton onClick={addCardToDeck}>+</PreviewOrAddCardButton>
                    </>
                )}
            </UpperGeneralOptionsContainer>
            {!isPreviewMode ? (
                <>
                    {isManualMode ? (
                        <FrontAndBackAiOptions/>
                    ) : (
                        <FrontAndBackView FrontText={""} BackText={""}/>
                    )}
                </>
            ) : (
                <FrontAndBackView FrontText={"KI generierter Inhalt"} BackText={"KI generierter Inhalt"}/>
            )}
        </AddCardContainer>
    );
}

export default AddCard;