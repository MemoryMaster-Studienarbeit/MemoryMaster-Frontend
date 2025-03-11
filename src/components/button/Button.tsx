import React from 'react'

import { StyledButton } from './Button.styles'

interface ButtonProps {
    onClick: () => void;
    text: string;
    color?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({onClick, text, color, disabled}) => {
    return (
        <StyledButton onClick={onClick} color={color} disabled={disabled}>{text}</StyledButton>
    )
}

export default Button;