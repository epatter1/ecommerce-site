import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth, //req.user in utils will be filled with user info
  expressAsyncHandler(async (req, res) => {
    {
      /* check if order contains items or not */
    }
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      {
        /* save order to the DB */
      }
      const createdOreder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOreder });
    }
  })
);

export default orderRouter;
