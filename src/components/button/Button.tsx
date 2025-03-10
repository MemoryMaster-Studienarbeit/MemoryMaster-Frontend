import React from 'react'

import { StyledButton } from './Button.styles'

interface ButtonProps {
    onClick: () => void;
    text: string;
    color?: string;
}

const Button: React.FC<ButtonProps> = ({onClick, text, color}) => {
    return (
        <StyledButton onClick={onClick} color={color}>{text}</StyledButton>
    )
}

export default Button;