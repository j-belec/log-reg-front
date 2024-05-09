import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../store/store";
import { useLoaderData, Link } from "react-router-dom";
import LoggedIn from "./LoggedIn";
import useInputValidation from "../Hooks/useInputValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const login = useSelector((state) => state.login.value);
  const [loading, setIsLoading] = useState(false);
  const actualUser = useLoaderData();
  const dispatch = useDispatch();

  const regularExpressions = {
    name: /^[a-zA-ZÁ-ÿ\s]{2,50}$/,
    surname: /^[a-zA-ZÁ-ÿ\s]{2,50}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$/,
  };

  // Validacion inputs
  let {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInputValidation(
    (value) => regularExpressions.name.test(value),
    actualUser.name
  );

  let {
    value: surnameValue,
    isValid: surnameIsValid,
    hasError: surnameHasError,
    valueChangeHandler: surnameChangeHandler,
    inputBlurHandler: surnameBlurHandler,
    reset: resetSurname,
  } = useInputValidation(
    (value) => regularExpressions.surname.test(value),
    actualUser.surname
  );

  let {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInputValidation(
    (value) => regularExpressions.email.test(value),
    actualUser.email
  );

  // Validacion form
  let formIsValid = false;

  if (nameIsValid && surnameIsValid && emailIsValid) {
    formIsValid = true;
  }

  //form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      nameValue === actualUser.name &&
      surnameValue === actualUser.surname &&
      emailValue === actualUser.email
    ) {
      toast.error("You have to chage at least one value!");
      return;
    }

    if (formIsValid) {
      const data = {
        name: nameValue,
        surname: surnameValue,
        email: emailValue,
      };

      try {
        setIsLoading(true);
        const response = await fetch(
          "https://log-reg-back.onrender.com/users/editUser",
          {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "content-type": "application/json" },
          }
        );

        const responseData = await response.json();
        if (response.ok) {
          toast.success("Updated!");
          setIsLoading(false);
          console.log(responseData);
          //cambio los valores en el actualUser de redux
          dispatch(loginActions.setActualUser(data));
        } else {
          console.log(responseData);
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

  const cancelHandler = () => {
    resetName();
    resetSurname();
    resetEmail();
  };

  const nameClassLabel = nameHasError ? "invalid-label" : "";
  const nameClassInput = nameHasError ? "invalid-input" : "";
  const surnameClassLabel = surnameHasError ? "invalid-label" : "";
  const surnameClassInput = surnameHasError ? "invalid-input" : "";
  const emailClassLabel = emailHasError ? "invalid-label" : "";
  const emailClassInput = emailHasError ? "invalid-input" : "";

  if (!login) {
    return <LoggedIn />;
  }

  return (
    <section className="profile">
      <div className="section__title-container">
        <h1 className="section__title">My Profile</h1>
      </div>
      <div className="profile__form-container">
        <form onSubmit={handleSubmit} className="profile__form">
          <div className="profile__form-title-container">
            <h2 className="profile__form-title">Personal info</h2>
            <p className="profile__form-title-p">Change your data here!</p>
          </div>
          <div className="profile__form-input-container">
            <label htmlFor="name" className={nameClassLabel}>
              Name
              <input
                type="text"
                name="name"
                value={nameValue}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                className={`${nameClassInput} profile__form-input`}
              />
              {nameHasError && (
                <p className="p-invalid">Este campo es obligatorio.</p>
              )}
            </label>
            <label htmlFor="surname" className={surnameClassLabel}>
              Surname
              <input
                type="text"
                name="surname"
                value={surnameValue}
                onChange={surnameChangeHandler}
                onBlur={surnameBlurHandler}
                className={`${surnameClassInput} profile__form-input`}
              />
              {surnameHasError && (
                <p className="p-invalid">Este campo es obligatorio.</p>
              )}
            </label>
            <label
              htmlFor="email"
              className={`${emailClassLabel} profile__form-input-email `}
            >
              Email
              <input
                type="text"
                name="email"
                value={emailValue}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                className={`${emailClassInput} profile__form-input`}
              />
              {emailHasError && (
                <p className="p-invalid">
                  Este campo debe ser un e-mail válido.
                </p>
              )}
            </label>
          </div>
          <div className="profile__form-btns-container">
            <Link
              to="/profile/change-password"
              className="profile__form-btn profile__form-btn-psw"
            >
              Change Password
            </Link>
            <button
              type="reset"
              className="profile__form-btn profile__form-btn-cancel"
              onClick={cancelHandler}
            >
              Cancel
            </button>
            <button type="submit" className="profile__form-btn">
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

export default Profile;

export async function profileLoader() {
  try {
    const response = await fetch(
      "https://log-reg-back.onrender.com/users/actual-user"
    );

    if (response.ok) {
      const user = await response.json();
      // console.log(user);
      // setActualUser(user);
      // setNameValue(user.name);
      return user;
    } else {
      console.error("Error al obtener el usuario actual:", response.statusText);
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
}
