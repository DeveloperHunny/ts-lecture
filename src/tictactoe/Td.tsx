import * as React from 'react';
import {useCallback, useEffect, useRef, memo, FC, Dispatch, ReactElement, JSXElementConstructor} from "react";
import { CLICK_CELL } from "./TicTacToe";

interface Props{
    rowIndex : number;
    cellIndex : number;
    cellData : string;
    dispatch : Dispatch<any>;
    children : string;
}

const Td:FC<Props> =memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
    console.log('td rendered');

    const onClickTd = useCallback(() => {
        if(cellData){
            return;
        }

        dispatch({ type : CLICK_CELL, row: rowIndex, cell: cellIndex});
    }, [cellData]);

    return <td onClick={onClickTd}>{cellData}</td>;

});

export  default Td;
