import React, {useState} from 'react';

import {
    AddCardContainer,
    UpperGeneralOptionsContainer,
    LeftOptionsContainer,
    RadioButton,
    RightOptionsContainer,
    ToggleModeButton,
} from './AddCard.styles';
import FrontAndBackView from "../frontAndBackView/FrontAndBackView";
import FrontAndBackAiOptions from "../frontAndBackAiOptions/FrontAndBackAiOptions";
import Button from "../button/Button";
import {useTheme} from "../../ThemeContext";
// @ts-ignore
import penFillDark from '../../images/pen-fill-dark.svg';
// @ts-ignore
import penFillLight from '../../images/pen-fill-light.svg';
// @ts-ignore
import robotDark from '../../images/robot-dark.svg';
// @ts-ignore
import robotLight from '../../images/robot-light.svg';

const AddCard: React.FC = () => {
    const [isManualMode, setIsManualMode] = useState(true);
    const [previewData, setPreviewData] = useState<string | null>(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const {isDarkMode} = useTheme();

    const toggleMode = () => {
        setIsManualMode(!isManualMode);
        setIsPreviewMode(false);
    }

    // Vorschau laden
    const handlePreview = async () => {
        setIsPreviewMode(true);
        // try {
        //     const response = await fetch("/api/generate-card", {
        //         method: "POST",
        //         headers: {"Content-Type": "application/json"},
        //         body: JSON.stringify({prompt: "Dein Prompt hier"}),
        //     });
        //
        //     if (response.ok) {
        //         const data = await response.json();
        //         setPreviewData(data.content); // KI-generierter Inhalt
        //     } else {
        //         console.error("Fehler beim Abrufen der Vorschau.");
        //     }
        // } catch (error) {
        //     console.error("Fehler:", error);
        // }
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
                            <ToggleModeButton onClick={toggleMode}>
                                <img src={isDarkMode ? robotDark : robotLight} alt="Robot Icon"
                                     style={{width: "30px", height: "30px"}}/>
                            </ToggleModeButton>
                            {!isPreviewMode && (
                                <>
                                    <input type="radio" id="zusammenfassen" value="zusammenfassen" name="mode"
                                           style={{display: 'none'}}/>
                                    <RadioButton htmlFor="zusammenfassen">Zusammenfassen</RadioButton>
                                    <input type="radio" id="neu_formulieren" value="neu_formulieren" name="mode"
                                           style={{display: 'none'}}/>
                                    <RadioButton htmlFor="neu_formulieren">Neu Formulieren</RadioButton>
                                </>
                            )}
                        </LeftOptionsContainer>
                        {isPreviewMode ? (
                            <RightOptionsContainer>
                                <Button onClick={handleBackFromPreview} text={"Zurück"}/>
                                <Button onClick={addCardToDeck} text={"+"}/>
                            </RightOptionsContainer>
                        ) : (
                            <RightOptionsContainer>
                                <Button onClick={handlePreview} text={"Vorschau"}/>
                            </RightOptionsContainer>
                        )}
                    </>
                ) : (
                    <>
                        <ToggleModeButton onClick={toggleMode}>
                            <img src={isDarkMode ? penFillDark : penFillLight} alt="Pen Icon"
                                 style={{width: "25px", height: "25px"}}/>
                        </ToggleModeButton>
                        <Button onClick={addCardToDeck} text={"+"}/>
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