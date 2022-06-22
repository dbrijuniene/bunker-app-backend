import {
    Schema,
    Model,
    model,
    ObjectId,
} from 'mongoose';

export type Item = {
    id: ObjectId,
    placeId: ObjectId,
    name: string,
    quantity: number,
    units: string,
    status: number,
    validUntil: Date,
};

const itemSchema = new Schema<Item, Model<Item>>({
    placeId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    units: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    validUntil: {
        type: Date,
        required: true,
    },
});

// https://getridbug.com/node-js/mongodb-output-id-instead-of-_id/
itemSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    // eslint-disable-next-line no-param-reassign
    transform(doc, ret) { delete ret._id; },
});

const ItemModel = model('Item', itemSchema);

export default ItemModel;
