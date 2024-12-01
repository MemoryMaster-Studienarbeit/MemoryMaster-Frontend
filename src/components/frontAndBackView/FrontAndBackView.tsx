import React, {FC} from 'react'

import {
    FrontAndBackViewContainer,
    FrontTextArea,
    BackTextArea
} from './FrontAndBackView.styles'

interface FrontAndBackViewProps {
    FrontText: string;
    BackText: string;
}

export const FrontAndBackView: FC<FrontAndBackViewProps> = ({FrontText, BackText}) =>{
    return (
        <FrontAndBackViewContainer>
            <FrontTextArea placeholder="Vorderseite" value={FrontText || ""}></FrontTextArea>
            <BackTextArea placeholder="Rückseite" value={BackText || ""}></BackTextArea>
        </FrontAndBackViewContainer>
    )
}

export default FrontAndBackView;