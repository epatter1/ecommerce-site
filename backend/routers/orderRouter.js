import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";

/* backend api to return orders of current user */
const orderRouter = express.Router();
//route for admin to get list of all orders
orderRouter.get(
  "/",
  isAuth,
  isSellerOrAdmin, //get orders from DB and put them in orders
  expressAsyncHandler(async (req, res) => {
    /* filter products by seller */
    const seller = req.query.seller || "";
    const sellerFilter = seller ? { seller } : {};
    //get username from Order object.
    // From collection 'user', get only the 'name'
    // in order model, the type of user is ObjectId and 'ref' is 'User', it gets id of user and loads user info from user table
    // and only put name of user from that collection. Like a JOIN in SQL.
    const orders = await Order.find({ ...sellerFilter }).populate(
      "user",
      "name"
    ); //if sellerMode true, only return orders of current seller
    res.send(orders);
  })
);
orderRouter.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "name");
    res.send(orders);
  })
);
orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

/* api request for placing order */
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
        seller: req.body.orderItems[0].seller, //seller field in first order item
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
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }
  })
);
{
  /* only authenticated user can see order details */
}
orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    {
      /* get order from DB
      -- findById accepts an id param to 
        search for the order collection */
    }
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

/* api request to pay for an order */
orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.send({ message: "Order Paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

/* api request for deleting order (see OrderListScreen) */
orderRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id); //req.params.id is that value user enters in URL
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: "Order Deleted", order: deleteOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

/* api request for delivering an order */
orderRouter.put(
  "/:id/deliver",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: "Order Delivered", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

export default orderRouter;
