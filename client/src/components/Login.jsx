import { React, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import axios from "axios";
import "./signup.css";
import Header from "./header";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();

  const [data, setData] = useState({
    Email: "",
    Password: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const url = "http://localhost:5000/api/auth/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      alert("success");
      history.push("/productDisplay");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
    setData({
      Email: "",
      Password: "",
    });
  };
  const signup = () => {
    history.push("/signup");
  };

  const paperStyle = { padding: "30px 20px", width: 750, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  // const marginTop = { marginTop: 20 };
  return (
    <>
      <Header
        darkMode={props.darkMode}
        toggleTheme={() => props.toggleTheme()}
      />
      <Grid style={{ marginTop: "10%" }}>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center" style={{ marginBottom: "20px" }}>
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2 style={headerStyle}>Log in</h2>
            <Typography variant="caption" gutterBottom>
              Please fill this form to log in
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              type="email"
              placeholder="Email"
              name="Email"
              onChange={handleChange}
              value={data.Email}
              variant="outlined"
              style={{ marginBottom: "12px" }}
              fullWidth
              label="Email"
            />
            <TextField
              type="password"
              placeholder="Password"
              name="Password"
              onChange={handleChange}
              value={data.Password}
              variant="outlined"
              style={{ marginBottom: "12px" }}
              fullWidth
              label="Password"
            />

            {error && (
              <center>
                <div className="error_msg">{error}</div>
              </center>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginRight: "9px" }}
            >
              Log in
            </Button>
            <Button variant="contained" color="primary" onClick={signup}>
              Sign-up
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
