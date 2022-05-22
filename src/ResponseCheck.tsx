import * as React from 'react'
import {useState, useRef, useCallback} from "react";

const ResponseCheck = () =>{

    const [ state, setState ] = useState('waiting');
    const [ message , setMessage ] = useState('클릭해서 시작하세요.');
    const [ result, setResult ] = useState<number[]>([]);

    const timerId = useRef<number | null>(null);
    const startTime = useRef(0);
    const endTime = useRef(0);

    const onClickScreen = useCallback(() => {

        switch (state){
            case 'waiting':
                timerId.current = window.setTimeout(() => {
                    setState('now');
                    setMessage('지금 클릭하세요!.')
                    startTime.current = new Date().getTime();
                } , Math.floor(Math.random() * 1000) + 2000);
                setState('ready');
                setMessage(' 초록색이 되면 클릭하세요. ');
                return;
            case 'ready':
                clearTimeout(timerId.current!);
                setState('waiting');
                setMessage('너무 성급하게 클릭하셨습니다!');
                return;
            case 'now':
                setState('waiting');
                setMessage('클릭해서 시작하세요.');
                endTime.current = new Date().getTime();
                setResult((prevResult : number[]) => {
                    return [...prevResult, endTime.current - startTime.current];
                });
                return;
        }
    },[timerId.current, startTime.current, endTime.current, state])

    const onReset = useCallback(() => {
        setState('waiting');
        setMessage('클릭해서 시작하세요.');
        setResult([]);
    },[]);

    const renderAverage = () => {
        return result.length === 0 ? null :
            <>
                <div> 평균 시간 : {result.reduce((a,b) => a + b) / result.length} ms </div>
                <button onClick={onReset}>reset</button>
            </>

    };

    return(
      <>
          <div id="screen" className={state} onClick={onClickScreen}>
              {message}
          </div>
          {result.length != 0 && renderAverage()}
          <ul>
              {result.map((time) =>{
                  return <li>{time}</li>;
              })}
          </ul>
      </>
    );
};

export default ResponseCheck;