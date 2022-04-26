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

  freezeRental = (): Promise<any> => {
    return this.axios.post('/freeze', {
      headers: {
        'Access-Token': String(localStorage.getItem('Access-Token')),
      },
    });
  };

  unfreezeRental = (): Promise<any> => {
    return this.axios.post('/unfreeze', {
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
