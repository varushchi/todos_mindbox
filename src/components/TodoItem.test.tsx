import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';
import React from 'react';
import App from '../App';

describe(TodoItem, () => {
  it('value dispalys correctly', () => {
    const {getByTestId} = render(<TodoItem {...{id: '1', value: 'value', isCompleted: false}}/>)
    const pValue = getByTestId('p-value').textContent
    expect(pValue).toEqual('value')
  })

  it('active class name added correctly', () => {
    const {container}  = render(<TodoItem {...{id: '2', value: 'value', isCompleted: false}}/>)
    const div = container.querySelector('.TodoItem')
    expect(div).toHaveClass('active')
  })

  it('completed class name added correctly', () => {
    const {container}  = render(<TodoItem {...{id: '3', value: 'value', isCompleted: true}}/>)
    const div = container.querySelector('.TodoItem')
    expect(div).toHaveClass('completed')
  })

  it('button click fires handleClick', () => {
    const mockOnClick = jest.fn()
    const {getByRole} = render(<TodoItem {...{id: '4', value: 'value', isCompleted: false}} handleCLick={mockOnClick}/>)
    const button = getByRole('button')
    fireEvent.click(button)
    expect(mockOnClick).toHaveBeenCalled()
  })
})
