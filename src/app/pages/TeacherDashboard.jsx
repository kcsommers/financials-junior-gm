import React from 'react';
import '@css/pages/TeacherDashboard.css';
import * as api from '../api-helper';
import CRUDTable,
{
    Fields,
    Field,
    CreateForm,
    UpdateForm,
    DeleteForm,
} from 'react-crud-table';

const SORTERS = {
    NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
    NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
    STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
    STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a))
};

const getSorter = (data) => {
    const mapper = x => x[data.field];
    let sorter = SORTERS.STRING_ASCENDING(mapper);
    if (data.field === 'id') {
        sorter = data.direction === 'ascending' ?
            SORTERS.NUMBER_ASCENDING(mapper) : SORTERS.NUMBER_DESCENDING(mapper);
    } else {
        sorter = data.direction === 'ascending' ?
            SORTERS.STRING_ASCENDING(mapper) : SORTERS.STRING_DESCENDING(mapper);
    }
    return sorter;
};

class TeacherDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList: [],
            selectedFile: null,
        }

    }

    componentDidMount() {
        this.getStudentList();
    }

    getStudentList = () => {
        api.getStudentList().then(res => {
            console.log(res)
            this.state.dataList = res.data;
            this.setState({ dataList: res.data });
            console.log(this.state.dataList);
        }).catch(error => {
            console.log("catch---->>>>", error.response);
        })
    }

    addStudent = (task) => {
        var body = {
            firstName: task.firstName,
            lastName: task.lastName
        }
        api.addStudent(body).then(res => {
            console.log(res)
            alert(res.Message);
            this.getStudentList();
            return task;
        }).catch(error => {
            console.log("catch---->>>>", error.response);
            return { firstName: '', lastName: '' }
        })
    }

    updateStudent(data, task) {
        var body = {
            firstName: data.firstName,
            lastName: data.lastName
        }
        api.updateStudent(data._id, body).then(res => {
            console.log(res)
            alert(res.message)
            this.getStudentList();
            return task;
        }).catch(error => {
            console.log("catch---->>>>", error.response);
            return data;
        })
    }

    deleteStudent(data) {
        if (data._id) {
            api.deleteStudent(data?._id).then(res => {
                console.log(res)
                this.getStudentList();
                return data;
            }).catch(error => {
                console.log("catch---->>>>", error.response);
                return { firstName: '', lastName: '' }
            })
        } else {
            return { firstName: '', lastName: '' }
        }
    }

    addStudentInBulk = () => {
        let file = this.state.selectedFile;
        if (file) {
            api.addStudentInBulk(file).then(res => {
                this.state.selectedFile = null;
                console.log(res)
                this.getStudentList();
            }).catch(error => {
                this.state.selectedFile = null;
                console.log("catch---->>>>", error.response);
                alert(error?.response?.message);
            })
        } else {

        }

    }

    handleSelectFile = (e) => {
        e.preventDefault();
        var file = e.target.files[0];
        this.state.selectedFile = file;
    };

    renderStudentBulkAdd() {
        return (
            <div class="crud-modal-wrapper" style={{ display: "none" }}>
                <div class="crud-modal-wrapper__background"></div>
                <div class="crud-modal-wrapper__modal">
                    <h3 class="crud-modal-wrapper__title">Add Student in Bulk</h3>
                    <div>
                        <form class="crud-modal-form">
                            <div class="crud-modal-form__field-container">
                                <label for="inputFile" class="crud-modal-form__label">Select file</label>
                                <input name="inputFile" type="file" onChange={this.handleSelectFile} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                            </div>
                            <button type="submit" onClick={this.addStudentInBulk} class="crud-button crud-button--positive">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    renderTable() {
        let count = this.state.dataList.length;
        const service = {
            fetchItems: (payload) => {
                let result = Array.from(this.state.dataList);
                result = result.sort(getSorter(payload.sort));
                return Promise.resolve(result);
            },
            create: (task) => {
                // count += 1;
                // this.state.dataList.push({
                //     ...task,
                //     _id: count,
                // });
                // console.log("After Add");
                // console.log(this.state.dataList);
                let newlyAdded = this.addStudent(task);
                return Promise.resolve(newlyAdded);
            },
            update: (data) => {
                const task = this.state.dataList.find(t => t._id === data._id);
                task.firstName = data.firstName;
                task.lastName = data.lastName;
                // console.log("After Update");
                // console.log(this.state.dataList);
                let updated = this.updateStudent(data, task);
                return Promise.resolve(updated);
            },
            delete: (data) => {
                // const task = this.state.dataList.find(t => t._id === data._id);
                // this.state.dataList = this.state.dataList.filter(t => t._id !== task._id);
                // console.log("After Delete");
                // console.log(task);
                let deleted = this.deleteStudent(data);
                return Promise.resolve(deleted);
            },
        };

        return (
            <div>
                <CRUDTable
                    caption="List of Students"
                    fetchItems={payload => service.fetchItems(payload)}
                >
                    <Fields>
                        <Field
                            name="firstName"
                            label="First Name"
                            placeholder="Please enter first name"

                        />
                        <Field
                            name="lastName"
                            label="Last Name"
                            placeholder="Please enter last name"
                        />
                        <Field
                            name="password"
                            label="Password"
                            sortable={false}
                            hideInCreateForm
                            hideInUpdateForm
                        />
                    </Fields>
                    <CreateForm
                        title="Add Student"
                        trigger="Add Student"
                        onSubmit={task => service.create(task)}
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

                    <UpdateForm
                        title="Update Student"
                        trigger="Update"
                        onSubmit={task => service.update(task)}
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
                        onSubmit={task => service.delete(task)}
                        submitText="Delete"
                    />
                </CRUDTable>
            </div>
        )
    }

    render() {
        return (
            <div className='teacher-dash-div'>
                {this.renderStudentBulkAdd()}
                {
                    this.state.dataList.length > 0 ?
                        this.renderTable()
                        : ''
                }
            </div>
        )
    }
}
export default TeacherDashboard;