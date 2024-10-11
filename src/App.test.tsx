import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe(App, () => {
  it('button click on item changes isComplete property', () => {
    const {container, getByRole} = render(<App />)
    const input = getByRole('textbox')
    const form = getByRole('form')
    fireEvent.change(input, {target: {value: 'value'}}) //write value in input
    fireEvent.submit(form) // submit input
    const button = getByRole('button', {name: ''})
    const TodoItem = container.querySelector('.TodoItem')
    expect(TodoItem).toHaveClass('active') // by defaul isComleted false => has class active
    fireEvent.click(button) // click button to change complition
    expect(TodoItem).toHaveClass('completed') // isComleted true => has class completed
  })

  it('filers active and complete work properly', () => {
    const {container, getByRole} = render(<App />)
    const input = getByRole('textbox')
    const form = getByRole('form')
    fireEvent.change(input, {target: {value: 'todo1'}}) // write first todo
    fireEvent.submit(form) // add first todo
    const button = getByRole('button', {name: ''}) 
    fireEvent.change(input, {target: {value: 'todo2'}}) // write second todo
    fireEvent.submit(form) // add second todo
    fireEvent.click(button) // change first todo to completed 
    const completedButton = getByRole('button', {name: 'Completed'})
    const activeButton = getByRole('button', {name: 'Active'})
    const allButton = getByRole('button', {name: 'All'})
    const todos = container.querySelector('.todos')
    fireEvent.click(activeButton) // change filter to dispaly only active
    if (todos){
    expect(todos.childNodes[0].childNodes[1].textContent).toEqual('todo2') //displays active => second todo
    fireEvent.click(completedButton) // change filter to dispaly only completed
    expect(todos.childNodes[0].childNodes[1].textContent).toEqual('todo1') //displays completed => first todo
    fireEvent.click(allButton) // change filter to display all
    expect(todos.childNodes[0].childNodes[1].textContent).toEqual('todo1') //displays all => first todo is shown
    expect(todos.childNodes[1].childNodes[1].textContent).toEqual('todo2') //displays all => second todo is also shown
    }
    else{
      expect(true).toBeFalsy()
      console.log('todos not found')
    }
  })

  it('clear completed works properly', () => {
    const {container, getByRole} = render(<App />)
    const input = getByRole('textbox')
    const form = getByRole('form')
    fireEvent.change(input, {target: {value: 'todo1'}}) // write first todo
    fireEvent.submit(form) // add first todo
    const button = getByRole('button', {name: ''})
    fireEvent.click(button) // change first todo to completed 
    fireEvent.change(input, {target: {value: 'todo2'}}) // write second todo
    fireEvent.submit(form) // add second todo
    const clearCompletedButton = getByRole('button', {name: 'Clear completed'})
    const todos = container.querySelector('.todos')
    fireEvent.click(clearCompletedButton) // clear all completed todos
    if (todos){
      expect(todos.childNodes[0].childNodes[1].textContent).toEqual('todo2') // first todo completed => it gets deleted, second todo stays
    }
    else{
      expect(true).toBeFalsy()
      console.log('todos not found')
    }
  })

  it('items remaining works properly', () => {
    const {container, getByRole} = render(<App />)
    const input = getByRole('textbox')
    const form = getByRole('form')
    const itemsLeft = container.querySelector('p')
    if (itemsLeft){
      expect(itemsLeft.textContent).toEqual('')
      fireEvent.change(input, {target: {value: 'todo1'}}) // write first todo
      fireEvent.submit(form) // add first todo
      expect(itemsLeft.textContent).toEqual('1 item left')
      const button = getByRole('button', {name: ''})
      fireEvent.change(input, {target: {value: 'todo2'}}) // write second todo
      fireEvent.submit(form) // add second todo
      expect(itemsLeft.textContent).toEqual('2 items left')
      fireEvent.click(button) // change first todo to completed 
      expect(itemsLeft.textContent).toEqual('1 item left')
    }
    else{
      expect(true).toBeFalsy()
      console.log('itemsLeft not found')
    }
  })
})