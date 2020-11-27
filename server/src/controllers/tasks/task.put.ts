import { Request, Response } from 'express';

import Task from '../../dal/models/task';
import User from '../../dal/models/user';

// eslint-disable-next-line import/prefer-default-export
export const editTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;
    const { completionDate = new Date(), statusId, usersId } = req.body;

    // eslint-disable-next-line no-restricted-syntax
    for (const userId of usersId) {
      // eslint-disable-next-line no-await-in-loop
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      // eslint-disable-next-line no-await-in-loop
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

      // eslint-disable-next-line no-await-in-loop
      const task = await Task.findOne({
        where: {
          id: taskId,
        },
      });

      if (task && user) {
        task.addUser(user);
      }
    }

    res.end();
  } catch (error) {
    res.status(500).send(error);
  }
};

export const rejectTask = (req: Request, res: Response): void => {
  const { taskId } = req.params;
  Task.update(
    {
      statusId: 6,
    },
    {
      where: {
        id: taskId,
      },
    }
  )
    .then(() => res.end())
    .catch((error) => res.status(400).send({ error }));
};
