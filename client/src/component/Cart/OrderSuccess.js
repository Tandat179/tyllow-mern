import React from "react";
import { Link } from "react-router-dom";

import CheckoutSteps from "./CheckoutStreps";
import CheckCircleIcon from "../../assets/check-ne.svg";

import "./OrderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      {/* Step 2 */}
      <CheckoutSteps activeStep={2} />
      {/* Have add Item your cart */}
      <img alt="circle-fill" src={CheckCircleIcon} className="imgSVG" />

      <h2>Your Order has been Placed successfully </h2>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
