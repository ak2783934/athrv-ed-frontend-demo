import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { getevents } from "../connections/index";
import Event from "./event";
import { isAuthenticated } from "../connections/index";
import { Redirect } from "react-router-dom";
export default function Home() {
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

  const doRedirect = () => {
    if (isAuthenticated().user) {
      return <Redirect from="/" to="/admindashboard" />;
    }
  };

  return (
    <div className={"home"}>
      <Navbar />
      <h1 className={"home-h1"}>EVENTS</h1>
      <div className={"home-container"}>
        <div className={"titles-home"}>
          <div>Name of Events</div>
          <div>Date of Events</div>
        </div>
        <div className={"home-events"}>
          {events.map((event, index) => {
            return (
              <div key={index}>
                <Event event={event} />
              </div>
            );
          })}
        </div>
      </div>
      {doRedirect()}
    </div>
  );
}
