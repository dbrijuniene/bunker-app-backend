import { Error } from 'mongoose';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import UserModel, { User } from '../models/user-model';
import createLoggedInViewModel from '../view-model-creator/create-logged-in-view-model';
import LoggedInViewModel from '../types/logged-in-view-model';
import { NewUserViewModel } from '../types/new-user-view-model';

type AuthResponseBody = LoggedInViewModel | ErrorResponseBody;

export const login: RequestHandler<
    unknown,
    AuthResponseBody,
    Partial<User>
> = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) throw new Error('Invalid user.');

        const userDoc = await UserModel.findOne({ email });
        if (!userDoc) {
            throw new Error('No such user.');
        }

        if (password !== userDoc.password) {
            throw new Error('Incorrect password.');
        }
        const token = jwt.sign({ email }, config.token.secret);

        res.status(200).json(createLoggedInViewModel(userDoc, token));
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Error.',
        });
    }
};

export const register: RequestHandler<
    unknown,
    AuthResponseBody,
    NewUserViewModel
> = async (req, res) => {
    const {
        email, name, password, repeatPassword,
    } = req.body;

    try {
        if (!email || !password || !name || !repeatPassword) {
            throw new Error('Missing data.');
        } else if (password !== repeatPassword) {
            throw new Error('Passwords doesnt match.');
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new Error('User with this email already exist.');
        }

        const userDoc = await UserModel.create({ email, name, password });
        const token = jwt.sign({ email }, config.token.secret);

        res.status(200).json(createLoggedInViewModel(userDoc, token));
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Error.',
        });
    }
};

export const authenticate: RequestHandler<
    unknown,
    AuthResponseBody
> = async (req, res) => {
    try {
        if (req.tokenData === undefined) {
            throw new Error('Please, re-login.');
        }
        const { email, token } = req.tokenData;
        const userDoc = await UserModel.findOne({ email });

        if (userDoc === null) {
            throw new Error('No such user.');
        }

        res.status(200).json(createLoggedInViewModel(userDoc, token, true));
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Error.',
        });
    }
};
