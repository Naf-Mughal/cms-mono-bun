import { LangEnum } from '@schemas/index';
import { Document, Schema, Model, model } from 'mongoose';

interface IUser extends Document {
  name: string;
  phone?: string;
  password: string;
  email: string;
  userType: 'individual' | 'organization';
  lang: LangEnum;
  organizationName?: string;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      maxlength: 100,
      required: true,
    },
    phone: {
      type: String,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
      lowercase: true,
    },
    userType: {
      type: String,
      enum: ['individual', 'organization'],
      required: true,
    },
    lang: {
      type: String,
      enum: Object.values(LangEnum),
      required: true,
    },
    organizationName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await Bun.password.hash(this.password, {
    algorithm: "bcrypt",
    cost: 10,
  });
  next();
});

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return Bun.password.verify(enteredPassword, this.password, "bcrypt");
};

const Users: Model<IUser> = model<IUser>('Users', userSchema);

export default Users;
