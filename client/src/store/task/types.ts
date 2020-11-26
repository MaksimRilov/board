import { UserAttributes } from '../user/types';

export interface TaskAttributes {
  title: string,
  description: string,
  email?: string,
  author?: string,
};

export interface PendingTaskAttributes {
  id: number,
  title: string,
  description: string,
  email?: string,
  author?: string,
  completionDate: string,
  createdAt: string,
  updatedAt: string,
  statusId: number,
  statuses: {
    id: number,
    name: string,
  },
};

export interface EditPendingTask {
  id: number,
  title: string,
  description: string,
  email?: string,
  author?: string,
  completionDate: string,
  createdAt: string,
  updatedAt: string,
  usersId: Array<number>,
  statusId: number,
  statuses: {
    id: number,
    name: string,
  },
};

export interface ApprovedTaskUser extends UserAttributes {
  userstasks: {
    TaskId: number,
    UserId: number,
  },
};

export interface ApprovedTaskAttributes extends PendingTaskAttributes {
  users: Array<ApprovedTaskUser>
}

export interface StatusAttributes {
  id: number,
  name: string,
};