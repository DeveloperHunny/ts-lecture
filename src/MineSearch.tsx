import * as React from 'react';
import {useState, useCallback, createContext, useContext, useReducer, useMemo, useEffect, Dispatch} from "react";
import Table from "./Table";
import Form from "./Form";
import {
    CLICK_MINE,
    ClickMineAction, FLAG_CELL,
    FlagCellAction, INCREMENT_TIMER, IncrementTimerAction, NORMALIZE_CELL,
    NormalizeCellAction, OPEN_CELL,
    OpenCellAction, QUESTION_CELL,
    QuestionCellAction, START_GAME,
    StartGameAction
} from "./types";


type ReducerActions = StartGameAction | ClickMineAction | OpenCellAction | FlagCellAction | QuestionCellAction | NormalizeCellAction | IncrementTimerAction;

export const CODE = {
    MINE : -7,
    NORMAL : -1,
    QUESTION : -2,
    FLAG : -3,
    QUESTION_MINE : -4,
    FLAG_MINE : -5,
    CLICKED_MINE : -6,
    OPENED : 0, //0 이상이면 다 OPENED 상태가 되겠끔.
};

interface TableState{
    tableData : number[][];
    dispatch : Dispatch<ReducerActions>;
    halted : boolean;
}

export const TableContext = createContext<TableState>({
    tableData : [],
    dispatch : () => {},
    halted : true,
});

interface IState{
    tableData : number[][];
    result : string;
    timer : number;
    halted : boolean;
    openedCount : number;
    data : {
        row : number,
        cell : number,
        mine : number,
    }
}

const initialState : IState = {
    tableData: [],
    result: '',
    timer: 0,
    halted : true,
    openedCount : 0,
    data : {
        row : 0,
        cell : 0,
        mine : 0,
    },

}

const plantMine = (row : number, cell : number, mine : number) => {

    const candidate = Array(row * cell).fill(null).map((arr,i) => {
        return i;
    });
    const shuffle = [];
    while(candidate.length > row * cell - mine){
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for(let i = 0; i < row; i++){
        const rowData: number[] = [];
        data.push(rowData);
        for(let j = 0; j < cell; j++){
            rowData.push(CODE.NORMAL);
        }
    }

    for(let k = 0; k < shuffle.length; k++){
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    return data;
}


const reducer = (state: IState ,action : ReducerActions) : IState => {

    switch (action.type){
        case START_GAME:
            return {
                ...state,
                data : {
                    row : action.row,
                    cell : action.cell,
                    mine : action.mine
                },
                tableData : plantMine(action.row, action.cell, action.mine),
                halted: false,
                openedCount: 0,
                timer : 0,
                result : '',
            }
        case OPEN_CELL:{
            const tableData = [...state.tableData];
            tableData.forEach((row, i) => {
                tableData[i] = [...state.tableData[i]];
            });

            const check = new Array(tableData.length).fill(null).map(() => new Array(tableData[0].length).fill(false));
            let count = 0;
            console.log(check);

            const checkAround = (row : number, cell : number) => {

                if(check[row][cell] || tableData[row][cell] >= 0) return;
                check[row][cell] = true;
                count += 1;

                let around : number[] = [];
                let around_pos : number[][] = [];
                //-1,0 부터 시계방향
                const dxy = [[-1,0], [-1,1], [0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]];
                dxy.forEach((move) => {
                    let ny = row + move[0]; let nx = cell + move[1];
                    if(0 <= ny && ny < tableData.length && 0 <= nx && nx < tableData[row].length){
                        around = around.concat(tableData[ny][nx]);
                        around_pos.push([ny,nx]);
                    }
                });

                const mines = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v));


                if(mines.length === 0){
                    tableData[row][cell] = 0;
                    around_pos.forEach((n) => {
                        checkAround(n[0],n[1]);
                    });
                }
                else{
                    tableData[row][cell] = mines.length;
                }
            }

            checkAround(action.row, action.cell);

            let halted = false;
            let result = '';

            console.log(state.openedCount + count);
            console.log(state.data.row *  state.data.cell - state.data.mine);
            if(state.data.row *  state.data.cell - state.data.mine === state.openedCount + count){ //승리
                halted = true;
                result = state.timer + '초만에 승리하셨습니다.';
            }

            return{
                ...state,
                tableData,
                halted,
                result,
                openedCount: state.openedCount + count,
            };

        }

        case CLICK_MINE:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return{
                ...state,
                tableData,
                halted: true,
            }
        }

        case FLAG_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.MINE){
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            }
            else{
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return{
                ...state,
                tableData,
            }
        }

        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.FLAG_MINE){
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            }
            else{
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return{
                ...state,
                tableData,
            }
        }
        case NORMALIZE_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
                tableData[action.row][action.cell] = CODE.MINE;
            }
            else{
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return{
                ...state,
                tableData,
            }
        }
        case INCREMENT_TIMER:{
            return {
                ...state,
                timer : state.timer + 1,
            }
        }
        default:
            return state;
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { tableData, result, timer, halted } = state;

    const value = useMemo(() => ({ tableData : tableData , halted: halted, dispatch }), [tableData, halted]);

    useEffect(()=> {
        let timer : number;
        if(halted === false){
            timer = window.setInterval(() => {
                dispatch({type:INCREMENT_TIMER});
            },1000);

        }
        return() => {
            clearInterval(timer);
        }

    },[halted]);

    return(
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table/>
            <div>{result}</div>
        </TableContext.Provider>

    );
}

export default MineSearch;
