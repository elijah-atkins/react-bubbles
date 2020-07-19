import React from "react";

import axiosWithAuth from "../utils/axiosWithAuth";

class Login extends React.Component {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  state = {
    credentials: {
      username: "",
      password: "",
    },
    error: "",
  };

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", this.state.credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/BubblePage");

      })
      .catch((err) =>
        this.setState({
          credentials: {
            username: "",
            password: ""
          },
          error: err.message
        })
      );
  };

  render() {
    return (
      <div className="login">
        <h1>Welcome to the Bubble App!</h1>
        <p>Username: "Lambda School"</p>
        <p>Password: "iHeartLambd4"</p>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <div className="button-row">
            <button>Log in</button>
          </div>
        </form>
        {(this.state.error !== "") ? <p className="error">{this.state.error}</p> : null}
      </div>
    );
  }
}

export default Login;
