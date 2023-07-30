import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
// import Pagination from "react-js-pagination";
import { Typography } from '@mui/material';
import { Slider } from '@mui/material';
import MetaData from '../layout/MetaData';


const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "Electronic",
];


const Products = () => {
  const dispatch = useDispatch();


  const [price, setPrice] = useState([0, 1000000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const { keyword } = useParams();

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductsCount; //this count is used to get no. of filtered proucts
  //to check whether to use pagination or not

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, price, category, ratings));
  }, [dispatch, keyword, price, category, ratings,error])

  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>
        <MetaData title="Products -GO CART"/>
        <h2 className="productsHeading">Products</h2>

        <div className="products">
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>

        <div className="filterBox">
          <Typography>Price</Typography>
          <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={1000000}
          />
          <Typography>Categories</Typography>
          <ul className="categoryBox">
            {categories.map((category) => (
              <li
                className="category-link"
                key={category}
                onClick={() => setCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>

          <fieldset>
            <Typography component="legend">Ratings Above</Typography>
            <Slider
              value={ratings}
              onChange={(e, newRating) => {
                setRatings(newRating);
              }}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              min={0}
              max={5}
            />
          </fieldset>

        </div>


      </Fragment>}
    </Fragment>
  )
}

export default Products