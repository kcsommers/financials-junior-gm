import { useState, useEffect } from 'react';
import { LoadingSpinner } from '@components';

export const TeacherBrowser = ({ allTeachers, history }) => {
  const [isLoading, setIsLoading] = useState(!allTeachers);
  const [currentPage, setCurrentPage] = useState(1);

  const getDisplayedTeachers = () => {
    const start = 100 * currentPage - 100;
    const end = 100 * currentPage;
    const displayed = allTeachers.slice(start, end);
    return displayed;
  };

  useEffect(() => {
    if (allTeachers && isLoading) {
      setIsLoading(false);
    }
  }, [allTeachers, isLoading]);

  return !isLoading ? (
    <div className='teacher-browser-wrap'>
      {getDisplayedTeachers().map((t, i) => (
        <div key={`${t.name}_${i}`} className='admin-teacher-wrap box-shadow'>
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
      ))}
    </div>
  ) : (
    <div className='admin-loading-wrap'>
      <LoadingSpinner />
    </div>
  );
};
