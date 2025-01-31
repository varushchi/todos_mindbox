import React from 'react'
import './TodoItem.css'

interface Todo{
  id: string,
  value: string,
  isCompleted: boolean,
  handleCLick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const svg = <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7071 6.29289C20.0976 6.68342 20.0976 7.31658 19.7071 7.70711L10.4142 17C9.63316 17.7811 8.36683 17.781 7.58579 17L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929C3.68342 10.9024 4.31658 10.9024 4.70711 11.2929L9 15.5858L18.2929 6.29289C18.6834 5.90237 19.3166 5.90237 19.7071 6.29289Z" fill="#008000"></path></g></svg>

const TodoItem = (props: Todo) => {

  return (
    <div className={`TodoItem ${props.isCompleted ? 'completed' : 'active'}`}>
      <button id = {props.id} onClick={(e) => {props.handleCLick && props.handleCLick(e)}}>{props.isCompleted && svg}</button>
      <p data-testid = 'p-value'>{props.value}</p>
    </div>
  )
}

export default TodoItem