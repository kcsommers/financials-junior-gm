import { environments } from '../environments';

export const API_BASE_URL = environments[process.env.NODE_ENV].API_BASE_URL;
