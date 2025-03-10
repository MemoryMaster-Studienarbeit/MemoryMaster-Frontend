import styled from 'styled-components';

interface ButtonProps {
    color?: string;
}

export const StyledButton = styled.button<ButtonProps>`
    background-color: ${({ color, theme }) => color ? theme[color] : theme.primaryButtonColor};
    color: ${({theme}) => theme.text};
    padding: 10px 10px;
    margin: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 120px;
    height: 40px;

    &:hover {
        background-color: ${({theme}) => theme.alternativePrimaryColor};
    }
`;