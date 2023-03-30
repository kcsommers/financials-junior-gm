import classnames from 'classnames';
import { cloneDeep } from 'lodash';
import * as moment from 'moment';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiHelper } from '../../api/api-helper';
import { Teacher } from '../../auth/users/teacher.interface';
import { ConfirmScreen } from '../../components/ConfirmScreen';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Modal } from '../../components/Modal';
import ChevronLeft from '../../components/svg/chevron-left-solid.svg';
import ChevronRight from '../../components/svg/chevron-right-solid.svg';
import DownloadIcon from '../../components/svg/download-solid.svg';
import TrashIcon from '../../components/svg/trash-solid.svg';
import { useDebounce } from '../../utils/hooks/use-debounce';
import styles from './TeacherBrowser.module.scss';

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

type TeacherBrowserProps = {
  allTeachers: Teacher[];
  apiBaseUrl: string;
  onRowAction?: () => void;
};

export const TeacherBrowser = ({
  allTeachers,
  onRowAction,
  apiBaseUrl,
}: TeacherBrowserProps) => {
  const detailsRefs = useRef<any[]>([]);

  const downloadTag = useRef(document.createElement('a'));

  const [detailsStates, setDetailsStates] = useState({});

  const [studentStatsMap, setStudentStatsMap] = useState({});

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<any>({});

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
    (teachers, page?: string) => {
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
        const row: any[] = [];
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

  const getStudentStats = (teacher) => {
    if (studentStatsMap && studentStatsMap[teacher.name]) {
      // already fetched stats
      return;
    }

    Promise.all([
      ApiHelper.getTimeSpent(apiBaseUrl, teacher._id),
      ApiHelper.getStudentList(apiBaseUrl, teacher._id),
    ])
      .then((res) => {
        if (!res || !res.length || !res[1]) {
          console.error('Unexpected error fetching student stats');
          return;
        }

        const timeSpent = moment
          .duration(res[0].totalTimeSpent)
          .asHours()
          .toFixed(2);

        let startedTutorial = 0;
        let completedLevel1 = 0;
        let completedLevel2 = 0;
        let wonGame = 0;

        if (res[1].data && res[1].data.length) {
          res[1].data.forEach((student) => {
            if (student.tutorials) {
              startedTutorial++;
            }
            if (+student.level > 1) {
              completedLevel1++;
            }
            if (+student.level > 2) {
              completedLevel2++;
            }
            if (student.wonGame) {
              wonGame++;
            }
          });
        }

        const clonedStatsMap = cloneDeep(studentStatsMap);
        clonedStatsMap[teacher.name] = {
          timeSpent,
          startedTutorial,
          completedLevel1,
          completedLevel2,
          wonGame,
        };

        setStudentStatsMap(clonedStatsMap);
      })
      .catch((err) => console.error(err));
  };

  const toggleTeacher = (index, teacher) => {
    getStudentStats(teacher);

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
    setDisplayedTeachers(getDisplayedTeachers(allTeachers || []));
    setTotalPages(getTotalPages());
    setFilteredTeachers(allTeachers || []);
  }, [allTeachers]);

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
    selectedDetails.type === 'teacher'
      ? await ApiHelper.deleteTeacherById(apiBaseUrl, selectedDetails._id)
      : await ApiHelper.deleteStudentsByTeacher(
          apiBaseUrl,
          selectedDetails._id
        );
    setShowConfirm(false);
    const teachers = await ApiHelper.getAllTeachers(apiBaseUrl);
    setDisplayedTeachers(teachers.data || []);
    if (onRowAction) {
      onRowAction();
    }
  };

  return (
    <div className="teacher-browser-wrap">
      <div
        className={classnames(
          'flex items-center justify-between',
          styles.teacher_browser_header_wrap
        )}
      >
        <h3 className="text-3xl mb-4 text-foreground">Teachers</h3>
        <button
          className={`btn-secondary flex items-center btn-small${
            !filteredTeachers || !filteredTeachers.length ? ' disabled' : ''
          }`}
          onClick={downloadCsv}
        >
          {/** @ts-ignore */}
          <DownloadIcon className="fill-white mr-2" width={20} />
          Download CSV
        </button>
      </div>
      <div className={classnames(styles.teacher_browser_search_wrap)}>
        <p className="mb-4 text-base">Search by...</p>
        {searchByOptions.map((o) => (
          <div
            key={o.value}
            className={classnames(
              'flex mb-6',
              styles.teacher_search_input_wrap
            )}
          >
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
      <div className="flex items-center justify-between text-lg mb-4">
        <div
          className={classnames(styles.current_page_wrap, 'flex items-center')}
        >
          <span
            className={`${
              currentPage <= '1' ? 'disabled' : ''
            } cursor-pointer inline-block mr-3`}
            onClick={() => {
              setCurrentPage(String(+debouncedCurrentPage - 1));
              setSkipDebounce(true);
            }}
          >
            {/** @ts-ignore */}
            <ChevronLeft fill="#00788a" />
          </span>
          Page
          <input
            className={styles.current_page_input}
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
            className={`${
              currentPage >= String(totalPages) ? 'disabled' : ''
            } cursor-pointer inline-block ml-3`}
            onClick={() => {
              setCurrentPage(String(+debouncedCurrentPage + 1));
              setSkipDebounce(true);
            }}
          >
            {/** @ts-ignore */}
            <ChevronRight className="mr-2" fill="#00788a" />
          </span>
        </div>
        <div className="current-rows-wrap">
          <p>{getRowsRange()}</p>
        </div>
      </div>
      <div className="bg-white rounded-sm box-shadow">
        <div
          className={classnames(
            styles.teacher_table_header_row,
            styles.teacher_table_row,
            'flex items-center text-base'
          )}
        >
          <span className={styles.teacher_table_arrow_wrap}></span>
          <div>Name</div>
          <div className={styles.grade_taught_column}>Grade Taught</div>
          <div>No. Of Students</div>
          <div>School</div>
          <div>School District</div>
        </div>

        {displayedTeachers.map((t: any, i) => (
          <div
            className={styles.teacher_table_row_wrap}
            key={`${t.name}_${i}`}
            onClick={toggleTeacher.bind(this, i, t)}
          >
            <div className={styles.teacher_table_row}>
              <span className={styles.teacher_table_arrow_wrap}>
                <span
                  className={styles.teacher_table_arrow}
                  style={{
                    transform:
                      detailsStates[i] && detailsStates[i].isExpanded
                        ? 'rotate(90deg)'
                        : 'none',
                  }}
                >
                  {/** @ts-ignore */}
                  <ChevronRight className="fill-secondary" />
                </span>
              </span>
              <div>{t.name || '--'}</div>
              <div className={styles.grade_taught_column}>
                {t.gradeTaught || '--'}
              </div>
              <div>{t.studentCount || '--'}</div>
              <div>{t.school || '--'}</div>
              <div>{t.schoolDistrict || '--'}</div>
            </div>
            <div
              className={styles.admin_teacher_details_wrap}
              style={{
                height: detailsStates[i]
                  ? `${detailsStates[i].detailsHeight}px`
                  : '0px',
              }}
            >
              <div
                className={styles.admin_teacher_details_inner}
                ref={(el) => (detailsRefs.current[i] = el)}
              >
                <div className={styles.admin_teacher_details_left}>
                  {teacherDetails.map((d) => (
                    <div
                      key={d[0]}
                      className={styles.admin_teacher_detail_wrap}
                    >
                      <span className={styles.admin_teacher_detail_label}>
                        {d[1]}
                      </span>
                      <span className={styles.admin_teacher_detail}>
                        {t[d[0]] || '--'}
                      </span>
                    </div>
                  ))}
                </div>
                <div className={styles.admin_teacher_details_right}>
                  <div>
                    <p style={{ marginBottom: '1rem' }}>Student Stats</p>
                    {studentStatsMap[t.name] ? (
                      <>
                        <div className={styles.admin_teacher_detail_wrap}>
                          <span className={styles.admin_teacher_detail_label}>
                            Total Time Spent
                          </span>
                          <span className={styles.admin_teacher_detail}>
                            {studentStatsMap[t.name].timeSpent} Hours
                          </span>
                        </div>
                        <div className={styles.admin_teacher_detail_wrap}>
                          <span className={styles.admin_teacher_detail_label}>
                            Started Tutorial
                          </span>
                          <span className={styles.admin_teacher_detail}>
                            {studentStatsMap[t.name].startedTutorial}
                          </span>
                        </div>
                        <div className={styles.admin_teacher_detail_wrap}>
                          <span className={styles.admin_teacher_detail_label}>
                            Completed Level 1
                          </span>
                          <span className={styles.admin_teacher_detail}>
                            {studentStatsMap[t.name].completedLevel1}
                          </span>
                        </div>
                        <div className={styles.admin_teacher_detail_wrap}>
                          <span className={styles.admin_teacher_detail_label}>
                            Completed Level 2
                          </span>
                          <span className={styles.admin_teacher_detail}>
                            {studentStatsMap[t.name].completedLevel2}
                          </span>
                        </div>
                        <div className={styles.admin_teacher_detail_wrap}>
                          <span className={styles.admin_teacher_detail_label}>
                            Won Game
                          </span>
                          <span className={styles.admin_teacher_detail}>
                            {studentStatsMap[t.name].wonGame}
                          </span>
                        </div>
                      </>
                    ) : (
                      <LoadingSpinner size="sm" />
                    )}
                  </div>
                  <div
                    className="flex items-center"
                    style={{ position: 'relative', top: '-1rem' }}
                  >
                    <button
                      className="flex items-center btn-danger btn-small"
                      style={{ marginRight: '0.5rem' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        showAlert(e, 'teacher', t);
                      }}
                    >
                      {/** @ts-ignore */}
                      <TrashIcon className="fill-white mr-2" />
                      Delete Teacher
                    </button>
                    <button
                      className="flex items-center btn-danger btn-small"
                      onClick={(e) => {
                        e.stopPropagation();
                        showAlert(e, 'class', t);
                      }}
                    >
                      {/** @ts-ignore */}
                      <TrashIcon className="fill-white mr-2" />
                      Delete Class
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isVisible={showConfirm}>
        <ConfirmScreen
          isDisabled={false}
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
        />
      </Modal>
    </div>
  );
};
