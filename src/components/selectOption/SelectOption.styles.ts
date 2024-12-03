import styled from 'styled-components';

export const Label = styled.label`
    display: flex;
    border-radius: 5px;
    border: none;
    align-items: center;
    justify-content: center;
    justify-items: center;
    padding: 4px 4px;
    background-color: ${({ theme }) => theme.primaryInputColor};
    color: ${({ theme }) => theme.text};
    width: 16vw;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
    
    &:hover {
        background-color: ${({ theme }) => theme.alternativeSecondaryColor};
    }
    
`

export const Select = styled.select`
    border: none !important;
    outline: none;
    background: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 7px 5px 5px;
    font-size: 16px;
    color: ${({ theme }) => theme.text};
    cursor: pointer;
`