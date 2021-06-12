import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import Home from "./Home";
import Transaction from "./Transaction";
import Details from "./Details";
import Import from "./Import";
import Index from "../pages/Index";
//import Error from "./404";
import { Switch, Route, Redirect } from "react-router-dom";

const isAut = () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

const MyRoute = (props) => {
  return isAut() ? <Route {...props} /> : <Redirect to="/login" />;
};

const SwitchRouter = () => {
  return (
    <Switch>
      {isAut() ? (
        <Route exact path="/login">
          <Redirect to="/home" />
        </Route>
      ) : null}
      {isAut() ? (
        <Route exact path="/register">
          <Redirect to="/home" />
        </Route>
      ) : null}
      {isAut() ? (
        <Route exact path="/index">
          <Redirect to="/home" />
        </Route>
      ) : null}
      <Route exact path="/">
        <Redirect to="/index" />
      </Route>
      <Route exact path="/index" component={Index} />
      <Route exact path="/login" component={FormLogin} />
      <Route exact path="/register" component={FormRegister} />
      <MyRoute exact path="/details/:id" component={Details} />
      <MyRoute exact path="/home" component={Home} />
      <MyRoute path="/transaction/:id" component={Transaction} />
      <MyRoute exact path="/import" component={Import} />
    </Switch>
  );
};

export default SwitchRouter;
