import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useInputValidation from "../Hooks/useInputValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const regularExpressions = {
    name: /^[a-zA-ZÁ-ÿ\s]{2,100}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$/,
    password: /^[a-zA-ZÁ-ÿ0-9\s]{2,100}$/,
  };

  // Validacion inputs
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInputValidation((value) => regularExpressions.name.test(value));

  const {
    value: surnameValue,
    isValid: surnameIsValid,
    hasError: surnameHasError,
    valueChangeHandler: surnameChangeHandler,
    inputBlurHandler: surnameBlurHandler,
    reset: resetSurname,
  } = useInputValidation((value) => regularExpressions.name.test(value));

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

  if (nameIsValid && surnameIsValid && emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  //form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formIsValid) {
      const data = {
        name: nameValue,
        surname: surnameValue,
        email: emailValue,
        password: passwordValue,
      };

      try {
        setIsLoading(true);
        const response = await fetch(
          "https://log-reg-back.onrender.com/users/register",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "content-type": "application/json" },
          }
        );

        if (response.ok) {
          setIsLoading(false);
          toast.success(
            "You have successfully registered! Redirecting to login"
          );
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          throw new Error("Failed to submit form");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("" + error);
      }
    } else {
      toast.error("Form is invalid! Please check the fields");
    }
  };

  const nameClassLabel = nameHasError ? "invalid-label" : "";
  const nameClassInput = nameHasError ? "invalid-input" : "";
  const surnameClassLabel = nameHasError ? "invalid-label" : "";
  const surnameClassInput = nameHasError ? "invalid-input" : "";
  const emailClassLabel = emailHasError ? "invalid-label" : "";
  const emailClassInput = emailHasError ? "invalid-input" : "";
  const passwordClassLabel = passwordHasError ? "invalid-label" : "";
  const passwordClassInput = passwordHasError ? "invalid-input" : "";

  return (
    <div className="log-reg">
      <div className="section__title-container">
        <h1 className="section__title">Register</h1>
      </div>
      <div className="log-reg__form-container">
        <form onSubmit={handleSubmit} className="log-reg__form">
          <label htmlFor="name" className={nameClassLabel}>
            Name
            <input
              type="text"
              name="name"
              value={nameValue}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              className={nameClassInput}
            />
            {nameHasError && (
              <p className="p-invalid">Este campo es obligatorio.</p>
            )}
          </label>
          <label htmlFor="surname" className={surnameClassLabel}>
            Surname
            <input
              type="text"
              name="email"
              value={surnameValue}
              onChange={surnameChangeHandler}
              onBlur={surnameBlurHandler}
              className={surnameClassInput}
            />
            {surnameHasError && (
              <p className="p-invalid">Este campo es obligatorio.</p>
            )}
          </label>
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Register;
