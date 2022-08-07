import React, { Component } from "react";

class Banner extends Component {
  render() {
    return (
      <div id="banner">
        <div id="banner-el">
          <div id="banner-heading">FURNITURE COLLECTION</div>
          <div id="banner-button">
            <a className="buttons" href="#products-container">
              SHOP NOW
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
