import express from "express";
import data from "./data.js";

// Note: must append file extension on imports in server side (express)

const app = express();

// Returns details of a product
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

// When frontend enters this address, return arr of products from data.js
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

// serving root of server
app.get("/", (req, res) => {
  res.send("Server is Live!");
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
