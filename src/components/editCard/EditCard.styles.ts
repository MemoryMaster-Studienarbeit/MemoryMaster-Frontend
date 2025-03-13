import styled from "styled-components";

export const EditCardContainer = styled.div`
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