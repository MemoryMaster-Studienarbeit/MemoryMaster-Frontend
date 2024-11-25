import {useTheme} from '../../ThemeContext';
import {DarkModeSwitch} from 'react-toggle-dark-mode';
import {
    SidebarContainer,
    ToggleButton,
    BurgerIcon,
    Overlay,
    SettingsContainer,
    DeckList,
    DeckItem,
    AddDeckButton,
    MyDecksTitle, InnerSettingsContainer
} from './Sidebar.styles';
import SearchSidebar from "../searchFieldSidebar/SearchFieldSidebar";
import {SearchSidebarContainer} from "../searchFieldSidebar/SearchFieldSidebar.styles";
import React, {FC, useEffect, useState} from "react";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    onSelectDeck: (deck: string) => void;
}

const Sidebar: FC<SidebarProps> = ({isOpen, toggleSidebar, onSelectDeck}) => {
    const {isDarkMode, toggleTheme} = useTheme();
    const [decks, setDecks] = useState<string[]>([]); // Liste der Decks
    const [searchItem, setSearchItem] = useState('') // Suchbegriff
    const [selectedDeck, setSelectedDeck] = useState<string | null>(null); // Aktuell ausgewähltes Deck
    const [filteredDecks, setFilteredDecks] = useState<string[]>([]); // Gefilterte Decks

    useEffect(() => {
        filterDecks();
    }, [decks, searchItem])

    const handleAddDeck = () => {
        const newDeckName = prompt('Enter Deck Name:');
        if (!newDeckName) {
            return;
        }
        setDecks([...decks, newDeckName]); // Neues Deck hinzufügen
        setFilteredDecks([...decks, newDeckName]);
    };

    const filterDecks = () => {
        if (searchItem === '') {
            setFilteredDecks(decks);
            return;
        }
        const filteredDecks = decks.filter(deck => deck.toLowerCase().includes(searchItem));
        setFilteredDecks(filteredDecks);
    }

    const handleSelectDeck = (deck: string) => {
        setSelectedDeck(deck);
        onSelectDeck(deck); // Informiere die Main Content Area über das ausgewählte Deck
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase()
        setSearchItem(searchTerm);
    };

    return (
        <>
            <SidebarContainer isOpen={isOpen}>
                <ToggleButton onClick={toggleSidebar}>
                    <BurgerIcon>☰</BurgerIcon>
                </ToggleButton>
                <div style={{display: "flex", flexDirection: "column", width: "100%", alignItems: "center"}}>
                    {isOpen && (
                        <div style={{display: "flex", flexDirection: "column", width: "90%", justifyContent: "center"}}>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <MyDecksTitle>Decks</MyDecksTitle>
                                <AddDeckButton onClick={handleAddDeck}></AddDeckButton>
                            </div>
                            <SearchSidebarContainer>
                                {isOpen && <SearchSidebar onSearchChange={handleSearch}/>}
                            </SearchSidebarContainer>
                        </div>
                    )}

                    {isOpen && (
                        filteredDecks.length === 0 && searchItem !== ''
                            ? <p>No decks found</p>
                            : <DeckList>
                                {filteredDecks.map((deck, index) => (
                                    <DeckItem
                                        key={index}
                                        onClick={() => handleSelectDeck(deck)}
                                        isSelected={selectedDeck === deck}
                                    >
                                        {deck}
                                    </DeckItem>
                                ))}
                            </DeckList>
                    )}
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
