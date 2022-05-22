import * as React from 'react';
import {useState, useRef, useCallback, FormEvent, ChangeEvent} from 'react';

const WordRelay = () => {

    const [ word, setWord ] = useState('비행기');
    const [ value, setValue ] = useState('');
    const [ result, setResult ] = useState('');
    const inputEl =useRef<HTMLInputElement>(null);

    const onSubmitForm = useCallback((e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(value);
        if (word[word.length - 1] === value[0]) {
            setResult('딩동댕');
            setWord(value);
            setValue('');
            if (inputEl.current) {
                inputEl.current.focus();
            }
        } else {
            setResult('땡');
            setValue('');
            if (inputEl.current) {
                inputEl.current.focus();
            }
        }
    },[word,value]);

    const onChange = useCallback((e : ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, []);

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input
                    ref={inputEl}
                    value={value}
                    onChange={onChange}
                />
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    );
};

export default WordRelay;