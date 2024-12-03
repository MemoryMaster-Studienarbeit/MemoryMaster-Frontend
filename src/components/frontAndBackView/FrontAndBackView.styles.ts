import styled from 'styled-components';

export const FrontAndBackViewContainer = styled.div`
    width: calc(100% - 20px);
    height: 100%;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const FrontTextArea = styled.textarea`
    flex: 1;
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
export const BackTextArea = styled.textarea`
    flex: 4;
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
`
