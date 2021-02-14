import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { setLoginState } from '@redux/actions';

class StudentPortal extends Component {
  constructor(props) {
    super(props);

    const initialState = {
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

    if (
      this.props.loginState.isLoggedIn !== initialState.isLoggedIn ||
      this.props.loginState.role !== initialState.role
    ) {
      this.props.setLoginState({
        isLoggedIn: initialState.isLoggedIn,
        role: initialState.role,
      });
    }

    this.state = initialState;
  }

  render() {
    if (!this.state.isLoggedIn || this.state.role !== 'student') {
      return (
        <Redirect
          to={{
            pathname: '/dashboard',
          }}
        />
      );
    }
    return (
      <div style={{ height: '100%', overflow: 'hidden' }}>
        {this.props.screen}
      </div>
    );
  }
}
const actionsToProps = (state) => ({ loginState: state.loginState });
const dispatchToProps = { setLoginState };
export default connect(actionsToProps, dispatchToProps)(StudentPortal);
