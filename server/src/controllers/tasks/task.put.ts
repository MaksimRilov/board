import { Request, Response } from 'express';
import Server from '../../server';

import Task from '../../dal/models/task';
import User from '../../dal/models/user';

export const editTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;
    const { completionDate, statusId, usersId } = req.body;

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

    const currentTask = await Task.findOne({
      where: {
        id: taskId,
      },
      include: [{ association: Task.associations.statuses }],
    });

    if (currentTask) {
      const hasUsers = await currentTask.getUsers();

      const deleteUsers = hasUsers.filter((u) => !usersId.find((uId: number) => u.id === uId));
      const addUsers = usersId.filter((uId: number) => !hasUsers.find((u) => u.id === uId));

      // eslint-disable-next-line no-restricted-syntax
      for (const userId of deleteUsers) {
        // eslint-disable-next-line no-await-in-loop
        await currentTask.removeUser(userId);
      }

      // eslint-disable-next-line no-restricted-syntax
      for (const userId of addUsers) {
        // eslint-disable-next-line no-await-in-loop
        const user = await User.findOne({
          where: {
            id: userId,
          },
        });

        if (user) {
          // eslint-disable-next-line no-await-in-loop
          await currentTask.addUser(user);
        }
      }

      const newHasUsers = await currentTask.getUsers();

      // eslint-disable-next-line no-restricted-syntax
      for (const user of newHasUsers) {
        Server.transporter.getTransporter().sendMail({
          from: '<smartru.board@example.com>',
          to: user.email,
          subject: 'Изменение задачи',
          html: `<p>Задача: <a href="http://localhost:3001/${
            currentTask.statuses.id === 6 ? 'rejected-tasks/' : 'approved-tasks/'
          }${currentTask.id}">${currentTask.title}</a></p>
          <p>Автор задачи: ${currentTask.author} ${currentTask.email}</p>
          <p>Время выполнения: ${currentTask.completionDate.toLocaleString()}</p>
          <p>Ответсвенные: ${newHasUsers.map((u) => ` ${`${u.firstName} ${u.lastName}`}`)}</p>`,
        });
      }

      Server.transporter.getTransporter().sendMail({
        from: '<smartru.board@example.com>',
        to: currentTask.email,
        subject: 'Изменение задачи',
        html: `<p>Задача: <a href="http://localhost:3001/${
          currentTask.statuses.id === 6 ? 'rejected-tasks/' : 'approved-tasks/'
        }${currentTask.id}">${currentTask.title}</a></p>
          <p>Автор задачи: ${currentTask.author} ${currentTask.email}</p>
          <p>Время выполнения: ${currentTask.completionDate.toLocaleString()}</p>
          <p>Ответсвенные: ${newHasUsers.map((u) => ` ${`${u.firstName} ${u.lastName}`}`)}</p>`,
      });
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
