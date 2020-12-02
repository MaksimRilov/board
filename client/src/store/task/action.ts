import { AxiosError } from 'axios';

import { InferActions, BaseThunk } from '../rootReducer';
import { TaskApi, StatusApi } from '../../api/api';
import {
  TaskAttributes, PendingTaskAttributes,
  EditPendingTask, StatusAttributes,
  ApprovedTaskAttributes,
} from './types';

import { actions as appActions } from '../app/action';

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
  setPendingCurrentTask: (taskId: number | null) => ({
    type: 'TASK/SET_PENDING_CURRENT_TASK',
    taskId,
  } as const),
  setStatuses: (statuses: Array<StatusAttributes>) => ({
    type: 'TASK/SET_STATUSES',
    statuses,
  } as const),
  setAllApprovedTask: (tasks: Array<ApprovedTaskAttributes>) => ({
    type: 'TASK/SET_ALL_APPROVED_TASK',
    tasks,
  } as const),
  setApprovedCurrentTask: (taskId: number | null) => ({
    type: 'TASK/SET_APPROVED_CURRENT_TASK',
    taskId,
  } as const),

  setAllRejectedTask: (tasks: Array<ApprovedTaskAttributes>) => ({
    type: 'TASK/SET_ALL_REJECTED_TASK',
    tasks,
  } as const),

  setRejectedCurrentTask: (taskId: number | null) => ({
    type: 'TASK/SET_REJECTED_CURRENT_TASK',
    taskId,
  } as const)
};

export const createTask = (task: TaskAttributes): Thunk => {
  return async (dispatch) => {
    dispatch(appActions.startFetch());

    const data = await TaskApi.createTask(task);

    if (!isError(data)) {
      dispatch(actions.taskWasCreated(data.isCreated));
    } else {
      dispatch(actions.taskWasCreated(null));
      console.log('error', data);
      // TODO dispatch ошибки
    };

    dispatch(appActions.finishFetch());
  };
};

export const fetchAllPendingTask = (taskId?: number): Thunk => {
  return async (dispatch) => {
    dispatch(appActions.startFetch());

    const data = await TaskApi.fetchAllPendingTask();

    if (!isError(data)) {
      dispatch(actions.setAllPendingTask(data));
      if (taskId) {
        dispatch(actions.setPendingCurrentTask(taskId));
      }
    } else {
      console.log('error', data);
      // TODO dispatch ошибки
    };

    dispatch(appActions.finishFetch());
  };
};

export const editPendingTask = (task: EditPendingTask): Thunk => {
  return async (dispatch) => {
    dispatch(appActions.startFetch());

    const data = await TaskApi.editTaskForm(task);

    if (!isError(data)) {
      dispatch(fetchAllPendingTask());
    } else {
      console.log('error', data);
      // TODO dispatch ошибки
    };

    dispatch(appActions.finishFetch());
  };
};

export const editApprovedTask = (task: ApprovedTaskAttributes): Thunk => {
  return async (dispatch) => {
    dispatch(appActions.startFetch());

    const data = await TaskApi.editTaskForm(task);

    if (!isError(data)) {
      dispatch(fetchAllApprovedTask());
    } else {
      console.log('error', data);
      // TODO dispatch ошибки
    };

    dispatch(appActions.finishFetch());
  };
};

export const rejectTask = (taskId: string): Thunk => {
  return async (dispatch) => {
    dispatch(appActions.startFetch());

    const data = await TaskApi.rejectTask(taskId);

    if (!isError(data)) {
      dispatch(fetchAllPendingTask());
    } else {
      console.log('error', data);
      // TODO dispatch ошибки
    };

    dispatch(appActions.finishFetch());
  };
};

export const fetchStatuses = (): Thunk => {
  return async (dispatch) => {
    dispatch(appActions.startFetch());

    const data = await StatusApi.fetchStatuses();

    if (!isError(data)) {
      dispatch(actions.setStatuses(data));
    } else {
      console.log('error', data);
      // TODO dispatch ошибки
    };

    dispatch(appActions.finishFetch());
  };
};

export const fetchAllApprovedTask = (taskId?: number): Thunk => {
  return async (dispatch) => {
    dispatch(appActions.startFetch());

    const data = await TaskApi.fetchAllApprovedTask();

    if (!isError(data)) {
      dispatch(actions.setAllApprovedTask(data));
      if (taskId) {
        dispatch(actions.setApprovedCurrentTask(taskId));
      }
    } else {
      console.log('error', data);
      // TODO dispatch ошибки
    };

    dispatch(appActions.finishFetch());
  };
};

export const fetchAllRejectedTask = (taskId?: number): Thunk => {
  return async (dispatch) => {
    dispatch(appActions.startFetch());

    const data = await TaskApi.fetchAllRejectedTask();

    if (!isError(data)) {
      dispatch(actions.setAllRejectedTask(data));
      if (taskId) {
        dispatch(actions.setRejectedCurrentTask(taskId));
      }
    } else {
      console.log('error', data);
      // TODO dispatch ошибки
    };

    dispatch(appActions.finishFetch());
  };
};

export type Actions = InferActions<typeof actions | typeof appActions>;
type Thunk = BaseThunk<Actions>