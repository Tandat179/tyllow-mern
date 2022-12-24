import React, { Fragment, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { FavoriteContext } from "../../context/favorite/FavoriteContext";
import "./MyFavorite.css";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

import DataGrid from "react-data-grid";
import LaunchIcon from "../../assets/grid-3x3-gap.svg";

const MyFavorites = () => {
  const {
    authState: { user },
    loadUser,
  } = useContext(AuthContext);
  // console.log("Hello");

  const {
    favoriteState: { favorites },
    getMyFavorites,
  } = useContext(FavoriteContext);

  const columns = [
    { key: "stt", name: "STT", minWidth: 120, flex: 0.1 },
    {
      key: "name",
      name: "Name",
    },
    {
      key: "itemsQty",
      name: "Items Qty",
      type: "number",
    },

    {
      key: "image",
      name: "Image",
      minWidth: 120,
      flex: 0.1,
    },
  ];

  // console.log(user);
  // Row
  const rows = [];
  let STT = 1;

  favorites &&
    favorites.forEach((item, index) => {
      rows.push({
        itemsQty: item.favoriteItems.length,
        stt: STT,
        name: item.favoriteItems[0].name,
        image: item.favoriteItems[0].image,
      });
      // console.log(item.favoriteItems.name);

      STT++;
    });

  useEffect(() => {
    getMyFavorites();
  }, [loadUser]);

  return (
    <Fragment>
      <div className="myOrdersPage">
        <h2 id="myOrdersHeading">{user.name}'s Favorites</h2>
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

export default MyFavorites;
