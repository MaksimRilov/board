import { RootState } from '../rootReducer';

export const taskIsCreated = (state: RootState) => state.taskReducer.isCreated;
export const getPendingTasks = (state: RootState) => state.taskReducer.pendingTasks;
export const getCurrentTask = (state: RootState) => state.taskReducer.currentTask;
export const getStatuses = (state: RootState) => state.taskReducer.statuses;