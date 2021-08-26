import React, { Component } from "react";
import banner from "../images/banner.jpg";

class Banner extends Component {
  render() {
    return (
      <div id="banner">
        <div id="banner-el">
          <div id="banner-heading">FURNITURE COLLECTION</div>
          <div id="banner-button">
            <a className="buttons" href="">
              SHOP NOW
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
