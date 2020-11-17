import { RootState } from '../rootReducer';

export const getIsBadLoginData = (state: RootState) => state.userReducer.badLoginData;
export const getIsAuth = (state: RootState) => state.userReducer.isAuth;