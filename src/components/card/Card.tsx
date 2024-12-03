import React from 'react';

import { CardContainer } from './Card.styles';

interface CardProps {
    card: string;
    onCardClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onCardClick }) => {
    return <CardContainer onClick={() => onCardClick()}>{card}</CardContainer>;
}

export default Card;
