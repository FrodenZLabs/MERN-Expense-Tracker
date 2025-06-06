import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
