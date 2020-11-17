import { AxiosError } from 'axios';

import { UserApi } from '../../api/api';
import { InferActions, BaseThunk } from '../rootReducer';
import { UserAttributes } from './types';

const isError = (res: any): res is AxiosError => {
  if ((res.isAxiosError !== undefined)) {
    return true
  }
  return false
}

export const actions = {
  setUser: (user: UserAttributes) => ({
    type: 'USER/SET_USER',
    user,
  } as const),
  badLoginData: (isBad: boolean) => ({
    type: 'USER/BAD_LOGIN_DATA',
    isBadLoginData: isBad,
  } as const),
  usernameIsNotFree: (isFree: {flag: boolean, msg: null | string}) => ({
    type: 'USER/USERNAME_NOT_FREE',
    isFree,
  } as const),
  userWasCreated: (isCreated: boolean) => ({
    type: 'USER/USER_WAS_CREATED',
    isCreated,
  } as const),
}

export const loginUser = (loginData: { username: string, password: string }): Thunk => {
  return async (dispatch) => {
    const data = await UserApi.loginUser(loginData);
    
    if (!isError(data)) {
      if (data) {
        dispatch(actions.setUser(data));
      }
    } else {
      if (data.response?.status === 401) {
        dispatch(actions.badLoginData(true));
      } else {
        console.log('error', data)
        // TODO dispatch ошибки
      }
    }
  };
};

export const registerUser = (user: UserAttributes): Thunk => {
  return async (dispatch) => {
    const data = await UserApi.registerUser(user);

    if (!isError(data)) {
      dispatch(actions.usernameIsNotFree({
        flag: false,
        msg: null
      }));
      dispatch(actions.userWasCreated(data.isCreated));
      console.log('USER', data)
    } else {
      if (data.response?.status === 406) {
        dispatch(actions.userWasCreated(false));
        dispatch(actions.usernameIsNotFree({
          flag: true,
          msg: data.response.data.message,
        }));
      } else {
        console.log('error', data)
        // TODO dispatch ошибки
      }
    }
  }
}

export type Actions = InferActions<typeof actions>;
type Thunk = BaseThunk<Actions>