import styled from 'styled-components';
// @ts-ignore
import plusDark from '../../images/plus-dark.svg';
// @ts-ignore
import plusLight from '../../images/plus-light.svg';
// @ts-ignore
import pluslightgreen from '../../images/plus-lightgreen.svg';

export const SidebarContainer = styled.div<{ isOpen: boolean }>`
    width: ${({ isOpen }) => (isOpen ? '20vw' : '50px')};
    height: 100%;
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
    margin-bottom: 0.5em;
    padding: 0;
    width: 50px;
`;

export const BurgerIcon = styled.span`
    display: inline-block;
    font-size: 1.5em;
    padding: 0;
    margin: 0;
    width: 30px;
    height: 30px;

    &:hover {
        cursor: pointer;
        color: cadetblue;
        transform: scale(1.2);
        transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
    }

`;

export const DeckList = styled.ul`
    list-style: none;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 90%;
    padding: 10px 0 0;
`;

export const DeckItem = styled.li<{ isSelected: boolean }>`
    padding: 0;
    cursor: pointer;
    color: ${({ isSelected, theme }) =>
            isSelected ? theme.selectedBackground : theme.text};
    margin-bottom: 0.5em;
    border-radius: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        text-decoration: underline;
        transform: translateY(-2px);
        color: cadetblue;
        transition: transform 0.2s ease-in-out;
    }
`;

export const AddDeckButton = styled.button`
    border: none;
    border-radius: 5px;
    padding: 0.5em;
    cursor: pointer;
    background: url(${({ theme }) => theme.isLight ? plusDark : plusLight}) no-repeat center center;
    scale: 140%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto 0 auto 0;

    &:hover {
        background-image: url("${pluslightgreen}");
        transform: scale(1.5);
        transition: transform 0.2s ease-in-out;
    }
`;

export const MyDecksTitle = styled.h3`
    margin: 0.5em 0;
    padding: 0;
    cursor: default;
`;



