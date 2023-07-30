import React from "react";
import "./Contact.css";
import { Button } from "@mui/material";

const Contact = () => {
  const email = "manissh1911@gmail.com";
  const handleClick = () => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <div className="contactContainer">
    <div className="mailBtn">
      <Button onClick={handleClick}>{email}</Button>
    </div>
     
    </div>
  );
};

export default Contact;