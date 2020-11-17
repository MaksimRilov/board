import { UserAttributes } from './types';
import { Actions } from './action';

const initialState = {
  isAuth: false,
  user: null as UserAttributes | null,
  badLoginData: false,
  isFree: {
    flag: false,
    msg: null as null | string,
  },
  isCreated: false,
}

const userReducer = (state = initialState, action: Actions): InitialState => {
  switch(action.type) {
    case 'USER/BAD_LOGIN_DATA': {
      return {
        ...state,
        user: null,
        badLoginData: action.isBadLoginData,
      };
    }
    case 'USER/SET_USER': {
      return {
        ...state,
        user: action.user,
        isAuth: true,
        badLoginData: false,
      };
    }
    case 'USER/USERNAME_NOT_FREE': {
      return {
        ...state,
        isFree: action.isFree,
      };
    }
    case 'USER/USER_WAS_CREATED': {
      return {
        ...state,
        isCreated: action.isCreated,
      };
    }
    default:
      return state;
  };
};

export default userReducer;

type InitialState = typeof initialState;