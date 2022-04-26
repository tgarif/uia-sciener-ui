import { CredentialApi } from '@api/credential.api';
import { ScienerApi } from '@api/sciener.api';
import { axios } from '@api/axios';

export const api = {
  credential: new CredentialApi(axios),
  sciener: new ScienerApi(axios),
};
