import axios from 'axios';
import { PlayerAssignments } from '@data/players/players';

let HOST_SERVER_NAME = 'TEST';
// let HOST_SERVER_NAME = "PROD";

let https = require('https');

let myInterceptor;

if (!myInterceptor) {
  myInterceptor = axios.interceptors.request.use(
    function (config) {
      config.timeout = 0.5 * 60 * 1000;

      config.headers['Content-Type'] = 'application/json';
      config.headers['Access-Control-Allow-Credentials'] = true;
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });

      config.httpsAgent = agent;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      if (response && response.data) {
        return response.data;
      }
      return Promise.reject(response);
    },
    function (error) {
      let response = {
        data: {
          message: '',
        },
      };
      if (
        error.message &&
        error.message.toLowerCase().indexOf('timeout') > -1
      ) {
        response.data.message =
          'Unable to connect with server. Please try again later.';
      } else if (
        error.message &&
        error.message.toLowerCase().indexOf('network') > -1
      ) {
        response.data.message = error.message;
      }
      if (response.data.message) {
        error['response'] = response;
      }
      return Promise.reject(error);
    }
  );
}
axios.defaults.withCredentials = true;
function getHostName() {
  if (HOST_SERVER_NAME == 'PROD') {
    return 'https://sfe-api.herokuapp.com'; //'http://ec2-18-236-146-143.us-west-2.compute.amazonaws.com'; //AWS PROD
  } else {
    return 'https://sfe-api.herokuapp.com'; //'http://ec2-18-236-146-143.us-west-2.compute.amazonaws.com'; //AWS TEST
  }
}

//Teacher Login
export function teacherLogin(body) {
  return axios.post(`${getHostName()}/api/v1/auth/login`, body);
}

//Student Login
export function studentLogin(body) {
  return axios.post(`${getHostName()}/api/v1/auth/student/login`, body);
}

//Get Students

export function getStudentList(id) {
  return axios.get(
    `${getHostName()}/api/v1/student?user=${id}&sort=firstName,lastName`
  );
}

//Add a Student
export function addStudent(body) {
  return axios.post(`${getHostName()}/api/v1/student`, body);
}

//Add a Student in bulk
export function addStudentInBulk(file) {
  const formData = new FormData();
  formData.append('file', file);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  return axios.post(`${getHostName()}/api/v1/student/bulk`, formData, config);
}

//Update a Student
export function updateStudent(id, body) {
  return axios.put(`${getHostName()}/api/v1/student/${id}`, body);
}

//Delete a Student /api/v1/student
export function deleteStudent(id) {
  return axios.delete(`${getHostName()}/api/v1/student/${id}`);
}

//Logout
export function logout() {
  return axios.get(`${getHostName()}/api/v1/auth/logout`);
}

// get current student
export const getCurrentUser = () => {
  return axios.get(`${getHostName()}/api/v1/auth/user`);
};

// init players
export const initPlayersByLevel = (level) => {
  return axios.get(
    `${getHostName()}/api/v1/student/init/players/level/${level}`
  );
};

// update student
export const updateStudentById = (id, data) => {
  return axios.put(`${getHostName()}/api/v1/student/${id}`, data);
};

// set initial team
export const setInitialTeam = (student) => {
  student.players.forEach((p) => {
    if (p.playerName === 'Matthew Nieto') {
      p.playerAssignment = PlayerAssignments.F_ONE;
    } else if (p.playerName === 'Sam Greenfeld') {
      p.playerAssignment = PlayerAssignments.F_TWO;
    } else if (p.playerName === 'Andrew Park') {
      p.playerAssignment = PlayerAssignments.G_ONE;
    } else if (
      p.playerName === 'Emily Burch' &&
      p.playerAssignment !== PlayerAssignments.SCOUT
    ) {
      p.playerAssignment = PlayerAssignments.D_ONE;
    } else if (p.playerName === 'Theo Johnson') {
      p.playerAssignment = PlayerAssignments.D_TWO;
    }
  });

  return updateStudentById(student._id, { players: student.players });
};
