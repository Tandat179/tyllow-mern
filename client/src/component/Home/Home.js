import React, { Fragment, useContext, useEffect, useState } from "react";
import mouse from "../../assets/mouse.svg";
import "./home.css";
import ProductCard from "./ProductCard";
import { ProductContext } from "../../context/product/ProductContext";
import LoadingModal from "../Loading/loading";
import ListMovie from "../movie-list/ListMovie";
import { Link } from "react-router-dom";
import { OutlineButton } from "../../component/button/Button";
import { Banner } from "../banner/Banner.js";
import "../../component/banner/banner.scss";

// import HeroSlide from "../hero-slide/HeroSlide";
function Home() {
  const {
    productState: { products },
    getProducts,
  } = useContext(ProductContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getProducts();
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // console.log(products);

  return (
    <Fragment>
      {isLoading && <LoadingModal show={isLoading} />}

      <div className="hero-slide">
        <Banner />
        {/* <p>Welcome to Tyllow</p>
        <h1>FIND AMAZING Film BELOW</h1>

        <a href="#container">
          <button>
            Scroll <img src={mouse} alt="mouse"></img>
          </button>
        </a> */}
      </div>

      <br></br>

      <div className="container" id="container">
        <div className="section__header mb2">
          <h1>Hello</h1>
          <div className="section__header mb2">
            <Link to="/products">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <br></br>

          <ListMovie />

          <div className="section__header mb2"></div>
          <br></br>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
