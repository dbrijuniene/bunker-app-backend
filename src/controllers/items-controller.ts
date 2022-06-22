import { RequestHandler } from 'express';
import { Error } from 'mongoose';
import ItemModel, { Item } from '../models/item-model';
import { NewItemViewModel } from '../types/new-item-view-model';

type OnePlaceResponseBody = Item | ErrorResponseBody;
type PlacesResponseBody = Item[] | ErrorResponseBody;

export const get: RequestHandler<
    unknown,
    PlacesResponseBody
> = async (req, res) => {
    try {
        if (req.authUserDoc === undefined) {
            throw new Error('Please, re-login.');
        }
        if (!req.body) {
            throw new Error('Incorrect data.');
        }

        const items = await ItemModel.find({ placeId: { $in: req.body } });

        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Error.',
        });
    }
};

export const add: RequestHandler<
    unknown,
    OnePlaceResponseBody,
    NewItemViewModel
> = async (req, res) => {
    try {
        if (req.authUserDoc === undefined) {
            throw new Error('Please, re-login.');
        }
        if (!req.body) {
            throw new Error('Incorrect data.');
        }

        const item = await ItemModel.create(req.body);

        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Error.',
        });
    }
};

export const update: RequestHandler<
    { itemId: string },
    OnePlaceResponseBody,
    NewItemViewModel
> = async (req, res) => {
    const { itemId } = req.params;

    try {
        if (req.authUserDoc === undefined) {
            throw new Error('Please, re-login.');
        }
        if (!itemId || !req.body) {
            throw new Error('Incorrect data.');
        }

        const item = await ItemModel.findById(itemId);

        if (!item) {
            throw new Error('Not found.');
        }

        item.name = req.body.name;
        item.quantity = req.body.quantity;
        item.status = req.body.status;
        item.units = req.body.units;
        item.validUntil = req.body.validUntil;

        item.save();

        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Error.',
        });
    }
};

export const remove: RequestHandler<
    { itemId: string },
    PlacesResponseBody
> = async (req, res) => {
    const { itemId } = req.params;

    try {
        if (req.authUserDoc === undefined) {
            throw new Error('Please, re-login.');
        }
        if (!itemId) {
            throw new Error('Incorrect data.');
        }

        await ItemModel.deleteOne({ _id: itemId });

        const items = await ItemModel.find({ userId: req.authUserDoc.id });

        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Error.',
        });
    }
};
