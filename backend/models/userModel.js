import mongoose from "mongoose";

{/*
  creating user model to save data about a user
    -- userSchema can create user model which 
       is a collection in MongoDB 
*/}
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isSeller: { type: Boolean, default: false, required: true }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
