import { useSelector } from "react-redux";
import LoggedIn from "./LoggedIn";

function SecondPage() {
  const login = useSelector((state) => state.login.value);

  if (!login) {
    return <LoggedIn />;
  }

  return (
    <section className="page">
      <div className="section__title-container">
        <h1 className="section__title">Page 2</h1>
      </div>
      <div className="page-container">
        <div className="page-content">
          <h2 className="page-content-h2">Page 2 content!</h2>
        </div>
      </div>
    </section>
  );
}

export default SecondPage;
