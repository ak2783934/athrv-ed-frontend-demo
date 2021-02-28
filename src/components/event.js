import React, { Fragment, useState } from "react";

import { Link } from "react-router-dom";

export default function Event(props) {
  const [event, setEvent] = useState({
    name: props.event.name,
    date: props.event.date.slice(0, 10),
    eid: props.event.eid,
  });
  const { name, date, eid } = event;

  return (
    <Fragment>
      <div>{name}</div>
      <div>{date}</div>
      <button>
        <Link to={"/register/" + eid}>Register</Link>
      </button>
    </Fragment>
  );
}
