import styled from 'styled-components';

export const AddCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    height: 100%;
    width: calc(100% - 50px);

    @media (max-width: 768px) {
        margin-left: 50px;
    }
`;

export const UpperGeneralOptionsContainer= styled.div`
    display: flex;
    padding: 10px;
    height: fit-content;
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
    padding: 5px 10px;
    margin: 10px;
    width: auto;
    height: 40px;
    font-size: 16px;
    border-radius: 5px;
    align-content: center;
    justify-content: center;
    cursor: pointer;
    box-sizing: border-box;

    &:hover {
        background-color: ${({theme}) => theme.alternativePrimaryColor};
    }

    input[type="radio"]:checked + & {
        background-color: ${({theme}) => theme.alternativeSecondaryColor};
    }
`;

export const RightOptionsContainer = styled.div`
    display: flex;
    padding: 0;
    height: fit-content;
    justify-content: flex-end;
    gap: 10px;
`

export const ToggleModeButton = styled.button`
    background: none;
    border: none;
    margin: 10px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
`
