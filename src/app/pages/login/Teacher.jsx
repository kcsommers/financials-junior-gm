import React from 'react';
import { ReactSVG } from 'react-svg';
import * as api from '../../api-helper';
import '@css/pages/login/Teacher.css';
import financialsLogo from '@images/icons/dashboard/logo.svg';
import LoginBtn from '@images/icons/dashboard/login_button.svg';
import LoginBtnSelected from '@images/icons/dashboard/login_grey.svg';

class TeacherLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoginBtn: LoginBtn,
            userName: '',
            password: '',
            error: ''
        };
    }

    onLogin = () => {
        this.setState({
            LoginBtn: LoginBtnSelected
        });
        if (this.state.userName == "" || this.state.password == "") {
            if (this.state.userName == "" && this.state.password == "") {
                this.setState({ error: "Please enter username and password." });
            } else if (this.state.userName == "") {
                this.setState({ error: "Please enter username." });
            } else {
                this.setState({ error: "Please enter password." });
            }
            setTimeout(() => {
                this.setState({
                    LoginBtn: LoginBtn
                });
            }, 1000);
        } else {
            this.teacherLoginApi();
        }
    }

    teacherLoginApi() {
        let body = {
            email: this.state.userName,
            password: this.state.password
        };

        api.teacherLogin(body).then(response => {
            console.log(response)
            if (response.success) {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userRole", "teacher"); 
                localStorage.setItem("teacherId", response._id);
                this.props.history.push('/teacher/home');
            } else {
                this.setState({ error: response.Message });
            }
            setTimeout(() => {
                this.setState({
                    LoginBtn: LoginBtn
                });
            }, 500);
        }).catch(error => {
            setTimeout(() => {
                this.setState({
                    LoginBtn: LoginBtn
                });
            }, 500);
            console.log("catch---->>>>", error.response);
            this.setState({ error: error?.response?.data?.message });
        })
    }

    onUserNameChange = (e) => {
        var name = e.currentTarget.value;
        this.state.userName = name ? name : ""
        this.setState({ error: "" });
    }

    onPasswordChange = (e) => {
        var password = e.currentTarget.value;
        this.state.password = password ? password : ""
        this.setState({ error: "" });
    }

    dashboardNavigation = () => {
        this.props.history.push('/dashboard');
    }

    render() {
        return (
            <div className="login-div">
                <div><ReactSVG src={financialsLogo} /></div>
                <div className="login-form-div">
                    <div className="login-form-field">
                        <p className="login-form-label">Username or Email</p>
                        <input onChange={this.onUserNameChange} autoComplete="off" className="login-form-ip" type="text" placeholder="Username or Email" name="usernameEmail" maxLength="100" />
                    </div>
                    <div className="login-form-field">
                        <p className="login-form-label">Password</p>
                        <input onChange={this.onPasswordChange} autoComplete="off" className="login-form-ip" type="password" placeholder="Password" name="password" maxLength="100" />
                    </div>
                    <p className="error-text">{this.state.error}</p>
                    <p className="login-forgot-pwd">Forgot Password?</p>
                </div>
                <div className="login-btn" onClick={this.onLogin}>
                    <ReactSVG src={this.state.LoginBtn} />
                </div>
                <span onClick={this.dashboardNavigation} className="login-back-to-dashboard">Back To Dashboard</span>
            </div>
        )
    }
}

export default TeacherLogin;