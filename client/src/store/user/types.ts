export type NewUserAttributes = {
  login: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
};

export type UserAttributes = {
  id: number,
  login: string,
  email: string,
  firstName: string,
  lastName: string,
  role: {
    id: number,
    name: string,
  },
};