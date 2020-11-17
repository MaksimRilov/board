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
  } as const)
}

export const loginUser = (loginData: { username: string, password: string }): Thunk => {
  return async (dispatch) => {
    const data = await UserApi.loginUser(loginData);
    
    if(!isError(data)) {
      if (data) {
        console.log('data', data);
        dispatch(actions.setUser(data));
      }
    } else {
      if (data.response?.status === 401) {
        dispatch(actions.badLoginData(true));
      } else {
        // console.log('error', data)
      }
    }
  }
}

export type Actions = InferActions<typeof actions>;
type Thunk = BaseThunk<Actions>