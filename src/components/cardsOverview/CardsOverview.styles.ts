import styled from 'styled-components';

export const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: min-content;
    gap: 30px;
    justify-items: center;
    padding: 20px;
    width: calc(100% - 40px);
    overflow-y: auto;
    
    flex: 1;
`;

export const Header = styled.h2`
    text-align: center;
    font-size: 24px;
    color: ${({theme}) => theme.text};
    margin-bottom: 20px;
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const NoCards = styled.p`
    color: ${({theme}) => theme.text};
    font-size: 20px;
    width: 60%;
    padding: 10px;
`;

export const MainDeckContainer = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: space-between; 
    width: 100%;
    height: 100%;

    @media (max-width: 768px) {
        width: calc(100vw - 50px);
        margin-left: 50px;
    }
`;