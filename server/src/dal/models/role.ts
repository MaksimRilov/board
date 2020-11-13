import { DataTypes, Model, Op } from 'sequelize';
import sequelize from '../config';

export interface IRoleAttributes {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Role extends Model<IRoleAttributes> {
  public id!: number;

  public name!: number;

  public createdAt!: Date;

  public updatedAt!: Date;
}

Role.init(
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
    modelName: 'Role',
  }
);

export default Role;
