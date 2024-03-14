import React from 'react';
import { useState } from 'react';


function List(props) {
    const lis = [];

    for (let i = 0; i < props.todos.length; i++) {
        let itme = props.todos[i];
        lis.push(
            <li key={i}>
                <span>{itme.text}</span>
                <span>{itme.time}</span>
            </li>
        )
    }
    return (
        <ul>
            {lis}
        </ul>
    )
}

function Add(props) {
    return (
        <form onSubmit={event => {
            event.preventDefault();
            const text = event.target.text.value;
            const time = event.target.time.value;
            props.onAdd(text, time);
        }}>
            <input type='text' name='text' />
            <input type='time' name='time' />
            <button type='submit'>버튼</button>
        </form>
    )
}

function Test() {
    const [mode, setMode] = useState('INIT');
    const [todos, addTodo] = useState([
        {
            id: 1,
            text: '할 일을 추가해 보세요',
            time: '3:00',
        },
    ]);

    if(mode === 'ADD'){
        console.log('add', todos);
    }

    return (
        <div>
            <Add onAdd={(addText, addTime) => {
                const newTodo = { id: 2, text: addText, time: addTime };
                const newTodos = [...todos];
                newTodos.push(newTodo);
                addTodo(newTodos);
                setMode('ADD');                
            }} />

            <List todos={todos} />
        </div>
    )
}

export default Test;