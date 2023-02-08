import moment from 'moment';
import { formatNumber } from './format-number';

export const convertMs = (ms: any, units: string) => {
  if (units === 'minutes') {
    const totalMinutes = moment.duration(ms).asMinutes();
    return formatNumber(Math.round(totalMinutes));
  }
};
