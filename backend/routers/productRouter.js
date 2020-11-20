import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import { isAdmin, isAuth } from "../utils.js";

const productRouter = express.Router();

{
  /* adding '/' to the end of /api/products api to match api
    frontend sends */
}
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    {
      /* returns all products */
    }
    const products = await Product.find({});
    res.send(products);
  })
);

{
  /* inserting products into MongoDB */
}
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    {
      /* commenting out await statement
    b/c I'm not using multiple products in DB */
    }
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

{
  /* putting this below /seed api so it won't be treated as
     id for this /:id api. */
}
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

/* create new product */
productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "sample name " + Date.now(), //Date.now() appends a timestamp which makes the product unique
      image: "/images/p1.jpg",
      price: 0,
      category: "sample category",
      brand: "sample brand",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
    });
    const createdProduct = await product.save(); //saving createdProduct
    res.send({ message: "Product Created", product: createdProduct }); //passing createdProduct to frontend
  })
); //path is /api/products

/* update product details */
productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: "Product Updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product Not Fount" });
    }
  })
);

/* delete product */
productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deletedProduct = await product.remove();
      res.send({ message: "Product Deleted", product: deletedProduct }); //send back message and return deleted product to the frontend
    } else {
      res.send(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRouter;
