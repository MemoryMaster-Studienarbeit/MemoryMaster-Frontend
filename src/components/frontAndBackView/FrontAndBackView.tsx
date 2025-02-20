import React, {FC} from 'react'

import {
    FrontAndBackViewContainer, TextAreaInput
} from './FrontAndBackView.styles'

interface FrontAndBackViewProps {
    FrontText: string;
    BackText: string;
}

export const FrontAndBackView: FC<FrontAndBackViewProps> = ({FrontText, BackText}) => {
    return (
        <FrontAndBackViewContainer>
            {(FrontText !== '' && BackText !== '') ? (
                <>
                    <TextAreaInput id={"FrontText"} type="text" placeholder="Vorderseite" width={"80%"} flex={"2"}
                                   value={FrontText}></TextAreaInput>
                    <TextAreaInput type="text" placeholder="Rückseite" width={"80%"} flex={"2"}
                                   value={BackText}></TextAreaInput>
                </>
            ) : (
                <>
                    <TextAreaInput id={"FrontText"} type="text" placeholder="Vorderseite" width={"80%"} flex={"2"}></TextAreaInput>
                    <TextAreaInput type="text" placeholder="Rückseite" width={"80%"} flex={"2"}></TextAreaInput>
                </>
            )}
        </FrontAndBackViewContainer>
    )
}

export default FrontAndBackView;