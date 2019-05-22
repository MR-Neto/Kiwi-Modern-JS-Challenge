import cx from 'classnames';
import React, { Component } from 'react';

export default class TodoList extends Component {

  state = {
    toDos: [],
    inputToDo: '',
    message: null,
  }

  changeInput = (e) => {
      this.setState({
        inputToDo: e.target.value,
        message: null,
      })
  }

  addToDo = () => {
    const { toDos, inputToDo } = this.state;
    if (inputToDo.trim().length === 0) {
      this.setState({
        message: `Todo can't be empty`,
      })
      return;
    }
    this.setState({
      toDos: toDos.concat({ name: inputToDo, isDone: false }),
      inputToDo: '',
    })
  }

  toggleToDo = (indexToggle) => {

    const { toDos } = this.state;

    this.setState({
      toDos: toDos.map((toDo, index) => index === indexToggle ? { ...toDo, isDone: !toDo.isDone } : toDo),
    })
  }

  render() {
    const { toDos, inputToDo, message } = this.state;

    return (
      <div>
        <h1>
          Todo List
        </h1>
        <div>
          <input onChange={this.changeInput} value={inputToDo} type='text' maxLength='280' />
          <p>Number of characters {inputToDo.length}/280</p>
          <button onClick={this.addToDo}>Add</button>
          {message && <p className='error-message'>{message}</p>}
        </div>
        <p className='task-counter'>{toDos.filter(toDo => !toDo.isDone).length} remaining out of {toDos.length} tasks</p>
        <ul>
          {toDos.map((toDo, index) => <li key={index} className={cx({ 'is-done': toDo.isDone })} onClick={() => this.toggleToDo(index)}>{toDo.name}</li>)}
        </ul>
        <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                    .error-message{
                      color: red;
                    }`
        }
        </style>
      </div >
    );
  }
}

