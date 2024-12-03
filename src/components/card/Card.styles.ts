import styled from 'styled-components';

export const CardContainer = styled.button`
    width: 90%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin: 10px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    background-color: ${({ theme }) => theme.secondaryColor};
    color: ${({ theme }) => theme.text};
    border: none;

    &:hover {
        transform: scale(1.05);
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
        border: 2px solid ${({ theme }) => theme.text};
    }

    @media (max-width: 768px) {
        width: 75%;
    }
`;