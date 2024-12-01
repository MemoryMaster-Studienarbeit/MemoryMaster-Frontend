import styled from 'styled-components';

export const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: min-content;
    gap: 30px;
    justify-items: center;
    padding: 20px;
    width: 90%;
    overflow-y: auto;
    
    flex: 1;
`;

export const Header = styled.h2`
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    width: 100%;
`;

export const StartButton = styled.button`
    background-color: ${({theme}) => theme.buttonBackground};
    color: #fff;
    padding: 10px 20px;
    margin: 20px 0;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({theme}) => theme.buttonHover};
    }
`;

export const MainDeckContainer = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: space-between; 
    width: 100%;
    height: 100%; 
`;