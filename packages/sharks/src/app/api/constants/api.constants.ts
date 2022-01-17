import { environments } from 'app/environment';

export const BASE_URL = environments[process.env.NODE_ENV].API_BASE_URL;
