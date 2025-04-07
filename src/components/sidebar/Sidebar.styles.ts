import styled from 'styled-components';
// @ts-ignore
import plusDark from '../../images/plus-dark.svg';
// @ts-ignore
import plusLight from '../../images/plus-light.svg';
// @ts-ignore
import pluslightgreen from '../../images/plus-lightgreen.svg';
// @ts-ignore
import xDark from '../../images/x-icon-dark.svg';
// @ts-ignore
import xLight from '../../images/x-icon-light.svg';
// @ts-ignore
import warning from '../../images/warning-circle.svg';

export const SidebarContainer = styled.div<{ $isSidebarOpen: boolean }>`
    width: ${(props) => (props.$isSidebarOpen ? '20vw' : '50px')};
    height: 100%;
    transition: width 0.3s ease;
    background-color: ${({ theme }) => theme.quaternaryColor};
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 0;
    margin: 0;
    z-index: 2;

    @media (max-width: 768px) {
        width: ${(props) => (props.$isSidebarOpen ? '75vw' : '50px')};
        position: absolute;  // Position auf absolut setzen, damit sie über dem Content liegt
        z-index: 10;         // Höhere Z-Index, um über dem Hauptinhalt zu sein
        box-shadow: ${(props) => (props.$isSidebarOpen ? '2px 0px 10px rgba(0,0,0,0.3)' : 'none')};  // Schatten hinzufügen, wenn geöffnet
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
    width: 50px;
    height: 50px;
`;

export const BurgerIcon = styled.span`
    font-size: 1.5em;
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
    justify-content: start;
    height: fit-content;
    overflow-y: auto;
    width: calc(100% - 20px);
    padding: 10px;
    margin: 0;
`;

export const AddDeckButton = styled.button`
    border: none;
    border-radius: 5px;
    padding: 0.5em;
    cursor: pointer;
    background: url(${({ theme }) => theme.isLight ? plusDark : plusLight}) no-repeat center center;
    scale: 140%;
    align-items: center;
    justify-content: center;

    &:hover {
        background-image: url("${pluslightgreen}");
        transform: scale(1.5);
        transition: transform 0.2s ease-in-out;
    }
`;

export const MyDecksTitle = styled.h3`
    align-content: center;
    height: 40px;
    margin: 0;
    padding: 0;
    cursor: default;
`;

export const AddDeckContainer = styled.div`
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); // Halbtransparentes Overlay
    z-index: 1; // Muss unter der Sidebar, aber über dem Main Content sein

    @media (max-width: 768px) {
        z-index: 15; 
    }
`;

export const AddDeckForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 200px;
    z-index: 20;
    border-radius: 10px;
    background-color: ${(props) => props.theme.backgroundColor};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const DeckNameInput = styled.input`
    width: calc(100% - 40px);
    padding: 10px;
    margin: 10px;
    border: none;
    background-color: ${({theme}) => theme.secondaryInputColor};
    color: ${({theme}) => theme.text};
    border-radius: 4px;
    font-size: 1em;

    &:focus {
        outline: none;
    }

    &::-webkit-search-cancel-button {
        -webkit-appearance: none;
        height: 20px;
        width: 20px;
        background: url(${({theme}) => theme.isLight ? xDark : xLight}) no-repeat center center;

        &:hover {
            cursor: pointer;
        }
`;

export const ButtonContainer = styled.div`
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const AddDeckHeader = styled.h3`
    text-align: center;
    color: ${({theme}) => theme.text};
    margin: 10px;
    width: 100%;
`;

export const WarningMessage = styled.p`
    height: fit-content;
    margin: 5px
`;

export const WarningIcon = styled.span`
    display: block;
    width: 30px;
    height: 30px;
    background: url(${warning}) no-repeat center center;
    transition: background-color 0.3s ease, background-image 0.3s ease;
    cursor: pointer;
`;

export const WarningContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: red;
    margin: 0;
`;