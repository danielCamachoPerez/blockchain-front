import { useState } from "react";

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
      return console.log(response.message);
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
    <div className='container-2 flex flex-direction-col'>
      <div className="m-t-1">
        <h1>LogIn</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mr-t-1">
          <input
            type="email"
            name="mail"
            placeholder="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mr-t-1">
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mr-t-1">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
};

export default Form;
