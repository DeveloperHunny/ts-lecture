import * as React from 'react';
import {ChangeEvent, Component, FormEvent, Ref} from "react";

interface State{
    first : number,
    second : number,
    value : string,
    result : string
}


class GuGuDanClass extends Component<{}, State>{
    state = {
        first: Math.ceil(Math.ceil(Math.random() * 9)),
        second : Math.ceil(Math.ceil(Math.random() * 9)),
        value : '',
        result : '',
    };

    onSubmitForm = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { first, value, result, second } = this.state;

        if(parseInt(value) === first * second){
            this.setState((prevState) => {
                return{
                    result : '정답' + prevState.value,
                    first: Math.ceil(Math.ceil(Math.random() * 9)),
                    second : Math.ceil(Math.ceil(Math.random() * 9)),
                    value : '',
                }
            });

        }
        else{
            this.setState({
                result : '틀렸습니다.',
                value : '',
            });
        }
        if(this.inputRef){this.inputRef.focus();}

    }

    onChangeInput = (e : ChangeEvent<HTMLInputElement>) => {
        this.setState({value : e.target.value,});}

    inputRef : HTMLInputElement | null = null;
    onRef = (ref : HTMLInputElement) => { this.inputRef = ref }

    render(){
        const { first, value, result, second } = this.state;

        return(
            <>
                <div>{first} 곱하기 {second}는?</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRef} type="number" value={value} onChange={this.onChangeInput}/>
                </form>
                <div>{result === '' ? null : result}</div>

            </>
        );
    }

}