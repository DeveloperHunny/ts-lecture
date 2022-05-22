import { Component } from "react";
import * as React from "react";

interface IState{
    state : 'waiting' | 'ready' | 'now',
    message : string,
    result : number[],
}

class ResponseCheckClass extends Component<{ }, IState>{

    state : IState = {
        state : 'waiting',
        message : '클릭해서 시작하세요.',
        result : [],
    }

    timerId : number = 0;
    startTime : number = 0;
    endTime : number = 0;
    
    onClickScreen = () => {
        const {state, message, result} = this.state
        switch (state){
            case 'waiting':
                this.timerId = window.setTimeout(() => {
                    this.setState({
                        state : "now",
                        message : "지금 클릭하세요!",
                    });
                    this.startTime = new Date().getTime();
                }, Math.floor(Math.random() * 1000) + 2000);

                this.setState({
                    state : 'ready',
                    message : '초록색이 되면 클릭하세요.'
                });
                break;
            case 'ready':
                clearTimeout(this.timerId!);
                this.setState({
                    state: "waiting",
                    message: "너무 성급하게 클릭하셨습니다!",
                });
                break;
            case 'now':
                this.endTime = new Date().getTime();
                this.setState((prevState) => {
                    return {
                        state: "waiting",
                        message: "클릭해서 시작하세요.",
                        result : [...prevState.result, this.endTime - this.startTime],
                    }

                });
                break;
        }
    }

    onReset = () => {
        this.setState({
            result : [],
            message : "클릭해서 시작하세요.",
            state : "waiting",
        })
    }

    renderAverage = () => {
        const { result } = this.state;

        return (result.length === 0 ? null :
            <>
                <div>평균 시간 : {result.reduce((a,b) => a + b) / result.length} ms</div>
                <button onClick={this.onReset}> RESET </button>
            </>);
    }

    render(){
        const { result, message, state} = this.state;

        return (
            <>
                <div id="screen" className={state} onClick={this.onClickScreen}>
                    {message}
                </div>
                {result.length != 0 && this.renderAverage()}
                <ul>
                    {result.map((time) =>{
                        return <li>{time}</li>;
                    })}
                </ul>
            </>
        );
    }

}

export default ResponseCheckClass;