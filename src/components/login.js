import React, { useState } from "react";
import Navbar from "./navbar";
import { signin, authenticate } from "../connections";
import { Redirect } from "react-router-dom";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    success: false,
  });
  const { email, password, success } = values;
  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      success: false,
    });

    signin({ email, password })
      .then((data) => {
        if (data === false) {
          console.log("Couldn't signin ");
        } else {
          authenticate(data, (req, res) => {
            console.log("siginedin");
            setValues({
              ...values,
              success: true,
            });
          });
        }
      })
      .catch((err) => console.log(err));
  };
  const loginform = () => (
    <div className={"login-form"}>
      <form>
        <div>
          <input
            type="email"
            placeholder="Email"
            onChange={handleChange("email")}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            onChange={handleChange("password")}
          />
        </div>

        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
  const doRedirect = () => {
    if (success) {
      return <Redirect from="/login" to="/admindashboard" />;
    }
  };
  return (
    <div className={"login"}>
      <Navbar />
      <h1>Login</h1>
      {loginform()}
      {doRedirect()}
    </div>
  );
}
