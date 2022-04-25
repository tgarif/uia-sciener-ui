import { formatTime } from '@utils/dayjs.util';
import { config } from 'providers/config.provider';
import { Notify, Screen } from 'quasar';
import Axios, { AxiosError } from 'axios';

const instance = Axios.create({
  baseURL: config.apiURL,
});

instance.interceptors.request.use(
  (config) => {
    const configShallowCopy = { ...config };

    // your axios config here...

    return {
      ...configShallowCopy,
    };
  },
  (error: AxiosError<any>) => {
    let caption = error.response?.data.error.message;

    Notify.create({
      color: 'blue-grey-8',
      message: error.response?.data.error.code || 'Something went wrong',
      caption,
      icon: 'error',
      position: Screen.lt.md ? 'bottom' : 'bottom-left',
      actions: [
        {
          label: 'x',
          color: 'blue-grey-1',
        },
      ],
    });
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.data) {
      if (response.data.data.constructor === Object) {
        formatTime(response.data.data);
      }

      // TODO: Handle if response is array
    }

    return response.data.data;
  },
  (error: AxiosError<any>) => {
    let caption = error.response?.data.error.message;

    Notify.create({
      color: 'blue-grey-8',
      message: error.response?.data.error.code || 'Something went wrong',
      caption,
      icon: 'error',
      position: Screen.lt.md ? 'bottom' : 'bottom-left',
      actions: [
        {
          label: 'x',
          color: 'blue-grey-1',
        },
      ],
    });
    return Promise.reject(error);
  }
);

export const axios = instance;
