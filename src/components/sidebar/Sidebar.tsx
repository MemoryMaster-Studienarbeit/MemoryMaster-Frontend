import { useTheme } from '../../ThemeContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import {
    SidebarContainer,
    ToggleButton,
    BurgerIcon,
    Overlay,
    SettingsContainer,
    LogoutButton,
    DeckList,
    DeckItem,
    AddDeckButton,
    MyDecksTitle, InnerSettingsContainer
} from './Sidebar.styles';
import SearchSidebar from "../searchFieldSidebar/SearchFieldSidebar";
import {SearchSidebarContainer} from "../searchFieldSidebar/SearchFieldSidebar.styles";
import {FC, useState} from "react";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    onSelectDeck: (deck: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar, onSelectDeck }) => {
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
                <div style={{display: "flex", flexDirection: "column",width: "100%", alignItems: "center"}}>
                    {isOpen && (
                        <div style={{display: "flex", flexDirection: "column", width: "90%", justifyContent: "center"}}>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <MyDecksTitle>Decks</MyDecksTitle>
                                <AddDeckButton onClick={handleAddDeck}></AddDeckButton>
                            </div>
                            <SearchSidebarContainer>
                                {isOpen && <SearchSidebar/>}
                            </SearchSidebarContainer>
                        </div>
                    )}
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
                </div>
                <SettingsContainer isOpen={isOpen}>
                    <InnerSettingsContainer>
                        <DarkModeSwitch
                            style={{padding: "10px", width: "40%"}}
                            moonColor={"white"}
                            sunColor={"#faba44"}
                            checked={isDarkMode}
                            onChange={toggleTheme}
                            size={50}

                        />
                    </InnerSettingsContainer>
                </SettingsContainer>
            </SidebarContainer>
            {isOpen && (
                <Overlay onClick={toggleSidebar}/>
            )}
        </>
    );
};

export default Sidebar;
