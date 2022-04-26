import {
  FreezeUnfreezeResponse,
  RentalResponse,
} from '@interfaces/sciener.interface';
import { AxiosInstance, AxiosResponse } from 'axios';

export class ScienerApi {
  axios: AxiosInstance;

  constructor(params: AxiosInstance) {
    this.axios = params;
  }

  rootCall = (): Promise<any> => {
    return this.axios.get('/');
  };

  freezeRental = (id: string): Promise<FreezeUnfreezeResponse> => {
    return this.axios.post(`/freeze/${id}`);
  };

  unfreezeRental = (id: string): Promise<FreezeUnfreezeResponse> => {
    return this.axios.post(`/unfreeze/${id}`);
  };

  getRental = (rental_id: string): Promise<RentalResponse> => {
    return this.axios.get(`/rentals/${rental_id}`);
  };
}
