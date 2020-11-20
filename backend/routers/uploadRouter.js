import multer from "multer";
import express from "express";
import { isAuth } from '../utils.js';

const uploadRouter = express.Router();
// creating api that saves file in uploads folder and sets file name to the timestamp
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); //1 param: error, 2nd param: folder to save the file
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
}); //using folder to store images. Note: you can also upload to a cloud server like S3

const upload = multer({ storage }); //define upload middleware with option 'storage'

uploadRouter.post("/", isAuth, upload.single('image'), (req, res) => { //upload.single('image') is telling multer you want a single file and the file name in the request is 'image'
  res.send(`/${req.file.path}`);
}); //when there is a file in this request, it will be uploaded automatically
// in uploads folder with the Date.now().jpg name

export default uploadRouter;
