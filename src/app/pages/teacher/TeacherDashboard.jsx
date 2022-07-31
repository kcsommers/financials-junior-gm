import '@css/pages/TeacherDashboard.css';
import { clearSessionStorage, TEACHER_ID_STORAGE_KEY } from '@data/auth/auth';
import { setLoginState } from '@redux/actions';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as api from '../../api-helper';
import { getClassStats } from '../../utils/get-class-stats';

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(null);
  const [selectedFile, setSelectedFile] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [classStats, setClassStats] = useState({
    totalTime: 0,
    completedTutorial: 0,
    completedLevel1: 0,
    completedLevel2: 0,
    completedGame: 0,
  });

  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  useEffect(() => {
    getStudentList();
  }, []);

  useEffect(() => {
    if (!studentList || !studentList.length) {
      return;
    }
    const classStats = getClassStats(studentList);
    setClassStats(classStats);
  }, [studentList]);

  const getStudentList = async () => {
    if (!navigator.cookieEnabled) {
      return;
    }
    let id = null;
    if (sessionStorage.getItem(TEACHER_ID_STORAGE_KEY)) {
      id = sessionStorage.getItem(TEACHER_ID_STORAGE_KEY);
    }
    try {
      const response = await api.getStudentList(id);
      const students = response.data || [];
      students.forEach((student) => {
        const totalTrophies = (student.awards || []).reduce((total, level) => {
          const trophyNames = Object.keys(level);
          trophyNames.forEach((name) => {
            if (level[name]) {
              total += 1;
            }
          });
          return total;
        }, 0);
        student.totalTrophiesEarned = totalTrophies;
      });
      setStudentList(students);
    } catch (error) {
      console.error('TeacherDashboard.getStudentList', error);
    }
  };

  const addStudent = async () => {
    try {
      await api.addStudent({
        firstName: firstNameInput,
        lastName: lastNameInput,
      });
      closeModal();
      getStudentList();
    } catch (error) {
      console.error('TeacherDashboard.addStudent', error);
    }
  };

  const updateStudent = async () => {
    try {
      await api.updateStudent(selectedStudent?._id, {
        firstName: firstNameInput,
        lastName: lastNameInput,
      });
      closeModal();
      getStudentList();
    } catch (error) {
      console.error('TeacherDashboard.updateStudent', error);
    }
  };

  const deleteStudent = async () => {
    try {
      await api.deleteStudent(selectedStudent?._id);
      closeModal();
      getStudentList();
    } catch (error) {
      console.error('TeacherDashboard.deleteStudent', error);
    }
  };

  const addStudentsFromCSV = async () => {
    if (!selectedFile) {
      console.error(
        'TeacherDashboard.addStudentsFromCSV: ',
        'No File Selected'
      );
      return;
    }
    try {
      await api.addStudentInBulk(selectedFile);
      setSelectedFile(null);
      closeModal();
      getStudentList();
    } catch (error) {
      console.error('TeacherDashboard.addStudentsFromCSV: ', error);
    }
  };

  const logoutSession = async () => {
    try {
      await api.logout();
      clearSessionStorage();
      history.push('/dashboard');
      dispatch(setLoginState(false, ''));
    } catch (error) {
      console.error('TeacherDashboard.logoutSession', error);
    }
  };

  const getModalTemplate = () => {
    if (isUpload) {
      return (
        <div className="modal-template">
          <div className="color-dark">Add Students in Bulk</div>
          <input
            name="inputFile"
            type="file"
            onChange={(e) => {
              e.preventDefault();
              const file = e.target.files[0];
              setSelectedFile(file);
            }}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
          <button
            className="btn-primary btn-small"
            onClick={addStudentsFromCSV}
            style={{ marginRight: '0.5rem' }}
          >
            Upload
          </button>
          <button className="btn-danger btn-small" onClick={closeModal}>
            Cancel
          </button>
        </div>
      );
    }
    if (isDelete) {
      return (
        <div className="modal-template">
          <div className="color-primary confirm-text">Are You Sure?</div>
          <div className="color-dark">
            Deleting this student cannot be undone.
          </div>
          <button className="btn-danger btn-full-width" onClick={deleteStudent}>
            Delete Student
          </button>
        </div>
      );
    }
    return (
      <div className="modal-template">
        <div className="color-dark">
          {selectedStudent ? 'Update' : 'Add'} Student
        </div>
        <label htmlFor="firstName">
          First Name
          <input
            type="text"
            name="firstName"
            placeholder="Please enter first name"
            value={firstNameInput}
            onChange={(e) => setFirstNameInput(e.target.value)}
          />
        </label>
        <label htmlFor="lastName">
          Last Name
          <input
            type="text"
            name="lastName"
            placeholder="Please enter last name"
            value={lastNameInput}
            onChange={(e) => setLastNameInput(e.target.value)}
          />
        </label>
        <button
          className="btn-accent btn-full-width"
          onClick={() => {
            if (selectedStudent) {
              updateStudent();
            } else {
              addStudent();
            }
          }}
        >
          {selectedStudent ? 'Update' : 'Create'} Student
        </button>
      </div>
    );
  };

  const closeModal = () => {
    setFirstNameInput('');
    setLastNameInput('');
    setSelectedStudent(null);
    setIsDelete(false);
    setIsUpload(false);
    setModalOpen(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        height: '100%',
        overflow: 'auto',
      }}
    >
      <div className="teacher-dashboard-header">
        <h1>Teacher Dashboard</h1>
        <button className="btn-accent" onClick={logoutSession}>
          Logout
        </button>
      </div>
      <div className="teacher-dashboard-body">
        <div className="teacher-dashboard-btns-wrap">
          <button
            className="btn-accent btn-small"
            onClick={() => setModalOpen(true)}
          >
            Add Student
          </button>
          <button
            className="btn-accent btn-small"
            onClick={() => {
              setIsUpload(true);
              setModalOpen(true);
            }}
          >
            Upload CSV
          </button>
        </div>
        <div className="class-stats-wrap box-shadow">
          <h4 className="color-primary">Classroom Stats</h4>
          <div className="class-stat">
            <p className="class-stat-title">Total Minutes Played:</p>
            <p className="class-stat-value">{classStats.totalTime}</p>
          </div>
          <div className="class-stat">
            <p className="class-stat-title">Completed Tutorial:</p>
            <p className="class-stat-value">{classStats.completedTutorial}</p>
          </div>
          <div className="class-stat">
            <p className="class-stat-title">Completed Level 1:</p>
            <p className="class-stat-value">{classStats.completedLevel1}</p>
          </div>
          <div className="class-stat">
            <p className="class-stat-title">Completed Level 2:</p>
            <p className="class-stat-value">{classStats.completedLevel2}</p>
          </div>
          <div className="class-stat">
            <p className="class-stat-title">Completed Game:</p>
            <p className="class-stat-value">{classStats.completedGame}</p>
          </div>
        </div>
        <div className="student-table-wrap">
          <div className="student-table box-shadow">
            <div className="student-table-row student-table-header-row">
              <div>Name</div>
              <div>Username</div>
              <div>Password</div>
              <div>Minutes Played</div>
              <div>Levels Achieved</div>
              <div>Total Trophies</div>
              <div>Actions</div>
            </div>
            {(studentList || []).map((student, i) => (
              <div
                key={`${student.firstName}-${i}`}
                className="student-table-row"
              >
                <div>
                  {student.firstName} {student.lastName}
                </div>
                <div>{student.userName}</div>
                <div>{student.password}</div>
                <div>{student.timeSpent}</div>
                <div>{student.level}</div>
                <div>{student.totalTrophiesEarned}</div>
                <div className="actions-column">
                  <span
                    className="color-dark"
                    role="button"
                    onClick={() => {
                      setFirstNameInput(student.firstName);
                      setLastNameInput(student.lastName);
                      setSelectedStudent(student);
                      setIsDelete(false);
                      setModalOpen(true);
                    }}
                  >
                    Update
                  </span>
                  <span
                    className="color-danger"
                    role="button"
                    onClick={() => {
                      setIsDelete(true);
                      setSelectedStudent(student);
                      setModalOpen(true);
                    }}
                  >
                    Delete
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="teacher-dashboard-modal">
          <div className="modal-bg" onClick={closeModal}></div>
          <div className="teacher-dashboard-modal-inner box-shadow">
            {getModalTemplate()}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
