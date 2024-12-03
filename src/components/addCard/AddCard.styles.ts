import styled from 'styled-components';

export const AddCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    height: 100%;
    width: calc(100% - 10px);
`;

export const UpperGeneralOptionsContainer= styled.div`
    display: flex;
    padding: 10px;
    min-height: 45px;
    justify-content: space-between;
    width: calc(100% - 20px);
`
export const LeftOptionsContainer = styled.div`
    display: flex;
    padding: 0;
    justify-content: flex-start;
    align-content: center;
    gap: 10px;
`

export const RadioButton = styled.label`
    color: ${({theme}) => theme.text};
    padding: 10px 10px;
    font-size: 16px;
    border-radius: 5px;
    align-content: center;
    justify-content: center;
    cursor: pointer;
    box-sizing: border-box;

    &:hover {
        border: 2px solid ${({theme}) => theme.radioButtonBorder};
    }

    input[type="radio"]:checked + & {
        border: 2px solid ${({theme}) => theme.radioButtonBorder};
    }
`;

export const RightOptionsContainer = styled.div`
    display: flex;
    padding: 0;
    justify-content: flex-end;
    gap: 10px;
`

export const PreviewOrAddCardButton = styled.button`
    background-color: ${({theme}) => theme.buttonBackground};
    color: #fff;
    width: 100px;
    padding: 10px 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({theme}) => theme.buttonHover};
    }
`;

export const ToggleModeButton = styled.button`
    border-radius: 5px;
    font-size: 20px;
    border: 2px solid ${({theme}) => theme.radioButtonBorder};
    background-color: ${({theme}) => theme.background};
    padding: 5px 10px;
    cursor: pointer;
`

export const BackButton = styled.button`
    border-radius: 5px;
    font-size: 16px;
    color: ${({theme}) => theme.text};
    border: 2px solid ${({theme}) => theme.radioButtonBorder};
    background-color: ${({theme}) => theme.background};
    padding: 5px 10px;
    cursor: pointer; 
`