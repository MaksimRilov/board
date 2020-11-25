import { Actions } from './action';
import { TaskAttributes, PendingTaskAttributes, StatusAttributes } from './types';

const initialValues = {
  isCreated: null as number | null,
  pendingTasks: [] as Array<PendingTaskAttributes>,
  approvedTasks: [] as Array<TaskAttributes>,
  currentTask: null as PendingTaskAttributes | null,
  statuses: [] as Array<StatusAttributes>,
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
    case 'TASK/SET_CURRENT_TASK': {
      const currentTask  = state.pendingTasks.find((t) => t.id === action.taskId);
      if (action.taskId === null || !currentTask) {
        return {
          ...state,
          currentTask: null,
        }
      }
      return {
        ...state,
        currentTask: currentTask,
      }
    }
    case 'TASK/SET_STATUSES': {
      return {
        ...state,
        statuses: action.statuses,
      }
    }
    default:
      return state;
  }
};

export default taskReducer;

type InitialValues = typeof initialValues;