import styled from 'styled-components';

export const FrontAndBackAiOptionsContainer = styled.div`
    width: calc(100% - 20px);
    height: 100%;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const FrontTextArea = styled.textarea`
    flex: 3;
    align-content: center;
    justify-content: center;
    justify-items: center;
    width: calc(100% - 10px);
    border-radius: 10px;
    border: 2px solid black;
    resize: none;
    font-size: 16px;
    margin: 5px;
    text-align: center;
    border: 2px solid ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.text};

    &::placeholder {
        text-align: center;
    }
`

export const LowerOptionsContainer = styled.div`
    display: flex;
    flex: 1;
    width: calc(100% - 20px);
    height: 100%;
    padding: 10px;
    justify-content: space-between;
    flex-direction: row;
    gap: 10px;
`

export const SelectOptionsContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
`

export const PromptExtrasContainer = styled.input`
    display: flex;
    flex: 2;
    padding: 0;
    justify-content: flex-end;
    gap: 10px;
    align-content: center;
    justify-items: center;
    width: calc(100% - 10px);
    border-radius: 10px;
    resize: none;
    font-size: 16px;
    text-align: center;
    border: 2px solid ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.text};
`