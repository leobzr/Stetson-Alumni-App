// src/components/Pagination.jsx
function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return (
      <nav>
        <ul className="pagination">
          {pages.map(page => (
            <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
  
  export default Pagination
  