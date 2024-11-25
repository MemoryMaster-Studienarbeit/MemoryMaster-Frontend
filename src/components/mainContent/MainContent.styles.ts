// MainContent.styles.ts
import styled from 'styled-components';

export const MainContentContainer = styled.div<{ isSidebarOpen: boolean }>`
    display: flex;
    width: ${({ isSidebarOpen }) => (isSidebarOpen ? '80vw' : 'calc(100vw - 50px)')};
    flex-direction: column;
    align-items: center;
    transition: width 0.3s ease;
    height: 100%;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    
    // This is only for directly displaying text in the center of the page
    white-space: nowrap;
    overflow: hidden;

    @media (max-width: 768px) {
        width: calc(100vw - 50px);
        margin-left: 50px;
    }
`;
