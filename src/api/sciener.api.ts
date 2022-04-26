import { RentalResponse } from '@interfaces/sciener.interface';
import { AxiosInstance, AxiosResponse } from 'axios';

export class ScienerApi {
  axios: AxiosInstance;

  constructor(params: AxiosInstance) {
    this.axios = params;
  }

  rootCall = (): Promise<any> => {
    return this.axios.get('/');
  };

  freezeRental = (id: string): Promise<any> => {
    return this.axios.post(`/freeze/${id}`, {
      headers: {
        'Access-Token': String(localStorage.getItem('Access-Token')),
      },
    });
  };

  unfreezeRental = (id: string): Promise<any> => {
    return this.axios.post(`/unfreeze/${id}`, {
      headers: {
        'Access-Token': String(localStorage.getItem('Access-Token')),
      },
    });
  };

  getRental = (rental_id: string): Promise<RentalResponse> => {
    return this.axios.get(`/rentals/${rental_id}`, {
      headers: {
        'Access-Token': String(localStorage.getItem('Access-Token')),
      },
    });
  };
}
