import { UserAttributes } from './types';
import { Actions } from './action';

const initialState = {
  isAuth: false,
  user: null as UserAttributes | null,
  badLoginData: false,
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
    default:
      return state;
  };
};

export default userReducer;

type InitialState = typeof initialState;