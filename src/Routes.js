import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import AdminDashboard from "./components/admindashboard";
import PeopleRegistered from "./components/peopleregistered";
import PrivateRoute from "./components/privateroute";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register/:eid" component={Register} />
        <PrivateRoute path="/admindashboard" exact component={AdminDashboard} />
        <PrivateRoute
          path="/peoplesregistered/:eid"
          exact
          component={PeopleRegistered}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
