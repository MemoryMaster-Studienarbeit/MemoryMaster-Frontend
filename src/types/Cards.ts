export type Card = {
    card_uuid: string;
    card_front: string;
    card_back: string;
    last_learned: string;
    next_learned: string;
    stage: number; // Neu = 0, Langfristig = 4
}
