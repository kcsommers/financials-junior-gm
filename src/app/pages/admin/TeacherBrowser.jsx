import { useState, useEffect, useRef, useCallback } from 'react';
import { LoadingSpinner } from '@components';
import { useDebounce } from './../../hooks/use-debounce';

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

export const TeacherBrowser = ({ allTeachers, history }) => {
  const detailsRefs = useRef([]);

  const [detailsStates, setDetailsStates] = useState({});

  const [isLoading, setIsLoading] = useState(!allTeachers);

  const [currentPage, setCurrentPage] = useState(1);

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

  const getDisplayedTeachers = useCallback(
    (teachers) => {
      console.log('GET DISPLAYED:::: ');
      const start = TEACHERS_PER_PAGE * currentPage - TEACHERS_PER_PAGE;
      const end = TEACHERS_PER_PAGE * currentPage;
      const displayed = teachers.slice(start, end);
      return displayed;
    },
    [currentPage]
  );

  const [displayedTeachers, setDisplayedTeachers] = useState(
    !allTeachers ? [] : getDisplayedTeachers(allTeachers)
  );

  const getTotalPages = useCallback(() => {
    if (!allTeachers) {
      return 0;
    }

    if (allTeachers.length <= TEACHERS_PER_PAGE) {
      return 1;
    }

    return Math.ceil(allTeachers.length / TEACHERS_PER_PAGE);
  }, [allTeachers]);

  const [totalPages, setTotalPages] = useState(getTotalPages());

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
    let filteredTeachers = allTeachers;
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

      filteredTeachers = allTeachers.filter((t) =>
        searchKeys.every((k) => String(t[k]).includes(searchTermMap[k]))
      );
    }

    console.log('filter eff:::: ');
    setDisplayedTeachers(getDisplayedTeachers(filteredTeachers));
    setCurrentPage(1);
  }, [
    allTeachers,
    debouncedNameSearch,
    debouncedGradeTaughtSearch,
    debouncedSchoolSearch,
    debouncedSchoolDistrictSearch,
    getDisplayedTeachers,
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

  // Loading
  useEffect(() => {
    if (allTeachers && isLoading) {
      setIsLoading(false);
      console.log('loading eff:::: ');
      setDisplayedTeachers(getDisplayedTeachers(allTeachers));
      setTotalPages(getTotalPages());
    }
  }, [allTeachers, isLoading, getDisplayedTeachers, getTotalPages]);

  // details refs effect
  useEffect(() => {
    if (!allTeachers) {
      return;
    }

    detailsRefs.current = detailsRefs.current.slice(0, allTeachers.length);
  }, [allTeachers]);

  return !isLoading ? (
    <div className='teacher-browser-wrap'>
      <h3>Teachers</h3>
      <div className='teacher-browser-search-wrap'>
        <p>Search by...</p>
        {searchByOptions.map((o) => (
          <div key={o.value} className='teacher-search-input-wrap'>
            <span>{o.label}</span>
            <input
              type='text'
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
                }
              }}
            />
          </div>
        ))}
      </div>

      <div className='teacher-browser-pagination-wrap'>
        Page
        <input
          type='text'
          value={currentPage}
          onChange={(e) => {
            if (!isNaN(+e.target.value)) {
              const page =
                +e.target.value > totalPages
                  ? totalPages
                  : +e.target.value <= 0
                  ? 1
                  : Math.round(+e.target.value);

              console.log('PAGE', page);
              setCurrentPage(page);
            }
          }}
        />
        of
        {totalPages}
      </div>

      {displayedTeachers.map((t, i) => (
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
                  ? '2rem 0rem'
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
