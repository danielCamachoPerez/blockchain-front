import "./App.css";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import Nav from "./components/Nav";
import FormLogin from "./components/FormLogin";
import FormRegister from "./components/FormRegister";
import Home from "./components/Home";
import Transaction from "./components/Transaction";
import Details from "./components/Details";
import Import from "./components/Import";
//import Error from "./components/404";

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

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        {isAut() ? (
          <Route exact path="/login">
            <Redirect to="/home" />
          </Route>
        ) : null}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
          <FormLogin />
          <h3 className='flex flex-direction-row'>
            You dont have acount? <Link style={{marginLeft:'8px'}} to="/register">create one</Link>
          </h3>
        </Route>
        <Route exact path="/register">
          <FormRegister />
          <h3 className='flex flex-direction-row'>
            You have acount? <Link style={{marginLeft:'8px'}} to="/login">login</Link>
          </h3>
        </Route>
        <MyRoute exact path='/details/:id' component={Details}/>
        <MyRoute exact path="/home" component={Home} />
        <MyRoute path='/transaction/:id' component={Transaction}/>
        <MyRoute exact path='/import' component={Import}/>
        {/* <Route path="*">
          <Error />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
