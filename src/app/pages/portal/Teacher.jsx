import React, { Component } from 'react';
import { Redirect } from 'react-router';

class StudentPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn:
        localStorage.getItem('isLoggedIn') == 'true'
          ? true
          : localStorage.getItem('isLoggedIn') == true
          ? true
          : false,
      role: localStorage.getItem('userRole')
        ? localStorage.getItem('userRole')
        : '',
    };
  }

  logout() {
    this.props.history.push('/login/teacher');
  }

  render() {
    if (!this.state.isLoggedIn || this.state.role !== 'teacher') {
      return (
        <Redirect
          to={{
            pathname: '/dashboard',
          }}
        />
      );
    }
    return <div>{this.props.screen}</div>;
  }
}
export default StudentPortal;
