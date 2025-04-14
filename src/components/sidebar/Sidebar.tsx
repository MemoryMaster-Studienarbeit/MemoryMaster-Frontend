import {useNavbar, useTheme} from '../../ThemeContext';
import {
    SidebarContainer,
    ToggleButton,
    BurgerIcon,
    Overlay,
    DeckList,
    AddDeckButton,
    MyDecksTitle,
    AppTitle,
    AddDeckContainer,
    AddDeckForm,
    DeckNameInput,
    ButtonContainer,
    AddDeckHeader,
    WarningContainer,
    WarningIcon, WarningMessage, TopContainer, HelpPage, OpenHelpContainer
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
    const { isDarkMode } = useTheme();
    const { isSidebarOpen, toggleSidebar } = useNavbar();
    const [openAddDeck, setOpenAddDeck] = useState(false);
    const [openHelp, setOpenHelp] = useState(false);
    const [isGerman, setIsGerman] = useState(false);
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
        await fetch(`https://memorymaster.melonigemelone.de/api/decks?session_uuid=${sessionId}`)
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
            await fetch(`https://memorymaster.melonigemelone.de/api/deck?session_uuid=${sessionId}&deck_name=${newDeckName}`, {
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
            await fetch(`https://memorymaster.melonigemelone.de/api/deck?session_uuid=${sessionId}&deck_name=${deckName}`, {
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

    const handleHelpClick = () => {
        setOpenHelp(!openHelp);
    }

    const handleLanguageChange = () => {
        setIsGerman(!isGerman);
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
                <SidebarSettings onHelpClick={handleHelpClick} />
                <TopContainer>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        {isDarkMode ? <img src={require('../../images/logo_white.png')} alt="Logo" style={{ width: '50px', height: '50px' }} />
                            : <img src={require('../../images/logo_black.png')} alt="Logo" style={{ width: '50px', height: '50px' }} />
                        }
                    </div>
                    {isSidebarOpen && (
                        <AppTitle>
                            Memory Master - Alpha
                        </AppTitle>
                    )}
                </TopContainer>
            </SidebarContainer>
            {isSidebarOpen && (
                <Overlay/>
            )}
            {openAddDeck && (
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
            {openHelp && (
                <OpenHelpContainer>
                    <HelpPage>
                        <AddDeckHeader>Help</AddDeckHeader>
                        {!isGerman ?
                            <ol>
                                <li>Sidebar:</li>
                                <ol type="a">
                                    <li>Click on the burger icon to open the sidebar.</li>
                                    <li>You can search for decks in the sidebar by typing into the search bar.</li>
                                    <li>To delete a deck, click on the <strong>X</strong> icon next to the deck name.</li>
                                </ol>
                                <li>Add Deck:</li>
                                <ol type="a">
                                    <li>Click on the <strong>Add Deck</strong> button to add a new deck.</li>
                                    <li>Enter a name for the new deck and click <strong>Add deck</strong>.</li>
                                </ol>
                                <li>Add Cards:</li>
                                <ol type="a">
                                    <li>Click on the <strong>+</strong> card to add a new card to the selected deck.</li>
                                    <li><strong>AI Assistance:</strong></li>
                                    <ol type="i">
                                        <li>If you see the robot icon, you can add a card with AI assistance.</li>
                                        <li>Select the style and length of the card and upload a file (PDF or TXT).</li>
                                        <li>After previewing, you can add the card to your deck or go back by clicking the <strong>Back</strong> button.</li>
                                    </ol>
                                    <li>If you see the pencil icon, you can add a card with your own text.</li>
                                </ol>
                                <li>Learning:</li>
                                <ol type="a">
                                    <li>Click the <strong>Start Learning</strong> button in the deck overview to start learning.</li>
                                    <li>You will see the front of the card and need to guess the back.</li>
                                    <li>Click the <strong>Flip</strong> button to view the back of the card.</li>
                                    <li>Select how well you know the card by clicking the corresponding button.</li>
                                </ol>
                                <li>Deck Overview:</li>
                                <ol type="a">
                                    <li>In the deck overview, you can see all cards and click on them to edit or delete them.</li>
                                </ol>
                            </ol>
                        :
                            <ol>
                                <li>Sidebar:</li>
                                <ol type="a">
                                    <li>Klicken Sie auf das Burger-Symbol, um die Sidebar zu öffnen.</li>
                                    <li>Sie können Decks in der Sidebar durchsuchen, indem Sie in die Suchleiste tippen.</li>
                                    <li>Um ein Deck zu löschen, klicken Sie auf das <strong>X</strong>-Symbol neben dem Decknamen.</li>
                                </ol>
                                <li>Deck hinzufügen:</li>
                                <ol type="a">
                                    <li>Klicken Sie auf die Schaltfläche <strong>Add Deck</strong>, um ein neues Deck hinzuzufügen.</li>
                                    <li>Geben Sie einen Namen für das neue Deck ein und klicken Sie auf <strong>Add deck</strong>.</li>
                                </ol>
                                <li>Karten hinzufügen:</li>
                                <ol type="a">
                                    <li>Klicken Sie auf die <strong>+</strong>-Karte, um eine neue Karte zum ausgewählten Deck hinzuzufügen.</li>
                                    <li><strong>KI-Unterstützung:</strong></li>
                                    <ol type="i">
                                        <li>Wenn Sie das Roboter-Symbol sehen, können Sie eine Karte mit KI-Unterstützung hinzufügen.</li>
                                        <li>Wählen Sie den Stil und die Länge der Karte aus und laden Sie eine Datei (PDF oder TXT) hoch.</li>
                                        <li>Nach der Vorschau können Sie die Karte zu Ihrem Deck hinzufügen oder mit der Schaltfläche <strong>Back</strong> zurückgehen.</li>
                                    </ol>
                                    <li>Wenn Sie das Stift-Symbol sehen, können Sie eine Karte mit eigenem Text hinzufügen.</li>
                                </ol>
                                <li>Lernen:</li>
                                <ol type="a">
                                    <li>Klicken Sie in der Deck-Übersicht auf die Schaltfläche <strong>Start Learning</strong>, um mit dem Lernen zu beginnen.</li>
                                    <li>Sie sehen die Vorderseite der Karte und müssen die Rückseite erraten.</li>
                                    <li>Klicken Sie auf die Schaltfläche <strong>Flip</strong>, um die Rückseite der Karte anzuzeigen.</li>
                                    <li>Wählen Sie aus, wie gut Sie die Karte kennen, indem Sie auf die entsprechende Schaltfläche klicken.</li>
                                </ol>
                                <li>Deck-Übersicht:</li>
                                <ol type="a">
                                    <li>In der Übersicht Ihres Decks können Sie alle Karten sehen und auf sie klicken, um sie zu bearbeiten oder zu löschen.</li>
                                </ol>
                            </ol>
                        }
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", width: "100%", marginTop: "20px"}}>
                            <Button onClick={handleHelpClick} text={"Close"} />

                            <Button onClick={handleLanguageChange} text={"En/De"} />
                        </div>
                    </HelpPage>
                </OpenHelpContainer>
            )}
        </>
    );
};

export default Sidebar;
