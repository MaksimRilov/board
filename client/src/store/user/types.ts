export interface NewUserAttributes {
  login: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
};

export interface UserAttributes {
  id: number,
  login: string,
  email: string,
  firstName: string,
  lastName: string,
  roles: {
    id: number,
    name: string,
  },
};