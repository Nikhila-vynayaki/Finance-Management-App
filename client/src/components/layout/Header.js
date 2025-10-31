import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { useAuthContext } from "../../hooks/useAuthContext";

const Header = () => {
  const { dispatch, user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Data");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0]?.toUpperCase())
        .join("")
    : "";

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              Expense Management
            </Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {user && (
                <li className="nav-item">
                  <Tooltip title={user.name}>
                    <div className="userName">{initials}</div>
                  </Tooltip>
                </li>
              )}
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              {user ? (
                <button
                  className="btn btn-outline-success"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
