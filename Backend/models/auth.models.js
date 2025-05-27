import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

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

// Hash password before saving
authSchema.pre("save", async (next) => {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hashSync(this.password, 10);
  next();
});

// Comparing passwords
authSchema.methods.comparePasswords = async (candidatePassword) => {
  return await bcryptjs.compareSync(candidatePassword, this.password);
};

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
