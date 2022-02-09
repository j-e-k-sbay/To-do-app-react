import React from "react";

const Pagination = ({ todosPerPage, totalTodos, paginate, currentPage }) =>{
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
      pageNumbers.push(i);
    }
  
    const nextPage = () => {
      paginate(currentPage + 1);
    };
  
    const prevPage = () => {
      paginate(currentPage - 1);
    };

    const compactPaginationPages = [
        ...new Set(
          pageNumbers
            .slice(0, 1)
            .concat(pageNumbers.slice(currentPage - 2, currentPage))
            .concat(pageNumbers.slice(currentPage, currentPage + 2))
            .concat(['...'])
            .concat(pageNumbers.slice(-1))
        )
      ];

    console.log(pageNumbers)
    return(
        <>
        {pageNumbers.length && (
            <>
                        <button 
                onClick={ev => {
                ev.preventDefault();
                prevPage();
            }}>
                Prev
            </button>
            {compactPaginationPages.map(item => {
                return (
                    <button
                        key={item}
                        onClick={ev => {
                            ev.preventDefault();
                            item !== '...' && paginate(item);
                        }}
                        >
                        {item}
                    </button>
                );
            })}
            <button 
                onClick={ev => {
                ev.preventDefault();
                nextPage();
            }}>
                Next
            </button>
            </>
        )}
        </>
    )
}

export default Pagination;