import React from 'react';
import { ReactSVG } from 'react-svg';
import * as api from '../../api-helper';
import '@css/pages/login/Teacher.css';
import '@css/pages/login/Student.css';
import financialsLogo from '@images/icons/dashboard/logo.svg';
import LoginBtn from '@images/icons/dashboard/login_button.svg';
import LoginBtnSelected from '@images/icons/dashboard/login_grey.svg';

class StudentLogin extends React.Component {
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
            // alert(this.state.userName + " " + this.state.password);
            this.studentLoginApi();
        }
    }

    studentLoginApi() {
        let body = {
            userName: this.state.userName,
            password: this.state.password
        };

        api.studentLogin(body).then(res => {
            console.log(res)
            if (res.success) {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userRole", "student");
                this.props.history.push('/home');
            } else {
                this.setState({ error: res.Message });
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
                <div className="stud-login-form-div">
                    <div className="login-form-field">
                        <p className="login-form-label">Username</p>
                        <input onChange={this.onUserNameChange} autoComplete="off" className="login-form-ip" type="text" placeholder="Username" name="username" maxLength="100" />
                    </div>
                    <div className="login-form-field">
                        <p className="login-form-label">Password</p>
                        <input onChange={this.onPasswordChange} autoComplete="off" className="login-form-ip" type="password" placeholder="Password" name="password" maxLength="100" />
                    </div>
                    <p className="error-text">{this.state.error}</p>
                </div>
                <div className="login-btn" onClick={this.onLogin}>
                    <ReactSVG src={this.state.LoginBtn} />
                </div>
                <span onClick={this.dashboardNavigation} className="login-back-to-dashboard">Back To Dashboard</span>
            </div>
        )
    }
}

export default StudentLogin;