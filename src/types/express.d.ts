import { User } from '../models/user-model';

declare global {
  declare namespace Express {
    export interface Request {
      tokenData?: {
        email: string,
        token: string,
      },
      authUserDoc?: User
    }
  }

}
export { };
