import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import UserModel from '../models/user-model';

type DecodedInfo = { email: string, role: 'admin' | 'user', iat?: number };

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader === undefined) throw new Error('Bad request.');

    const token = authHeader.split(' ')[1];
    if (token === undefined) throw new Error('Invalid token.');

    const decodedInfo = jwt.verify(token, config.token.secret) as DecodedInfo;
    req.tokenData = {
      email: decodedInfo.email,
      token: `Bearer ${token}`,
    };

    next();
  } catch (error) {
    res.status(401).json({
      error: error instanceof Error ? error.message : 'Error.',
    });
  }
};

export const userMiddleware: RequestHandler = async (req, res, next) => {
  if (req.tokenData === undefined) {
    res.status(401).json({
      error: 'Please re-login.',
    });
    return;
  }
  const authUser = await UserModel.findOne({ email: req.tokenData.email });

  if (authUser === null) {
    res.status(404).json({
      error: 'Incorrect user.',
    });
    return;
  }

  req.authUserDoc = authUser;

  next();
};

// export const adminMiddleware: RequestHandler = async (req, res, next) => {
//   if (req.tokenData === undefined) {
//     res.status(401).json({
//       error: 'Reikalingas Prisijungimas',
//     });
//     return;
//   }

//   next();
// };
