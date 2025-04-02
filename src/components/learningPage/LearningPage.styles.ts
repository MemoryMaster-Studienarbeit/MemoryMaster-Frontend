import styled from "styled-components";

export const LearningPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: ${({theme}) => theme.cardBackground};
    border-radius: 10px;
    box-shadow: 0 0 10px ${({theme}) => theme.shadow};
    
    @media (max-width: 768px) {
        width: calc(100vw - 50px);
        margin-left: 50px;
    }
`;

export const LearningPageHeader = styled.h2`
    text-align: center;
    font-size: 24px;
    color: ${({theme}) => theme.text};
    margin-bottom: 20px;
    width: 100%;
`;

export const LearningPageBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 20px;
`;

export const CardBackContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 80%;
    height: 70%;
    border-radius: 10px;
    background-color: ${({theme}) => theme.secondaryInputColor};
    border: 1px solid ${({theme}) => theme.text};
`;

export const CardBack = styled.p`
    color: ${({theme}) => theme.text};
    text-align: center;
`;

export const CardFrontContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: ${({theme}) => theme.secondaryInputColor};
    border: 1px solid ${({theme}) => theme.text};
    width: 80%;
`;
export const CardFront = styled.h3`
    color: ${({theme}) => theme.text};
    text-align: center;
`;

export const LearningPageFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 80%;
    
`;