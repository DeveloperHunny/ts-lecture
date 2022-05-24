import * as React from 'react';
import { useState, useMemo, useCallback, useRef, useEffect } from "react";

import Ball from "./Ball";

function getWinNumbers(){
    console.log('getWinNumbers');
    const candidate = Array(45).fill(0).map((v,i) => i+1);
    const shuffle : number[] = [];
    while(candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNUmbers = shuffle.slice(0,6).sort((p,c) => p - c);
    return [...winNUmbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []); //
    const [ winNumbers, setWinNumbers ] = useState(lottoNumbers);
    const [ winBalls, setWinBalls ] = useState<number[]>([]);
    const [ bonus, setBonus ] = useState<number|null>(null);
    const [ redo, setRedo ] = useState(false);

    const timeoutIDs = useRef<number[]>([]);

    const runTimeouts = () => {
        for(let i = 0; i < winNumbers.length -1; i++){
            timeoutIDs.current[i] = window.setTimeout(() => {
                setWinBalls((prevBalls) => {
                    return [...prevBalls , winNumbers[i]];
                });
            }, (i+1) * 500);
        }

        timeoutIDs.current[6] = window.setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 3500);
    }

    useEffect(() => { //처음 랜더링때만 실행
        console.log("Use Effect");
        runTimeouts();
        return () => {timeoutIDs.current.forEach((v) => {
            clearTimeout(v);
        });}
    },[timeoutIDs.current]);

    const onClickRedo = useCallback(() => {

        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeoutIDs.current = [];
    }, []);


    return(
        <>
            <div>당첨숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스 숫자</div>
            {bonus && <Ball number={bonus}/>}
            {redo && <button onClick={onClickRedo}> Restart! </button>}

        </>

    );

}

export default Lotto;
