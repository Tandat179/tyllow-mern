import React, { Fragment, useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Pagination } from "swiper";
import "@splidejs/react-splide/css";
import "../Home/movie-card.scss";
import Button from "../button/Button";
import { ProductContext } from "../../context/product/ProductContext";
import Play from "../../assets/play.png";
function ListMovie({}) {
  // console.log("product=========", products);

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

  const renderItem = () => {
    return products.map((values, index) => {
      return (
        <>
          <SplideSlide>
            <Link to={`/product/${values._id}`}>
              <div
                className="movie-card"
                style={{ backgroundImage: `url(${values.thumb_url})` }}
                // style={{ backgroundImage: `url(${values.images[0].url})` }}

              >
                <Button></Button>
              </div>
              <div className="card-title">
                <h3>{values.name}</h3>
              </div>
            </Link>
          </SplideSlide>
        </>
      );
    });
  };

  return (
    <Splide
      options={{
        rewind: false,
        gap: "1rem",
        perPage: 6,
        perMove: 1,
      }}
      aria-label="My Favorite Images"
    >
      {renderItem()}
    </Splide>
  );
}
export default ListMovie;
