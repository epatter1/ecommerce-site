import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";

const productRouter = express.Router();

{/* adding '/' to the end of /api/products api to match api
    frontend sends */}
productRouter.get('/', expressAsyncHandler(async(req, res) => {
    {/* returns all products */}
    const products = await Product.find({});
    res.send(products);
})
);

{/* inserting products into MongoDB */}
productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    {/* commenting out await statement
    b/c I'm not using multiple products in DB */}
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

 {/* putting this below /seed api so it won't be treated as
     id for this /:id api. */}
productRouter.get('/:id', expressAsyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({message: 'Product Not Found'})
    }
})
);

export default productRouter;
