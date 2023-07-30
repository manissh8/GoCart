import React from 'react'
import "./Footer.css";
import "../../../fonts/fonts.css";
import download from "../../../images/download.png"
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import Wave from 'react-wavify'
const  Footer= () => {
  return (
    <div>
    {/* <Wave mask="url(#mask)" fill="#5cb6ed">
  <defs>
    <linearGradient id="gradient" gradientTransform="rotate(90)">
      <stop offset="0" stopColor="white" />
      <stop offset="0.5" stopColor="black" />
    </linearGradient>
    <mask id="mask">
      <rect x="0" y="0" width="2000" height="200" fill="url(#gradient)"  />
    </mask>
  </defs>
</Wave> */}
    <footer id="footer"  >
     <div className="leftFooter">
        <h4 style={{fontFamily: "footerFont"}}>DOWNLOAD OUR APP</h4>
        <p style={{fontFamily: "footerFont"}}>Download App for Android and IOS mobile phone</p>
        <img src={download} alt="playstore" />
      </div>

      <div className="midFooter">
        <h1 style={{fontFamily: "footerFont"}}>GO CART</h1>
        <p style={{fontFamily: "footerFont"}}>High Quality is our first priority</p>

        <p style={{fontFamily: "footerFont"}}>Copyrights 2021 &copy; ManishSingh</p>
      </div>

      <div className="rightFooter">
        <h4 style={{fontFamily: "footerFont"}}>Follow Us</h4>
        <a href="http://instagram.com">Instagram</a>
        <a href="http://youtube.com">Youtube</a>
        <a href="http://facebook.com">Facebook</a>
      </div>        
    </footer>
    </div>
  )
}

export default Footer