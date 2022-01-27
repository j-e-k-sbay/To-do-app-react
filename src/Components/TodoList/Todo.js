import React from "react";

function Todo(props)
{
    const {todo, handleCloseClick} = props;
    return(
        <div className="todo">
            <span className="todo-item">{todo}</span>
            <button
                className="trash-btn"
                onClick={()=>handleCloseClick(todo)}
            >
                x
            </button>
        </div>
    )
}

export default Todo;