import React, {useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

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
    
    const [currentPage, setCurrentPage] = useState(1);
    const todosPerPage = 5;

    const indexOfLastItem = currentPage * todosPerPage;
    const indexOfFirstItem = indexOfLastItem - todosPerPage;
    const currentItems = filteredTodos.slice(indexOfFirstItem, indexOfLastItem);

    const options = [
        { value: 'all', label: 'All' },
        { value: 'completed', label: 'Completed' },
        { value: 'uncompleted', label: 'Uncompleted' }
      ]
    const [status, setStatus] = useState(options[0]);

    const customStyles = {
        control: () => ({
            display: "flex",
            minWidth: "215px",
            fontSize:"20px",
            padding:"0px 0px 0px 5px",
            marginLeft:"30px",
            backgroundColor: "seashell",
            outline: "none",
            border: "none",
            cursor: "pointer",
          }),
        
          menu: (provided, state) => ({
            ...provided,
            minWidth: "218px",
            marginLeft:"30px",
            marginTop: "0px",
            borderRadius: "0px",
            width: "200px",
          }),

          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "rgb(194, 13, 49)" : "seashell",
            color: "black",
            "&:hover": {
                backgroundColor: "rgb(243, 98, 127)"
              },
          })
      }

    const handleInputChange = (event) =>{
        setInputValue(event.target.value)
    }

    const handleButtonClick = () =>{
        if(!inputValue) return;
        const array = todoList;
        array.push({
            name: inputValue,
            completed: false,
            id: idForTodo
        });

        setTodoList(array);
        todoList.sort(compareNames);
        setInputValue("");
        setIdForTodo(Math.random());
        setIsEdited(false);
    }

    const handleTodoRemove = (todoValue) =>{
        setTodoList(todoList.filter(todo => todo.name !== todoValue));
        if((filteredTodos.length-1)/todosPerPage === currentPage-1) setCurrentPage(currentPage-1);
    }

    const handleTodoComplete = (todoId) =>{
        setTodoList(todoList.map(todo => {
            if(todoId === todo.id)
            {
                return {
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
        switch(status.value){
            case "completed":
                return setFilteredTodos(todoList.filter(todo => todo.completed));
            case "uncompleted":
                return setFilteredTodos(todoList.filter(todo => !todo.completed));
            default:
                return setFilteredTodos(todoList);
        }
    }

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

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(()=>{
        todoList.sort(compareNames);
        filterHandler();
    },[todoList, status]); 

    useEffect(()=>{
        setCurrentPage(1);
    },[status])

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
                <div>
                    <Select 
                    isSearchable={false} styles={customStyles} 
                    components={{ DropdownIndicator:() => <div className='select-icon'><FontAwesomeIcon icon={faCaretDown}/></div>, IndicatorSeparator:() => null }}
                     options={options} 
                     value={status} 
                     onChange={getfilterValue}/>
                </div>
            </form>

            <div className='todo-container'>
                <div className ="todo-list">
                {currentItems.map(todo => (
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
            <div className="pagination-container">
               <Pagination todosPerPage={todosPerPage} totalTodos={filteredTodos.length} paginate={paginate} currentPage={currentPage}/>
            </div>
        </div>
    );
}

export default TodoList;