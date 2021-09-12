import axios from 'axios';
import { PlayerAssignments } from '@data/players/players';
import { environments } from './environment';
import Cookie from 'js-cookie';

const https = require('https');

let myInterceptor;

if (!myInterceptor) {
  myInterceptor = axios.interceptors.request.use(
    (config) => {
      config.timeout = 0.5 * 60 * 1000;

      config.headers['Content-Type'] = 'application/json';
      config.headers['Access-Control-Allow-Credentials'] = true;
      config.headers['Authorization'] = Cookie.get('token')
        ? Cookie.get('token')
        : ''; // Attaching persisted token from the browser cookie

      const agent = new https.Agent({
        rejectUnauthorized: false,
      });

      config.httpsAgent = agent;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        return response.data;
      }
      return Promise.reject(response);
    },
    (error) => {
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

const getBaseUrl = () => {
  return environments[process.env.NODE_ENV].API_BASE_URL;
};

//Teacher Login
export const teacherLogin = (body) => {
  return axios.post(`${getBaseUrl()}/api/v1/auth/login`, body);
};

// Teacher reset password
export const resetTeacherPassword = (body) => {
  return axios.post(`${getBaseUrl()}/api/v1/auth/reset`, body);
};

// Teacher reset password
export const updateTeacherPassword = (body) => {
  return axios.put(`${getBaseUrl()}/api/v1/auth/password`, body);
};

//Teacher Register
export const registerTeacher = (body) => {
  return axios.post(`${getBaseUrl()}/api/v1/auth/register`, body);
};

//Student Login
export const studentLogin = (body) => {
  return axios.post(`${getBaseUrl()}/api/v1/auth/student/login`, body);
};

//Admin Login
export const adminLogin = (body) => {
  return axios.post(`${getBaseUrl()}/api/v1/auth/admin/login`, body);
};

export const getAllTeachers = () => {
  return axios.get(`${getBaseUrl()}/api/v1/admin/teachers `);
};

//Get Students

export const getAllStudents = () => {
  return axios.get(`${getBaseUrl()}/api/v1/student`);
};

export function getStudentList(id) {
  return axios.get(
    `${getBaseUrl()}/api/v1/student?user=${id}&sort=firstName,lastName`
  );
}

//Add a Student
export function addStudent(body) {
  return axios.post(`${getBaseUrl()}/api/v1/student`, body);
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
  return axios.post(`${getBaseUrl()}/api/v1/student/bulk`, formData, config);
}

//Update a Student
export function updateStudent(id, body) {
  return axios.put(`${getBaseUrl()}/api/v1/student/${id}`, body);
}

//Delete a Student /api/v1/student
export function deleteStudent(id) {
  return axios.delete(`${getBaseUrl()}/api/v1/student/${id}`);
}

//Delete Students By Teacher /api/v1/admin/students/:teacherId
export function deleteStudentsByTeacher(id) {
  return axios.delete(`${getBaseUrl()}/api/v1/admin/students/${id}`);
}

//Delete Teacher By Id /api/v1/admin/students/:teacherId
export function deleteTeacherById(id) {
  return axios.delete(`${getBaseUrl()}/api/v1/admin/teacher/${id}`);
}

//Logout
export function logout() {
  Cookie.remove('token'); //
  return Promise.resolve();
}

// get current student
export const getCurrentUser = () => {
  return axios.get(`${getBaseUrl()}/api/v1/auth/user`);
};

// init players
export const initPlayersByLevel = (level) => {
  return axios.get(
    `${getBaseUrl()}/api/v1/student/init/players/level/${level}`
  );
};

// update student
export const updateStudentById = (id, data) => {
  return axios.put(`${getBaseUrl()}/api/v1/student/${id}`, data);
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

// get time spent
export const getTimeSpent = (teacherId) => {
  const teacherQuery = teacherId ? `?user=${teacherId}` : '';
  return axios.get(
    `${getBaseUrl()}/api/v1/admin/students/timespent${teacherQuery}`
  );
};
