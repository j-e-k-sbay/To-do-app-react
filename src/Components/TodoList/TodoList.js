import React, {useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import Todo from './Todo'
import Pagination from './Pagination';
import Select from 'react-select'

function TodoList(props)
{
    const [todoList, setTodoList] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [idForTodo, setIdForTodo] = useState(Math.random());
    const [isEdited, setIsEdited] = useState(false);

    const [filteredTodos, setFilteredTodos] = useState([]);

    const[currentPage, setCurrentPage] = useState(1);
    const[todosPerPage,setTodosPerPage] = useState(5);

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todoList.slice(indexOfFirstTodo,indexOfLastTodo);
    const options = [
        { value: 'all', label: 'All' },
        { value: 'completed', label: 'Completed' },
        { value: 'uncompleted', label: 'Uncompleted' }
      ]
      const [status, setStatus] = useState(options[0]);

    const handleInputChange = (event) =>{
        setInputValue(event.target.value)
    }

    const handleButtonClick = () =>{
        if(!inputValue) return;
        const todos = todoList.concat({
            name: inputValue,
            completed: false,
            id: idForTodo
        });

        setTodoList(todos);
        setInputValue("");
        setIdForTodo(Math.random());
        setIsEdited(false);
    }

    const handleTodoRemove = (todoValue) =>{
        setTodoList(todoList.filter(todo => todo.name !== todoValue))
    }

    const handleTodoComplete = (todoId) =>{
        setTodoList(todoList.map(todo => {
            if(todoId === todo.id)
            {
                console.log(!todo.completed)
                return{
                    ...todo,
                    completed: !todo.completed,
                }
            }
            return todo;
            })    
        );
    }

    const handleTodoEdit = (todoId) =>{
        const todos = todoList.filter(todo => todo.id !== todoId);
        const todoToEdit = todoList.find(todo => todo.id === todoId)
        setTodoList(todos);
        setInputValue(todoToEdit.name);
        setIdForTodo(todoToEdit.id);
        setIsEdited(true);
    }

    

    const getfilterValue = (selectedOption) =>{
        setStatus(selectedOption);
    }

    const filterHandler = () =>{
        console.log('filter idzie')
        switch(status){
            case "completed":
                setFilteredTodos(todoList.filter(todo => todo.completed === true));
                break;
            case "uncompleted":
                setFilteredTodos(todoList.filter(todo => todo.completed === false));
                break;
            default:
                setFilteredTodos(todoList);
                break;
        }
    }

    console.log(todoList)

    function compareNames( a, b ) {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
      }

    const onSubmit = (e) => {
        e.preventDefault();
      };

    useEffect(()=>{
        todoList.sort(compareNames);
        filterHandler();
        console.log('działam')
    },[todoList, status]);

    
    

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
                    className={isEdited ? "todo-edit-button":"todo-button"}
                    onClick={handleButtonClick}
                >
                {isEdited ? <FontAwesomeIcon icon={faCheck}/>:<FontAwesomeIcon icon={faPlus}/>}
                </button>
                <div style={{ marginLeft: 10, width: 200 }}>
                    {/* <select onChange={getfilterValue} className="filter-todo">
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                    </select> */}
                    <Select options={options} value={status} onChange={getfilterValue}/>
                </div>
            </form>

            <div className='todo-container'>
                <div className ="todo-list">
                {filteredTodos.map((todo,index) => (
                    <Todo 
                    key={todo.id}
                    id={todo.id}
                    todo={todo.name}
                    completed={todo.completed}
                    handleEditClick={handleTodoEdit}
                    handleCompleteClick={handleTodoComplete}  
                    handleCloseClick={handleTodoRemove}  />
                ))}
                </div>
            </div>
            <Pagination todosPerPage={todosPerPage} totalTodos={todoList.length}/>
        </div>
    );
}

export default TodoList;