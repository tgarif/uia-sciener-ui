import { CredentialResponse } from '@interfaces/credential.interface';
import { AxiosInstance, AxiosResponse } from 'axios';

export class CredentialApi {
  axios: AxiosInstance;

  constructor(params: AxiosInstance) {
    this.axios = params;
  }

  validate = (access_token: string): Promise<CredentialResponse> => {
    return this.axios.get(`/serials/${access_token}`);
  };
}
