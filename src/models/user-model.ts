import {
  Schema,
  Model,
  model,
  ObjectId,
} from 'mongoose';

export type User = {
  id: ObjectId,
  name: string,
  email: string,
  password: string,
};

const userSchema = new Schema<User, Model<User>>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// https://getridbug.com/node-js/mongodb-output-id-instead-of-_id/
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  // eslint-disable-next-line no-param-reassign
  transform(doc, ret) { delete ret._id; },
});

const UserModel = model('User', userSchema);

export default UserModel;
