import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { getlist } from "../connections/index";

export default function PeopleRegistered({ match }) {
  const [values, setValues] = useState({
    peoples: [],
  });
  const { peoples } = values;
  const eventno = match.params.eid;
  const preLoad = () => {
    console.log("Preload triggered at home");
    getlist({ eventno }).then((data) => {
      console.log("get people called?");
      if (data === false) {
        console.log("No data recieved from getpeople");
      } else {
        console.log("data is recieved from getpeoples");
        // setPeoples(data);
        setValues({
          ...values,
          peoples: data,
        });
        console.log(peoples);
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  return (
    <div className={"people-registered"}>
      <Navbar />
      <h1>The people registered are :</h1>

      <div className={"people-list"}>
        <div className={"people-list-title"}>
          <div>Name</div>
          <div>Age</div>
          <div>College</div>
          <div>Phone</div>
          <div>Email</div>
        </div>
        {peoples.map((people, index) => {
          return (
            <div key={index} className={"people-list-items"}>
              <div>{people.name}</div>
              <div>{people.age}</div>
              <div>{people.college}</div>
              <div>{people.phone}</div>
              <div>{people.email}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
