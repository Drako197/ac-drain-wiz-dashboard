import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  isLoading = false,
  startIndex,
  endIndex,
  totalItems,
  itemsLabel = 'results'
}) => {
  // Calculate which 3 pages to show
  const getVisiblePages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= 2) {
      return [1, 2, 3];
    }
    
    if (currentPage >= totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }
    
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} {itemsLabel}
      </div>
      <div className="pagination">
        <button 
          className="pagination-btn" 
          disabled={currentPage === 1 || isLoading}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ← Previous
        </button>
        
        {visiblePages.map((page) => (
          <button
            key={page}
            className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
            disabled={isLoading}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        
        <button 
          className="pagination-btn" 
          disabled={currentPage === totalPages || isLoading}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Pagination; 