import styled from 'styled-components';

export const InnerSettingsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &:hover {
        transform: scale(1.2);
        transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
    }
    
`;

export const SettingsContainer = styled.div<{ $isSidebarOpen: boolean }>`
    display: flex;
    flex-direction: ${(props) => (props.$isSidebarOpen ? 'row' : 'column')};
    align-items: center;
    justify-content: center;
    margin: auto 0 1em;
    height: auto;
    width: 100%;
    color: ${({theme}) => theme.text};
    background-color: ${({theme}) => theme.sidebarBackground};
    transition: flex-direction 1.5s;
`;

export const LogoutButton = styled.button`
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.text};
    padding: 10px;
    display: flex;
    border: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
        font-size: 40px;
    }
`;