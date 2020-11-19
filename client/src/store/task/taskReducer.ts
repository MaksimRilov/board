import { Actions } from './action';
import { TaskAttributes } from './types';

const initialValues = {
  isCreated: null as number | null,
  pendingTask: null as Array<TaskAttributes> | null,
  approvedTask: null as Array<TaskAttributes> | null,
};

const taskReducer = (state = initialValues, action: Actions): InitialValues => {
  switch(action.type) {
    case 'TASK/TASK_WAS_CREATED': {
      return {
        ...state,
        isCreated: action.isCreated,
      };
    }
    default:
      return state;
  }
};

export default taskReducer;

type InitialValues = typeof initialValues;