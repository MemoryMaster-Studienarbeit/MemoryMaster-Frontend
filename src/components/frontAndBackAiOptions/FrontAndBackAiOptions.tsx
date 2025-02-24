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
    onTextChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onStyleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onLengthChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const FrontAndBackAiOptions: React.FC<FrontAndBackAiOptionsProps> = ({onTextChange, onStyleChange, onLengthChange}) => {
    return (
        <FrontAndBackAiOptionsContainer>
            <TextAreaInput
                type="text"
                placeholder="Vorderseite"
                width={"80%"}
                height={"70%"}/>
            <LowerOptionsContainer>
                <SelectOptionsContainer>
                    <SelectOption label={"Stil: "} options={styleOptions} onChange={(event) => onStyleChange(event)} />
                    <SelectOption label={"Länge: "} options={lengthOptions} onChange={(event) => onLengthChange(event)} />
                </SelectOptionsContainer>
                <TextAreaInput type="text" placeholder="Extras zum Prompt" width={"80%"} height={"auto"}></TextAreaInput>
            </LowerOptionsContainer>
        </FrontAndBackAiOptionsContainer>
    )
}

export default FrontAndBackAiOptions;