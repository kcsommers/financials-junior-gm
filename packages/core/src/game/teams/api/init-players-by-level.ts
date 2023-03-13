import axios from 'axios';
import { Student } from '../../../student/student.interface';

type InitPlayersResponse = {
  success: boolean;
  message: string;
  data: Student;
};

export const initPlayersByLevel = (
  level: number,
  apiBaseUrl: string
): Promise<InitPlayersResponse> => {
  return axios.get(`${apiBaseUrl}/api/v1/student/init/players/level/${level}`);
};
