import React from "react";

const Pagination = ({ todosPerPage, totalTodos, paginate, currentPage }) =>{
    const pageNumbers = [1];

    for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
        if(i!==1) pageNumbers.push(i);
    }
  
    const nextPage = () => {
        if(currentPage!==pageNumbers.length) {paginate(currentPage+1);}
    };
  
    const prevPage = () => {
        if(currentPage!==1)
        {
            paginate(currentPage-1);
        }
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
            <div className="pagination-btn-container">
                <button 
                    className={currentPage===1 ? "pagination-btn-disabled ":"pagination-btn"}
                    onClick={ev => {
                    ev.preventDefault();
                    prevPage();
                 }}>
                 Prev
                </button>
            </div>
            
            {compactPaginationPages.map((item,index) => {
                return (
                    <div className="pagination-btn-container">
                    <button
                        className={index===currentPage-1 ? "pagination-btn-selected" : "pagination-btn"}
                        key={item}
                        onClick={ev => {
                            ev.preventDefault();
                            item !== '...' && paginate(item);
                        }}
                        >
                        {item}
                    </button>
                    </div>
                );
            })}
            <div className="pagination-btn-container">
            <button 
                
                className={currentPage===pageNumbers.length ? "pagination-btn-disabled ":"pagination-btn"}
                onClick={ev => {
                ev.preventDefault();
                nextPage();
            }}>
                Next
            </button>
            
            </div>
            </>
        )}
        </>
    )
}

export default Pagination;