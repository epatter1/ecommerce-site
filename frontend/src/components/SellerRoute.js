import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

{/* route for admin users. Checks if user is admin on frontend. Authenticated in backend in utils.js */}
export default function SellerRoute({ component: Component, ...rest }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  return (
    <Route
      {...rest} //pass rest params of original route
      render={(props) =>
        userInfo && userInfo.isSeller ?  (
          <Component {...props}></Component> //render Component defined in App.js and pass in ...props
        ) : (
          <Redirect to="/signin" /> //otherwise redirect user to Sign In
        )
      }
    ></Route>
  );
}
