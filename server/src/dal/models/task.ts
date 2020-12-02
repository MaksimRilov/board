import {
  Model,
  DataTypes,
  Association,
  HasManyAddAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import Status, { IStatusAttributes } from './status';
import User, { IUserAttributes } from './user';

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
  users?: IUserAttributes;
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

  public users!: IUserAttributes;

  public getUsers!: HasManyGetAssociationsMixin<User>;

  public addUser!: HasManyAddAssociationMixin<User, number>;

  public removeUser!: HasManyRemoveAssociationMixin<User, number>;

  public static associations: {
    statuses: Association<Task, Status>;
    users: Association<Task, User>;
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

Task.belongsToMany(User, { through: 'userstasks', as: 'users', timestamps: false });
User.belongsToMany(Task, { through: 'userstasks', as: 'users', timestamps: false });

export default Task;
