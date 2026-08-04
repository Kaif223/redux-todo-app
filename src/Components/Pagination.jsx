import React from 'react'

const Pagination = ({
  itemsPerPage,
  paginationValue,
  currentPage,
  prevPage,
  nextPage,
  total
}) => {

  // Keep at least one page so an empty result never shows "1 / 0".
  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));

  return (
    <div className="pagination-wrapper">

      <p>
        Items per page:
      </p>

      <select
        id="paginationDropdown"
        value={itemsPerPage}
        onChange={paginationValue}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>


      <button
        type="button"
        id="preBtn"
        disabled={currentPage === 1}
        onClick={prevPage}
      >
        &#10094;
      </button>


      <span>
        {currentPage} / {totalPages}
      </span>


      <button
        type="button"
        id="nextBtn"
        disabled={currentPage >= totalPages}
        onClick={nextPage}
      >
        &#10095;
      </button>

    </div>
  )
}

export default Pagination
