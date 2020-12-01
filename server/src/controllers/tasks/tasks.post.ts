import { Request, Response } from 'express';
// import Server from '../../server';

import Task from '../../dal/models/task';

// eslint-disable-next-line import/prefer-default-export
export const createTask = (req: Request, res: Response): void => {
  const { title, description, author, email } = req.body;

  Task.create({
    title,
    description,
    author,
    email,
    completionDate: new Date(),
    statusId: 1,
  })
    .then((task) => {
      if (task) {
        res.status(200).send({ isCreated: task.id });
        // if (task.email) {
        //   Server.transporter.sendMail({
        //     // from: 'Node js',
        //     to: task.email,
        //     subject: 'Attachments',
        //     text: 'This message with attachments.',
        //   });
        // }
      }
    })
    .catch((error) => res.status(400).send({ error }));
};
