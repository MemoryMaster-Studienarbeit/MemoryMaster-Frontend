import React, {FC} from 'react'

import {
    FrontAndBackViewContainer, TextAreaInput
} from './FrontAndBackView.styles'

interface FrontAndBackViewProps {
    FrontText: string;
    BackText: string;
}
// TODO: Fix this so the values are being retrieved right (Doing value = {...} just sets the value)
export const FrontAndBackView: FC<FrontAndBackViewProps> = ({FrontText, BackText}) =>{
    return (
        <FrontAndBackViewContainer>
            <TextAreaInput type="text" placeholder="Vorderseite" width={"80%"} flex={"2"}></TextAreaInput>
            <TextAreaInput type="text" placeholder="Rückseite" width={"80%"} flex={"2"}></TextAreaInput>
        </FrontAndBackViewContainer>
    )
}

export default FrontAndBackView;