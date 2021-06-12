import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Formulary } from './Styles'

const Form = () => {
  const [user, setUser] = useState({});
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:4000/users/login";
    const myHeaders = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    };
    const request = await fetch(url, myHeaders);
    const response = await request.json();
    if (response.message !== "welcome!") {
      return alert(response.message)
      //return console.log(response.message);
    } else {
      const token = response.token;
      const name = response.name;
      const idUser = response.id;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("idUser", idUser);
      window.location.href = "/home";
    }
  };
  return (
    <Container direction='column'>
      <div><h1 style={{ color: "#fff" }}>LogIn</h1></div>
      <Formulary 
        border='solid 1px #EBEDEF' 
        width='25%' 
        direction='column'
        onSubmit={handleSubmit}
      >
        <label>email address</label>
        <input
          className='m-b m-t-1 input-1 input-text'
          type="email"
          name="mail"
          placeholder="email"
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          className='m-b m-t-1 input-1 input-text'
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          required
        />
        
        <input 
          className='btn btn-primary' 
          type="submit" 
          value="Login" 
        />

      </Formulary>
      
      <div>
        <h4 style={{ color: "#fff" }}>
          New on CryptoWallet?
          <Link style={{ marginLeft: "8px" }} to="/register">
            create an account
          </Link>
        </h4>
      </div>
    </Container>
  );
};

export default Form;
