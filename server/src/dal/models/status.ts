import { Model, DataTypes } from 'sequelize';

import sequelize from '../config';

export interface IStatusAttributes {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Status extends Model<IStatusAttributes> implements IStatusAttributes {
  public id!: number;

  public name!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Status.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'Status',
    tableName: 'statuses',
  }
);

export default Status;
