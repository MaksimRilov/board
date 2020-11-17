import axios, { AxiosError } from 'axios';

import { UserAttributes } from '../store/user/types';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Authorization': `${'token'}`,
  },
});

export const UserApi = {
    async loginUser(loginData: {username: string, password: string}) {
    try {
      const res = await instance.post<UserAttributes>('user/login', {
        username: loginData.username,
        password: loginData.password,
      });
      console.log('res', res);
      return res.data;
    } catch (error) {
      // console.error('error', error);
      return error as AxiosError;
    };
  },
};