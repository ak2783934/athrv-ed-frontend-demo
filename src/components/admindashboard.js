import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { getevents, postevent } from "../connections/index";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);

  const preLoad = () => {
    console.log("Preload triggered at home");
    getevents().then((data) => {
      console.log("getevents called?");
      if (data === false) {
        console.log("No data recieved from getevents");
      } else {
        console.log("data is recieved from getevents");
        setEvents(data);
        console.log(data);
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const [values, setValues] = useState({
    name: "",
    date: "",
    success: false,
  });
  const { name, date, success } = values;
  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      success: false,
    });
    postevent({ name, date })
      .then((data) => {
        if (data === false) {
          console.log("Couldn't post the event");
        } else {
          setValues({
            ...values,
            name: "",
            date: "",
            success: true,
          });
          preLoad();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={"admin-dashboard"}>
      <Navbar />
      <div className={"add-events"}>
        <h1>Create an event</h1>
        <div>
          <form>
            <input
              type="text"
              placeholder="name"
              onChange={handleChange("name")}
              value={name}
            />
            <input
              type="date"
              placeholder="date"
              onChange={handleChange("date")}
              value={date}
            />
            <button onClick={onSubmit}>Create</button>
          </form>
        </div>
      </div>
      <div className={"all-events"}>
        <div className={"titles-home"}>
          <div>Name of Events</div>
          <div>Date of Events</div>
        </div>
        <div className={"home-events"}>
          {events.map((event, index) => {
            return (
              <div key={index}>
                <div>{event.name}</div>
                <div>{event.date.slice(0, 10)}</div>
                <Link to={"/peoplesregistered/" + event.eid}>
                  View Participants
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
