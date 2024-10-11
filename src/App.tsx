import React, { useState } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

function App() {

  interface Todo{
    id: string,
    value: string,
    isCompleted: boolean,
  }

  const [todoList, setTodolist] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState('All')

  const todoListElems = todoList.filter(elem => {
    if (filter === 'All'){
      return elem
    }
    else if (filter === 'Active'){
      return elem.isCompleted === false
    }
    else{
      return elem.isCompleted === true
    }
  }).map(elem => {
    return(
      <TodoItem {...elem} key = {elem.id} handleCLick = {(e: React.MouseEvent<HTMLButtonElement>) => handleSetComplete(e)}/>
    )
  })

  function handleSetComplete(e: React.MouseEvent<HTMLButtonElement>){
    const foundIndex = todoList.findIndex(elem => elem.id === e.currentTarget.id)
    setTodolist(() => {
      return(
        todoList.map((elem, index) => {
          return index === foundIndex ? {...elem, isCompleted: !elem.isCompleted} : {...elem}
        })
      )
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    setTodolist(() => {
      return(
        [
          ...todoList,
          {
            id: Math.random().toFixed(10).replace('.',''),
            value: inputValue,
            isCompleted: false
          }
        ]
      )
    })
    setInputValue('')
  }

  function handleClearCompleted(){
    setTodolist(() => {
      return(
        todoList.filter(elem => elem.isCompleted === false)
      )
    })
  }

  let uncompetedItems = 0
  todoList.forEach(elem => {
    if(elem.isCompleted === false)
      uncompetedItems += 1
  })

  return (
    <div className="App">
      <h1>todos</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
      </form>
      <div className='todos'>
        {todoListElems}
      </div>
      <p>{uncompetedItems !== 0 && `${uncompetedItems} items left`}</p>
      <button onClick={() => setFilter('All')}>All</button>
      <button onClick={() => setFilter('Active')}>Active</button>
      <button onClick={() => setFilter('Completed')}>Completed</button>
      <button onClick={() => handleClearCompleted()}>Clear completed</button>
    </div>
  );
}

export default App;
