import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import {Button} from "@material-ui/core";
class Header extends Component {
  toggleIcon = () => {
    let icon = "fas";
    if (this.props.darkMode) icon += " fa-sun fa-2x";
    else icon += " fa-moon fa-2x";
    return icon;
  };
  Logout=()=>{
    localStorage.clear();
    this.props.history.push("/");
  }

  render() {
    //const{history}=this.props;
    let icon = this.toggleIcon();
    return (
      <header>
        <h1>
          <Link to="/home">
            Comfy <span>Zone</span>
          </Link>
        </h1>
        <div id="theme">
        <i class="fa fa-sign-out fa-2x " style={{rotate:"180deg",marginRight:"9px"}} aria-hidden="true" onClick={this.Logout}></i>
          <i className={icon} onClick={() => this.props.toggleTheme()}></i>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
