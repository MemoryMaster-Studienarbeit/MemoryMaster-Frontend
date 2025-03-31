import React from 'react'

import { StyledButton } from './Button.styles'

interface ButtonProps {
    onClick: () => void;
    text: string;
    color?: string;
    width?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({onClick, text, color, width, disabled}) => {
    return (
        <StyledButton onClick={onClick} color={color} width={width} disabled={disabled}>{text}</StyledButton>
    )
}

export default Button;