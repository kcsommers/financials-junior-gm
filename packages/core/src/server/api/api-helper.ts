import axios from 'axios';
import Cookie from 'js-cookie';
import {
  GetUserResponse,
  LoginCredentials,
  LoginResponse,
  Student,
} from '../../auth';
import { IPlayer } from '../../players';

const https = require('https');

let myInterceptor;

if (!myInterceptor) {
  myInterceptor = axios.interceptors.request.use(
    (config) => {
      config.timeout = 0.5 * 60 * 1000;

      config.headers['Content-Type'] = 'application/json';
      config.headers['Access-Control-Allow-Credentials'] = String(true);
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

export namespace ApiHelper {
  // Teacher Login
  export const teacherLogin = (
    _baseUrl: string,
    body
  ): Promise<LoginResponse> => {
    return axios.post(`${_baseUrl}/api/v1/auth/login`, body);
  };

  // Teacher reset password
  export const resetTeacherPassword = (
    _baseUrl: string,
    body
  ): Promise<any> => {
    return axios.post(`${_baseUrl}/api/v1/auth/reset`, body);
  };

  // Teacher reset password
  export const updateTeacherPassword = (
    _baseUrl: string,
    body
  ): Promise<any> => {
    return axios.put(`${_baseUrl}/api/v1/auth/password`, body);
  };

  // Teacher Register
  export const registerTeacher = (_baseUrl: string, body): Promise<any> => {
    return axios.post(`${_baseUrl}/api/v1/auth/register`, body);
  };

  // Student Login
  export const studentLogin = (
    _baseUrl: string,
    body
  ): Promise<LoginResponse> => {
    return axios.post(`${_baseUrl}/api/v1/auth/student/login`, body);
  };

  // Admin Login
  export const adminLogin = async (
    baseUrl: string,
    creds: LoginCredentials
  ): Promise<LoginResponse> => {
    return axios.post(`${baseUrl}/api/v1/auth/admin/login`, creds);
  };

  export const getAllTeachers = (_baseUrl: string): Promise<any> => {
    return axios.get(`${_baseUrl}/api/v1/admin/teachers `);
  };

  // Get Students
  export const getAllStudents = (_baseUrl: string): Promise<any> => {
    return axios.get(`${_baseUrl}/api/v1/student`);
  };

  export function getStudentList(_baseUrl: string, id): Promise<any> {
    return axios.get(
      `${_baseUrl}/api/v1/student?user=${id}&sort=firstName,lastName`
    );
  }

  // Add a Student
  export function addStudent(_baseUrl: string, body): Promise<any> {
    return axios.post(`${_baseUrl}/api/v1/student`, body);
  }

  // Add a Student in bulk
  export function addStudentInBulk(_baseUrl: string, file): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return axios.post(`${_baseUrl}/api/v1/student/bulk`, formData, config);
  }

  // Update a Student
  export function updateStudent(_baseUrl: string, id, body): Promise<any> {
    return axios.put(`${_baseUrl}/api/v1/student/${id}`, body);
  }

  // Delete a Student /api/v1/student
  export function deleteStudent(_baseUrl: string, id): Promise<any> {
    return axios.delete(`${_baseUrl}/api/v1/student/${id}`);
  }

  //Delete Students By Teacher /api/v1/admin/students/:teacherId
  export function deleteStudentsByTeacher(_baseUrl: string, id): Promise<any> {
    return axios.delete(`${_baseUrl}/api/v1/admin/students/${id}`);
  }

  //Delete Teacher By Id /api/v1/admin/students/:teacherId
  export function deleteTeacherById(_baseUrl: string, id): Promise<any> {
    return axios.delete(`${_baseUrl}/api/v1/admin/teacher/${id}`);
  }

  // Logout
  export function logout(baseUrl: string) {
    Cookie.remove('token');
    return Promise.resolve(true);
    return axios.get(`${baseUrl}/api/v1/auth/logout`);
  }

  // get current student
  export const getCurrentUser = async (
    _baseUrl: string
  ): Promise<GetUserResponse> => {
    return axios.get(`${_baseUrl}/api/v1/auth/user`);
  };

  // init players
  export const initPlayersByLevel = (_baseUrl: string, level): Promise<any> => {
    return axios.get(`${_baseUrl}/api/v1/student/init/players/level/${level}`);
  };

  // update student
  export const updateStudentById = (
    _baseUrl: string,
    id,
    data
  ): Promise<any> => {
    return axios.put(`${_baseUrl}/api/v1/student/${id}`, data);
  };

  // set initial team
  export const setInitialTeam = (
    _baseUrl: string,
    _student: Student,
    _players: IPlayer[]
  ) => {
    return updateStudentById(_baseUrl, _student._id, { players: _players });
  };

  // get time spent
  // @TODO
  export const getTimeSpent = (
    _baseUrl: string,
    teacherId?: number
  ): Promise<any> => {
    const teacherQuery = teacherId ? `?user=${teacherId}` : '';
    return axios.get(
      `${_baseUrl}/api/v1/admin/students/timespent${teacherQuery}`
    );
  };
}
