import React from 'react';

import { CardContainer } from './Card.styles';

interface CardProps {
    card: string;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick}) => {
    return (
        <CardContainer onClick={() => onClick()}>
            {card}
        </CardContainer>
    );
}

export default Card;
