import { Model, Schema } from 'mongoose'

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    minlength: 3
  },
  password: { type: String, required: true, minlength: 8 },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String },
  mobile: { type: String },
  __v: { type: Number, select: false }
})

UserSchema.set('toObject', {
  transform(doc, ret, options) {
    delete ret.__v
  }
})

export class UserModel extends Model {}

UserSchema.loadClass(UserModel)
