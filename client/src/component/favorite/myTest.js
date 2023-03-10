import React, { Fragment, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { OrderContext } from "../../context/order/OrderContext";
import "./MyOrder.css";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

import DataGrid from "react-data-grid";
import LaunchIcon from "../../assets/grid-3x3-gap.svg";

const formatterStatus = (value) => {
  return (
    <Badge
      bg={
        value === "Done"
          ? "success"
          : value === "Shipping"
          ? "warning"
          : value === "Processing"
          ? "primary"
          : "danger"
      }
    >
      {value}
    </Badge>
  );
};

const formatterActions = (value) => {
  return (
    <Link to={`/order/${value}`}>
      <img src={LaunchIcon} alt="icon" />
    </Link>
  );
};

const MyOrders = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);

  const {
    orderState: { orders },
    getMyOrders,
  } = useContext(OrderContext);


  // Colums render Propotype Of Order
  const columns = [
    { key: "stt", name: "STT" },
    //Status
    {
      key: "status",
      name: "Status",

      formatter: (value) => {
        return formatterStatus(value.row.status);
      },
    },
    //Item Quantity
    {
      key: "itemsQty",
      name: "Items Qty",
      type: "number",
    },

    //Amount
    {
      key: "amount",
      name: "Amount",
      type: "number",
    },

    //Action
    {
      key: "actions",
      name: "Actions",
      type: "number",
      sortable: false,
      formatter: (value) => {
        return formatterActions(value.row.id);
      },
    },
  ];

  // Row
  const rows = [];
  let STT = 1;
  // If have Item => show bonus Row +1
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        stt: STT,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
      STT++;
    });

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <Fragment>
      <div className="myOrdersPage">
        <h2 id="myOrdersHeading">{user.name}'s Orders</h2>
      {/* Show Order */}
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="myOrdersTable"
          autoHeight
        />
      </div>
    </Fragment>
  );
};

export default MyOrders;
