import { RootState } from '../rootReducer';

export const getIsInitialized = (state: RootState) => state.appReducer.isInitialized;
export const getIsFetching = (state: RootState) => state.appReducer.isFetching;