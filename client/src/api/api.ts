import axios, { AxiosError } from 'axios';

import { UserAttributes, NewUserAttributes } from '../store/user/types';
import {
  TaskAttributes, PendingTaskAttributes,
  EditPendingTask, StatusAttributes,
  ApprovedTaskAttributes,
} from '../store/task/types';

const getToken = () => localStorage.getItem('token') || ''

const token = getToken();

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
      console.error(error);
      return error as AxiosError;
    };
  },

  async registerUser(user: NewUserAttributes) {
    try {
      const res = await instance.post<{isCreated: number}>('/user/register', user)
      return res.data;
    } catch (error) {
      console.error(error);
      return error as AxiosError;
    };
  },

  async authUser() {
    try {
      const res = await instance.get<UserAttributes>('/user/me');
      return res.data;
    } catch (error) {
      console.error(error);
      return error as AxiosError;
    };
  },

  async fetchAllUsers() {
    try {
      const res = await instance.get<Array<UserAttributes>>('/user');
      return res.data;
    } catch (error) {
      console.error(error);
      return error as AxiosError;
    };
  },
};

export const TaskApi = {
  async createTask(task: TaskAttributes) {
    try {
      const res = await instance.post<{isCreated: number}>('/task', task);
      return res.data;
    } catch (error) {
      console.error(error);
      return error as AxiosError;
    };
  },

  async fetchAllPendingTask() {
    try {
      const res = await instance.get<Array<PendingTaskAttributes>>('/task/pending-task');
      return res.data;
    } catch (error) {
      console.error(error);
      return error as AxiosError;
    };
  },

  async editTaskForm(task: EditPendingTask | ApprovedTaskAttributes) {
    try {
      const res = await instance.put(`/task/${task.id}`, task);
      return res.data;
    } catch (error) {
      console.error(error);
      return error as AxiosError;
    };
  },

  async rejectTask(taskId: string) {
    try {
      const res = await instance.put(`/task/reject/${taskId}`);
      return res.data;
    } catch (error) {
      console.error(error);
      return error as AxiosError;
    };
  },

  async fetchAllApprovedTask() {
    try {
      const res = await instance.get('/task/approved-task');
      return res.data;
    } catch (error) {
      console.error(error);
      return error as AxiosError;
    };
  },

  async fetchAllRejectedTask() {
    try {
      const res = await instance.get('/task/rejected-task');
      return res.data;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    };
  },
};

export const StatusApi = {
  async fetchStatuses() {
    try {
      const res = await instance.get<Array<StatusAttributes>>('/status');
      return res.data;
    } catch (error) {
      console.error(error);
      return error as AxiosError;
    }
  },
};