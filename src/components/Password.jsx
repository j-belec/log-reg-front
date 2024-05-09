import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoggedIn from "./LoggedIn";
import useInputValidation from "../Hooks/useInputValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Password() {
  const login = useSelector((state) => state.login.value);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const regularExpressions = {
    password: /^[a-zA-ZÁ-ÿ0-9\s]{5,100}$/,
    password2: /^[a-zA-ZÁ-ÿ0-9\s]{5,100}$/,
  };

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInputValidation((value) => regularExpressions.password.test(value));

  const {
    value: password2Value,
    valueChangeHandler: password2ChangeHandler,
    inputBlurHandler: password2BlurHandler,
    isTouched: password2IsTouched,
  } = useInputValidation((value) => regularExpressions.password2.test(value));

  // Validacion form
  let formIsValid = false;

  if (passwordIsValid && password2Value === passwordValue) {
    formIsValid = true;
  }

  //form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formIsValid) {
      const data = {
        password: passwordValue,
      };
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://log-reg-back.onrender.com/users/editUser/change-password",
          {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "content-type": "application/json" },
          }
        );
        const responseData = await response.json();
        if (response.ok) {
          toast.success("Updated password! Redirecting to your profile");
          setIsLoading(false);
          setTimeout(() => {
            navigate("/profile");
          }, 3000);
        } else {
          throw new Error(responseData.error);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("" + error);
      }
    } else {
      toast.error("Form is invalid! Please check the fields");
    }
  };

  const passwordClassLabel = passwordHasError ? "invalid-label" : "";
  const passwordClassInput = passwordHasError ? "invalid-input" : "";
  const password2ClassLabel =
    password2IsTouched && password2Value !== passwordValue
      ? "invalid-label"
      : "";
  const password2ClassInput =
    password2IsTouched && password2Value !== passwordValue
      ? "invalid-label"
      : "";

  if (!login) {
    return <LoggedIn />;
  }

  return (
    <section className="password">
      <div className="section__title-container">
        <h1 className="section__title">My Profile</h1>
      </div>
      <div className="password__form-container">
        <form onSubmit={handleSubmit} className="password__form">
          <div className="password__form-title-container">
            <h2 className="password__form-title">Password</h2>
            <p className="password__form-title-p">Change your pasword here!</p>
          </div>
          <div className="password__form-input-container">
            <label htmlFor="password" className={passwordClassLabel}>
              Password
              <input
                type="password"
                name="password"
                value={passwordValue}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                className={`${passwordClassInput} password__form-input`}
              />
              {passwordHasError && (
                <p className="p-invalid">
                  This field is required and has a minimum of 5 characters.
                </p>
              )}
            </label>
            <label htmlFor="password2" className={password2ClassLabel}>
              Confirm Password
              <input
                type="password"
                name="password2"
                value={password2Value}
                onChange={password2ChangeHandler}
                onBlur={password2BlurHandler}
                className={`${password2ClassInput} password__form-input`}
              />
              {password2IsTouched && password2Value !== passwordValue && (
                <p className="p-invalid">Passwords must be the equals.</p>
              )}
            </label>
          </div>
          <div className="password__form-btns-container">
            <Link
              to="/profile"
              className="password__form-btn password__form-btn-cancel"
            >
              Cancel
            </Link>
            <button type="submit" className="password__form-btn">
              {loading && "Saving.."}
              {!loading && "Save"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}

export default Password;
