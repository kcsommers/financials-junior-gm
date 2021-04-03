import { useState, useEffect, useRef } from 'react';
import { LoadingSpinner } from '@components';
import { Multiselect } from 'multiselect-react-dropdown';

const teacherDetails = [
  ['userName', 'User Name'],
  ['email', 'Email Address'],
  ['gradeTaught', 'Grade Taught'],
  ['classSize', 'Class Size'],
  ['school', 'School'],
  ['schoolDistrict', 'School District'],
  ['schoolAddress', 'School Address'],
  ['city', 'City'],
  ['state', 'State'],
  ['zipCode', 'Zip Code'],
];

const multiSelectOptions = [
  {
    name: 'Name',
    id: 'name',
  },
  {
    name: 'Grade Taught',
    id: 'gradeTaught',
  },
  {
    name: 'School',
    id: 'school',
  },
  {
    name: 'School District',
    id: 'schoolDistrict',
  },
];

export const TeacherBrowser = ({ allTeachers, history }) => {
  const [isLoading, setIsLoading] = useState(!allTeachers);

  const [currentPage, setCurrentPage] = useState(1);

  const detailsRefs = useRef([]);

  const [detailsStates, setDetailsStates] = useState({});

  const [selectedSearchValues, setSelectedSearchValues] = useState([
    {
      name: 'Name',
      id: 'name',
    },
  ]);

  const getDisplayedTeachers = () => {
    const start = 100 * currentPage - 100;
    const end = 100 * currentPage;
    const displayed = allTeachers.slice(start, end);
    return displayed;
  };

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

  useEffect(() => {
    if (allTeachers && isLoading) {
      setIsLoading(false);
    }
  }, [allTeachers, isLoading]);

  useEffect(() => {
    if (!allTeachers) {
      return;
    }

    detailsRefs.current = detailsRefs.current.slice(0, allTeachers.length);
  }, [allTeachers]);

  return !isLoading ? (
    <div className='teacher-browser-wrap'>
      <div className='teacher-browser-search-wrap'>
        <Multiselect
          className='teacher-browser-multi-select'
          options={multiSelectOptions}
          selectedValues={selectedSearchValues}
          displayValue='name'
          showCheckbox={true}
          closeOnSelect={false}
          placeholder='Search by...'
          avoidHighlightFirstOption={true}
          style={{
            chips: { background: '#f3901d' },
            searchBox: {
              border: 'none',
              borderBottom: '1px solid #00788a',
              borderRadius: '0px',
            },
          }}
        />
        <div className='teacher-search-input-wrap'>
          <input type='text' placeholder='Search' />
        </div>
      </div>

      {getDisplayedTeachers().map((t, i) => (
        <div
          key={`${t.name}_${i}`}
          className='admin-teacher-wrap box-shadow'
          onClick={toggleTeacher.bind(this, i)}
        >
          <div className='admin-teacher-top'>
            <span className='admin-teacher-plus-icon'>
              <span>+</span>
            </span>
            <div className='admin-teacher-left'>{t.name}</div>
            <div className='admin-teacher-left'>
              <button
                className='btn-primary btn-small'
                onClick={() => {
                  console.log(`/admin/teachers/${t._id}`);
                  history.push(`/admin/teachers/${t._id}`);
                }}
              >
                View Students
              </button>
            </div>
          </div>
          <div
            className='admin-teacher-details-wrap'
            style={{
              height: detailsStates[i]
                ? `${detailsStates[i].detailsHeight}px`
                : '0px',
              padding:
                detailsStates[i] && detailsStates[i].isExpanded
                  ? '2rem 1rem 2rem 0px'
                  : '0px',
            }}
          >
            <div
              className='admin-teacher-details-inner'
              ref={(el) => (detailsRefs.current[i] = el)}
            >
              {teacherDetails.map((d) => (
                <div key={d[0]} className='admin-teacher-detail-wrap'>
                  <span className='admin-teacher-detail-label'>{d[1]}</span>
                  <span className='admin-teacher-detail'>
                    {t[d[0]] || '--'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className='admin-loading-wrap'>
      <LoadingSpinner />
    </div>
  );
};
