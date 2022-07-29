import { TEACHER_ID_STORAGE_KEY, clearSessionStorage } from '@data/auth/auth';
import { setLoginState } from '@redux/actions';
import { connect } from 'react-redux';
import curriculumGuid from '../../../assets/pdf/curriculum_guide.pdf';
import teacherTutorial from '../../../assets/pdf/teacher_tutorial.pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import '@css/pages/TeacherDashboard.css';
import * as api from '../../api-helper';
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';

class TeacherDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      selectedFile: null,
      showCSVForm: false,
    };
  }

  componentDidMount() {
    this.getStudentList();
  }

  getStudentList = () => {
    if (!navigator.cookieEnabled) {
      return;
    }
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
        const students = res.data || [];
        students.forEach((student) => {
          const totalTrophies = (student.awards || []).reduce(
            (total, level) => {
              const trophyNames = Object.keys(level);
              trophyNames.forEach((name) => {
                if (level[name]) {
                  total += 1;
                }
              });
              return total;
            },
            0
          );
          student.totalTrophiesEarned = totalTrophies;
        });
        this.setState({ dataList: res.data });
      })
      .catch((error) => {
        console.log('catch---->>>>', error.response);
      });
  };

  addStudent = (task) => {
    var body = {
      firstName: task.firstName,
      lastName: task.lastName,
    };
    api
      .addStudent(body)
      .then((res) => {
        alert(res.Message);
        this.getStudentList();
        return task;
      })
      .catch((error) => {
        console.log('catch---->>>>', error.response);
        if (error && error.response && error.response.status === 400) {
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
          this.getStudentList();
          this.setState({ showCSVForm: false, selectedFile: null });
        })
        .catch((error) => {
          console.log('catch---->>>>', error.response);
          if (error && error.response && error.response.status === 400) {
            alert(error.response?.data?.message);
            this.setState({ showCSVForm: false, selectedFile: null });
          }
        });
    } else {
    }
  };

  handleSelectFile = (e) => {
    e.preventDefault();
    var file = e.target.files[0];
    this.setState({
      selectedFile: file,
    });
  };

  uploadCSVFile = () => {
    this.setState({ showCSVForm: true });
  };

  logoutSession = () => {
    api
      .logout()
      .then(() => {
        clearSessionStorage();
        this.props.setLoginState();
        this.props.history.push('/dashboard');
      })
      .catch((err) => console.error(err));
  };

  renderStudentBulkAdd() {
    return (
      <div
        className={`crud-modal-wrapper ${
          this.state.showCSVForm ? 'show' : 'hide'
        }`}
      >
        <div className="crud-modal-wrapper__background"></div>
        <div className="crud-modal-wrapper__modal">
          <FontAwesomeIcon
            icon={faTimes}
            color="#fff"
            onClick={() => {
              this.setState({ showCSVForm: false });
            }}
            style={{
              cursor: 'pointer',
              position: 'absolute',
              right: '1rem',
              top: '1rem',
              color: '#000',
            }}
          />
          <h3 className="crud-modal-wrapper__title">Add Student in Bulk</h3>
          <div>
            <form className="crud-modal-form">
              <div className="crud-modal-form__field-container">
                <label htmlFor="inputFile" className="crud-modal-form__label">
                  Select file
                </label>
                <input
                  name="inputFile"
                  type="file"
                  onChange={this.handleSelectFile}
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
              </div>
              <div
                className="crud-button crud-button--positive"
                style={{ display: 'inline-block', marginRight: '0.5rem' }}
                onClick={() => {
                  this.setState({ showCSVForm: false });
                }}
              >
                Cancel
              </div>
              <div
                className="crud-button"
                style={{ display: 'inline-block', backgroundColor: '#00788A' }}
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
        <div className="teacher-dashboard-header">
          {/* <div className="header-buttons-container-1">
            <a
              href={curriculumGuid}
              download="curriculum_guide.pdf"
              style={{ marginLeft: '10px' }}
              className="btn-primary btn-small"
            >
              Curriculum Guide
            </a>
            <a
              href={teacherTutorial}
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
              onClick={this.logoutSession}
            >
              Scout Page Tutorial
            </a>
            <a
              href="https://youtu.be/aG5UfofjRhQ"
              target="_blank"
              rel="noreferrer"
              style={{ marginLeft: '10px' }}
              className="btn-primary btn-small"
              onClick={this.logoutSession}
            >
              Season Page Tutorial
            </a>
          </div> */}
          <div className="header-buttons-container-2">
            <button
              className="btn-accent btn-small"
              onClick={this.logoutSession}
            >
              Logout
            </button>
            <button
              style={{ marginLeft: '10px' }}
              className="btn-accent btn-small"
              onClick={this.uploadCSVFile}
            >
              Upload CSV
            </button>
          </div>
        </div>
        <CRUDTable caption="List of Students" items={this.state.dataList}>
          <CreateForm
            title="Add Student"
            trigger="Add Student"
            onSubmit={(task) => service.create(task)}
            submitText="Create"
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
          <Fields>
            <Field name="name" label="Name" hideInCreateForm hideInUpdateForm />
            <Field
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
            <Field
              name="timeSpent"
              label="Minutes Played"
              sortable={false}
              hideInCreateForm
              hideInUpdateForm
            />
            <Field
              name="level"
              label="Levels Achieved"
              sortable={false}
              hideInCreateForm
              hideInUpdateForm
            />
            <Field
              name="totalTrophiesEarned"
              label="Total Tropies Earned"
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
            title="Delete Student"
            message="Are you sure you want to delete this student?"
            trigger="Delete"
            onSubmit={(task) => service.delete(task)}
            submitText="Delete"
          />
        </CRUDTable>
        {this.state.dataList.length === 0 ? (
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
      <div className="teacher-dash-div">
        {this.renderStudentBulkAdd()}

        {this.renderTable()}
      </div>
    );
  }
}

const stateToProps = (state) => ({ teacher: state.teacherState.teacher });
const dispatchToProps = { setLoginState };
export default connect(stateToProps, dispatchToProps)(TeacherDashboard);
