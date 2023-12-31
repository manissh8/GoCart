import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Outlet } from "react-router-dom";

const ProtectedRoute = ({isAdmin}) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading===false && (isAuthenticated===false || (isAdmin===true && user.role!=="admin")) ? <Navigate to="/login" /> : <Outlet/>};
    </Fragment>
  );
};

export default ProtectedRoute;