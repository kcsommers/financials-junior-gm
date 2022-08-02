import { LoadingSpinner } from '@components';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cancelBtn from '@images/icons/cancel-big.svg';
import { cloneDeep } from 'lodash';
import * as moment from 'moment';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ConfirmOverlay } from '../../components/overlays/ConfirmOverlay';
import { Table } from '../../components/table/Table';
import { convertMs } from '../../utils/convert-ms';
import {
  deleteStudentsByTeacher,
  deleteTeacherById,
  getAllTeachers,
  getStudentList,
  getTimeSpent
} from './../../api-helper';
import { useDebounce } from './../../hooks/use-debounce';

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

export const TeacherBrowser = ({ allTeachers, onRowAction }) => {
  const detailsRefs = useRef([]);
  const downloadTag = useRef(document.createElement('a'));
  const [isLoading, setIsLoading] = useState(!allTeachers);
  const [studentStatsMap, setStudentStatsMap] = useState({});

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);

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

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

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

  const getStudentStats = (teacher) => {
    if (studentStatsMap && studentStatsMap[teacher.name]) {
      // already fetched stats
      return;
    }

    Promise.all([getTimeSpent(teacher._id), getStudentList(teacher._id)])
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
          studentList: res[1]?.data || [],
        };

        setStudentStatsMap(clonedStatsMap);
      })
      .catch((err) => console.error(err));
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
  }, [
    allTeachers,
    debouncedNameSearch,
    debouncedGradeTaughtSearch,
    debouncedSchoolSearch,
    debouncedSchoolDistrictSearch,
  ]);

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

  // initialization
  useEffect(() => {
    if (allTeachers && !isLoading) {
      setFilteredTeachers(allTeachers);
    }
  }, [allTeachers, isLoading]);

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
    if (onRowAction) {
      onRowAction();
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTeacher(null);
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

      <Table
        data={filteredTeachers}
        rowExpanded={(teacher) => getStudentStats(teacher)}
        columns={[
          {
            display: 'Name',
            propertyName: 'name',
          },
          {
            display: 'Grade Taught',
            propertyName: 'gradeTaught',
            style: {
              maxWidth: '150px',
            },
          },
          {
            display: 'No. Of Students',
            propertyName: 'studentCount',
          },
          {
            display: 'School',
            propertyName: 'school',
          },
          {
            display: 'School District',
            propertyName: 'schoolDistrict',
          },
        ]}
        children={{
          expandableContent: ({ rowData, rowIndex }) => (
            <div
              className="admin-teacher-details-inner"
              ref={(el) => (detailsRefs.current[rowIndex] = el)}
            >
              <div className="admin-teacher-details-left">
                {teacherDetails.map((d) => (
                  <div key={d[0]} className="admin-teacher-detail-wrap">
                    <span className="admin-teacher-detail-label">{d[1]}</span>
                    <span className="admin-teacher-detail">
                      {rowData[d[0]] || '--'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="admin-teacher-details-right">
                <div className="student-stats-wrap">
                  <p style={{ marginBottom: '1rem' }}>Student Stats</p>
                  {studentStatsMap[rowData.name] ? (
                    <>
                      <div className="admin-teacher-detail-wrap">
                        <span className="admin-teacher-detail-label">
                          Total Time Spent
                        </span>
                        <span className="admin-teacher-detail">
                          {studentStatsMap[rowData.name].timeSpent} Hours
                        </span>
                      </div>
                      <div className="admin-teacher-detail-wrap">
                        <span className="admin-teacher-detail-label">
                          Started Tutorial
                        </span>
                        <span className="admin-teacher-detail">
                          {studentStatsMap[rowData.name].startedTutorial}
                        </span>
                      </div>
                      <div className="admin-teacher-detail-wrap">
                        <span className="admin-teacher-detail-label">
                          Completed Level 1
                        </span>
                        <span className="admin-teacher-detail">
                          {studentStatsMap[rowData.name].completedLevel1}
                        </span>
                      </div>
                      <div className="admin-teacher-detail-wrap">
                        <span className="admin-teacher-detail-label">
                          Completed Level 2
                        </span>
                        <span className="admin-teacher-detail">
                          {studentStatsMap[rowData.name].completedLevel2}
                        </span>
                      </div>
                      <div className="admin-teacher-detail-wrap">
                        <span className="admin-teacher-detail-label">
                          Won Game
                        </span>
                        <span className="admin-teacher-detail">
                          {studentStatsMap[rowData.name].wonGame}
                        </span>
                      </div>
                    </>
                  ) : (
                    <LoadingSpinner size="small" />
                  )}
                </div>
                <div style={{ margin: '0.5rem 0' }}>
                  <button
                    className="btn-small btn-primary btn-full-width"
                    onClick={() => {
                      setModalOpen(true);
                      setSelectedTeacher(rowData);
                    }}
                  >
                    Individual Stats
                  </button>
                </div>
                <div>
                  <button
                    className={`btn-danger btn-small`}
                    style={{ marginRight: '0.5rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      showAlert(e, 'teacher', rowData);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      color="#fff"
                      style={{ marginRight: '0.5rem' }}
                    />
                    Delete Teacher
                  </button>
                  <button
                    className={`btn-danger btn-small`}
                    onClick={(e) => {
                      e.stopPropagation();
                      showAlert(e, 'class', rowData);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      color="#fff"
                      style={{ marginRight: '0.5rem' }}
                    />
                    Delete Class
                  </button>
                </div>
              </div>
            </div>
          ),
        }}
      />
      {modalOpen && (
        <div className="teacher-browser-modal">
          <div className="modal-bg" onClick={closeModal}></div>
          <div className="teacher-browser-modal-inner box-shadow">
            <img
              style={{ zIndex: 1000 }}
              className="close-btn"
              src={cancelBtn}
              alt="Close"
              onClick={closeModal}
            />
            <div className="color-dark modal-title">Student Stats</div>
            <Table
              data={studentStatsMap[selectedTeacher?.name]?.studentList}
              emptyMessage={'No Students to Display'}
              rowsPerPage={10}
              rowDataTransformer={(student, propertyName) => {
                if (propertyName === 'timeSpent') {
                  return convertMs(student[propertyName], 'minutes');
                }
                if (propertyName === 'name') {
                  return `${student.firstName} ${student.lastName}`;
                }
                if (propertyName === 'totalTrophies') {
                  let total = 0;
                  (student.awards || []).forEach((level) => {
                    const trophyNames = Object.keys(level);
                    trophyNames.forEach((name) => {
                      if (level[name]) {
                        total += 1;
                      }
                    });
                  });
                  return String(total);
                }
                return student[propertyName];
              }}
              columns={[
                {
                  display: 'Username',
                  propertyName: 'name',
                },
                {
                  display: 'Minutes Played',
                  propertyName: 'timeSpent',
                },
                {
                  display: 'Levels Acheived',
                  propertyName: 'level',
                },
                {
                  display: 'Total Trophies',
                  propertyName: 'totalTrophies',
                },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="admin-loading-wrap">
      <LoadingSpinner />
    </div>
  );
};
