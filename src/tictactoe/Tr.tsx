import * as React from 'react';
import {useCallback, useEffect, useRef, memo, FC, Dispatch} from "react";
import Td from "./Td";

interface Props{
    rowData : string[],
    rowIndex : number;
    dispatch : Dispatch<any>;
}

const Tr:FC<Props> = memo(({ rowData, rowIndex, dispatch }) => {
    console.log("tr rendered");
    return(
        <tr>
            {Array(rowData.length).fill(null).map((td,i) =>
                <Td key={i} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch}>{''}</Td>
            )}
        </tr>

    );
});

export default Tr;
