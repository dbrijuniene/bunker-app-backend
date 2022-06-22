import {
    Schema,
    Model,
    model,
    ObjectId,
} from 'mongoose';

export type Place = {
    id: ObjectId,
    userId: ObjectId,
    name: string,
};

const placeSchema = new Schema<Place, Model<Place>>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

// https://getridbug.com/node-js/mongodb-output-id-instead-of-_id/
placeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    // eslint-disable-next-line no-param-reassign
    transform(doc, ret) { delete ret._id; },
});

const PlaceModel = model('Place', placeSchema);

export default PlaceModel;
