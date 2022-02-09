import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const TopNav = () => {
  const dispatch = useDispatch();
  const { user} = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <nav>
    <div className="nav bg-light d-flex ">
    <h3>NPBooking</h3>
      <Link className="nav-link" to="/">
        Home
      </Link>

      {user !== null && (
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
      )}
      {user!== null && (
        <a className="nav-link pointer" onClick={logout}>
          Logout
        </a>
      )}
      {user === null && (
        <>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </>
      )}
    </div>
    </nav>
  );
};

  export default TopNav;
  