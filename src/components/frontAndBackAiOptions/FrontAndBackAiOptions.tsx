import React from 'react'

import {
    FrontAndBackAiOptionsContainer,
    LowerOptionsContainer,
    SelectOptionsContainer,
} from './FrontAndBackAiOptions.styles'
import { SelectOption } from '../selectOption/SelectOption'
import { styleOptions } from '../../constants/SelectOptions/StyleOptions';
import { lengthOptions } from '../../constants/SelectOptions/LengthOptions';
import {TextAreaInput} from "../frontAndBackView/FrontAndBackView.styles";

interface FrontAndBackAiOptionsProps {
    onStyleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onLengthChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const FrontAndBackAiOptions: React.FC<FrontAndBackAiOptionsProps> = ({onStyleChange, onLengthChange}) => {
    return (
        <FrontAndBackAiOptionsContainer>
            <TextAreaInput type="text" placeholder="Vorderseite" width={"80%"} flex={"3"}></TextAreaInput>
            <LowerOptionsContainer>
                <SelectOptionsContainer>
                    <SelectOption label={"Stil: "} options={styleOptions} onChange={(event) => onStyleChange(event)} />
                    <SelectOption label={"Länge: "} options={lengthOptions} onChange={(event) => onLengthChange(event)} />
                </SelectOptionsContainer>
                <TextAreaInput type="text" placeholder="Extras zum Prompt" width={"80%"} flex={"2"}></TextAreaInput>
            </LowerOptionsContainer>
        </FrontAndBackAiOptionsContainer>
    )
}

export default FrontAndBackAiOptions;