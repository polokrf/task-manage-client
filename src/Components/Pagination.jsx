import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, setCurrentPage, totalPage }) => {
  return (
    <div className="p-4 bg-primary border-t border-accent flex flex-col sm:flex-row items-center justify-center gap-4">
      <div className="join border border-accent rounded-lg bg-primary">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="paginationBtn"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        {[...Array(totalPage).keys()].map(i => (
          <button
            onClick={() => setCurrentPage(i)}
            className={`${i === currentPage ? 'paginationBtnActive' : 'paginationBtn'}`}
          >
            {i + 1}
          </button>
        ))}

        {currentPage < totalPage - 1 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="paginationBtn"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
