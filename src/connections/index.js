const axios = require("axios");

// const url = "http://localhost:5000";
const url = "https://athrv-ed-demo.herokuapp.com";

export async function getevents() {
  console.log("Preload triggered at index");
  return await axios({
    url: `${url}/events`,
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      mode: "no-cors",
      Accept: "application/json",
    },
  })
    .then((response) => {
      // console.log("events recieved, From axios");
      // console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      // console.log("events not recieved, error in axios" + err);
      return false;
    });
}

export async function eventedit(event) {
  // console.log("edit event is clicked");
  return await axios({
    url: `${url}/eventedit/${isAuthenticated().user.uid}/${event.eid}`,
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      mode: "no-cors",
      Accept: "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    },
  })
    .then((response) => {
      // console.log("view toggled !, From axios");
      // console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      // console.log("view couldn't be toggled, error in axios" + err);
      return false;
    });
}

export async function getlist(event) {
  return await axios({
    url: `${url}/getlist/${isAuthenticated().user.uid}/${event.eventno}`,
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      mode: "no-cors",
      Accept: "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    },
  })
    .then((response) => {
      // console.log("got all peoples !, From axios");
      // console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log("couldn't get all people, error in axios" + err);
      return false;
    });
}

export async function register(user) {
  return await axios({
    url: `${url}/registration`,
    method: "POST",
    data: {
      name: user.name,
      age: user.age,
      phone: user.phone,
      email: user.email,
      college: user.college,
      eventno: user.eventno,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      mode: "no-cors",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // console.log("registration done!, From axios");
      // console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      // console.log("registration not done, error in axios" + err);
      return false;
    });
}

export async function signin(user) {
  return await axios({
    url: `${url}/signin`,
    method: "POST",
    data: {
      email: user.email,
      password: user.password,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      mode: "no-cors",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // console.log("data from axios and signin successfull ");
      // console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      // console.log(user.password + " " + user.email);
      // console.log("Error in axios {email and password doesn't match}");
      return false;
    });
}

export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");

    return axios({
      url: `${url}/signout`,
      method: "GET",
    })
      .then((response) => {
        console.log("Signout Successfull from Axios");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export async function postevent(event) {
  return await axios({
    url: `${url}/postevent/${isAuthenticated().user.uid}`,
    method: "POST",
    data: {
      name: event.name,
      date: event.date,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      mode: "no-cors",
      Accept: "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    },
  })
    .then((response) => {
      // console.log("new event posted!, From axios");
      // console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      // console.log("Couldn't post, error in axios" + err);
      return false;
    });
}

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
