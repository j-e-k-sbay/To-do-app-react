import React, { useState } from 'react';

import Todo from './Todo'
function TodoList(props)
{
    // const [todoList, setTodoList] = useState([]);
    // const [inputValue, setInputValue] = useState("");

    const [todoListState, setTodoListState] = useState({todos: [], inputValue:"", error:""});

    const handleInputChange = (event) =>{
        const {value} = event.target;
        // setInputValue(value);
        setTodoListState({
            ...todoListState,
            inputValue: value
        })
    }

    const handleButtonClick = () =>{
        // setTodoList([...todoList,inputValue]);
        // setInputValue("");
        const {todos} = todoListState;

        if(!inputValue) return;

        if(todos.some(todo => todo === inputValue)){
            setTodoListState({
                ...todoListState,
                error:"To zadanie juz istnieje",
                inputValue: "",
            });

            return;
        }

        setTodoListState({
            error: "",
            todos: [...todoListState.todos, inputValue],
            inputValue: ""
        })
    }

    const handleTodoRemove = (todoValue) =>{
        setTodoListState({
            ...todoListState,
            todos: todos.filter(todo => todo !== todoValue)
        })
    }

    const { error, todos, inputValue } = todoListState;

    const onSubmit = (e) => {
        e.preventDefault();
      };

    return (
        <div>
            <header>
                <h1>My todo app</h1>
                </header>
            <form onSubmit={onSubmit} className="todo-input-container">
                <input 
                    className="todo-input"
                    name = "Todo input"
                    placeholder='New task...'
                    value = {inputValue}
                    onChange={handleInputChange}
                />
                <button 
                    className="todo-button"
                    onClick={handleButtonClick}
                >
                +
                </button>
            </form>

            {!!error &&
                <p>
                    {error}
                </p>
            }
            <div className='todo-container'>
                <div className ="todo-list">
                {todos.map((todo) => (
                    <Todo 
                    key={todo}
                    todo={todo}
                    handleCloseClick={handleTodoRemove}  
                    />
                ))}
                </div>
            
            </div>
            
        </div>
    );
}

export default TodoList;