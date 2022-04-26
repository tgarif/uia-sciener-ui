import { RentalResponse } from '@interfaces/sciener.interface';
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
        'Access-Token': this.accessToken,
      },
    });
  };

  unfreezeRental = (): Promise<any> => {
    return this.axios.post('/unfreeze', {
      headers: {
        'Access-Token': this.accessToken,
      },
    });
  };

  getRental = (rental_id: string): Promise<RentalResponse> => {
    return this.axios.get(`/rentals/${rental_id}`, {
      headers: {
        'Access-Token': this.accessToken,
      },
    });
  };
}
