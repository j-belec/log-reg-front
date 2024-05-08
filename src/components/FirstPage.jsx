import { useSelector } from "react-redux";
import LoggedIn from "./LoggedIn";

function FirsPage() {
  const login = useSelector((state) => state.login.value);

  if (!login) {
    return <LoggedIn />;
  }

  return (
    <section className="page">
      <div className="section__title-container">
        <h1 className="section__title">Page 1</h1>
      </div>
      <div className="page-container">
        <div className="page-content">
          <h2 className="page-content-h2">Page 1 content!</h2>
        </div>
      </div>
    </section>
  );
}

export default FirsPage;
