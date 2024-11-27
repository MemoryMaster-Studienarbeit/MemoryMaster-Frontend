import {useNavbar} from '../../ThemeContext';
import {
    SidebarContainer,
    ToggleButton,
    BurgerIcon,
    Overlay,
    DeckList,
    DeckItem,
    AddDeckButton,
    MyDecksTitle
} from './Sidebar.styles';
import SearchSidebar from "../searchFieldSidebar/SearchFieldSidebar";
import {SearchSidebarContainer} from "../searchFieldSidebar/SearchFieldSidebar.styles";
import React, {FC, useEffect, useState} from "react";
import SidebarSettings from "../sidebarSettings/SidebarSettings";

interface SidebarProps {
    onSelectDeck: (deck: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ onSelectDeck }) => {
    const { isSidebarOpen, toggleSidebar } = useNavbar();
    const [decks, setDecks] = useState<string[]>([]); // Liste der Decks
    const [searchItem, setSearchItem] = useState('') // Suchbegriff
    const [selectedDeck, setSelectedDeck] = useState<string | null>(null); // Aktuell ausgewähltes Deck
    const [filteredDecks, setFilteredDecks] = useState<string[]>([]); // Gefilterte Decks

    useEffect(() => {
        if (!isSidebarOpen) setSearchItem('');
        filterDecks();
    }, [decks, searchItem, toggleSidebar])

    const handleAddDeck = () => {
        const newDeckName = prompt('Enter Deck Name:');
        if (!newDeckName) {
            return;
        }
        setDecks([...decks, newDeckName]);
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
            <SidebarContainer $isSidebarOpen={isSidebarOpen}>
                <ToggleButton onClick={toggleSidebar}>
                    <BurgerIcon>☰</BurgerIcon>
                </ToggleButton>
                {isSidebarOpen && (
                    <div style={{display: "flex", flexDirection: "column", width: "100%", alignItems: "center"}}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "90%"
                        }}>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <MyDecksTitle>Decks</MyDecksTitle>
                                <AddDeckButton onClick={handleAddDeck}></AddDeckButton>
                            </div>
                            <SearchSidebarContainer>
                                <SearchSidebar onSearchChange={handleSearch}/>
                            </SearchSidebarContainer>
                        </div>
                        {filteredDecks.length === 0 && searchItem !== ''
                            ? <p>No decks found</p>
                            : <DeckList>
                                {filteredDecks.map((deck, index) => (
                                    <DeckItem
                                        key={index}
                                        onClick={() => handleSelectDeck(deck)}
                                        $isSelected={selectedDeck === deck}
                                    >
                                        {deck}
                                    </DeckItem>
                                ))}
                            </DeckList>
                        }
                    </div>
                )}
                <SidebarSettings />
            </SidebarContainer>
            {isSidebarOpen && (
                <Overlay/>
            )}
        </>
    );
};

export default Sidebar;
