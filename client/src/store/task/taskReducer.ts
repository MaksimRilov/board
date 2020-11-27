import { Actions } from './action';
import {
  PendingTaskAttributes,  ApprovedTaskAttributes,
  StatusAttributes,
} from './types';

const initialValues = {
  isCreated: null as number | null,
  pendingTasks: [] as Array<PendingTaskAttributes>,
  approvedTasks: [] as Array<ApprovedTaskAttributes>,
  rejectedTasks: [] as Array<ApprovedTaskAttributes>,
  pendingCurrentTask: null as PendingTaskAttributes | null,
  approvedCurrentTask: null as ApprovedTaskAttributes | null,
  rejectedCurrentTask: null as ApprovedTaskAttributes | null,
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
    case 'TASK/SET_PENDING_CURRENT_TASK': {
      const currentTask  = state.pendingTasks.find((t) => t.id === action.taskId);
      if (action.taskId === null || !currentTask) {
        return {
          ...state,
          pendingCurrentTask: null,
        }
      }
      return {
        ...state,
        pendingCurrentTask: currentTask,
      }
    }
    case 'TASK/SET_APPROVED_CURRENT_TASK': {
      const currentTask  = state.approvedTasks.find((t) => t.id === action.taskId);
      if (action.taskId === null || !currentTask) {
        return {
          ...state,
          approvedCurrentTask: null,
        }
      }
      return {
        ...state,
        approvedCurrentTask: currentTask,
      }
    }
    case 'TASK/SET_STATUSES': {
      return {
        ...state,
        statuses: action.statuses,
      }
    }
    case 'TASK/SET_ALL_APPROVED_TASK': {
      return {
        ...state,
        approvedTasks: action.tasks,
      }
    }
    case 'TASK/SET_REJECTED_CURRENT_TASK': {
      const currentTask  = state.rejectedTasks.find((t) => t.id === action.taskId);
      if (action.taskId === null || !currentTask) {
        return {
          ...state,
          rejectedCurrentTask: null,
        }
      }
      return {
        ...state,
        rejectedCurrentTask: currentTask,
      }
    }
    case 'TASK/SET_ALL_REJECTED_TASK': {
      return {
        ...state,
        rejectedTasks: action.tasks,
      }
    }
    default:
      return state;
  }
};

export default taskReducer;

type InitialValues = typeof initialValues;