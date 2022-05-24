import * as React from 'react';
import Tr from "./Tr";
import {memo, useContext} from "react";
import {TableContext} from "./MineSearch";

const Table = memo(() => {

    const { tableData } = useContext(TableContext);
    return(
        <table>
            <tbody>
                {Array(tableData.length).fill(null).map((tr, i) =>
                    <Tr key={i} rowIndex = {i}/>
                )}
            </tbody>

        </table>
    )
});

export default Table;
