import React, { Fragment, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers, clearErrors, deleteUser
} from "../../actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { DELETE_USER_RESET } from "../../constants/userConstants";


const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
     toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch,  error, deleteError, navigate, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellStyle: (params) => {
        return (params.value === "admin") ? {color: 'green'} : {color: 'red'};
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      cellRenderer: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.data.id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.data.id)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
    <MetaData title={`ALL USERS - Admin`} />

    <div className="dashboard">
      <SideBar />
      <div className="productListContainer ag-theme-alpine">
        <h1 id="productListHeading">ALL USERS</h1>

        <AgGridReact
            rowData={rows}
            columnDefs={columns}
            animateRows={true}
            disableSelectionOnClick
            className="productListTable"
          />
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            pauseOnHover
            theme="dark"
          />
      </div>
    </div>
  </Fragment>
  )
}

export default UserList