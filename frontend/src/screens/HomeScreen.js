import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

{
  /* 
  -- useDispatch allow you to dispatch any redux action 
     inside your React compoents 
  -- useSelector accepts function that has redux state as parameter
     From this parameter, getting the productList
     from reducer in store.js 
     */  
}
export default function HomeScreen() {
 const dispatch = useDispatch();
 const productList = useSelector((state) => state.productList);
 const { loading, error, products} = productList;


  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {/* Product arr is papssed to Product component accessed by
            product = object */}
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
}
