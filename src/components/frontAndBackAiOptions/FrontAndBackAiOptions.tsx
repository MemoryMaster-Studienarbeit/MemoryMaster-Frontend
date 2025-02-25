import React from 'react'

import {
    FrontAndBackAiOptionsContainer,
    LowerOptionsContainer,
    SelectOptionsContainer,
} from './FrontAndBackAiOptions.styles'
import { SelectOption } from '../selectOption/SelectOption'
import { styleOptions } from '../../constants/SelectOptions/StyleOptions';
import { lengthOptions } from '../../constants/SelectOptions/LengthOptions';
import { FileUploader } from 'react-drag-drop-files';
import {TextAreaInput} from "../frontAndBackView/FrontAndBackView.styles";

interface FrontAndBackAiOptionsProps {
    onTextChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onStyleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onLengthChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onPromptExtrasChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
    text: string;
    promptExtras: string;
    selectedStyle: string;
    selectedLength: string;
}

export const FrontAndBackAiOptions: React.FC<FrontAndBackAiOptionsProps> = ({onTextChange, onStyleChange, onLengthChange, onPromptExtrasChange, text, promptExtras, selectedStyle, selectedLength}) => {
    return (
        <FrontAndBackAiOptionsContainer>
            <TextAreaInput
                placeholder="Worüber soll eine Karteikarte erstellt werden?"
                onChange={e => onTextChange(e)}
                width={"80%"}
                height={"70%"}
                defaultValue={text}
            />
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