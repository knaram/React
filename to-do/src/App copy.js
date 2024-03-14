import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import './assets/App.scss';
import Today from './components/Today';

function NoList() {
  return (
    <p className='no-list'>Noting To do, Add Something!</p>
  )
}

function TodoList(props) {
  const lis = [];
  
  for (let i = 0; i < props.todos.length; i++){
    let todos = props.todos[i];
    lis.push(
      <li key={todos.id}>
        <label>
          <input type='checkbox' name='todo' />
          <span className='text'>{todos.text}</span>
          <span className='time'>{todos.time}</span>
        </label>
      </li>
    )
  }

  return (
    <ul className='list-todo'>
      {lis}
    </ul>
  )
}

function AddModal(props) {
  const handleSubmit = event => {
    const todoText = event.target.formText.value;
    const todoTime = event.target.formTime.value;
    event.preventDefault();
    props.onAdd(todoText, todoTime);
  }

  return (
    <div className='form-wrap' id='formWrap'>
      <form className='tempPop' id='tempPop' onSubmit={handleSubmit}>
        <input type='text' name='formText' />
        <input type='time' name='formTime' />
        <input type='submit' name='submit' />
      </form>
    </div>
  )
}

function App(props) {
  const [mode, setMode] = useState('EMPTY');
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(0);
  const [todos, setTodo] = useState([
    {
      id: '',
      text: '',
      time: '',
    },
  ]);
  let formCont = null;
  let list = null;

  if(modal === true){
    formCont = <AddModal onAdd={(todoText, todoTime) => {
      const newTodo = [{id:id, text: todoText, time: todoTime}];      
      setTodo(newTodo);
      setMode('READ');
    }}/>;
  }

  if(mode === 'EMPTY'){
    list = <NoList />;
  } else if(mode === 'READ'){
    let text, time = null;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        text = todos[i].text;
        time = todos[i].time;
      }
    }
    list = <TodoList text={text} time={time} />;
  }

  return (
    <>
      <h1>Todo List</h1>

      <div id='content' className='content'>
        <Today />
        {list}
      </div>

      <button className='btn-add' onClick={event => {
        setModal(!modal);
      }}>할일 추가</button>
      
      {formCont}
    </>
  );
}

export default App;
