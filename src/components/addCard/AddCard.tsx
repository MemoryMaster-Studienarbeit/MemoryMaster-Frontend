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
import {useNavigate, useParams} from "react-router-dom";

interface AddCardProps {
    onLoad: (sessionId: string, deckName?: string) => void,
}

const AddCard: React.FC<AddCardProps> = ({onLoad}) => {
    const navigate = useNavigate()
    const {sessionId} = useParams<{ sessionId: string }>();
    const {deckName} = useParams<{ deckName: string }>();
    onLoad(sessionId || "", deckName);
    const [isAiMode, setIsAiMode] = useState(true);
    const [previewData, setPreviewData] = useState<string | null>(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const {isDarkMode} = useTheme();
    const [selectedMode, setSelectedMode] = useState<string>();
    const [selectedStyle, setSelectedStyle] = useState<string>();
    const [selectedLength, setSelectedLength] = useState<string>();

    const [frontText, setFrontText] = useState<string>('');
    const [backText, setBackText] = useState<string>('');

    const [text, setText] = useState<string>('');
    const [fileContent, setFileContent] = useState<File | undefined>(undefined);

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    }

    const handleFileChange = (file: File) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const newFile = new File([event.target.result], file.name, { type: file.type });
                    setFileContent(newFile);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleFrontTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFrontText(event.target.value);
    }

    const handleBackTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBackText(event.target.value);
    }

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMode(event.target.value);
    };

    const handleSytleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStyle(event.target.value);
        console.log("Style:", event.target.value, selectedStyle);
    }

    const handleLengthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLength(event.target.value);
    }

    const toggleMode = () => {
        setIsAiMode(!isAiMode);
        setIsPreviewMode(false);
    }

    // Vorschau laden
    const handlePreview = () => {
        setIsPreviewMode(true);
        console.log("Preview:", selectedMode, selectedStyle, selectedLength, text, fileContent);
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

    const addCardToDeck = () => {
        console.log(JSON.stringify({
            uuid: sessionId,
            deck_name: deckName,
            card_front: frontText,
            card_back: backText
        }))
        fetch(`http://45.81.232.169:8000/api/createCard`, {
            method: "POST",
            body: JSON.stringify({
                uuid: sessionId?.toString(),
                deck_name: deckName?.toString(),
                card_front: frontText,
                card_back: backText
            }),
            headers: {
                "content-type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Card created:", data);
                navigate(`/${sessionId}/${deckName}`);
            })
    }

    const handleBackFromPreview = () => {
        setIsPreviewMode(false);
        setPreviewData(null);
    };

    return (
        <AddCardContainer>
            <UpperGeneralOptionsContainer>
                {isAiMode ? (
                    <>
                        <LeftOptionsContainer>
                            <ToggleModeButton onClick={toggleMode}>
                                <img src={isDarkMode ? robotDark : robotLight} alt="Robot Icon"
                                     style={{width: "30px", height: "30px"}}/>
                            </ToggleModeButton>
                            {!isPreviewMode && (
                                <>
                                    <input type="radio" id="zusammenfassen" value="zusammenfassen" name="mode"
                                           style={{display: 'none'}} onChange={handleRadioChange} defaultChecked/>
                                    <RadioButton htmlFor="zusammenfassen">Zusammenfassen</RadioButton>
                                    <input type="radio" id="neu_formulieren" value="neu_formulieren" name="mode"
                                           style={{display: 'none'}} onChange={handleRadioChange} />
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
                    {isAiMode ? (
                        <FrontAndBackAiOptions onTextChange={handleTextChange} onStyleChange={handleSytleChange} onLengthChange={handleLengthChange}/>
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