import { formatTime } from '@utils/dayjs.util';
import { config } from '@providers/config.provider';
import { ErrorResponse } from '@interfaces/response.interface';
import { Notify, Screen } from 'quasar';
import Axios, { AxiosError } from 'axios';

const publicInstance = Axios.create({
  baseURL: config.apiURL,
});

const privateInstance = Axios.create({
  baseURL: config.apiURL,
});

publicInstance.interceptors.request.use(
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

publicInstance.interceptors.response.use(
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

privateInstance.interceptors.request.use(
  (config) => {
    const configShallowCopy = { ...config };

    return {
      ...configShallowCopy,
      headers: {
        ...configShallowCopy.headers,
        'Access-Token': String(localStorage.getItem('Access-Token')),
      },
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

privateInstance.interceptors.response.use(
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

export const publicApi = publicInstance;
export const privateApi = privateInstance;
