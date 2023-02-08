import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cloneElement, createRef, useEffect, useState } from 'react';
import { LoadingSpinner } from '../LoadingSpinner';
import styles from './Table.module.scss';

export const Table = ({
  columns,
  data,
  children,
  emptyMessage = '',
  rowsPerPage = 50,
  rowExpanded = null,
  rowDataTransformer,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [displayedRows, setDisplayedRows] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [expandableContentRefs, setExpandableContentRefs] = useState({});

  useEffect(() => {
    if (!displayedRows?.length) {
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
  }, [totalPages, currentPage, data]);

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
      <div className={styles.empty_table_wrap}>
        <LoadingSpinner />
      </div>
    );
  }
  if (!data.length) {
    return (
      <div className={styles.empty_table_wrap}>
        {emptyMessage || 'No Data Provided'}
      </div>
    );
  }
  return (
    <>
      <div className={styles.table_pagination_wrap}>
        <div className={styles.current_page_wrap}>
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
            className={styles.current_page_input}
            type="text"
            value={currentPage}
            onChange={(e) => {
              if (!e.target.value) {
                setCurrentPage(0);
                return;
              }
              if (!isNaN(+e.target.value)) {
                const page =
                  +e.target.value > totalPages
                    ? totalPages
                    : +e.target.value <= 0
                    ? 1
                    : Math.round(+e.target.value);

                setCurrentPage(page);
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
        <div className={styles.current_rows_wrap}>
          <p>{getRowsRange()}</p>
        </div>
      </div>
      <div className={`${styles.table_wrap} box-shadow`}>
        <div
          className={`${styles.table_header_row} ${styles.table_row}`}
          style={!!children?.expandableContent ? { paddingLeft: '0px' } : {}}
        >
          {children?.expandableContent && (
            <span className={styles.table_arrow_wrap}></span>
          )}
          {columns.map((column) => (
            <div key={column.display} style={column.styles || {}}>
              {column.display}
            </div>
          ))}
          {!!children?.actions && <div>Actions</div>}
        </div>
        {(displayedRows || []).map((row, i) => (
          <div
            className={styles.table_row_wrap}
            key={`${row.name}_${i}`}
            onClick={() => toggleRow(i)}
          >
            <div
              className={styles.table_row}
              style={
                !!children?.expandableContent
                  ? { paddingLeft: '0px', cursor: 'pointer' }
                  : {}
              }
            >
              {children?.expandableContent && (
                <span className={styles.table_arrow_wrap}>
                  <span
                    className={styles.table_arrow}
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
                  {(rowDataTransformer
                    ? rowDataTransformer(row, column.propertyName)
                    : row[column.propertyName]) || '--'}
                </div>
              ))}
              {!!children?.actions && (
                <div className={styles.actions_column}>
                  {cloneElement(
                    children?.actions({ rowData: row, rowIndex: i })
                  )}
                </div>
              )}
            </div>
            {!!children?.expandableContent && (
              <div
                className={styles.table_expandable_content}
                style={{
                  height: expandedRows[i]
                    ? expandableContentRefs[i].current.offsetHeight + 'px'
                    : '0px',
                }}
              >
                {cloneElement(
                  children?.expandableContent({ rowData: row, rowIndex: i }),
                  {
                    ref: expandableContentRefs[i],
                  }
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
