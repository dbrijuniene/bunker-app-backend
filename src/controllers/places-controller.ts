import { RequestHandler } from 'express';
import { Error } from 'mongoose';
import PlaceModel, { Place } from '../models/place-model';
import { NewPlaceViewModel } from '../types/new-place-view-model';
import ItemModel from '../models/item-model';

type OnePlaceResponseBody = Place | ErrorResponseBody;
type PlacesResponseBody = Place[] | ErrorResponseBody;

export const get: RequestHandler<
    unknown,
    PlacesResponseBody
> = async (req, res) => {
    try {
        if (req.authUserDoc === undefined) {
            throw new Error('Please, re-login.');
        }

        const places = await PlaceModel.find({ userId: req.authUserDoc.id });

        res.status(200).json(places);
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Error.',
        });
    }
};

export const add: RequestHandler<
    unknown,
    OnePlaceResponseBody,
    NewPlaceViewModel
> = async (req, res) => {
    try {
        if (req.authUserDoc === undefined) {
            throw new Error('Please, re-login.');
        }
        if (!req.body || req.body.name === '') {
            throw new Error('Incorrect data.');
        }

        const place = await PlaceModel.create(
            { name: req.body.name, userId: req.authUserDoc.id },
        );

        res.status(200).json(place);
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Error.',
        });
    }
};

export const update: RequestHandler<
    { placeId: string },
    OnePlaceResponseBody,
    NewPlaceViewModel
> = async (req, res) => {
    const { placeId } = req.params;

    try {
        if (req.authUserDoc === undefined) {
            throw new Error('Please, re-login.');
        }
        if (!placeId || !req.body || req.body.name === '') {
            throw new Error('Incorrect data.');
        }

        const place = await PlaceModel.findById(placeId);

        if (!place) {
            throw new Error('Not found.');
        }

        place.name = req.body.name;

        place.save();

        res.status(200).json(place);
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Error.',
        });
    }
};

export const remove: RequestHandler<
    { placeId: string },
    PlacesResponseBody
> = async (req, res) => {
    const { placeId } = req.params;

    try {
        if (req.authUserDoc === undefined) {
            throw new Error('Please, re-login.');
        }
        if (!placeId) {
            throw new Error('Incorrect data.');
        }

        await PlaceModel.deleteOne({ _id: placeId });
        await ItemModel.deleteMany({ placeId });

        const places = await PlaceModel.find({ userId: req.authUserDoc.id });

        res.status(200).json(places);
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Error.',
        });
    }
};
