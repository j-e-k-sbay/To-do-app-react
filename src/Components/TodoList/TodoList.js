import React, {useEffect, useState } from 'react';

import Todo from './Todo'
function TodoList(props)
{
    // const [todoList, setTodoList] = useState([]);
    // const [inputValue, setInputValue] = useState("");

    const [todoListState, setTodoListState] = useState({todos: [], inputValue:"", error:""});

    // useEffect(() =>{
    //     console.log(todoListState.todos);
    //     todoListState.todos.sort((a, b) =>
    //     a.localeCompare(b)
    //     );
    // },[todoListState.todos]);
    

    const handleInputChange = (event) =>{
        const {value} = event.target;
        // setInputValue(value);
        setTodoListState({
            ...todoListState,
            inputValue: value,
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
            todos: [...todoListState.todos, inputValue].sort((a, b) =>
            a.localeCompare(b)
            ),
            inputValue: ""
        })
    }

    const handleTodoRemove = (todoValue) =>{
        setTodoListState({
            ...todoListState,
            todos: todos.filter(todo => todo !== todoValue)
        })
    }

    const handleTodoComplete = (todoValue) =>{
        const {todos} = todoListState;
        console.log(todoValue.completed);
        if(todos.some(todo => todo === todoValue)){
            
            setTodoListState({
                ...todoListState,
                completed: true,
            });

            return;
        }
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
                <div className='select'>
                    <select className="filter-todo">
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                    </select>
                </div>
            </form>

            {!!error &&
                <p>
                    {error}
                </p>
            }
            <div className='todo-container'>
                <div className ="todo-list">
                {todos.map((todo,index) => (
                    <Todo 
                    key={index}
                    todo={todo}
                    completed={false}
                    handleCompleteClick={handleTodoComplete}  
                    handleCloseClick={handleTodoRemove}  
                    />
                ))}
                </div>
            
            </div>
            {/* <div>
                <button>

                </button>
            </div> */}
        </div>
    );
}

export default TodoList;