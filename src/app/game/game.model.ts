export interface Ship {
    locations: number[];
    hits: string[];
    shipLength: number;
}

export interface Tile {
    id?: number;
    value?: string;
    isHeader: boolean;
    missStatus?: boolean;
    hitStatus?: boolean;
    disabled?: boolean;
}

export interface Gameplayed {
    id?: number;
    turnsUsed: number;
    overallAccuracy: number;
    status: GameStatus;
    startTime: Date;
    endTime: Date;
}

export enum GameStatus {
    Win,
    Lose
}

export enum GameAttemptsSelectionMode {
    Manual = 'Manual',
    Predefined = 'Predefined'
}