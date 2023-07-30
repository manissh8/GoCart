import React, {Fragment,useEffect} from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js"
import MetaData from "../layout/MetaData";
import {getProduct} from "../../actions/productActions";
import {useSelector,useDispatch} from "react-redux";
import Loader from "../layout/Loader/Loader";



const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products} = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch])
  

  return (
    <Fragment>
    {loading ? (
      <Loader/>
    ) : (
      <Fragment>
        <MetaData title="GO CART" />

        <div className="banner">
          {/* <a href="#container">
            <button><CgMouse />
            </button>
          </a> */}
        </div>

        <h2 className="homeHeading">Featured Products</h2>

        <div className="container" id="container">
          {products && products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </Fragment>
    )}
  </Fragment>
  );
};

export default Home