import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  return (
    <Route
      {...rest} //pass rest params of original route
      render={(props) =>
        userInfo ? (
          <Component {...props}></Component> //render Component defined in App.js and pass in ...props
        ) : (
          <Redirect to="/signin" /> //otherwise redirect user to Sign In
        )
      }
    ></Route>
  );
}
