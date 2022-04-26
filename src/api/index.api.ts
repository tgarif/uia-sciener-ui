import { CredentialApi } from '@api/credential.api';
import { ScienerApi } from '@api/sciener.api';
import { publicApi, privateApi } from '@api/axios';

export const api = {
  credential: new CredentialApi(publicApi),
  sciener: new ScienerApi(privateApi),
};
