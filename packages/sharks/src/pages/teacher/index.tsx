import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ApiHelper, StorageKeys } from '@statrookie/core';
import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { logger } from '@statrookie/core/src/auth/utils/logger';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CRUDTable, {
  CreateForm,
  DeleteForm,
  Field,
  Fields,
  UpdateForm,
} from 'react-crud-table';
import { API_BASE_URL } from '../../constants/api-base-url';
import styles from '../styles/teacher-dashboard.module.scss';

const TeacherDashboard = () => {
  const [dataList, setDataList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCSVForm, setShowCSVForm] = useState(false);
  const { logUserOut } = useAuth();
  const router = useRouter();

  const getStudentList = async () => {
    if (!navigator.cookieEnabled) {
      return;
    }
    let id = '';
    if (sessionStorage.getItem(StorageKeys.TEACHER_ID_STORAGE_KEY)) {
      id = sessionStorage.getItem(StorageKeys.TEACHER_ID_STORAGE_KEY) as string;
    }
    try {
      const studentListRes = await ApiHelper.getStudentList(API_BASE_URL, id);
      const studentList =
        studentListRes?.data?.data || studentListRes?.data || [];
      for (let i = 0; i < studentList.length; i++) {
        studentList[i].name =
          studentList[i].firstName + ' ' + studentList[i].lastName;
      }

      setDataList(studentList);
    } catch (error: any) {
      logger.error(error);
    }
  };

  useEffect(() => {
    getStudentList();
  }, []);

  const handleSelectFile = (e) => {
    e.preventDefault();
    var file = e.target.files[0];
    setSelectedFile(file);
  };

  const addStudentInBulk = async () => {
    if (!selectedFile) {
      return;
    }
    try {
      await ApiHelper.addStudentInBulk(API_BASE_URL, selectedFile);
      getStudentList();
      setShowCSVForm(false);
      setSelectedFile(null);
    } catch (error: any) {
      logger.error(error);
      alert(
        error.response?.data?.message || 'Unexpected error adding students'
      );
      setShowCSVForm(false);
      setSelectedFile(null);
    }
  };

  const logoutSession = async () => {
    try {
      await ApiHelper.logout(API_BASE_URL);
      logUserOut();
      router.push('/');
    } catch (error: any) {
      logger.error(error);
    }
  };

  const addStudent = async (task) => {
    var body = {
      firstName: task.firstName,
      lastName: task.lastName,
    };

    try {
      const addStudentRes = await ApiHelper.addStudent(API_BASE_URL, body);
      alert(addStudentRes.Message);
      getStudentList();
      return task;
    } catch (error: any) {
      logger.error(error);
      if (error?.response?.status === 400) {
        alert(error.response?.data?.message);
      }
      return { firstName: '', lastName: '' };
    }
  };

  const updateStudent = async (data, task) => {
    var body = {
      firstName: data.firstName,
      lastName: data.lastName,
    };

    try {
      const updateStudentRes = await ApiHelper.updateStudent(
        API_BASE_URL,
        data._id,
        body
      );
      alert(updateStudentRes.message);
      getStudentList();
      return task;
    } catch (error: any) {
      logger.error(error);
      return data;
    }
  };

  const service = {
    create: async (task) => {
      let newlyAdded = await addStudent(task);
      return newlyAdded;
    },
    update: async (data) => {
      const task = dataList.find((t) => t._id === data._id);
      task.firstName = data.firstName;
      task.lastName = data.lastName;
      let updated = await updateStudent(data, task);
      return updated;
    },
    delete: async (data) => {
      let deleted = await deleteStudent(data);
      return deleted;
    },
  };

  const deleteStudent = async (data) => {
    if (data._id) {
      try {
        const deleteRes = await ApiHelper.deleteStudent(
          API_BASE_URL,
          data?._id
        );
        getStudentList();
        alert(deleteRes.message);
        return data;
      } catch (error) {
        logger.error(error);
        return { firstName: '', lastName: '' };
      }
    } else {
      return { firstName: '', lastName: '' };
    }
  };

  return (
    <div className="relative text-center mb-6">
      <div
        className={`${styles.crud_modal_wrapper} ${
          showCSVForm ? styles.show : styles.hide
        }`}
      >
        <div className={styles.crud_modal_wrapper_background}></div>
        <div className={styles.crud_modal_wrapper_modal}>
          <FontAwesomeIcon
            icon={faTimes}
            color="#fff"
            onClick={() => {
              setShowCSVForm(false);
            }}
            style={{
              cursor: 'pointer',
              position: 'absolute',
              right: '1rem',
              top: '1rem',
              color: '#000',
            }}
          />
          <h3 className={styles.crud_modal_wrapper_title}>
            Add Student in Bulk
          </h3>
          <div>
            <form className={styles.crud_modal_form}>
              <div className={styles.crud_modal_form_field_container}>
                <label
                  htmlFor="inputFile"
                  className={styles.crud_modal_form_label}
                >
                  Select file
                </label>
                <input
                  name="inputFile"
                  type="file"
                  onChange={handleSelectFile}
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
              </div>
              <div
                className={`${styles.crud_button} ${styles.crud_button_positive}`}
                style={{ display: 'inline-block', marginRight: '0.5rem' }}
                onClick={() => {
                  setShowCSVForm(false);
                }}
              >
                Cancel
              </div>
              <div
                className={styles.crud_button}
                style={{ display: 'inline-block', backgroundColor: '#00788A' }}
                onClick={addStudentInBulk}
              >
                Upload
              </div>
            </form>
          </div>
        </div>
      </div>
      <div style={{ maxHeight: '768px', overflow: 'auto' }}>
        <div className={styles.teacher_dashboard_header}>
          <div className={styles.header_buttons_container_1}>
            <a
              href="assets/pdf/curriculum_guide.pdf"
              download="curriculum_guide.pdf"
              style={{ marginLeft: '10px' }}
              className="btn-primary btn-small"
            >
              Curriculum Guide
            </a>
            <a
              href="assets/pdf/teacher_tutorial.pdf"
              download="teacher_tutorial.pdf"
              style={{ marginLeft: '10px' }}
              className="btn-primary btn-small"
            >
              Tutorial PDF
            </a>
            <a
              href="https://youtu.be/dsS-Zm20bnE"
              target="_blank"
              rel="noreferrer"
              style={{ marginLeft: '10px' }}
              className="btn-primary btn-small"
            >
              Getting Started Tutorial
            </a>
            <a
              href="https://youtu.be/8uNFa2oQ6hk"
              target="_blank"
              rel="noreferrer"
              style={{ marginLeft: '10px' }}
              className="btn-primary btn-small"
            >
              Home Page Tutorial
            </a>
            <a
              href="https://youtu.be/Aoj5gMzzwCs"
              target="_blank"
              rel="noreferrer"
              style={{ marginLeft: '10px' }}
              className="btn-primary btn-small"
            >
              Budget Page Tutorial
            </a>
            <a
              href="https://youtu.be/6ORfGmXSZxM"
              target="_blank"
              rel="noreferrer"
              style={{ marginLeft: '10px' }}
              className="btn-primary btn-small"
            >
              Team Page Tutorial
            </a>
            <a
              href="https://youtu.be/46pCAu6DXQg"
              target="_blank"
              rel="noreferrer"
              style={{ marginLeft: '10px' }}
              className="btn-primary btn-small"
              onClick={logoutSession}
            >
              Scout Page Tutorial
            </a>
            <a
              href="https://youtu.be/aG5UfofjRhQ"
              target="_blank"
              rel="noreferrer"
              style={{ marginLeft: '10px' }}
              className="btn-primary btn-small"
              onClick={logoutSession}
            >
              Season Page Tutorial
            </a>
          </div>
          <div className={styles.header_buttons_container_2}>
            <button className="btn-accent btn-small" onClick={logoutSession}>
              Logout
            </button>
            <button
              style={{ marginLeft: '10px' }}
              className="btn-accent btn-small"
              onClick={() => setShowCSVForm(true)}
            >
              Upload CSV
            </button>
          </div>
        </div>
        <CRUDTable caption="List of Students" items={dataList}>
          <CreateForm
            title="Add Student"
            trigger="Add Student"
            onSubmit={(task) => service.create(task)}
            submitText="Create"
            validate={(values) => {
              const errors: any = {};
              if (!values.firstName) {
                errors.firstName = 'Please enter first name.';
              }

              if (!values.lastName) {
                errors.lastName = 'Please enter last name.';
              }

              return errors;
            }}
          />
          <Fields>
            <Field name="name" label="Name" hideInCreateForm hideInUpdateForm />
            <Field
              name="firstName"
              label="First Name"
              placeholder="Please enter first name"
              hideFromTable
            />
            <Field
              name="lastName"
              label="Last Name"
              placeholder="Please enter last name"
              hideFromTable
            />
            <Field
              name="userName"
              label="User Name"
              hideInCreateForm
              hideInUpdateForm
            />
            <Field
              name="password"
              label="Password"
              sortable={false}
              hideInCreateForm
              hideInUpdateForm
            />
          </Fields>
          <UpdateForm
            title="Update Student"
            trigger="Update"
            onSubmit={(task) => service.update(task)}
            submitText="Update"
            validate={(values) => {
              const errors: any = {};
              if (!values.firstName) {
                errors.firstName = 'Please enter first name.';
              }
              if (!values.lastName) {
                errors.lastName = 'Please enter last name.';
              }
              return errors;
            }}
          />

          <DeleteForm
            title="Delete Student"
            message="Are you sure you want to delete this student?"
            trigger="Delete"
            onSubmit={(task) => service.delete(task)}
            submitText="Delete"
          />
        </CRUDTable>
        {!dataList?.length && (
          <div className="text-center m-12">No data found</div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
