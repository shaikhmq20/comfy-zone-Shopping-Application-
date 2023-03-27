import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  toggleIcon = () => {
    let icon = "fas";
    if (this.props.darkMode) icon += " fa-sun fa-2x";
    else icon += " fa-moon fa-2x";
    return icon;
  };

  render() {
    let icon = this.toggleIcon();
    return (
      <header>
        <h1>
          <Link to="/home">
            Comfy <span>Zone</span>
          </Link>
        </h1>
        <div id="theme">
          <i className={icon} onClick={() => this.props.toggleTheme()}></i>
        </div>
      </header>
    );
  }
}

export default Header;
