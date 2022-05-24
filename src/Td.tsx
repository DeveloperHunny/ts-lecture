import * as React from 'react';
import {FC, memo, MouseEventHandler, useCallback, useContext, useMemo} from "react";
import {CODE, TableContext} from "./MineSearch";
import {CLICK_MINE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL} from "./types";

const getTdStyle = (code : number) => {
    switch ( code ){
        case CODE.NORMAL:
        case CODE.MINE:
            return{ background : '#444'}
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return{ background : 'white'}
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return{ background : 'red'}
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return{ background : 'yellow'}
        default:
            return{ background : 'white'}
    }
}

const getTdText = (data : number) => {
    console.log("getTdText");
    switch ( data ){
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';
        case CODE.NORMAL:
            return '';
        default:
            return data || '';
    }
}

interface Props{
    rowIndex : number;
    cellIndex : number;
}

const Td:FC<Props> = ({ rowIndex, cellIndex }) => {

    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if(halted) return;
        switch (tableData[rowIndex][cellIndex]){
            case CODE.NORMAL:
                dispatch({ type : OPEN_CELL, row: rowIndex, cell: cellIndex}); return;
            case CODE.MINE:
                console.log("MINE CLICKED");
                dispatch({ type : CLICK_MINE, row: rowIndex, cell: cellIndex}); return;
            case CODE.OPENED:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
            default:
                return;

        }
    }, [tableData[rowIndex][cellIndex], halted])

    const onRightClickTd = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if(halted) return;
        switch( tableData[rowIndex][cellIndex]){
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({ type: FLAG_CELL, row:rowIndex, cell:cellIndex}); return;
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                dispatch({ type: QUESTION_CELL, row:rowIndex, cell:cellIndex}); return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({ type: NORMALIZE_CELL, row:rowIndex, cell:cellIndex}); return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]}/>
};

interface PropsRealTD{
    onClickTd : () => void;
    onRightClickTd : (e : React.MouseEvent) => void;
    data : number;
}

const RealTd:FC<PropsRealTD> = memo(({ onClickTd, onRightClickTd, data }) => {

    return(
        <td style={getTdStyle(data)}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
        >
            {getTdText(data)}
        </td>
    );
});

export default Td;
