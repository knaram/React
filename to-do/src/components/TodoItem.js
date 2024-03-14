import React from 'react';

function TodoItem(props) {
    return ( 
        <ul className='list-todo'>
            <li>
                <label>
                    <input type='checkbox' name='todo' />                
                    <span className='text'>{props.text}</span>
                    <span className='time'>{props.time}</span>
                </label>
            </li>
        </ul>
     );
}

export default TodoItem;