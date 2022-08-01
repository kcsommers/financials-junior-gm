import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../LoadingSpinner';
import './Table.css';

export const Table = ({
  columns,
  data,
  children,
  emptyMessage,
  rowsPerPage = 50,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [displayedRows, setDisplayedRows] = useState();

  useEffect(() => {
    if (!data || !data.length) {
      setCurrentPage(0);
      return;
    }
    setCurrentPage(1);
  }, [data]);

  useEffect(() => {
    if (!data || !data.length) {
      setTotalPages(0);
      return;
    }
    if (data.length <= rowsPerPage) {
      setTotalPages(1);
      return;
    }
    setTotalPages(Math.ceil(data.length / rowsPerPage));
  }, [data]);

  useEffect(() => {
    if (!data || !data.length) {
      setDisplayedRows([]);
    }
    const start = rowsPerPage * currentPage - rowsPerPage;
    const end = rowsPerPage * currentPage;
    const displayedRows = data.slice(start, end);
    setDisplayedRows(displayedRows);
  }, [totalPages, currentPage]);

  const getRowsRange = () => {
    if (!currentPage) {
      return '';
    }
    const start = currentPage * rowsPerPage - rowsPerPage + 1;
    const end =
      currentPage * rowsPerPage > data?.length
        ? data?.length
        : currentPage * rowsPerPage;
    return `${start} - ${end} of ${data?.length}`;
  };

  if (!data) {
    return (
      <div className="empty-table-wrap">
        <LoadingSpinner />
      </div>
    );
  }
  if (!data.length) {
    return (
      <div className="empty-table-wrap">
        {emptyMessage || 'No Data Provided'}
      </div>
    );
  }
  return (
    <>
      <div className="table-pagination-wrap">
        <div className="current-page-wrap">
          <span
            className={`${currentPage <= 1 ? 'disabled' : ''}`}
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} color="#00788a" />
          </span>
          Page
          <input
            className="current-page-input"
            type="text"
            value={currentPage}
            onChange={(e) => {
              if (!e.target.value) {
                setCurrentPage('');
                return;
              }
              if (!isNaN(+e.target.value)) {
                const page =
                  +e.target.value > totalPages
                    ? totalPages
                    : +e.target.value <= 0
                    ? 1
                    : Math.round(+e.target.value);

                setCurrentPage(String(page));
              }
            }}
          />
          of {totalPages}
          <span
            className={`${currentPage >= totalPages ? 'disabled' : ''}`}
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              color="#00788a"
              style={{ marginLeft: '0.5rem' }}
            />
          </span>
        </div>
        <div className="current-rows-wrap">
          <p>{getRowsRange()}</p>
        </div>
      </div>
      <div className="table-wrap box-shadow">
        <div className="table-header-row table-row">
          {children && <span className="table-arrow-wrap"></span>}
          {columns.map((column) => (
            <div key={column.display} style={column.styles}>
              {column.display}
            </div>
          ))}
        </div>
        {(displayedRows || []).map((item, i) => (
          <div
            className="table-row-wrap"
            key={`${item.name}_${i}`}
            // onClick={toggleTeacher.bind(this, i, t)}
          >
            <div className="table-row">
              {children && (
                <span className="table-arrow-wrap">
                  <span
                    className="table-arrow"
                    // style={{
                    //   transform:
                    //     detailsStates[i] && detailsStates[i].isExpanded
                    //       ? 'rotate(90deg)'
                    //       : 'none',
                    // }}
                  >
                    <FontAwesomeIcon icon={faChevronRight} color="#f3901d" />
                  </span>
                </span>
              )}
              {columns.map((column) => (
                <div key={column.display}>
                  {item[column.propertyName] || '--'}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
