import React, {useEffect, useState} from 'react';

import {
    AddCardContainer,
    UpperGeneralOptionsContainer,
    LeftOptionsContainer,
    RightOptionsContainer,
    ToggleModeButton,
} from './AddCard.styles';
import FrontAndBackView from "../frontAndBackView/FrontAndBackView";
import FrontAndBackAiOptions from "../frontAndBackAiOptions/FrontAndBackAiOptions";
import Button from "../button/Button";
import Spinner from "../spinner/Spinner";
import { aiModels } from '../../constants/SelectOptions/aiModels';
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
import SelectOption from "../selectOption/SelectOption";

interface AddCardProps {
    onLoad: (sessionId: string, deckName?: string) => void,
}

const AddCard: React.FC<AddCardProps> = ({onLoad}) => {
    const navigate = useNavigate()
    const {sessionId} = useParams<{ sessionId: string }>();
    const {deckName} = useParams<{ deckName: string }>();
    onLoad(sessionId || "", deckName);
    const [isAiMode, setIsAiMode] = useState(true);
    const [previewCard, setPreviewCard] = useState<string | null>(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const {isDarkMode} = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [frontText, setFrontText] = useState<string>("");
    const [backText, setBackText] = useState<string>("");
    const [selectedMode, setSelectedMode] = useState<string>("zusammenfassen"); // zusammenfassen oder neu formulieren
    const [selectedModel, setSelectedModel] = useState<string>("llama3-8b-8192");
    const [selectedStyle, setSelectedStyle] = useState<string>("einfach");
    const [selectedLength, setSelectedLength] = useState<string>("kurz");
    const [promptExtras, setPromptExtras] = useState<string>("");
    const [text, setText] = useState<string>('');
    const [fileContent, setFileContent] = useState<File | undefined>(undefined);
    const [fileType, setFileType] = useState<string>("");

    useEffect(() => {

    }, []);

    const handleFileChange = (file: File | undefined) => {
        if (file) {
            setFileType(file.type)
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const base64String = btoa(String.fromCharCode(...new Uint8Array(event.target.result as ArrayBuffer)));
                    const newFile = new File([base64String], file.name, { type: file.type });
                    setFileContent(newFile);
                }
            };
            reader.readAsArrayBuffer(file);
        } else {
            setFileContent(undefined);
            setFrontText("");
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

    const PromptExtras = () => {
        const mode = selectedMode === "zusammenfassen" ? "zusammenfassen" : "neu formulieren";
        return `Bitte tu mir das ${mode}. Der Text soll ${selectedLength} und ${selectedStyle} sein. Zusätzliche Infos zum Prompt: ${promptExtras}`;
    }

    // Vorschau laden
    const handlePreview = async () => {
        console.log("Preview:", selectedMode, selectedStyle, selectedLength, promptExtras, text, fileContent);
        setIsLoading(true);
        await generateCard()
        setIsLoading(false);
        setIsPreviewMode(true);
    };

    const generateCard = async () => {
        const appendingPrompt = PromptExtras();
        console.log(JSON.stringify({
            text: text,
            appending_prompt_template: appendingPrompt,
            ai_model: "",
            file: {
                file_type: fileType,
                file_content: fileContent ? await fileContent.text() : ""
            }
        }))
        await fetch(`http://45.81.232.169:8000/api/generateCard?session_uuid=${sessionId}&deck_name=${deckName}`, {
            method: "POST",
            body: JSON.stringify({
                text: text,
                appending_prompt_template: appendingPrompt,
                ai_model: "",
                file: {
                    file_type: fileType,
                    file_content: fileContent ? await fileContent.text() : ""
                }
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Card created:", data);
                setPreviewCard(data.card_uuid);
                setFrontText(data.card_front)
                setBackText(data.card_back)
            })

    }

    const addCardToDeck = async () => {
        console.log(JSON.stringify({
            uuid: sessionId,
            deck_name: deckName,
            card_front: frontText,
            card_back: backText
        }))
        if (!previewCard) {
            await fetch(`http://45.81.232.169:8000/api/createCard?session_uuid=${sessionId}&deck_name=${deckName}`, {
                method: "POST",
                body: JSON.stringify({
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
                })
        }
        navigate(`/${sessionId}/${deckName}`);
    }

    const handleBackFromPreview = async () => {
        setIsPreviewMode(false);
        await fetch(`http://45.81.232.169:8000/api/card?session_uuid=${sessionId}&deck_name=${deckName}&card_uuid=${previewCard}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data, ": ", previewCard);
            })
        setPreviewCard(null);
    };

    return (
        <>
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
                                    <SelectOption
                                        label={"AI Model: "}
                                        options={aiModels}
                                        onChange={(e) => setSelectedModel(e.target.value)}
                                        selectedOption={selectedModel}
                                        width={"250px"}
                                        height={"40px"}
                                    />
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
                        FrontText={frontText}
                        BackText={backText}
                    />
                )}
            </AddCardContainer>
            {isLoading? <Spinner/> : ""}
        </>
    );
}

export default AddCard;