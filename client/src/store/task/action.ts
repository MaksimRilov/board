import { AxiosError } from 'axios';

import { InferActions, BaseThunk } from '../rootReducer';
import { TaskApi } from '../../api/api';
import { TaskAttributes } from './types';

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
};

export const createTask = (task: TaskAttributes): Thunk => {
  return async (dispatch) => {
    const data = await TaskApi.createTask(task);

    if (!isError(data)) {
      dispatch(actions.taskWasCreated(data.isCreated));
    } else {
      dispatch(actions.taskWasCreated(null));
      console.log('error', data)
      // TODO dispatch ошибки
    }
  };
};

export type Actions = InferActions<typeof actions>;
type Thunk = BaseThunk<Actions>