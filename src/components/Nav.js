import { Link } from "react-router-dom";

const Nav = () => {
  const logOut = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };
  const isAut = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <nav className='nav'>
      <ul className="main">
        <li>
          <Link className='link' to="/">home</Link>
        </li>
        {isAut() ? (
          <li>
            <Link className='link' to="/loged" onClick={() => logOut()}>
              log-out
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default Nav;
