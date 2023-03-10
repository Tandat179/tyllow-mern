import React, { Fragment, useEffect, useContext, useState } from "react";
import DataGrid from "react-data-grid";
import { Link } from "react-router-dom";

import { ProductContext } from "../../context/product/ProductContext";
import EditIcon from "../../assets/pencil-fill.svg";
import DeleteIcon from "../../assets/trash-fill.svg";
import LoadingModel from "../Loading/loading";

import Sidebar from "./SideBar.js";
import "./ProductList.css";

const ProductList = () => {
  const [isLoading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [keyword, setKeyword] = useState("");
  const {
    productState: { productsAdmin },
    getAllProducts,
    deleteProduct,
  } = useContext(ProductContext);

  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2000);
  };

  const formatterActions = (value) => {
    return (
      <>
        <Link to={`/admin/product/${value}`}>
          <img src={EditIcon} alt="icon" />
        </Link>
        <button onClick={() => deleteProductHandler(value)}>
          <img src={DeleteIcon} alt="icon" />
        </button>
      </>
    );
  };

  const deleteProductHandler = (id) => {
    loadingShow();
    deleteProduct(id);
  };

  const formatterName = ({ images, name }) => {
    return (
      <div>
        <img alt={images[0].images} src={images[0].url} />
        <p>{name}</p>
      </div>
    );
  };

  const columns = [
    { key: "stt", name: "STT", minWidth: 120, flex: 0.1 },
    {
      key: "name",
      name: "Name",

      formatter: (name, image) => {
        return formatterName(name.row.name);
      },
    },

    {
      key: "category",
      name: "Category",
    },


    {
      key: "content",
      name: "Content",
    },

    {
      key: "ispremium",
      name: "Ispremium",
    },

    {
      key: "link_embed",
      name: "Source",
    },
    
    {
      key: "thumb_url",
      name: "Image",
    },

    {
      key: "actions",
      name: "Actions",
      type: "number",
      sortable: false,
      formatter: (value) => {
        return formatterActions(value.row.productId);
      },
    },
  ];

  const rows = [];
  let STT = 1;
  productsAdmin &&
    productsAdmin.forEach((product, index) => {
      rows.push({
        stt: STT,

        thumb_url:product.thumb_url,
        productId: product._id,
        category: product.category,
     
        name: { name: product.name, images: product.images },
        content: product.content,
        ispremium: String(product.ispremium),
        link_embed: product.link_embed,
      });
      STT++;
      // console.log(product.ispremium);
    });

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getAllProducts();
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    keyword ? getAllProducts(keyword) : getAllProducts();
  }, [keyword]);

  return (
    <Fragment>
      <LoadingModel show={isLoading || loadingSubmit} />
      <div className="dashboardProduct">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL FILM  </h1>
          <form className="searchBox">


            {/* Search product */}
            <input
              type="text"
              name="keyword"
              placeholder="Search a Product ..."
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
          {/* Return Product List */}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            rowHeight={160}
            headerRowHeight={50}
            summaryRowHeight={30}
          />
        </div>
      </div>
      
    </Fragment>
  );
};

export default ProductList;
