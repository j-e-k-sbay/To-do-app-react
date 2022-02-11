import React, {useEffect,useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'

function Todo({todo,id,completed,handleEditClick,handleCloseClick,handleCompleteClick})
{
    useEffect(() =>{
        console.log(completed);
    },[completed]);

    return(
        <div className={completed ? "todo checked":"todo"}>
            <span className="todo-item">{todo}</span>
            <button 
                className="edit-btn"
                onClick={()=>handleEditClick(id)}
            >
                <FontAwesomeIcon icon={faPen}/>
            </button>
            <button
                className="complete-btn"
                onClick={()=>handleCompleteClick(id) }
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