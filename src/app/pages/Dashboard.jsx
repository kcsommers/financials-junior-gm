import React from 'react';
import { ReactSVG } from 'react-svg';
import '@css/pages/Dashboard.css';
import financialsLogo from '@images/icons/dashboard/logo.svg';
import TeacherBtn from '@images/icons/dashboard/login_teachers.svg';
import StudentBtn from '@images/icons/dashboard/login_students.svg';
import RegisterBtn from '@images/icons/dashboard/login_registration.svg';
import TeacherBtnSelected from '@images/icons/forward-tab-selected.svg';
import StudentBtnSelected from '@images/icons/forward-tab-selected.svg';
import RegisterBtnSelected from '@images/icons/forward-tab-selected.svg';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TeacherBtn: TeacherBtn,
            StudentBtn: StudentBtn,
            RegisterBtn: RegisterBtn,
        };
    }

    handleTeacherClick = () => {
        // this.setState({
        //     TeacherBtn : TeacherBtnSelected
        // });
        this.props.history.push('/login/teacher');
    }

    handleStudentClick = () => {
        // this.setState({
        //     StudentBtn : StudentBtnSelected
        // });
        this.props.history.push('/login/student');
    }

    handleRegisterClick = () => {
        // this.setState({
        //     RegisterBtn : RegisterBtnSelected
        // });
        this.props.history.push('/signup');
    }

    render() {
        return (
            <div className="dash-div">
                <div><ReactSVG src={financialsLogo} /></div>
                <div className="dash-btn-list">
                    <div className="dash-btn">
                        <ReactSVG onClick={this.handleStudentClick} src={this.state.StudentBtn} />
                    </div>
                    <div className="dash-btn">
                        <ReactSVG onClick={this.handleTeacherClick} src={this.state.TeacherBtn} />
                    </div>
                    <div className="dash-btn">
                        <ReactSVG onClick={this.handleRegisterClick} src={this.state.RegisterBtn} />
                    </div>
                </div>
            </div>
        );
    }
}
export default Dashboard;