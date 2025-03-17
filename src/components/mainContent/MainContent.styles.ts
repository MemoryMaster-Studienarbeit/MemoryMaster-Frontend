import styled from 'styled-components';


export const MainContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: width 0.3s ease;
    height: 100%;
    width: 100%;
    color: ${({ theme }) => theme.text};
    white-space: nowrap;
    overflow: hidden;

    @media (max-width: 768px) {
        width: calc(100vw - 50px);
        margin-left: 50px;
    }
`;
