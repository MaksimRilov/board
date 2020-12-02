import { AxiosError } from 'axios';

import { UserApi } from '../../api/api';
import { InferActions, BaseThunk } from '../rootReducer';
import { UserAttributes, NewUserAttributes } from './types';
import { actions as appActions } from '../app/action';

const isError = (res: any): res is AxiosError => {
  if ((res.isAxiosError !== undefined)) {
    return true;
  }
  return false;
};

export const actions = {
  setUser: (user: UserAttributes | null) => ({
    type: 'USER/SET_USER',
    user,
  } as const),
  setIsAuth: (isAuth: boolean) => ({
    type: 'USER/SET_IS_AUTH',
    isAuth,
  } as const),
  badLoginData: (isBad: boolean) => ({
    type: 'USER/BAD_LOGIN_DATA',
    isBadLoginData: isBad,
  } as const),
  usernameIsNotFree: (isFree: {flag: boolean, msg: null | string}) => ({
    type: 'USER/USERNAME_NOT_FREE',
    isFree,
  } as const),
  userWasCreated: (isCreated: number | null) => ({
    type: 'USER/USER_WAS_CREATED',
    isCreated,
  } as const),
  logoutUser: () => ({
    type: 'USER/LOGOUT_USER'
  } as const),
  setAllUsers: (users: Array<UserAttributes>) => ({
    type: 'USER/SET_ALL_USERS',
    users,
  } as const)
}

export const loginUser = (loginData: { username: string, password: string }): Thunk => {
  return async (dispatch) => {
    dispatch(appActions.startFetch());

    const data = await UserApi.loginUser(loginData);
    
    if (!isError(data)) {
      if (data) {
        dispatch(actions.setIsAuth(true));
        dispatch(actions.setUser(data));
      }
    } else {
      if (data.response?.status === 401) {
        dispatch(actions.badLoginData(true));
      } else {
        console.log('error', data)
        // TODO dispatch ошибки
      }
    };

    dispatch(appActions.finishFetch());
  };
};

export const registerUser = (user: NewUserAttributes): Thunk => {
  return async (dispatch) => {
    dispatch(appActions.startFetch());

    const data = await UserApi.registerUser(user);

    if (!isError(data)) {
      dispatch(actions.usernameIsNotFree({
        flag: false,
        msg: null
      }));
      dispatch(actions.userWasCreated(data.isCreated));
    } else {
      if (data.response?.status === 406) {
        dispatch(actions.userWasCreated(null));
        dispatch(actions.usernameIsNotFree({
          flag: true,
          msg: data.response.data.message,
        }));
      } else {
        console.log('error', data)
        // TODO dispatch ошибки
      }
    };

    dispatch(appActions.finishFetch());
  };
};

export const authUser = (): Thunk => {
  return async (dispatch) => {
    dispatch(appActions.startFetch());

    const data = await UserApi.authUser();

    if (!isError(data)) {
      dispatch(actions.setUser(data));
      dispatch(actions.setIsAuth(true));
      dispatch(appActions.setInitialized());
    } else {
      if (data.response?.status === 401) {
        dispatch(actions.setIsAuth(false));
        dispatch(actions.setUser(null));
        dispatch(appActions.setInitialized());
      } else {
        console.log('error', data)
        // TODO dispatch ошибки
      }
    };

    dispatch(appActions.finishFetch());
  };
};

export const fetchAllUsers = (): Thunk => {
  return async (dispatch) => {
    dispatch(appActions.startFetch());

    const data = await UserApi.fetchAllUsers();
    
    if (!isError(data)) {
      dispatch(actions.setAllUsers(data));
    } else {
      console.log('error', data)
      // TODO dispatch ошибки
    };

    dispatch(appActions.finishFetch());
  };
};

export type Actions = InferActions<typeof actions | typeof appActions>;
type Thunk = BaseThunk<Actions>