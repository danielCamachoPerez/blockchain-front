import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/Nav";
import SwitchRouter from './components/SwitchRouter'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <SwitchRouter/>
    </BrowserRouter>
  );
}

export default App;
