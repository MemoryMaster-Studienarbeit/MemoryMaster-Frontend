import { useTheme } from '../../ThemeContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { SidebarContainer, ToggleButton, BurgerIcon, Overlay, SettingsContainer, LogoutButton, DeckList, DeckItem, AddDeckButton } from './Sidebar.styles';
import SearchSidebar from "../searchFieldSidebar/SearchFieldSidebar";
import {SearchSidebarContainer} from "../searchFieldSidebar/SearchFieldSidebar.styles";
import { BiLogOut } from "react-icons/bi";
import {useState} from "react";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    onSelectDeck: (deck: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, onSelectDeck }) => {
    const { isDarkMode, toggleTheme } = useTheme();
    const handleLogout = () => {
        console.log('Logging out...');
        // Weitere Logout-Logik, z. B. API-Aufruf oder Session löschen
    };
    const [decks, setDecks] = useState<string[]>([]); // Liste der Decks
    const [selectedDeck, setSelectedDeck] = useState<string | null>(null); // Aktuell ausgewähltes Deck

    const handleAddDeck = () => {
        const newDeckName = prompt('Enter Deck Name:');
        if (newDeckName) {
            setDecks([...decks, newDeckName]); // Neues Deck hinzufügen
        }
    };

    const handleSelectDeck = (deck: string) => {
        setSelectedDeck(deck);
        onSelectDeck(deck); // Informiere die Main Content Area über das ausgewählte Deck
    };

    return (
        <>
            <SidebarContainer isOpen={isOpen}>
                <ToggleButton onClick={toggleSidebar}>
                    <BurgerIcon>☰</BurgerIcon>
                </ToggleButton>
                <SearchSidebarContainer>
                    {isOpen && <SearchSidebar/>}
                </SearchSidebarContainer>

                <h3>My Decks</h3>
                <DeckList>
                    {decks.map((deck, index) => (
                        <DeckItem
                            key={index}
                            onClick={() => handleSelectDeck(deck)}
                            isSelected={selectedDeck === deck}
                        >
                            {deck}
                        </DeckItem>
                    ))}
                </DeckList>
                <AddDeckButton onClick={handleAddDeck}>+ Add Deck</AddDeckButton>

                <SettingsContainer isOpen={isOpen}>
                    <LogoutButton onClick={handleLogout}>
                        <BiLogOut/>
                    </LogoutButton>
                    <LogoutButton onClick={handleLogout}>
                        <BiLogOut/>
                    </LogoutButton>
                    <DarkModeSwitch
                        style={{padding: "10px"}}
                        moonColor={"white"}
                        sunColor={"#faba44"}
                        checked={isDarkMode}
                        onChange={toggleTheme}
                        size={30}
                    />
                    <DarkModeSwitch
                        style={{padding: "10px"}}
                        moonColor={"white"}
                        sunColor={"#faba44"}
                        checked={isDarkMode}
                        onChange={toggleTheme}
                        size={30}
                    />
                </SettingsContainer>

            </SidebarContainer>

            {isOpen && (
                <Overlay onClick={toggleSidebar}/>
            )}
        </>
    );
};

export default Sidebar;
