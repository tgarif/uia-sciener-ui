import { AxiosInstance, AxiosResponse } from 'axios';

export class ScienerApi {
  axios: AxiosInstance;
  accessToken: string;

  constructor(params: AxiosInstance) {
    this.axios = params;
    this.accessToken = localStorage.getItem('Access-Token') || '';
  }

  rootCall = (): Promise<any> => {
    return this.axios.get('/');
  };

  freezeRental = (): Promise<any> => {
    return this.axios.post('/freeze', {
      headers: {
        'Axios-Token': this.accessToken,
      },
    });
  };

  unfreezeRental = (): Promise<any> => {
    return this.axios.post('/unfreeze', {
      headers: {
        'Axios-Token': this.accessToken,
      },
    });
  };

  getRental = (): Promise<any> => {
    return this.axios.get('/rentals', {
      headers: {
        'Axios-Token': this.accessToken,
      },
    });
  };
}
