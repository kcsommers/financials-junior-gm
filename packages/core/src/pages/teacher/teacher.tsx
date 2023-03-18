import classnames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getClassStats } from '../../admin/utils/get-class-stats';
import { useAuth } from '../../auth/context/auth-context';
import { logger } from '../../utils/logger';
import { StorageKeys } from '../../auth/utils/storage-keys.constants';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Modal } from '../../components/Modal';
import { Snackbar } from '../../components/Snackbar';
import { Table } from '../../components/Table';
import { ApiHelper } from '../../api/api-helper';
import { convertMs } from '../../utils/convert-ms';
import styles from './teacher-dashboard.module.scss';

type TeacherDashboardProps = {
  apiBaseUrl: string;
};

export const CoreTeacherDashboard = ({ apiBaseUrl }: TeacherDashboardProps) => {
  const router = useRouter();
  const { logUserOut } = useAuth();
  const [modalOpen, setModalOpen] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [studentList, setStudentList] = useState(null);
  const [classStats, setClassStats] = useState({
    totalTime: 0,
    completedTutorial: 0,
    completedLevel1: 0,
    completedLevel2: 0,
    completedGame: 0,
  });

  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [snackbarConfig, setSnackbarConfig] = useState(null);

  useEffect(() => {
    getStudentList();
  }, []);

  useEffect(() => {
    if (!studentList || !studentList.length) {
      return;
    }
    const classStats = getClassStats(studentList);
    classStats.totalTime = convertMs(classStats.totalTime, 'minutes') as number;
    setClassStats(classStats);
  }, [studentList]);

  const getStudentList = async () => {
    if (!navigator.cookieEnabled) {
      return;
    }
    let id = '';
    if (sessionStorage.getItem(StorageKeys.TEACHER_ID_STORAGE_KEY)) {
      id = sessionStorage.getItem(StorageKeys.TEACHER_ID_STORAGE_KEY) as string;
    }
    try {
      const response = await ApiHelper.getStudentList(apiBaseUrl, id);
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
        student.totalTrophies = totalTrophies;
      });
      setStudentList(students);
    } catch (error) {
      console.error('TeacherDashboard.getStudentList', error);
    }
  };

  const showSnackbar = (config) => {
    setSnackbarConfig(config);
    setTimeout(() => {
      setSnackbarConfig(null);
    }, 3000);
  };

  const addStudent = async () => {
    try {
      await ApiHelper.addStudent(apiBaseUrl, {
        firstName: firstNameInput,
        lastName: lastNameInput,
      });
      closeModal();
      getStudentList();
      showSnackbar({ message: 'Student Added Successfully' });
    } catch (error) {
      console.error('TeacherDashboard.addStudent', error);
    }
  };

  const updateStudent = async () => {
    try {
      await ApiHelper.updateStudent(apiBaseUrl, selectedStudent?._id, {
        firstName: firstNameInput,
        lastName: lastNameInput,
      });
      closeModal();
      getStudentList();
      showSnackbar({ message: 'Student Updated Successfully' });
    } catch (error) {
      console.error('TeacherDashboard.updateStudent', error);
    }
  };

  const deleteStudent = async () => {
    try {
      await ApiHelper.deleteStudent(apiBaseUrl, selectedStudent?._id);
      closeModal();
      getStudentList();
      showSnackbar({ message: 'Student Deleted Successfully' });
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
      ApiHelper.addStudentInBulk(apiBaseUrl, selectedFile);
      setSelectedFile(null);
      closeModal();
      getStudentList();
      showSnackbar({ message: 'Students Added Successfully' });
    } catch (error) {
      console.error('TeacherDashboard.addStudentsFromCSV: ', error);
    }
  };

  const logoutSession = async () => {
    try {
      await ApiHelper.logout(apiBaseUrl);
      logUserOut();
      router.push('/');
    } catch (error) {
      logger.error(error);
    }
  };

  const getModalTemplate = () => {
    if (isUpload) {
      return (
        <div className={classnames(styles.modal_template, 'flex-1')}>
          <div className="text-foreground">Add Students in Bulk</div>
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
        <div
          className={classnames(styles.modal_template, 'flex-1 text-center')}
        >
          <div className={`color-primary ${styles.confirm_text}`}>
            Are You Sure?
          </div>
          <div className="text-foreground">
            Deleting this student cannot be undone.
          </div>
          <button className="btn-danger" onClick={deleteStudent}>
            Delete Student
          </button>
        </div>
      );
    }
    return (
      <div className={classnames(styles.modal_template, 'flex-1')}>
        <div className="text-foreground">
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
          className="btn-secondary"
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
    <div className="h-full w-full relative flex flex-col">
      <div className={styles.teacher_dashboard_header}>
        <h1>Teacher Dashboard</h1>
        <button className="btn-secondary" onClick={logoutSession}>
          Logout
        </button>
      </div>
      <div className={styles.teacher_dashboard_body}>
        <div className={styles.teacher_btns_wrap}>
          <button
            className="btn-secondary btn-small mr-3"
            onClick={() => setModalOpen(true)}
          >
            Add Student
          </button>
          <button
            className="btn-secondary btn-small"
            onClick={() => {
              setIsUpload(true);
              setModalOpen(true);
            }}
          >
            Upload CSV
          </button>
        </div>
        <div className={`${styles.class_stats_wrap} box-shadow`}>
          <h4 className="color-primary">Classroom Stats</h4>
          {!studentList ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className={styles.class_stat}>
                <p className={styles.class_stat_title}>Total Minutes Played:</p>
                <p className={styles.class_stat_value}>
                  {classStats.totalTime}
                </p>
              </div>
              <div className={styles.class_stat}>
                <p className={styles.class_stat_title}>Completed Tutorial:</p>
                <p className={styles.class_stat_value}>
                  {classStats.completedTutorial}
                </p>
              </div>
              <div className={styles.class_stat}>
                <p className={styles.class_stat_title}>Completed Level 1:</p>
                <p className={styles.class_stat_value}>
                  {classStats.completedLevel1}
                </p>
              </div>
              <div className={styles.class_stat}>
                <p className={styles.class_stat_title}>Completed Level 2:</p>
                <p className={styles.class_stat_value}>
                  {classStats.completedLevel2}
                </p>
              </div>
              <div className={styles.class_stat}>
                <p className={styles.class_stat_title}>Completed Game:</p>
                <p className={styles.class_stat_value}>
                  {classStats.completedGame}
                </p>
              </div>
            </>
          )}
        </div>
        <Table
          data={studentList}
          rowDataTransformer={(student, propertyName) => {
            if (propertyName === 'timeSpent') {
              return convertMs(student[propertyName], 'minutes');
            }
            if (propertyName === 'name') {
              return `${student.firstName} ${student.lastName}`;
            }
            return student[propertyName];
          }}
          columns={[
            {
              display: 'Name',
              propertyName: 'name',
            },
            {
              display: 'Username',
              propertyName: 'userName',
            },
            {
              display: 'Password',
              propertyName: 'password',
            },
            {
              display: 'Minutes Played',
              propertyName: 'timeSpent',
            },
            {
              display: 'Levels Achieved',
              propertyName: 'level',
            },
            {
              display: 'Total Trophies',
              propertyName: 'totalTrophies',
            },
          ]}
          children={{
            actions: ({ rowData }) => (
              <div>
                <span
                  className="text-foreground action-btn mr-2"
                  role="button"
                  onClick={() => {
                    setFirstNameInput(rowData.firstName);
                    setLastNameInput(rowData.lastName);
                    setSelectedStudent(rowData);
                    setIsDelete(false);
                    setModalOpen(true);
                  }}
                >
                  Update
                </span>
                <span
                  className="text-red-600 action-btn"
                  role="button"
                  onClick={() => {
                    setIsDelete(true);
                    setSelectedStudent(rowData);
                    setModalOpen(true);
                  }}
                >
                  Delete
                </span>
              </div>
            ),
          }}
        />
      </div>
      <Modal isVisible={modalOpen} onClose={closeModal}>
        <div className="h-full flex items-center justify-center p-12">
          {getModalTemplate()}
        </div>
      </Modal>
      <Snackbar config={snackbarConfig} isVisible={!!snackbarConfig} />
    </div>
  );
};
