import moment from 'moment';
import { formatNumber } from '../utils';

export const convertMs = (ms, units) => {
  if (units === 'minutes') {
    const totalMinutes = moment.duration(ms).asMinutes();
    return formatNumber(Math.round(totalMinutes));
  }
};
