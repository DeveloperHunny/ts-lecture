import * as React from 'react';
import {ChangeEvent, useRef, useState} from "react";
import * as events from "events";

const GuGuDan = () => {

    const [first, setFirst] = useState(Math.ceil(Math.ceil(Math.random() * 9)));
    const [second, setSecond] = useState(Math.ceil(Math.ceil(Math.random() * 9)));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmitForm = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(parseInt(value) === first * second){
            setResult('정답');
            setFirst(Math.ceil(Math.ceil(Math.random() * 9)));
            setSecond(Math.ceil(Math.ceil(Math.random() * 9)));
            setValue('');
            inputRef.current!.focus();

        }
        else{
            setResult('틀렸습니다.');
            setValue('');
            inputRef.current!.focus();
        }

    }

    const onChangeInput = (e : ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return(
        <>
            <div>{first} 곱하기 {second}는?</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} type="number" value={value} onChange={onChangeInput}/>
            </form>
            <div>{result === '' ? null : result}</div>

        </>
    )

}


export default GuGuDan