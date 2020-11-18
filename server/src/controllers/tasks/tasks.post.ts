import { Request, Response } from 'express';

import Task from '../../dal/models/task';

// eslint-disable-next-line import/prefer-default-export
export const createTask = (req: Request, res: Response): void => {
  const { title, description, author, email, completionDate, statusId = 1 } = req.body;

  Task.create({
    title,
    description,
    author,
    email,
    completionDate,
    statusId,
  })
    .then((task) => {
      if (task) {
        res.status(200).send({ isCreated: task.id });
      }
    })
    .catch((error) => res.status(400).send({ error }));
};
