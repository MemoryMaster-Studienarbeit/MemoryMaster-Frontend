import React, {useState} from 'react'

import {
    FileInputLabel,
    FileListContainer,
    FileListItem,
    FileItemDeleteButton,
    FrontAndBackAiOptionsContainer,
    InteractButtonContainer,
    LowerOptionsContainer,
    SelectOptionsContainer,
} from './FrontAndBackAiOptions.styles'
import {SelectOption} from '../selectOption/SelectOption'
import {styleOptions} from '../../constants/SelectOptions/StyleOptions';
import {lengthOptions} from '../../constants/SelectOptions/LengthOptions';
import {FileUploader} from 'react-drag-drop-files';
import {TextAreaInput} from "../frontAndBackView/FrontAndBackView.styles";

interface FrontAndBackAiOptionsProps {
    onTextChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onStyleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onLengthChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onPromptExtrasChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onFileChange: (file: File | undefined) => void;
    text: string;
    promptExtras: string;
    selectedStyle: string;
    selectedLength: string;
}

export const FrontAndBackAiOptions: React.FC<FrontAndBackAiOptionsProps> = ({
                                                                                onTextChange,
                                                                                onStyleChange,
                                                                                onLengthChange,
                                                                                onPromptExtrasChange,
                                                                                onFileChange,
                                                                                text,
                                                                                promptExtras,
                                                                                selectedStyle,
                                                                                selectedLength
                                                                            }) => {
    const [fileContents, setFileContents] = useState<File[]>([]);

    return (
        <FrontAndBackAiOptionsContainer>
            <TextAreaInput
                placeholder="Worüber soll eine Karteikarte erstellt werden?"
                onChange={e => onTextChange(e)}
                width={"80%"}
                height={"70%"}
                defaultValue={text}
            />
            <InteractButtonContainer>
                <FileUploader
                    handleChange={(file: File) => {
                        const maxFiles = 1;
                        if (file && fileContents.length < maxFiles) {
                            onFileChange(file);
                            setFileContents([...fileContents, file]);
                        } else if (fileContents.length === maxFiles) {
                            onFileChange(file);
                            setFileContents([file]);
                        }
                    }}
                    name="file" types={['txt', 'pdf', 'png', 'jpeg', 'jpg']}
                >
                    <FileInputLabel htmlFor="file-input"/>
                </FileUploader>
                {fileContents.length > 0 && (
                    <FileListContainer>
                        {fileContents.map((file, index) => (
                            <FileListItem key={index} files={fileContents.length}>
                                <span>{file.name}</span>
                                <FileItemDeleteButton onClick={() => {
                                    const newFileContents = fileContents.filter((_, i) => i !== index);
                                    setFileContents(newFileContents);
                                    onFileChange(newFileContents.length > 0 ? newFileContents[0] : undefined);
                                }}
                                >X</FileItemDeleteButton>
                            </FileListItem>
                        ))}
                    </FileListContainer>
                )}
            </InteractButtonContainer>
            <LowerOptionsContainer>
                <SelectOptionsContainer>
                    <SelectOption
                        label={"Stil: "}
                        options={styleOptions}
                        onChange={(e) => onStyleChange(e)}
                        selectedOption={selectedStyle}
                    />
                    <SelectOption
                        label={"Länge: "}
                        options={lengthOptions}
                        onChange={(e) => onLengthChange(e)}
                        selectedOption={selectedLength}
                    />
                </SelectOptionsContainer>
                <TextAreaInput
                    placeholder="Extras zum Prompt"
                    onChange={e => onPromptExtrasChange(e)}
                    width={"80%"}
                    height={"auto"}
                    defaultValue={promptExtras}
                />
            </LowerOptionsContainer>
        </FrontAndBackAiOptionsContainer>
    )
}

export default FrontAndBackAiOptions;