import * as React from 'react'
import { useState, useRef, useCallback, useEffect } from "react";


const rspCoords = {
    바위 : '0',
    가위 : '-142px',
    보 : '-284px'
} as const;

const scores = {
    가위 : 1,
    바위 : 0,
    보 : -1
} as const;

type ImgCoords = typeof rspCoords[keyof typeof rspCoords];

const computerChoice = (imgCoord : ImgCoords) => {
    return (Object.keys(rspCoords) as ['바위' | '가위' | '보']).find(function (k){
        return rspCoords[k] === imgCoord;
    })!;
}

const RSP = () => {

    const [ result, setResult ] = useState('');
    const [ score , setScore ] = useState(0);
    const [ imgCoord, setImgCoord ] = useState<ImgCoords>(rspCoords.바위);
    const intervalID = useRef<number>(0);

    useEffect(() => { //componenetDidMount, componentDidUpdate 역할을 수행 (1대1 대응은 아님.)
        console.log('다시 실행');
        intervalID.current = window.setInterval(changeImg, 500);
        console.log(intervalID.current);
        return () => { //componentWillUnmount 역할
            clearInterval(intervalID.current);
        }

    }, [imgCoord]);


    const changeImg = ()=>{

        if(imgCoord === rspCoords.바위){
            setImgCoord(rspCoords.가위);
        }
        else if(imgCoord === rspCoords.가위){
            setImgCoord(rspCoords.보);
        }
        else if(imgCoord === rspCoords.보){
            setImgCoord(rspCoords.바위);
        }
    }

    const onClickBtn = (choice : keyof typeof rspCoords) => () => {
        clearInterval(intervalID.current);
        const myChoice = scores[choice];
        const comChoice = scores[computerChoice(imgCoord)];
        const diff = myChoice - comChoice;
        if(diff === 0){
            setResult('비겼습니다. +0점');
        }
        else if([-1,2].includes(diff)){
            setResult('이겼습니다 +1점');
            setScore((prevScore) => { return prevScore + 1});
        }
        else{
            setResult('졌습니다 -1점');
            setScore((prevScore) => { return prevScore - 1});
        }
        setTimeout(() => {
            intervalID.current = window.setInterval(changeImg, 100);
        },1000);

    }


    return(
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>

    );

}

export default RSP;