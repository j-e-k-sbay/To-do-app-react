import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

function Todo(props)
{
const {todo, handleCloseClick /*,handleCompleteClick*/} = props;
    return(
        <div className="todo">
            <span className="todo-item">{todo}</span>
            <button
                className="complete-btn"
                // onClick={()=>handleCompleteClick(todo)}
            >
                <FontAwesomeIcon icon={faCheck}/>
            </button>
            <button
                className="trash-btn"
                onClick={()=>handleCloseClick(todo)}
            >
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        </div>
    )
}

export default Todo;