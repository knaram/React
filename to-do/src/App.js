import { useState } from 'react';
import './assets/App.scss';
import Today from './components/Today';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
      <li key={i}>
        <label>
          <input type='checkbox' name='todo' />
          <span className='text'>{todos.text}</span>
          <span className='time'>{todos.time}</span>
        </label>
        <button type='button' className='todo-del' onClick={() => {
          alert('삭제 기능')
        }}><FontAwesomeIcon icon={faTrashCan} /></button>
      </li>
    )
  }

  return (
    <ul className='list-todo'>
      {lis}
    </ul>
  )
}

function App(props) {
  const [mode, setMode] = useState('EMPTY');
  const [modal, setModal] = useState(false);
  const [todos, setTodo] = useState([]);
  let formCont = null;
  let list = null;

  if(modal === true){
    formCont = <AddModal onAdd={(todoText, todoTime) => {
      const newTodo = {text: todoText, time: todoTime};    
      const newTodos = [...todos];
      newTodos.push(newTodo);
      setTodo(newTodos);
      setMode('READ');
      setModal(false);
    }}/>;
  }

  if(mode === 'EMPTY'){
    list = <NoList />;
  }else if (mode === 'READ'){    
    list = <TodoList todos={todos} />    
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

  function AddModal(props) {
    const handleSubmit = event => {
      const todoText = event.target.todoText.value;
      const todoTime = event.target.todoTime.value;
      event.preventDefault();
      if (todoText === '' && todoTime === ''){
        alert('모두 입력해주세요');
        document.getElementById('todoText').focus();
      }else if (todoText === ''){
        alert('할 일을 입력해주세요');
        document.getElementById('todoText').focus();
      }else if (todoTime === ''){
        alert('시간을 입력해주세요');
        document.getElementById('todoTime').focus();
      }else{
        props.onAdd(todoText, todoTime);
      }
    }
  
    return (
      <div className='form-wrap' id='formWrap'>
        <form id='todoForm' onSubmit={handleSubmit}>
          <input type='text' name='todoText' id='todoText' placeholder='할 일을 입력해주세요.' title='할 일 입력' />
          <input type='time' name='todoTime' id='todoTime' title='시간 입력' />
          <div className='btn-wrap'>
            <button type='button' name='close' className='btn-txt' onClick={()=>{
              setModal(false);
            }}>취소</button>
            <button type='submit' name='submit' className='btn-txt btn-primary'>저장</button>
          </div>
        </form>
      </div>
    )
  }
}


export default App;
