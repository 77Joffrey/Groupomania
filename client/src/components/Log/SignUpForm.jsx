import React, { useEffect, useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";
import swal from "sweetalert";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [controlPasswordError, setControlPasswordError] = useState("");
  const [controlEmailError, setControlEmailError] = useState("");

  const ctrlPassErr = "Les mots de passe ne correspondent pas!";
  const ctrlPassOk = "Confirmation validée!";

  useEffect(() => {
    if (
      password !== "" &&
      controlPassword !== "" &&
      password !== controlPassword
    )
      setControlPasswordError(ctrlPassErr);
    else if (
      password !== "" &&
      controlPassword !== "" &&
      password === controlPassword
    )
      setControlPasswordError(ctrlPassOk);
    if (password === "" || controlPassword === "") setControlPasswordError("");
  }, [controlPassword, password]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (pseudo !== "" && email !== "" && controlPasswordError === ctrlPassOk) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}auth/signup`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then(() => {
          swal("Success", "Nouveau compte créé avec succès!", "success");
          setFormSubmit(true);
        })
        .catch((err) => {
          swal("Error", "Création impossible!", "error");
        });
    } else if (
      password === "" ||
      controlPassword === "" ||
      email === "" ||
      pseudo === ""
    ) {
      swal("Error", "Veuillez compléter le formulaire!", "error");
    } else if (controlPasswordError === ctrlPassErr) {
      swal("Error", "Mot de passe incorrect!", "error");
    } else if (controlPasswordError === ctrlPassErr) {
      swal("Error", "Veuillez renseigner le formulaire!", "error");
    }
  };

  return (
    <React.Fragment>
      {formSubmit === true ? (
        <>
          <SignInForm />
        </>
      ) : (
        <form action="" onSubmit={handleRegister}>
          <label htmlFor="pseudo">Pseudo : </label>
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <br />
          <div></div>
          <br />
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <div className="email_error"></div>
          <br />
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <div className="password_error"></div>
          <br />
          <label htmlFor="control-password">Password : </label>
          <input
            type="password"
            name="control_password"
            id="control-password"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
            placeholder="Confirmer le mot de passe"
          />
          <br />
          <div className="control-password_error">{controlPasswordError}</div>
          <br />
          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </React.Fragment>
  );
};

export default SignUpForm;
