import { ScienerApi } from '@api/sciener.api';
import { axios } from '@api/axios';

export const api = {
  sciener: new ScienerApi(axios),
};
