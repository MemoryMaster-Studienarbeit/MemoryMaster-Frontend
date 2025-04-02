import {useNavbar} from '../../ThemeContext';
import {
    SidebarContainer,
    ToggleButton,
    BurgerIcon,
    Overlay,
    DeckList,
    AddDeckButton,
    MyDecksTitle,
    AddDeckContainer,
    AddDeckForm,
    DeckNameInput,
    ButtonContainer,
    AddDeckHeader,
    WarningContainer,
    WarningIcon, WarningMessage
} from './Sidebar.styles';
import SearchSidebar from "../searchFieldSidebar/SearchFieldSidebar";
import React, {FC, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import SidebarSettings from "../sidebarSettings/SidebarSettings";
import DeckItem from "../deckItem/DeckItem";
import Button from "../button/Button";

interface SidebarProps {
    sessionId: string;
    selectedDeckName: string;
}

const Sidebar: FC<SidebarProps> = ({ sessionId, selectedDeckName }) => {
    const navigate = useNavigate();
    const { isSidebarOpen, toggleSidebar } = useNavbar();
    const [openAddDeck, setOpenAddDeck] = useState(false);
    const [decks, setDecks] = useState<string[]>([]);
    const [searchItem, setSearchItem] = useState('')
    const [filteredDecks, setFilteredDecks] = useState<string[]>([]);
    const [newDeckName, setNewDeckName] = useState('');
    const [isWarning, setIsWarning] = useState(false);

    useEffect(() => {
        if (sessionId === 'uuid' || !isSidebarOpen) return;
        if (!isSidebarOpen) setSearchItem('');
        fetchDecks();
    }, [isSidebarOpen, toggleSidebar]);

    useEffect(() => {
        if (!isSidebarOpen) setSearchItem('');
        filterDecks();
    }, [searchItem]);

    const handleDeckNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setNewDeckName(name);
        setIsWarning(decks.includes(name));
    };

    const fetchDecks = async () => {
        await fetch(`http://45.81.232.169:8000/api/decks?session_uuid=${sessionId}`)
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
    };

    const handleAddDeck = async () => {
        setOpenAddDeck(false)
        if (newDeckName === '') {
            return;
        }
        const addDeck = async () => {
            await fetch(`http://45.81.232.169:8000/api/deck?session_uuid=${sessionId}&deck_name=${newDeckName}`, {
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
        setNewDeckName('');
    }

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

    const handleDeleteDeck = async (deckName: string) => {
        console.log(deckName);
        const deleteDeck = async () => {
            await fetch(`http://45.81.232.169:8000/api/deck?session_uuid=${sessionId}&deck_name=${deckName}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.text())
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        }
        await deleteDeck();
        fetchDecks()
        navigate(`/${sessionId}`);
    }

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
                                <AddDeckButton onClick={() => setOpenAddDeck(true)}></AddDeckButton>
                            </div>
                            <SearchSidebar onSearchChange={handleSearch}/>
                        </div>
                        {filteredDecks.length === 0 && searchItem !== ''
                            ? <p style={{margin: '10px'}}>No decks found</p>
                            : <DeckList>
                                {filteredDecks.map((deck, index) => (
                                    <DeckItem
                                        key={index}
                                        deckKey={index}
                                        onClick={() => {
                                            navigate(`/${sessionId}/${deck}`);
                                        }}
                                        onDelete={(deckName) => handleDeleteDeck(deckName)}
                                        isSelected={selectedDeckName === deck}
                                        deckName={deck}
                                    />
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
            {openAddDeck && ( //TODO: warnung bei gleichem Decknamen
                <AddDeckContainer>
                    <AddDeckForm>
                        <>
                            <AddDeckHeader>Add a new Deck</AddDeckHeader>
                            <DeckNameInput placeholder="Deck name" id="newDeckName" value={newDeckName} onChange={handleDeckNameChange} />
                        </>
                        {isWarning && (
                            <WarningContainer>
                                <WarningIcon/>
                                <WarningMessage>This deckname is already in use!</WarningMessage>
                            </WarningContainer>
                        )}
                        <ButtonContainer>
                            <Button onClick={() => {setOpenAddDeck(false); setNewDeckName(''); setIsWarning(false)}} text={"Cancel"} />
                            <Button onClick={() => handleAddDeck()} text={"Add deck"} color={"alternativeSecondaryColor"} disabled={isWarning} />
                        </ButtonContainer>
                    </AddDeckForm>
                </AddDeckContainer>
            )}
        </>
    );
};

export default Sidebar;
