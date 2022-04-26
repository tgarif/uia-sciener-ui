import { formatTime } from '@utils/dayjs.util';
import { config } from '@providers/config.provider';
import { ErrorResponse } from '@interfaces/response.interface';
import { Notify, Screen, Platform } from 'quasar';
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
  (error: AxiosError<ErrorResponse>) => {
    let caption = error.response?.data.detail || '';

    Notify.create({
      color: 'blue-grey-8',
      message: String(error.response?.status) || 'Something went wrong',
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
    if (response.data) {
      if (response.data.constructor === Object) {
        formatTime(response.data);
      }

      // TODO: Handle if response is array
    }

    return response.data;
  },
  (error: AxiosError<ErrorResponse>) => {
    let caption = error.response?.data.detail || '';

    Notify.create({
      color: 'blue-grey-8',
      message: String(error.response?.status) || 'Something went wrong',
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
