import * as React from 'react';
import {useCallback, useEffect, useRef, memo, Dispatch, FC} from "react";
import Tr from "./Tr";

interface Props{
    tableData : string[][];
    dispatch : Dispatch<any>;
}

const Table:FC<Props> = memo(({ tableData, dispatch }) => {
    return(
        <table >
            {Array(tableData.length).fill(null).map((tr, i) =>
                <Tr key={i} rowData={tableData[i]} rowIndex={i} dispatch={dispatch}/>)}
        </table>

    );
});

export default Table;
