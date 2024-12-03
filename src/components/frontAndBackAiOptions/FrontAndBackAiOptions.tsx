import React from 'react'

import {
    FrontAndBackAiOptionsContainer,
    FrontTextArea,
    LowerOptionsContainer,
    SelectOptionsContainer,
    PromptExtrasContainer
} from './FrontAndBackAiOptions.styles'
import { SelectOption } from '../selectOption/SelectOption'

export const FrontAndBackAiOptions = () => {
    return (
        <FrontAndBackAiOptionsContainer>
            <FrontTextArea placeholder="Vorderseite"></FrontTextArea>
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
                <PromptExtrasContainer type="text" placeholder="Extras zum Prompt">
                </PromptExtrasContainer>
            </LowerOptionsContainer>
        </FrontAndBackAiOptionsContainer>
    )
}

export default FrontAndBackAiOptions;