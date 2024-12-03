import React from 'react'

import {
    FrontAndBackAiOptionsContainer,
    LowerOptionsContainer,
    SelectOptionsContainer,
} from './FrontAndBackAiOptions.styles'
import { SelectOption } from '../selectOption/SelectOption'
import {TextAreaInput} from "../frontAndBackView/FrontAndBackView.styles";

export const FrontAndBackAiOptions = () => {
    return (
        <FrontAndBackAiOptionsContainer>
            <TextAreaInput type="text" placeholder="Vorderseite" width={"80%"} flex={"3"}></TextAreaInput>
            <LowerOptionsContainer>
                <SelectOptionsContainer>
                    <SelectOption label={"Stil: "} options={[{ value: "einfach", text: "Einfach" },
                        { value: "fortgeschritten", text: "Fortgeschritten" },
                        { value: "professionell", text: "Professionell" },
                        { value: "komplex", text: "Komplex/Technisch" }]} />
                    <SelectOption label={"Länge: "} options={[{ value: "kurz", text: "Kurz und Knapp" },
                                      { value: "normal", text: "Normal" },
                                      { value: "ausführlich", text: "Ausführlich" }]} />
                </SelectOptionsContainer>
                <TextAreaInput type="text" placeholder="Extras zum Prompt" width={"80%"} flex={"2"}></TextAreaInput>
            </LowerOptionsContainer>
        </FrontAndBackAiOptionsContainer>
    )
}

export default FrontAndBackAiOptions;