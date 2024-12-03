import React from 'react'

import { StyledButton } from './Button.styles'

interface ButtonProps {
    onClick: () => void;
    text: string;
}

const Button: React.FC<ButtonProps> = ({onClick, text}) => {
    return (
        <StyledButton onClick={onClick}>{text}</StyledButton>
    )
}

export default Button;