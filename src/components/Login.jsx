import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/store";
import { useNavigate } from "react-router-dom";
import useInputValidation from "../Hooks/useInputValidation";

function Login() {
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const regularExpressions = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$/,
    password: /^[a-zA-ZÁ-ÿ0-9\s]{2,100}$/,
  };

  // Validacion inputs
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInputValidation((value) => regularExpressions.email.test(value));

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInputValidation((value) => regularExpressions.password.test(value));

  // Validacion form
  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formIsValid) {
      const data = {
        email: emailValue,
        password: passwordValue,
      };

      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3100/users/login", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "content-type": "application/json" },
        });

        const responseData = await response.json();

        if (response.ok) {
          setIsLoading(false);
          resetEmail();
          resetPassword();
          dispatch(loginActions.login());
          navigate("/");
        } else {
          console.log(responseData.error);
          setIsLoading(false);
          throw new Error(responseData.error);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert(error);
      }
    } else {
      alert("Form is invalid! Please check the fields...");
    }
  };

  const emailClassLabel = emailHasError ? "invalid-label" : "";
  const emailClassInput = emailHasError ? "invalid-input" : "";
  const passwordClassLabel = passwordHasError ? "invalid-label" : "";
  const passwordClassInput = passwordHasError ? "invalid-input" : "";

  return (
    <section className="log-reg">
      <div className="section__title-container">
        <h1 className="section__title">Login</h1>
      </div>
      <div className="log-reg__form-container">
        <form onSubmit={handleSubmit} className="log-reg__form">
          <label htmlFor="email" className={emailClassLabel}>
            Email
            <input
              type="text"
              name="email"
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              className={emailClassInput}
            />
            {emailHasError && (
              <p className="p-invalid">Este campo debe ser un e-mail válido.</p>
            )}
          </label>
          <label htmlFor="password" className={passwordClassLabel}>
            Password
            <input
              type="password"
              name="password"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              className={passwordClassInput}
            />
            {passwordHasError && (
              <p className="p-invalid">Este campo es obligatorio.</p>
            )}
          </label>
          <button type="submit">
            {loading && "Submitting.."}
            {!loading && "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
