import React from 'react'
import './TodoItem.css'

interface Todo{
  id: string,
  value: string,
  isCompleted: boolean,
  handleCLick : (e: React.MouseEvent<HTMLButtonElement>) => void
}

const TodoItem = (props: Todo) => {

  return (
    <div className={`TodoItem ${props.isCompleted ? 'completed' : 'active'}`}>
      <button id = {props.id} onClick={(e) => props.handleCLick(e)}></button>
      <p>{props.value}</p>
    </div>
  )
}

export default TodoItem