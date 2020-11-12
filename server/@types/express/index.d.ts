declare namespace Express {
  export interface Request {
    user?: import('../../src/dal/models/user').IUserAttributes;
  }
}
