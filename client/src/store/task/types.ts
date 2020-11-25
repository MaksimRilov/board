export type TaskAttributes = {
  title: string,
  description: string,
  email?: string,
  author?: string,
};

export type PendingTaskAttributes = {
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

export type EditPendingTask = {
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

export type StatusAttributes = {
  id: number,
  name: string,
};