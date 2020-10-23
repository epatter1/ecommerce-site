import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";

// Note: must append file extension on imports in server side (express)

dotenv.config();

const app = express();
{/* adding middleware to parse body of HTTP requests */}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
{/* Connect to MongoDB
    -- pass in address of DB (MongoDB URI) and options */}
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// use this route for userRouter
app.use('/api/users/', userRouter);

// When frontend enters this address, returns data from MongoDB
app.use('/api/products/', productRouter);

// serving root of server
app.get("/", (req, res) => {
  res.send("Server is Live!");
});

// error redirected here from expressAsyncHander in userRouter.js
app.use((err, req, res, next) => {
  res.status(500).send({message: err.message })
})

//listen on environment port and use 5000 if none available
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
