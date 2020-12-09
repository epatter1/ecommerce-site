import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        {/* image size: 680 x 830px */}
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      {/* Linking image and name to the same location*/}
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="row">
          <div className="price">${product.price}</div>
          <div>
            <Link to={`/seller/${product.seller._id}`}>
              {product.seller.seller.name}
              {/* putting 2 'seller' properties because the first points to the productModel and the second to the userModel
                  Getting name field from second (userModel) seller */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
