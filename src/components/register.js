import React, { useState } from "react";
import { isAuthenticated } from "../connections/index";
import { Redirect } from "react-router-dom";
import Navbar from "./navbar";
import { register } from "../connections";
export default function Register({ match }) {
  const [values, setValues] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    college: "",
    eventno: match.params.eid,
    success: false,
  });
  const { name, age, phone, email, college, eventno, success } = values;
  const handleChange = (val) => (event) => {
    setValues({
      ...values,
      [val]: event.target.value,
    });
  };

  const doRedirect = () => {
    if (isAuthenticated().user) {
      return <Redirect from="/" to="/admindashboard" />;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      success: false,
    });
    register({ name, age, phone, email, college, eventno }).then((data) => {
      if (data === false) {
        console.log("No data recieved from register");
      } else {
        console.log("data is recieved from register");
        console.log(data);
        setValues({
          ...values,
          name: "",
          age: "",
          phone: "",
          email: "",
          college: "",
          success: true,
        });
      }
    });
  };
  const successmsg = () => {
    if (success === true) return <h5>Registered</h5>;
  };
  const regform = () => {
    return (
      <div className={"register-form"}>
        <form>
          <div>
            <input
              type="text"
              placeholder="Name"
              required
              onChange={handleChange("name")}
              value={name}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Age"
              required
              onChange={handleChange("age")}
              value={age}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="College"
              required
              onChange={handleChange("college")}
              value={college}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Phone"
              required
              onChange={handleChange("phone")}
              value={phone}
            />
          </div>
          <div>
            <input
              type="email"
              required
              placeholder="Email"
              onChange={handleChange("email")}
              value={email}
            />
          </div>

          <button type="submit" onClick={onSubmit}>
            Register
          </button>
          {successmsg()}
        </form>
      </div>
    );
  };

  return (
    <div className={"registration"}>
      <Navbar />
      <h1>Register yourself</h1>
      {regform()}
      {doRedirect()}
    </div>
  );
}
