export interface TryInfo {
    try : string;
    result : string;
}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FALG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export interface StartGameAction{
    type : typeof START_GAME;
    row : number;
    cell : number;
    mine : number;
}

export interface OpenCellAction{
    type : typeof OPEN_CELL;
    row : number;
    cell : number;
}

export interface ClickMineAction{
    type : typeof CLICK_MINE;
    row : number;
    cell : number;
}

export interface FlagCellAction{
    type : typeof FLAG_CELL;
    row : number;
    cell : number;
}

export interface QuestionCellAction{
    type : typeof QUESTION_CELL;
    row : number;
    cell : number;
}

export interface NormalizeCellAction{
    type : typeof NORMALIZE_CELL;
    row : number;
    cell : number;
}

export interface IncrementTimerAction{
    type : typeof INCREMENT_TIMER;
}

