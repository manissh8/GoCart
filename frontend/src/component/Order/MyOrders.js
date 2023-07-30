import React, { Fragment, useEffect, useMemo, useRef,useCallback } from "react";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";
import { toast, ToastContainer } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";



const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  

  const columnDefs = [
    {
      field: "id",
      headerName: "Order ID",
      type: "string",
      sortable: true,
      filter: true,
      minWidth : 300,
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
      sortable: true,
      filter: true,
      minWidth : 150,
      flex: 0.5,
      cellStyle: params => {
        return (params.value === "Delivered") ? {color: 'green'} : {color: 'red'};
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      sortable: true,
      filter: true,
      minWidth : 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      sortable: true,
      filter: true,
      minWidth : 270,
      flex: 0.5,
    },

    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      sortable: false,
      filter: true,
      minWidth : 150,
      flex: 0.3,
      cellRenderer : (params) => {
        return (
            <Link to={`/order/${params.data.id}`}>
              <LaunchIcon />
            </Link>
          );
      },
    },
  ];

  const rowData= [];

  orders &&
    orders.forEach((item, index) => {
        rowData.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);
  
  return (
    <Fragment>
      <MetaData title={`${user.name}'s - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div
          className="ag-theme-alpine myOrdersPage"
        >
          <AgGridReact
            rowData={rowData} // Row Data for Rows
            columnDefs={columnDefs} // Column Defs for Columns
            animateRows={true}
            className="myOrdersTable"
          />
          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
