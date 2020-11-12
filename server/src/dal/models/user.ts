import { DataTypes, Model, Op } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config';

export interface IUserAttributes {
  id?: number;
  login: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<IUserAttributes> {
  public id!: number;

  public login!: string;

  public email!: string;

  public password!: string;

  public firstName!: string;

  public lastName!: string;

  public role_id!: number;

  public createdAt!: Date;

  public updatedAt!: Date;

  private static readonly salt = bcrypt.genSaltSync(10);

  static usernameIsFree(login: string, email: string): Promise<User | null> {
    return User.findOne({
      where: {
        [Op.or]: [{ login }, { email }],
      },
    });
  }

  static createUser(user: IUserAttributes): Promise<User | null> {
    return User.create({
      ...user,
    });
  }

  static findUser(username: string): Promise<User | null> {
    return User.findOne({
      where: {
        [Op.or]: [{ login: username }, { email: username }],
      },
    });
  }

  static verifyPassword(password: string, user: IUserAttributes): boolean {
    const hashPassword = bcrypt.hashSync(password, this.salt);

    console.log('user.password', user.password);
    console.log('password', password);
    console.log('hashPassword', hashPassword);

    if (user.password === hashPassword) return true;
    return false;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
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
    modelName: 'User',
  }
);

export default User;
