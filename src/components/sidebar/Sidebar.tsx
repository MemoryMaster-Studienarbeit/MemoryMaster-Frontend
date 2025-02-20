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
import React, {FC, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import SidebarSettings from "../sidebarSettings/SidebarSettings";

interface SidebarProps {
    sessionId: string;
    selectedDeckName: string;
}

const Sidebar: FC<SidebarProps> = ({ sessionId, selectedDeckName }) => {
    const navigate = useNavigate();
    const { isSidebarOpen, toggleSidebar } = useNavbar();
    const [decks, setDecks] = useState<string[]>([]); // Liste der Decks
    const [searchItem, setSearchItem] = useState('') // Suchbegriff
    const [filteredDecks, setFilteredDecks] = useState<string[]>([]); // Gefilterte Decks

    useEffect(() => {
        if (sessionId === 'uuid' || !isSidebarOpen) return;
        if (!isSidebarOpen) setSearchItem('');
        fetchDecks();
    }, [isSidebarOpen, toggleSidebar]);

    useEffect(() => {
        if (!isSidebarOpen) setSearchItem('');
        filterDecks();
    }, [searchItem]);

    const fetchDecks = async () => {
        await fetch(`http://45.81.232.169:8000/api/decks?uuid=${sessionId}`)
            .then(response => response.text())
            .then(responseText => {
                const data = responseText.startsWith('{') || responseText.startsWith('[') ? JSON.parse(responseText) : [];
                if (data === '"No decks found for the given session_id"') {
                    return;
                }
                const deckNames = data.map((deck: { deck_name: string }) => deck.deck_name);
                setDecks(deckNames);
                setFilteredDecks(deckNames);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };

    const handleAddDeck = async () => {
        const newDeckName = prompt('Enter Deck Name:');
        if (!newDeckName) {
            return;
        }
        const addDeck = async () => {
            await fetch(`http://45.81.232.169:8000/api/deck?uuid=${sessionId}&deck_name=${newDeckName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.text())
                .then(responseText => {
                    if (responseText === '"Deck already exists"') {
                        alert('Deck already exists');
                        return;
                    }
                    setDecks([...decks, newDeckName]);
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        }
        await addDeck();
        fetchDecks();
    };

    const filterDecks = () => {
        if (searchItem === '') {
            setFilteredDecks(decks);
            return;
        }
        const filteredDecks = decks.filter(deck => deck.toLowerCase().includes(searchItem));
        setFilteredDecks(filteredDecks);
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase()
        setSearchItem(searchTerm)
    };

    return (
        <>
            <SidebarContainer $isSidebarOpen={isSidebarOpen}>
                <ToggleButton onClick={toggleSidebar}>
                    <BurgerIcon>☰</BurgerIcon>
                </ToggleButton>
                {isSidebarOpen && (
                    <>
                        <div style={{ width: "calc(100% - 20px)", padding: "10px" }}>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "10px"}}>
                                <MyDecksTitle>Decks</MyDecksTitle>
                                <AddDeckButton onClick={handleAddDeck}></AddDeckButton>
                            </div>
                            <SearchSidebar onSearchChange={handleSearch}/>
                        </div>
                        {filteredDecks.length === 0 && searchItem !== ''
                            ? <p>No decks found</p>
                            : <DeckList>
                                {filteredDecks.map((deck, index) => (
                                    <DeckItem
                                        key={index}
                                        onClick={() => {
                                            navigate(`/${sessionId}/${deck}`);
                                        }}
                                        $isSelected={selectedDeckName === deck}
                                    >
                                        {deck}
                                    </DeckItem>
                                ))}
                            </DeckList>
                        }
                    </>
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
