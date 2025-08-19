import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB as string);
  } catch (error) {
    console.log(error);
  }
};

export default ConnectDB;
