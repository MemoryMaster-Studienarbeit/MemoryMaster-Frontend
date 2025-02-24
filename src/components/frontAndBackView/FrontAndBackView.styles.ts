import styled from 'styled-components';

export const FrontAndBackViewContainer = styled.div`
    width: 80vw;
    height: 100%;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

interface TextAreaProps {
    width: string,
    height: string //TODO: Change this from flex to height
}

export const TextAreaInput = styled.input<TextAreaProps>`
    align-content: center;
    justify-content: center;
    justify-items: center;
    width: ${props => props.width};
    height: ${props => props.height};
    border-radius: 10px;
    resize: none;
    font-size: 16px;
    margin: 20px;
    text-align: center;
    border: none;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
    background-color: ${({theme}) => theme.primaryInputColor};
    color: ${({theme}) => theme.text};

    &::placeholder {
        text-align: center;
    }
`;