import styled from 'styled-components';

export const Label = styled.label`
    display: flex;
    border-radius: 5px;
    border: 2px solid ${({theme}) => theme.radioButtonBorder};
    align-items: center;
    justify-content: center;
    justify-items: center;
    padding: 4px 4px;
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.text};
`

export const Select = styled.select`
    border: none !important;
    outline: none;
    background: ${({ theme }) => theme.inputBackground};
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 7px 5px 5px;
    font-size: 16px;
    color: ${({ theme }) => theme.text};
    cursor: pointer;
`