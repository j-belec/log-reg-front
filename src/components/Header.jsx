import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

function Header() {
  const login = useSelector((state) => state.login.value);
  const [actualUser, setActualUser] = useState({});

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("http://localhost:3100/users/actual-user");

        if (response.ok) {
          const user = await response.json();
          console.log(user);
          setActualUser(user);
        } else {
          console.error(
            "Error al obtener el usuario actual:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };
    fetchCurrentUser();
  }, [login]);

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
              <LogoutIcon fontSize="large" className="header__logout-icon" />
            </div>
          )}
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
