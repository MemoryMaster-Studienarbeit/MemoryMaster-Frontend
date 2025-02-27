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
    const [frontText, setFrontText] = useState<string>("");
    const [backText, setBackText] = useState<string>("");
    const [selectedMode, setSelectedMode] = useState<string>("zusammenfassen"); // zusammenfassen oder neu formulieren
    const [selectedStyle, setSelectedStyle] = useState<string>("einfach");
    const [selectedLength, setSelectedLength] = useState<string>("kurz");
    const [promptExtras, setPromptExtras] = useState<string>("");
    const [text, setText] = useState<string>('');
    const [fileContent, setFileContent] = useState<File | undefined>(undefined);

    const handleFileChange = (file: File | undefined) => {
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

    const toggleMode = () => {
        setIsAiMode(!isAiMode);
        setIsPreviewMode(false);
        setSelectedStyle("einfach");
        setSelectedLength("kurz");
        setPromptExtras("");
        setText("");
    }

    // Vorschau laden
    const handlePreview = () => {
        setIsPreviewMode(true);
        console.log("Preview:", selectedMode, selectedStyle, selectedLength, promptExtras, text, fileContent);
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
        console.log("Preview:", selectedMode, selectedStyle, selectedLength, promptExtras, text, fileContent);
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
                                           style={{display: 'none'}}
                                           onChange={(e) => setSelectedMode(e.target.value)}
                                           checked={selectedMode==="zusammenfassen"}/>
                                    <RadioButton htmlFor="zusammenfassen">Zusammenfassen</RadioButton>
                                    <input type="radio" id="neu_formulieren" value="neu_formulieren" name="mode"
                                           style={{display: 'none'}}
                                           onChange={(e) => setSelectedMode(e.target.value)}
                                           checked={selectedMode==="neu_formulieren"}/>
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
                        <FrontAndBackAiOptions
                            onTextChange={(e) => setText(e.target.value)}
                            onStyleChange={(e) => setSelectedStyle(e.target.value)}
                            onLengthChange={(e) => setSelectedLength(e.target.value)}
                            onPromptExtrasChange={(e) => setPromptExtras(e.target.value)}
                            onFileChange={handleFileChange}
                            text={text}
                            promptExtras={promptExtras}
                            selectedStyle={selectedStyle}
                            selectedLength={selectedLength}
                        />
                    ) : (
                        <FrontAndBackView
                            onFrontTextChange={(e) => setFrontText(e.target.value)}
                            onBackTextChange={(e) => setBackText(e.target.value)}
                            FrontText={""}
                            BackText={""}
                        />
                    )}
                </>
            ) : (
                <FrontAndBackView
                    onFrontTextChange={(e) => setFrontText(e.target.value)}
                    onBackTextChange={(e) => setBackText(e.target.value)}
                    FrontText={"KI generierter Inhalt"}
                    BackText={"KI generierter Inhalt"}
                />
            )}
        </AddCardContainer>
    );
}

export default AddCard;