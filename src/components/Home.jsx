import { useSelector } from "react-redux";

function Home() {
  const login = useSelector((state) => state.login.value);
  console.log(login);

  return (
    <section className="page">
      <div className="section__title-container">
        <h1 className="section__title">Home</h1>
      </div>
      <div className="page-container">
        <div className="page-content">
          <h2 className="page-content-h2">Home content!</h2>
        </div>
      </div>
    </section>
  );
}

export default Home;
