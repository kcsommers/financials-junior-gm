import { useState, useEffect, useRef, useCallback } from 'react';
import { LoadingSpinner } from '@components';
import { useDebounce } from './../../hooks/use-debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
  faDownload,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { ConfirmOverlay } from '../../components/overlays/ConfirmOverlay';
import { Button } from '../../components/Button';
import {
  deleteStudentsByTeacher,
  deleteTeacherById,
  getAllTeachers,
  getTimeSpent,
} from './../../api-helper';
import { cloneDeep } from 'lodash';
import * as moment from 'moment';

const teacherDetails = [
  ['userName', 'Username'],
  ['email', 'Email Address'],
  ['gradeTaught', 'Grade Taught'],
  ['classSize', 'Class Size'],
  ['studentCount', 'No. Of Students'],
  ['school', 'School'],
  ['schoolDistrict', 'School District'],
  ['schoolAddress', 'School Address'],
  ['city', 'City'],
  ['state', 'State'],
  ['zipCode', 'Zip Code'],
];

const searchByOptions = [
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'Grade Taught',
    value: 'gradeTaught',
  },
  {
    label: 'School',
    value: 'school',
  },
  {
    label: 'School District',
    value: 'schoolDistrict',
  },
];

const TEACHERS_PER_PAGE = 50;

export const TeacherBrowser = ({ allTeachers, onRowAction }) => {
  const detailsRefs = useRef([]);

  const downloadTag = useRef(document.createElement('a'));

  const [detailsStates, setDetailsStates] = useState({});

  const [isLoading, setIsLoading] = useState(!allTeachers);

  const [timeSpentMap, setTimeSpentMap] = useState({});

  const [initialized, setInitialized] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);

  const [currentPage, setCurrentPage] = useState('1');
  const [skipDebounce, setSkipDebounce] = useState(false);
  const debouncedCurrentPage = useDebounce(currentPage, 1000);
  const prevCurrentPageRef = useRef(currentPage);

  const [nameSearch, setNameSearch] = useState('');
  const debouncedNameSearch = useDebounce(nameSearch, 1000);
  const prevNameSearchRef = useRef(nameSearch);

  const [gradeTaughtSearch, setGradeTaughtSearch] = useState('');
  const debouncedGradeTaughtSearch = useDebounce(gradeTaughtSearch, 1000);
  const prevGradeTaughtSearchRef = useRef(gradeTaughtSearch);

  const [schoolSearch, setSchoolSearch] = useState('');
  const debouncedSchoolSearch = useDebounce(schoolSearch, 1000);
  const prevSchoolSearchRef = useRef(schoolSearch);

  const [schoolDistrictSearch, setSchoolDistrictSearch] = useState('');
  const debouncedSchoolDistrictSearch = useDebounce(schoolDistrictSearch, 1000);
  const prevSchoolDistrictSearchRef = useRef(schoolDistrictSearch);

  const [filteredTeachers, setFilteredTeachers] = useState(allTeachers);

  const getDisplayedTeachers = useCallback(
    (teachers, page) => {
      const start =
        TEACHERS_PER_PAGE * (page || debouncedCurrentPage) - TEACHERS_PER_PAGE;
      const end = TEACHERS_PER_PAGE * (page || debouncedCurrentPage);
      const displayed = teachers.slice(start, end);
      return displayed;
    },
    [debouncedCurrentPage]
  );

  const [displayedTeachers, setDisplayedTeachers] = useState([]);

  const downloadCsv = () => {
    let csvStr =
      'Name,Username,Email Address,Grade Taught,Class Size,School,School District,School Address,City,State,Zip Code\n';

    filteredTeachers
      .map((teacher) => {
        const row = [];
        row.push(`"${teacher.name || '--'}"`);
        teacherDetails.forEach((d) => row.push(`"${teacher[d[0]] || '--'}"`));
        return row;
      })
      .forEach((row) => {
        csvStr += row.join(',');
        csvStr += '\n';
      });

    downloadTag.current.href = `data:text/csv;charset=utf-8,${encodeURI(
      csvStr
    )}`;
    downloadTag.current.target = '_blank';
    downloadTag.current.download = 'teachers.csv';
    downloadTag.current.click();
  };

  const getTotalPages = useCallback(() => {
    if (!allTeachers) {
      return 0;
    }

    if (allTeachers.length <= TEACHERS_PER_PAGE) {
      return 1;
    }

    return Math.ceil(allTeachers.length / TEACHERS_PER_PAGE);
  }, [allTeachers]);

  const [totalPages, setTotalPages] = useState(0);

  const toggleTeacher = (index) => {
    const detailsRef = detailsRefs.current[index];
    const detailsState = detailsStates[index];
    const shouldExpand = !detailsState || !detailsState.isExpanded;

    setDetailsStates({
      ...detailsStates,
      [index]: {
        detailsHeight: shouldExpand ? detailsRef.offsetHeight : 0,
        isExpanded: shouldExpand,
      },
    });
  };

  const filterTeachers = useCallback(() => {
    let _filteredTeachers = allTeachers;
    if (
      debouncedNameSearch ||
      debouncedGradeTaughtSearch ||
      debouncedSchoolSearch ||
      debouncedSchoolDistrictSearch
    ) {
      const searchTermMap = {
        name: debouncedNameSearch,
        gradeTaught: debouncedGradeTaughtSearch,
        school: debouncedSchoolSearch,
        schoolDistrict: debouncedSchoolDistrictSearch,
      };
      const searchKeys = Object.keys(searchTermMap).filter(
        (k) => !!searchTermMap[k]
      );

      _filteredTeachers = allTeachers.filter((t) =>
        searchKeys.every((k) =>
          String(t[k]).toLowerCase().includes(searchTermMap[k].toLowerCase())
        )
      );
    }

    setFilteredTeachers(_filteredTeachers);
    setDisplayedTeachers(getDisplayedTeachers(_filteredTeachers));
    setCurrentPage('1');
  }, [
    allTeachers,
    debouncedNameSearch,
    debouncedGradeTaughtSearch,
    debouncedSchoolSearch,
    debouncedSchoolDistrictSearch,
    getDisplayedTeachers,
  ]);

  const rowsRangeRef = useRef('');
  const getRowsRange = () => {
    const page = skipDebounce ? +currentPage : +debouncedCurrentPage;
    if (!page) {
      return rowsRangeRef.current;
    }
    const start = page * TEACHERS_PER_PAGE - TEACHERS_PER_PAGE + 1;
    const end =
      page * TEACHERS_PER_PAGE > allTeachers.length
        ? allTeachers.length
        : page * TEACHERS_PER_PAGE;
    rowsRangeRef.current = `${start} - ${end} of ${allTeachers.length}`;
    return rowsRangeRef.current;
  };

  // debounced search effects
  // Name
  useEffect(() => {
    if (!allTeachers || prevNameSearchRef.current === debouncedNameSearch) {
      return;
    }

    prevNameSearchRef.current = debouncedNameSearch;
    filterTeachers();
  }, [allTeachers, debouncedNameSearch, filterTeachers]);

  // Grade
  useEffect(() => {
    if (
      !allTeachers ||
      prevGradeTaughtSearchRef.current === debouncedGradeTaughtSearch
    ) {
      return;
    }

    prevGradeTaughtSearchRef.current = debouncedGradeTaughtSearch;
    filterTeachers();
  }, [allTeachers, debouncedGradeTaughtSearch, filterTeachers]);

  // School
  useEffect(() => {
    if (!allTeachers || prevSchoolSearchRef.current === debouncedSchoolSearch) {
      return;
    }

    prevSchoolSearchRef.current = debouncedSchoolSearch;
    filterTeachers();
  }, [allTeachers, debouncedSchoolSearch, filterTeachers]);

  // School District
  useEffect(() => {
    if (
      !allTeachers ||
      prevSchoolDistrictSearchRef.current === debouncedSchoolDistrictSearch
    ) {
      return;
    }

    prevSchoolDistrictSearchRef.current = debouncedSchoolDistrictSearch;
    filterTeachers();
  }, [allTeachers, debouncedSchoolDistrictSearch, filterTeachers]);

  // Current Page
  useEffect(() => {
    if (!allTeachers || prevCurrentPageRef.current === debouncedCurrentPage) {
      return;
    }

    if (!debouncedCurrentPage) {
      return;
    }

    prevCurrentPageRef.current = debouncedCurrentPage;
    if (!skipDebounce) {
      setDisplayedTeachers(getDisplayedTeachers(filteredTeachers));
    } else {
      setSkipDebounce(false);
    }
  }, [
    allTeachers,
    debouncedCurrentPage,
    getDisplayedTeachers,
    filteredTeachers,
    skipDebounce,
  ]);

  // current page skip debounce
  useEffect(() => {
    if (currentPage !== debouncedCurrentPage && skipDebounce) {
      setDisplayedTeachers(getDisplayedTeachers(filteredTeachers, currentPage));
    }
  }, [
    currentPage,
    skipDebounce,
    debouncedCurrentPage,
    getDisplayedTeachers,
    filteredTeachers,
    allTeachers,
  ]);

  // initialization
  useEffect(() => {
    if (allTeachers && !isLoading && !initialized) {
      setInitialized(true);
      setDisplayedTeachers(getDisplayedTeachers(allTeachers));
      setTotalPages(getTotalPages());
      setFilteredTeachers(allTeachers);
    }
  }, [
    allTeachers,
    isLoading,
    initialized,
    getDisplayedTeachers,
    getTotalPages,
  ]);

  // loading
  useEffect(() => {
    if (allTeachers && isLoading) {
      setIsLoading(false);
    }
  }, [allTeachers, isLoading]);

  // details refs effect
  useEffect(() => {
    if (!allTeachers) {
      return;
    }

    detailsRefs.current = detailsRefs.current.slice(0, allTeachers.length);
  }, [allTeachers]);

  const showAlert = (event, type, details) => {
    event.stopPropagation();
    setSelectedDetails({ ...details, type });
    setShowConfirm(true);
  };

  const deleteSelectedItem = async () => {
    setIsLoading(true);
    selectedDetails.type === 'teacher'
      ? await deleteTeacherById(selectedDetails._id)
      : await deleteStudentsByTeacher(selectedDetails._id);
    setShowConfirm(false);
    const teachers = await getAllTeachers();
    setDisplayedTeachers(teachers.data);
    onRowAction();
  };

  const getClassTimeSpent = (teacher) => {
    getTimeSpent(teacher._id)
      .then((res) => {
        const clonedtimeSpentMap = cloneDeep(timeSpentMap);
        clonedtimeSpentMap[teacher.name] = moment
          .duration(res.totalTimeSpent)
          .asHours()
          .toFixed(2);

        setTimeSpentMap(clonedtimeSpentMap);
      })
      .catch((err) => console.error(err));
  };

  return !isLoading ? (
    <div className="teacher-browser-wrap">
      {showConfirm === true && (
        <ConfirmOverlay
          message={`Are you sure you want to remove ${
            selectedDetails.type === 'teacher'
              ? selectedDetails.name
              : `${selectedDetails.name}'s Class`
          } ?`}
          subMessage={
            selectedDetails.type === 'teacher'
              ? 'Removing a teacher will remove the entire class as well.'
              : ''
          }
          confirm={deleteSelectedItem}
          cancel={() => setShowConfirm(false)}
          position="absolute"
          top="10%"
        />
      )}
      <div className="teacher-browser-header-wrap">
        <h3>Teachers</h3>
        <button
          className={`btn-accent btn-small${
            !filteredTeachers || !filteredTeachers.length ? ' disabled' : ''
          }`}
          onClick={downloadCsv}
        >
          <FontAwesomeIcon
            icon={faDownload}
            color="#fff"
            style={{ marginRight: '0.5rem' }}
          />
          Download CSV
        </button>
      </div>
      <div className="teacher-browser-search-wrap">
        <p>Search by...</p>
        {searchByOptions.map((o) => (
          <div key={o.value} className="teacher-search-input-wrap">
            <span>{o.label}</span>
            <input
              type="text"
              onChange={(e) => {
                switch (o.value) {
                  case 'name': {
                    setNameSearch(e.target.value);
                    break;
                  }
                  case 'gradeTaught': {
                    setGradeTaughtSearch(e.target.value);
                    break;
                  }
                  case 'school': {
                    setSchoolSearch(e.target.value);
                    break;
                  }
                  case 'schoolDistrict': {
                    setSchoolDistrictSearch(e.target.value);
                    break;
                  }
                  default:
                }
              }}
            />
          </div>
        ))}
      </div>

      <div className="teacher-browser-pagination-wrap">
        <div className="current-page-wrap">
          <span
            className={`${currentPage <= 1 ? 'disabled' : ''}`}
            onClick={() => {
              setCurrentPage(String(+debouncedCurrentPage - 1));
              setSkipDebounce(true);
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
              setCurrentPage(String(+debouncedCurrentPage + 1));
              setSkipDebounce(true);
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

      <div className="teacher-table-wrap box-shadow">
        <div className="teacher-table-header-row teacher-table-row">
          <span className="teacher-table-arrow-wrap"></span>
          <div>Name</div>
          <div className="grade-taught-column">Grade Taught</div>
          <div>No. Of Students</div>
          <div>School</div>
          <div>School District</div>
        </div>

        {displayedTeachers.map((t, i) => (
          <div
            className="teacher-table-row-wrap"
            key={`${t.name}_${i}`}
            onClick={toggleTeacher.bind(this, i)}
          >
            <div className="teacher-table-row">
              <span className="teacher-table-arrow-wrap">
                <span
                  className="teacher-table-arrow"
                  style={{
                    transform:
                      detailsStates[i] && detailsStates[i].isExpanded
                        ? 'rotate(90deg)'
                        : 'none',
                  }}
                >
                  <FontAwesomeIcon icon={faChevronRight} color="#f3901d" />
                </span>
              </span>
              <div>{t.name || '--'}</div>
              <div className="grade-taught-column">{t.gradeTaught || '--'}</div>
              <div>{t.studentCount || '--'}</div>
              <div>{t.school || '--'}</div>
              <div>{t.schoolDistrict || '--'}</div>
            </div>
            <div
              className="admin-teacher-details-wrap"
              style={{
                height: detailsStates[i]
                  ? `${detailsStates[i].detailsHeight}px`
                  : '0px',
                padding:
                  detailsStates[i] && detailsStates[i].isExpanded
                    ? '1rem 3rem'
                    : '0px 3rem',
              }}
            >
              <div
                className="admin-teacher-details-inner"
                ref={(el) => (detailsRefs.current[i] = el)}
              >
                <div className="get-time-spent-wrap">
                  <button
                    className={`btn-primary btn-small`}
                    onClick={(e) => {
                      e.stopPropagation();
                      getClassTimeSpent(t);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '1rem',
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faClock}
                      color="#fff"
                      style={{ marginRight: '0.5rem' }}
                    />
                    Get Time Spent
                  </button>
                  {timeSpentMap[t.name] && (
                    <span>{timeSpentMap[t.name]} Hours</span>
                  )}
                </div>
                {teacherDetails.map((d) => (
                  <div key={d[0]} className="admin-teacher-detail-wrap">
                    <span className="admin-teacher-detail-label">{d[1]}</span>
                    <span className="admin-teacher-detail">
                      {t[d[0]] || '--'}
                    </span>
                  </div>
                ))}
                <div className="admin-teacher-detail-action">
                  <div className="admin-teacher-detail-action-item">
                    <Button
                      background="#dc3545"
                      text="Delete Teacher"
                      size="small"
                      onClick={(event) => {
                        showAlert(event, 'teacher', t);
                      }}
                    />
                  </div>
                  <div className="admin-teacher-detail-action-item">
                    <Button
                      background="#dc3545"
                      text="Delete Class"
                      size="small"
                      onClick={(event) => {
                        showAlert(event, 'class', t);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="admin-loading-wrap">
      <LoadingSpinner />
    </div>
  );
};
