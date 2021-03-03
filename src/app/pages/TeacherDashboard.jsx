import {
  LOGIN_STORAGE_KEY,
  USER_ROLE_STORAGE_KEY,
  TEACHER_ID_STORAGE_KEY,
} from '@data/auth/auth';
import { setLoginState } from '@redux/actions';
import { connect } from 'react-redux';

import React from 'react';
import '@css/pages/TeacherDashboard.css';
import * as api from '../api-helper';
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';

const SORTERS = {
  NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
  const mapper = (x) => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);
  if (data.field === 'id') {
    sorter =
      data.direction === 'ascending'
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter =
      data.direction === 'ascending'
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }
  return sorter;
};

class TeacherDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      selectedFile: null,
      showCSVForm: false,
    };
    //this.logoutSession = this.logoutSession.bind(this);
  }

  componentDidMount() {
    this.getStudentList();
  }

  getStudentList = () => {
    let id = null;
    if (sessionStorage.getItem(TEACHER_ID_STORAGE_KEY)) {
      id = sessionStorage.getItem(TEACHER_ID_STORAGE_KEY);
    }
    api
      .getStudentList(id)
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].name = res.data[i].firstName + ' ' + res.data[i].lastName;
        }

        this.state.dataList = res.data;
        this.setState({ dataList: this.state.dataList });
        console.log(this.state.dataList);
      })
      .catch((error) => {
        console.log('catch---->>>>', error.response);
      });
  };

  addStudent = (task) => {
    console.log('task', task);
    var body = {
      firstName: task.firstName,
      lastName: task.lastName,
    };
    api
      .addStudent(body)
      .then((res) => {
        console.log(res);
        alert(res.Message);
        this.getStudentList();
        return task;
      })
      .catch((error) => {
        console.log('catch---->>>>', error.response);
        if (error && error.response && error.response.status == 400) {
          alert(error.response?.data?.message);
        }
        return { firstName: '', lastName: '' };
      });
  };

  updateStudent(data, task) {
    var body = {
      firstName: data.firstName,
      lastName: data.lastName,
    };
    api
      .updateStudent(data._id, body)
      .then((res) => {
        console.log(res);
        alert(res.message);
        this.getStudentList();
        return task;
      })
      .catch((error) => {
        console.log('catch---->>>>', error.response);
        return data;
      });
  }

  deleteStudent(data) {
    if (data._id) {
      api
        .deleteStudent(data?._id)
        .then((res) => {
          console.log(res);
          this.getStudentList();
          alert(res.message);
          return data;
        })
        .catch((error) => {
          console.log('catch---->>>>', error.response);
          return { firstName: '', lastName: '' };
        });
    } else {
      return { firstName: '', lastName: '' };
    }
  }

  addStudentInBulk = () => {
    let file = this.state.selectedFile;
    if (file) {
      api
        .addStudentInBulk(file)
        .then((res) => {
          this.state.selectedFile = null;
          console.log('res upload csv', res);
          this.getStudentList();
          this.state.showCSVForm = false;
          this.setState({ showCSVForm: false });
        })
        .catch((error) => {
          this.state.selectedFile = null;
          console.log('catch---->>>>', error.response);
          if (error && error.response && error.response.status == 400) {
            alert(error.response?.data?.message);
            this.state.showCSVForm = false;
            this.setState({ showCSVForm: false });
          }
        });
    } else {
    }
  };

  handleSelectFile = (e) => {
    e.preventDefault();
    var file = e.target.files[0];
    this.state.selectedFile = file;
  };

  uploadCSVFile = () => {
    this.state.showCSVForm = true;
    this.setState({ showCSVForm: this.state.showCSVForm });
  };

  logoutSession = () => {
    api
      .logout()
      .then(() => {
        sessionStorage.setItem(LOGIN_STORAGE_KEY, false);
        sessionStorage.setItem(USER_ROLE_STORAGE_KEY, '');
        sessionStorage.setItem(TEACHER_ID_STORAGE_KEY, '');
        this.props.setLoginState();
        this.props.history.push('/dashboard');
      })
      .catch((err) => console.error(err));
    // api
    //   .logout()
    //   .then((res) => {
    //     this.props.history.push('/login/teacher');
    //     // alert(res.Message);
    //   })
    //   .catch((error) => {
    //     this.state.selectedFile = null;
    //     console.log('catch---->>>>', error.response);
    //     this.props.history.push('/login/teacher');
    //     // alert(error?.response?.message);
    //   });
  };

  renderStudentBulkAdd() {
    return (
      <div
        className={`crud-modal-wrapper ${
          this.state.showCSVForm ? 'show' : 'hide'
        }`}
      >
        <div className='crud-modal-wrapper__background'></div>
        <div className='crud-modal-wrapper__modal'>
          <h3 className='crud-modal-wrapper__title'>Add Student in Bulk</h3>
          <div>
            <form className='crud-modal-form'>
              <div className='crud-modal-form__field-container'>
                <label for='inputFile' className='crud-modal-form__label'>
                  Select file
                </label>
                <input
                  name='inputFile'
                  type='file'
                  onChange={this.handleSelectFile}
                  accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                />
              </div>
              {/* <button type="submit" onClick={this.addStudentInBulk} className="crud-button crud-button--positive">Add</button> */}
              <div
                className='crud-button crud-button--positive'
                style={{ display: 'inline-block' }}
                onClick={this.addStudentInBulk}
              >
                Upload
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  renderTable() {
    let count = this.state.dataList.length;
    const service = {
      create: (task) => {
        let newlyAdded = this.addStudent(task);
        return Promise.resolve(newlyAdded);
      },
      update: (data) => {
        const task = this.state.dataList.find((t) => t._id === data._id);
        task.firstName = data.firstName;
        task.lastName = data.lastName;
        let updated = this.updateStudent(data, task);
        return Promise.resolve(updated);
      },
      delete: (data) => {
        let deleted = this.deleteStudent(data);
        return Promise.resolve(deleted);
      },
    };

    return (
      <div style={{ maxHeight: '768px', overflow: 'auto' }}>
        <button
          className='crud-button crud-button--positive'
          onClick={this.uploadCSVFile}
        >
          Upload CSV
        </button>
        <button
          style={{ marginLeft: '10px' }}
          className='crud-button crud-button--positive'
          onClick={this.logoutSession}
        >
          Logout
        </button>
        <CRUDTable caption='List of Students' items={this.state.dataList}>
          <Fields>
            <Field name='name' label='Name' hideInCreateForm hideInUpdateForm />
            <Field
              name='firstName'
              label='First Name'
              placeholder='Please enter first name'
              hideFromTable
            />
            <Field
              name='lastName'
              label='Last Name'
              placeholder='Please enter last name'
              hideFromTable
            />
            <Field
              name='userName'
              label='User Name'
              hideInCreateForm
              hideInUpdateForm
            />
            <Field
              name='password'
              label='Password'
              sortable={false}
              hideInCreateForm
              hideInUpdateForm
            />
          </Fields>

          <CreateForm
            title='Add Student'
            trigger='Add Student'
            onSubmit={(task) => service.create(task)}
            submitText='Create'
            validate={(values) => {
              const errors = {};
              if (!values.firstName) {
                errors.firstName = 'Please enter first name.';
              }

              if (!values.lastName) {
                errors.lastName = 'Please enter last name.';
              }

              return errors;
            }}
          />
          <UpdateForm
            title='Update Student'
            trigger='Update'
            onSubmit={(task) => service.update(task)}
            submitText='Update'
            validate={(values) => {
              const errors = {};
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
            title='Delete Student'
            message='Are you sure you want to delete this student?'
            trigger='Delete'
            onSubmit={(task) => service.delete(task)}
            submitText='Delete'
          />
        </CRUDTable>
        {this.state.dataList.length == 0 ? (
          <div style={{ textAlign: 'center', margin: '20px' }}>
            {' '}
            No data found{' '}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }

  render() {
    return (
      <div className='teacher-dash-div'>
        {this.renderStudentBulkAdd()}

        {this.renderTable()}
        {/* 
                } */}
      </div>
    );
  }
}

const stateToProps = (state) => ({ teacher: state.teacherState.teacher });
const dispatchToProps = { setLoginState };
export default connect(stateToProps, dispatchToProps)(TeacherDashboard);
