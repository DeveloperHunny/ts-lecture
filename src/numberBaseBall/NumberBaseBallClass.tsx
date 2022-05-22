import * as React from 'react';
import {ChangeEvent, Component, createRef, FormEvent, useCallback} from "react";
import Try from "./Try";
import {TryInfo} from "../types";


const getNumbers = () => {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i++){
        const chosen = candidate.splice(Math.floor(Math.random() * (9-i)),1)[0];
        array.push(chosen);
    }
    return array;
}

interface State{
    answer : number[],
    result : string,
    value : string,
    tries : TryInfo[],
}

class NumberBaseBallClass extends Component<{}, State>{

    state = {
        answer : getNumbers(),
        result : '',
        value : '',
        tries : [],
    }

    inputRef : HTMLInputElement | null = null;

    onSubmitForm = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {value, answer, result, tries }  = this.state;
        if (value === answer.join('')) {
            this.setState({
                tries : [...tries , { try : value, result : '홈런!'}],
                result : '홈런!',
            });
            alert('게임을 다시 시작합니다.');
            this.setState({
                value : '',
                answer : getNumbers(),
                tries : [],
            });
        }
        else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                this.setState({
                    result : `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`
                })
                alert('게임을 다시 시작합니다.');
                this.setState({
                    value : '',
                    answer : getNumbers(),
                    tries : [],
                });
            } else {
                console.log('답은', answer.join(''));
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        console.log('strike', answerArray[i], answer[i]);
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        console.log('ball', answerArray[i], answer.indexOf(answerArray[i]));
                        ball += 1;
                    }
                }
                this.setState({
                    tries : [...tries, {try : value , result : `${strike} 스트라이크, ${ball} 볼입니다.`}],
                    value : '',
                });
            }
        }

        this.inputRef!.focus();

    };

    onChange = (e : ChangeEvent<HTMLInputElement>) => {
        this.setState({ value : e.target.value })
    };



    onInputRef = (ref : HTMLInputElement) => {
        this.inputRef = ref;
    }


    render() {
        const { result, tries, value } = this.state;

        return(
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input
                        ref={this.onInputRef}
                        maxLength={4}
                        value={value}
                        onChange={this.onChange}
                    />
                    <button>입력!</button>
                </form>
                <div>시도: {tries.length}</div>
                <ul>
                    {tries.map((v : TryInfo, i) => (
                        <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v} />
                    ))}
                </ul>
            </>
        );
    }

}

export default NumberBaseBallClass;