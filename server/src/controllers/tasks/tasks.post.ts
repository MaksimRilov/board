import { Request, Response } from 'express';

import Task from '../../dal/models/task';
import User from '../../dal/models/user';

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

export const editTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;
    const { completionDate, statusId, userId } = req.body;

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    await Task.update(
      {
        completionDate,
        statusId,
      },
      {
        where: {
          id: taskId,
        },
      }
    );

    const task = await Task.findOne({
      where: {
        id: taskId,
      },
    });

    if (task && user) {
      task.addUser(user);
    }

    const changedTask = await Task.findOne({
      where: {
        id: taskId,
      },
      attributes: { exclude: ['StatusId'] },
      include: [
        {
          association: Task.associations.users,
          attributes: ['id', 'email', 'firstName', 'lastName'],
        },
      ],
    });

    res.send(changedTask);
  } catch (error) {
    res.status(500).send(error);
  }
};
