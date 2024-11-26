import React from 'react';

import { CardContainer } from './Card.styles';

interface CardProps {
    card: string;
}

const Card: React.FC<CardProps> = ({ card }) => {
    return <CardContainer>{card}</CardContainer>;
}

export default Card;
