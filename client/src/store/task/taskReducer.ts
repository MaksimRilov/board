import { Actions } from './action';
import { TaskAttributes } from './types';

const initialValues = {
  isCreated: null as number | null,
  pendingTasks: null as Array<TaskAttributes> | null,
  approvedTasks: null as Array<TaskAttributes> | null,
};

const taskReducer = (state = initialValues, action: Actions): InitialValues => {
  switch(action.type) {
    case 'TASK/TASK_WAS_CREATED': {
      return {
        ...state,
        isCreated: action.isCreated,
      };
    }
    case 'TASK/SET_ALL_PENDING_TASK': {
      return {
        ...state,
        pendingTasks: action.tasks,
      };
    }
    default:
      return state;
  }
};

export default taskReducer;

type InitialValues = typeof initialValues;