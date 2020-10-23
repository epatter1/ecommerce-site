LAST VISITED: 10/19/20

NOTE:
"start": "nodemon --watch backend --exec node --experiemental-modules backend/server.js"
// only watch changes in backend folder
"nodemon --watch backend
// when there is a change, it executes this:
--exec node --experiemental-modules backend/server.js"
// experimental-modules allow you to use ES6 modules

Old server.js calls:
{/* 
  OLD - pulls data from data.js.
// When frontend enters this address, return arr of products from data.js
// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// }); */}

// Returns details of a product
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});