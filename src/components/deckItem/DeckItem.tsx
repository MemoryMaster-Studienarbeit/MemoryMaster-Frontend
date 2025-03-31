import React from "react";

import {
    ListItem,
    DeleteButton,
    ListItemContainer, DeckName
} from './DeckItem.styles'

interface DeckItemProps {
    deckName: string;
    isSelected: boolean;
    onClick: () => void;
    onDelete: (deckName: string) => void;
    deckKey: number;
}

const DeckItem: React.FC<DeckItemProps> = ({deckName, isSelected, onClick, onDelete, deckKey}) => {
    return (
        <ListItem key={deckKey} onClick={onClick}>
            <ListItemContainer>
                <DeckName $isSelected={isSelected}>{deckName}</DeckName>
                {isSelected &&(
                    <DeleteButton onClick={(e) => { e.stopPropagation(); onDelete(deckName); }}></DeleteButton>
                )}
            </ListItemContainer>
        </ListItem>
    )
}

export default DeckItem;