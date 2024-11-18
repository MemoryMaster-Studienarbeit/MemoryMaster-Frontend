import styled from 'styled-components';

export const SidebarContainer = styled.div<{ isOpen: boolean }>`
    width: ${({ isOpen }) => (isOpen ? '20vw' : '50px')};
    height: 100vh;
    transition: width 0.3s ease;
    background-color: ${({ theme }) => theme.sidebarBackground};
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    align-items: start;

    @media (max-width: 768px) {
        width: ${({ isOpen }) => (isOpen ? '75vw' : '50px')};
        position: absolute;  // Position auf absolut setzen, damit sie über dem Content liegt
        z-index: 10;         // Höhere Z-Index, um über dem Hauptinhalt zu sein
        box-shadow: ${({ isOpen }) => (isOpen ? '2px 0px 10px rgba(0,0,0,0.3)' : 'none')};  // Schatten hinzufügen, wenn geöffnet
    }
`;

export const Overlay = styled.div`
  // Nur auf kleinen Bildschirmen anzeigen
  @media (max-width: 768px) {
    display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); // Halbtransparentes Overlay
      z-index: 5; // Muss unter der Sidebar, aber über dem Main Content sein
  }
`;

export const ToggleButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5em;
    color: ${({ theme }) => theme.text};
    margin-bottom: 1em;
    width: 50px;
`;

export const BurgerIcon = styled.span`
    display: inline-block;
    font-size: 1.5em;
    padding: 0;
`;

export const SettingsContainer = styled.div<{ isOpen: boolean }>`
    display: flex;
    flex-direction: ${({isOpen}) => (isOpen ? 'row' : 'column')};
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
        font-size: 30px;
    }
`;



