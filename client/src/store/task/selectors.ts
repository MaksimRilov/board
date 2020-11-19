import { RootState } from '../rootReducer';

export const taskIsCreated = (state: RootState) => state.taskReducer.isCreated;
export const getPendingTasks = (state: RootState) => state.taskReducer.pendingTasks;