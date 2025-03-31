import React, {FC} from 'react'

import {
    FrontAndBackViewContainer, TextAreaInput
} from './FrontAndBackView.styles'

interface FrontAndBackViewProps {
    FrontText: string;
    BackText: string;
    onFrontTextChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBackTextChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const FrontAndBackView: FC<FrontAndBackViewProps> = ({FrontText, BackText, onFrontTextChange, onBackTextChange}) => {
    return (
        <FrontAndBackViewContainer>
            <TextAreaInput
                placeholder="Vorderseite"
                onChange={(e) => onFrontTextChange(e)}
                width={"80%"}
                height={"40%"}
                defaultValue={FrontText}
            />
            <TextAreaInput
                placeholder="Rückseite"
                onChange={(e) => onBackTextChange(e)}
                width={"80%"}
                height={"40%"}
                defaultValue={BackText}
            />
        </FrontAndBackViewContainer>
    )
}

export default FrontAndBackView;