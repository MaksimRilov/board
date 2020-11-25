import { AxiosError } from 'axios';

import { InferActions, BaseThunk } from '../rootReducer';
import { TaskApi, StatusApi } from '../../api/api';
import {
  TaskAttributes, PendingTaskAttributes,
  EditPendingTask, StatusAttributes,
} from './types';

const isError = (res: any): res is AxiosError => {
  if ((res.isAxiosError !== undefined)) {
    return true;
  }
  return false;
};


export const actions = {
  taskWasCreated: (isCreated: number | null) => ({
    type: 'TASK/TASK_WAS_CREATED',
    isCreated,
  } as const),
  setAllPendingTask: (tasks: Array<PendingTaskAttributes>) => ({
    type: 'TASK/SET_ALL_PENDING_TASK',
    tasks,
  } as const),
  setCurrentTask: (taskId: number | null) => ({
    type: 'TASK/SET_CURRENT_TASK',
    taskId,
  } as const),
  setStatuses: (statuses: Array<StatusAttributes>) => ({
    type: 'TASK/SET_STATUSES',
    statuses,
  } as const),
};

export const createTask = (task: TaskAttributes): Thunk => {
  return async (dispatch) => {
    const data = await TaskApi.createTask(task);

    if (!isError(data)) {
      dispatch(actions.taskWasCreated(data.isCreated));
    } else {
      dispatch(actions.taskWasCreated(null));
      console.log('error', data);
      // TODO dispatch ошибки
    }
  };
};

export const fetchAllPendingTask = (taskId?: number): Thunk => {
  return async (dispatch) => {
    const data = await TaskApi.fetchAllPendingTask();

    if (!isError(data)) {
      dispatch(actions.setAllPendingTask(data));
      if (taskId) {
        dispatch(actions.setCurrentTask(taskId));
      }
    } else {
      console.log('error', data);
      // TODO dispatch ошибки
    }
  };
};

export const editPendingTask = (task: EditPendingTask): Thunk => {
  return async (dispatch) => {
    const data = await TaskApi.editPendingTaskForm(task);

    if (!isError(data)) {
      dispatch(fetchAllPendingTask());
    } else {
      console.log('error', data);
      // TODO dispatch ошибки
    }
  };
};

export const rejectTask = (taskId: string): Thunk => {
  return async (dispatch) => {
    const data = await TaskApi.rejectTask(taskId);

    if (!isError(data)) {
      dispatch(fetchAllPendingTask());
    } else {
      console.log('error', data);
      // TODO dispatch ошибки
    }
  };
};

export const fetchStatuses = (): Thunk => {
  return async (dispatch) => {
    const data = await StatusApi.fetchStatuses();

    if (!isError(data)) {
      dispatch(actions.setStatuses(data));
    } else {
      console.log('error', data);
      // TODO dispatch ошибки
    }
  }
}

export type Actions = InferActions<typeof actions>;
type Thunk = BaseThunk<Actions>