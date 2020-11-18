import axios, { AxiosError } from 'axios';

import { UserAttributes } from '../store/user/types';

const token = localStorage.getItem('token') || '';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Authorization': `${token}`,
  },
});

export const UserApi = {
    async loginUser(loginData: {username: string, password: string}) {
    try {
      const res = await instance.post<UserAttributes>('/user/login', {
        username: loginData.username,
        password: loginData.password,
      });
      localStorage.setItem('token', res.headers.authorization)
      return res.data;
    } catch (error) {
      console.error('error', error);
      return error as AxiosError;
    };
  },

  async registerUser(user: UserAttributes) {
    try {
      const res = await instance.post<{isCreated: boolean}>('/user', user)
      return res.data;
    } catch (error) {
      console.error('error', error);
      return error as AxiosError;
    };
  },

  async authUser() {
    try {
      const res = await instance.get<UserAttributes>('/user');
      return res.data;
    } catch (error) {
      console.log('error', error);
      return error as AxiosError;
    };
  },
};