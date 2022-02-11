import React from "react";

const Pagination = ({todosPerPage, totalTodos}) =>{
    const pageNumbers =[];

    for(let i =1; i<Math.ceil(totalTodos.todosPerPage); i++)
    {
        pageNumbers.push(i);
        console.log(i);
    }

    return(
        <div>
            <nav>
            <ul>
                {pageNumbers.map(number => (
                    <li>
                        console.log(number);
                        key={number}
                        <a href="!#">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
        </div>
    )
}

export default Pagination;