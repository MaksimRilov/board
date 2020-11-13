import { DataTypes, Model, Op } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config';
import Role from './role';

export interface IUserAttributes {
  id?: number;
  login: string;
  email: string;
  password: string;
  salt: string;
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

  public salt!: string;

  public firstName!: string;

  public lastName!: string;

  public role_id!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  static genSalt(saltRounds: number): string {
    return bcrypt.genSaltSync(saltRounds);
  }

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

  static findUser(username: string): Promise<Model | null> {
    return User.findOne({
      where: {
        [Op.or]: [{ login: username }, { email: username }],
      },
      include: Role,
    });
  }

  static verifyPassword(password: string, user: IUserAttributes): boolean {
    const hashPassword = bcrypt.hashSync(password, user.salt);

    if (user.password === hashPassword) return true;
    return false;
  }

  static createPassword(password: string, salt: string): string {
    return bcrypt.hashSync(password, salt);
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
    salt: {
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

Role.hasMany(User);
User.belongsTo(Role, {
  foreignKey: 'role_id',
});

export default User;
