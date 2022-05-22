import * as React from 'react';
import {TryInfo} from "./types";
import {FunctionComponent} from "react";


const Try:FunctionComponent<{tryInfo : TryInfo}> = ({ tryInfo }) => {
    return(
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )

};

export default Try;