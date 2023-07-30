import React from "react";
import "./about.css";
import { Button, Typography, Avatar } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from "@mui/icons-material/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/_hsinam__";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dxekddhzy/image/upload/v1687785784/avatars/kpg7aonv4kngef1xalyr.jpg"
              alt="Founder"
            />
            <Typography>Manish Singh</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by Manish Singh. Only with the
              purpose to learn MERN Stack
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Connect with me on</Typography>
            <a
              href="https://www.linkedin.com/in/manish-914636202/"
              target="blank"
            >
              <LinkedInIcon className="linkedinSvgIcon" />
            </a>

            <a href="https://instagram.com/_hsinam__" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
            <a href="https://instagram.com/_hsinam__" target="blank">
              <FacebookIcon className="fbSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;