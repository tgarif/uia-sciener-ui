import Dayjs from 'dayjs';

export const dayjs = Dayjs;

const KEYS = ['created_at', 'updated_at', 'start_date', 'end_date'];

export const formatTime = (json: any) => {
  for (const key in json) {
    if (json[key]) {
      if (KEYS.includes(key)) {
        json[key] = dayjs(json[key]).format('DD MMM YYYY HH:mm:ss A');
      }

      if (typeof json[key] === 'object') {
        formatTime(json[key]);
      }
    }
  }
};
