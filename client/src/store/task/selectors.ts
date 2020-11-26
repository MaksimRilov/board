import { RootState } from '../rootReducer';

export const taskIsCreated = (state: RootState) => state.taskReducer.isCreated;
export const getPendingTasks = (state: RootState) => state.taskReducer.pendingTasks;
export const getPendingCurrentTask = (state: RootState) => state.taskReducer.pendingCurrentTask;
export const getApprovedCurrentTask = (state: RootState) => state.taskReducer.approvedCurrentTask;
export const getApprovedTasks = (state: RootState) => state.taskReducer.approvedTasks;
export const getStatuses = (state: RootState) => state.taskReducer.statuses;