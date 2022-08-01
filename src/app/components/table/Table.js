import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { cloneElement, createRef, useEffect, useState } from 'react';
import { LoadingSpinner } from '../LoadingSpinner';
import './Table.css';

export const Table = ({
  columns,
  data,
  children,
  emptyMessage,
  rowsPerPage = 50,
  rowExpanded,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [displayedRows, setDisplayedRows] = useState();
  const [expandedRows, setExpandedRows] = useState({});
  const [expandableContentRefs, setExpandableContentRefs] = useState({});

  useEffect(() => {
    if (!displayedRows || !displayedRows.length) {
      setExpandableContentRefs({});
      return;
    }
    const refs = {};
    displayedRows.forEach((row, i) => {
      refs[i] = createRef();
    });
    setExpandableContentRefs(refs);
  }, [displayedRows]);

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
    setExpandedRows({});
  }, [data, currentPage]);

  useEffect(() => {
    if (!data || !data.length) {
      setDisplayedRows([]);
    }
    const start = rowsPerPage * currentPage - rowsPerPage;
    const end = rowsPerPage * currentPage;
    const displayedRows = data?.slice(start, end);
    setDisplayedRows(displayedRows);
  }, [totalPages, currentPage]);

  const toggleRow = (rowIndex) => {
    const shouldExpand = !expandedRows[rowIndex];
    if (shouldExpand) {
      rowExpanded && rowExpanded(displayedRows[rowIndex]);
    }
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [rowIndex]: shouldExpand,
    }));
  };

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
        <div
          className="table-header-row table-row"
          style={!!children && { paddingLeft: '0px' }}
        >
          {children && <span className="table-arrow-wrap"></span>}
          {columns.map((column) => (
            <div key={column.display} style={column.styles}>
              {column.display}
            </div>
          ))}
        </div>
        {(displayedRows || []).map((row, i) => (
          <div
            className="table-row-wrap"
            key={`${row.name}_${i}`}
            onClick={() => toggleRow(i)}
          >
            <div
              className="table-row"
              style={!!children && { paddingLeft: '0px' }}
            >
              {children && (
                <span className="table-arrow-wrap">
                  <span
                    className="table-arrow"
                    style={{
                      transform: expandedRows[i] ? 'rotate(90deg)' : 'none',
                    }}
                  >
                    <FontAwesomeIcon icon={faChevronRight} color="#f3901d" />
                  </span>
                </span>
              )}
              {columns.map((column) => (
                <div key={column.display}>
                  {row[column.propertyName] || '--'}
                </div>
              ))}
            </div>
            <div
              className="table-expandable-content"
              style={{
                height: expandedRows[i]
                  ? expandableContentRefs[i].current.offsetHeight + 'px'
                  : '0px',
              }}
            >
              {cloneElement(children({ rowData: row, rowIndex: i }), {
                ref: expandableContentRefs[i],
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
