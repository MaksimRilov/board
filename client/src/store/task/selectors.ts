import { RootState } from '../rootReducer';

export const taskIsCreated = (state: RootState) => state.taskReducer.isCreated;