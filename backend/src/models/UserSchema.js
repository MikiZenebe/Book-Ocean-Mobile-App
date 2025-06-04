import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: string,
    required: true,
    unique: true,
  },
  email: {
    type: string,
    required: true,
    unique: true,
  },
  password: {
    type: string,
    required: true,
    minLength: 6,
  },
  profileImage: {
    type: string,
    default: "",
  },
});

const User = model("User", userSchema);
export default User;
