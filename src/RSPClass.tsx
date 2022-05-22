import * as React from 'react'
import { Component } from "react";


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

interface State{
    result : string,
    score : number,
    imgCoord : ImgCoords
}

class RSPClass extends Component<{}, State>{

    state : State = {
        result : '',
        score : 0,
        imgCoord : rspCoords.바위,
    }

    intervalID:number = 0;

    componentDidMount() {
        console.log('다시 실행');
        this.intervalID = window.setInterval(this.changeImg, 300);
        console.log(this.intervalID);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }


    changeImg = ()=>{
        const {imgCoord} = this.state;
        if(imgCoord === rspCoords.바위){
            this.setState({ imgCoord : rspCoords.가위 } );
        }
        else if(imgCoord === rspCoords.가위){
            this.setState({ imgCoord : rspCoords.보 } );
        }
        else if(imgCoord === rspCoords.보){
            this.setState({ imgCoord : rspCoords.바위 } );
        }
    }

    onClickBtn = (choice : keyof typeof rspCoords) => () => {
        const {imgCoord} = this.state;

        clearInterval(this.intervalID);
        const myChoice = scores[choice];
        const comChoice = scores[computerChoice(imgCoord)];
        const diff = myChoice - comChoice;
        if(diff === 0){
            this.setState({
                result :'비겼습니다. +0점',
            })
        }
        else if([-1,2].includes(diff)){
            this.setState((prevState) => {
                return {
                    result : "이겼습니다 +1점",
                    score : prevState.score + 1,
                }
            });
        }
        else{
            this.setState((prevState) => {
                return {
                    result : '졌습니다 -1점',
                    score : prevState.score - 1,
                }
            });
        }

        setTimeout(() => {
            this.intervalID = window.setInterval(this.changeImg, 300);
        },1000);

    }

    render(){
        const {result, imgCoord, score} = this.state;

        return(
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>

        );
    }


}

export default RSPClass;