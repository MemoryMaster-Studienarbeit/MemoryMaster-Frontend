import styled from 'styled-components';

interface Props {
    width?: string;
    height?: string;
}

export const Label = styled.label<Props>`
    display: flex;
    border-radius: 5px;
    border: 1px solid gray;
    align-items: center;
    justify-content: center;
    justify-items: center;
    padding: 4px 4px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.primaryInputColor};
    color: ${({ theme }) => theme.text};
    width: ${({ width }) => (width ? `${width}` : '165px')};
    height: ${({ height }) => (height ? `${height}` : 'auto')};
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
    
    &:hover {
        background-color: ${({ theme }) => theme.alternativeSecondaryColor};
    }
    
    @media (max-width: 768px) {
        width: auto;
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
    text-align: center; /* Text zentrieren */

    option {
        background-color: ${({ theme }) => theme.primaryInputColor};
        color: ${({ theme }) => theme.text};
        text-align: center; /* Text in Optionen zentrieren */
    }
`