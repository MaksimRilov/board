import { Model, DataTypes, Association } from 'sequelize';
import Status, { IStatusAttributes } from './status';

import sequelize from '../config';

export interface ITaskAttributes {
  id?: number;
  title: string;
  description: string;
  author: string;
  email: string;
  statusId: number;
  completionDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  statuses?: IStatusAttributes;
}

class Task extends Model<ITaskAttributes> implements ITaskAttributes {
  public id!: number;

  public title!: string;

  public description!: string;

  public author!: string;

  public email!: string;

  public statusId!: number;

  public completionDate!: Date;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public statuses!: IStatusAttributes;

  public static associations: {
    statuses: Association<Task, Status>;
  };
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    completionDate: {
      allowNull: false,
      type: DataTypes.DATE,
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
    modelName: 'Task',
    tableName: 'tasks',
  }
);

Status.hasMany(Task);
Task.belongsTo(Status, {
  foreignKey: 'statusId',
  as: 'statuses',
});

export default Task;
