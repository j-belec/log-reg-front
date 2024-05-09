import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const [time, setTime] = useState(10);
  const interval = setTimeout(() => {
    setTime((prevTime) => prevTime - 1);
  }, 1000);

  if (time === 0) {
    clearInterval(interval);
    navigate("/");
  }

  return (
    <section className="page">
      <div className="section__title-container">
        <h1 className="section__title">ERROR</h1>
      </div>
      <div className="page-container">
        <div className="page-content">
          <h2 className="page-content-h2">404 Not Found!</h2>
          <p className="page-content-p">This route does not exist!</p>
          <p className="page-content-p">
            Redirecting Home: <strong>{time}s</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
