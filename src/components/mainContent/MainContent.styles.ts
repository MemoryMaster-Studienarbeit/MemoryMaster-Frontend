import styled from 'styled-components';


export const MainContentContainer = styled.div<{ $isSidebarOpen: boolean }>`
    display: flex;
    width: ${( props ) => (props.$isSidebarOpen ? '80vw' : 'calc(100vw - 50px)')};
    flex-direction: column;
    align-items: center;
    transition: width 0.3s ease;
    height: 100%;
    color: ${({ theme }) => theme.text};
    white-space: nowrap;
    overflow: hidden;

    @media (max-width: 768px) {
        width: calc(100vw - 50px);
        margin-left: 50px;
    }
`;
