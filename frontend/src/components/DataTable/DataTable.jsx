import React, { useState, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';

import './DataTable.css'; // Estilos para la tabla

const DataTable = ({ columns, data , withFilter ,itemsPerPage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  let itemsPerPageDT = itemsPerPage|| 10;

  // Filtrar los datos según la búsqueda
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    return data.filter((row) =>
      columns.some((column) =>
        String(row[column.accessor]).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery, columns]);

  // Calcular los datos que se mostrarán en la página actual
  const paginatedData = useMemo(() => {
    const start = currentPage * itemsPerPageDT;
    const end = start + itemsPerPageDT;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage]);

  // Manejar el cambio de página
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="datatable-container">
      {withFilter&&<div className="datatable-search">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>}

      <Table className="datatable" striped variant='dark'>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column.accessor}>{row[column.accessor]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="no-data">
                No se encontraron resultados
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="datatable-pagination">
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          breakLabel={'...'}
          pageCount={Math.ceil(filteredData.length / itemsPerPageDT)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
};

export default DataTable;
