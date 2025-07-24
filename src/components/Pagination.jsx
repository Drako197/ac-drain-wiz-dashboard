import React from 'react';
import useMobileDetection from '../hooks/useMobileDetection';

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
  const isMobile = useMobileDetection();

  // Calculate which pages to show based on device
  const getVisiblePages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (isMobile) {
      // Mobile: Show only 3 pages at a time
      if (currentPage <= 2) {
        return [1, 2, 3];
      }
      
      if (currentPage >= totalPages - 1) {
        return [totalPages - 2, totalPages - 1, totalPages];
      }
      
      return [currentPage - 1, currentPage, currentPage + 1];
    } else {
      // Desktop: Show more pages (up to 7 pages)
      const maxVisiblePages = 7;
      const halfVisible = Math.floor(maxVisiblePages / 2);
      
      let startPage = Math.max(1, currentPage - halfVisible);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      // Adjust if we're near the end
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    }
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