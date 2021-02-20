import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { setLoginState } from '@redux/actions';
import { UserRoles, getIsLoggedIn, getUserRole } from '@data/auth/auth';

export const StudentPortal = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(getIsLoggedIn());
  const [userRole, setUserRole] = useState(getUserRole());

  // if (
  //   this.props.loginState.isLoggedIn !== initialState.isLoggedIn ||
  //   this.props.loginState.role !== initialState.role
  // ) {
  //   this.props.setLoginState(initialState.isLoggedIn, initialState.role);
  // }

  return isLoggedIn && userRole === UserRoles.STUDENT ? (
    <div style={{ height: '100%', overflow: 'hidden' }}>{props.screen}</div>
  ) : (
    <Redirect to={{ pathname: '/dashboard' }} />
  );
};

// class StudentPortal extends Component {
//   constructor(props) {
//     super(props);

//     const initialState = {
//       isLoggedIn:
//         localStorage.getItem('isLoggedIn') == 'true'
//           ? true
//           : localStorage.getItem('isLoggedIn') == true
//           ? true
//           : false,
//       role: localStorage.getItem('userRole')
//         ? localStorage.getItem('userRole')
//         : '',
//     };

//     if (
//       this.props.loginState.isLoggedIn !== initialState.isLoggedIn ||
//       this.props.loginState.role !== initialState.role
//     ) {
//       this.props.setLoginState(initialState.isLoggedIn, initialState.role);
//     }

//     this.state = initialState;
//   }

//   render() {
//     if (!this.state.isLoggedIn || this.state.role !== 'student') {
//       return (
//         <Redirect
//           to={{
//             pathname: '/dashboard',
//           }}
//         />
//       );
//     }
//     return (
//       <div style={{ height: '100%', overflow: 'hidden' }}>
//         {this.props.screen}
//       </div>
//     );
//   }
// }
// const actionsToProps = (state) => ({ loginState: state.loginState });
// const dispatchToProps = { setLoginState };
// export default connect(actionsToProps, dispatchToProps)(StudentPortal);
