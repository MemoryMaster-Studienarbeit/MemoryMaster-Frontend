import styled from 'styled-components';

export const InnerSettingsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    height: 50px;
    width: 50px;

    &:hover {
        transform: scale(1.2);
        transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
    }
    
`;

export const ToggleButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme.text};
    width: 50px;
    height: 50px;
`;

export const SettingsContainer = styled.div<{ $isSidebarOpen: boolean }>`
    display: flex;
    flex-direction: ${(props) => (props.$isSidebarOpen ? 'row' : 'column')};
    align-items: center;
    justify-content: center;
    margin: auto 0 ${({$isSidebarOpen}) => ($isSidebarOpen ? "0" : "10px")};
    gap: ${(props) => (props.$isSidebarOpen ? '20px' : '10px')};
    height: 100px;
    width: 100%;
    color: ${({theme}) => theme.text};
    transition: flex-direction 1.5s;
`;
