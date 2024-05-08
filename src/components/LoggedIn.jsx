import { Link } from "react-router-dom";

function LoggedIn() {
  return (
    <section className="logged">
      <div className="section__title-container">
        <h1 className="section__title">Not allowed</h1>
      </div>
      <div className="logged-container">
        <div className="logged-content">
          <h2 className="logged-content-h2">
            You need to be logged in to access this route!
          </h2>
          <Link to="/login" className="logged-content-btn">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LoggedIn;
