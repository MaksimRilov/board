import { RootState } from '../rootReducer';

export const getIsBadLoginData = (state: RootState) => state.userReducer.badLoginData;
export const getIsAuth = (state: RootState) => state.userReducer.isAuth;
export const getUsernameIsFree = (state: RootState) => state.userReducer.isFree;
export const userIsCreated = (state: RootState) => state.userReducer.isCreated;
export const getUser = (state: RootState) => state.userReducer.user;
export const getIsInitialized = (state: RootState) => state.userReducer.isInitialized;