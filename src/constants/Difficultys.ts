import { Difficulty } from "../types/Difficulty";

export const INTERVALS: Record<Difficulty, number[]> = {
    very_hard: [1, 60, 180, 1440, 4320],  // 1 Min, 1 Std, 3 Std, 1 Tag, 3 Tage
    hard: [10, 180, 720, 4320, 10080],    // 10 Min, 3 Std, 12 Std, 3 Tage, 7 Tage
    good: [30, 720, 1440, 10080, 20160],  // 30 Min, 12 Std, 1 Tag, 7 Tage, 14 Tage
    very_good: [60, 1440, 4320, 20160, 43200] // 1 Std, 1 Tag, 3 Tage, 14 Tage, 30 Tage
};
