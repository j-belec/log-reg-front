import { Outlet } from "react-router-dom";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../store/store";
import LogoutIcon from "@mui/icons-material/Logout";

function Header() {
  const login = useSelector((state) => state.login.value);
  const actualUser = useSelector((state) => state.login.actualUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [popUp, setPopUp] = useState(false);

  const logoutHandler = () => {
    setPopUp(true);
  };

  const noHandler = () => {
    setPopUp(false);
  };

  const yesHandler = () => {
    dispatch(loginActions.logout());
    const user = { name: "", username: "", email: "" };
    dispatch(loginActions.setActualUser(user));
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="header__title-container">
          <h2 className="header__title">Login/Register App</h2>
        </div>
        <div className="header__nav">
          <NavLink
            to="/"
            className="header__nav-link"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
                borderRadius: isActive ? "4px" : "",
              };
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/first-page"
            className="header__nav-link"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
                borderRadius: isActive ? "4px" : "",
              };
            }}
          >
            Page 1
          </NavLink>
          <NavLink
            to="/second-page"
            className="header__nav-link"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
                borderRadius: isActive ? "4px" : "",
              };
            }}
          >
            Page 2
          </NavLink>
          {!login && (
            <div className="header__nav-log-reg">
              <NavLink
                to="/login"
                className="header__nav-link"
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
                    borderRadius: isActive ? "4px" : "",
                  };
                }}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="header__nav-link"
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
                    borderRadius: isActive ? "4px" : "",
                  };
                }}
              >
                Register
              </NavLink>
            </div>
          )}
          {login && (
            <div className="header__nav-profile">
              <NavLink
                to="/profile"
                className="header__nav-link"
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "",
                    borderRadius: isActive ? "4px" : "",
                  };
                }}
              >
                My Profile
              </NavLink>
            </div>
          )}
        </div>
        <div className="header__logout">
          {login && (
            <div className="header__logout-container">
              <div>
                <div className="header__logout-name-container">
                  <p className="header__logout-name">
                    {actualUser.name?.toUpperCase()}{" "}
                    {actualUser.surname?.charAt(0).toUpperCase()}.
                  </p>
                </div>
                <div className="header__logout-email">{actualUser.email}</div>
              </div>
              <LogoutIcon
                fontSize="large"
                className="header__logout-icon"
                onClick={logoutHandler}
              />
              {popUp && (
                <div className="popup">
                  <div className="popup__content">
                    <p className="popup__content-p">Do you want to log out?</p>
                    <div className="popup__content-btn-container">
                      <button
                        className="popup__content-btn"
                        onClick={yesHandler}
                      >
                        Yes
                      </button>
                      <button
                        className="popup__content-btn popup__content-btn-no"
                        onClick={noHandler}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
