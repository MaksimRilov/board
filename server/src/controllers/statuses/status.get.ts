import { Request, Response } from 'express';

import Status from '../../dal/models/status';

// eslint-disable-next-line import/prefer-default-export
export const getAllStatus = (req: Request, res: Response): void => {
  Status.findAll({
    attributes: ['id', 'name'],
  })
    .then((statuses) => {
      if (statuses) res.status(200).send(statuses);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
