import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";
import swal from 'sweetalert'

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [controlPasswordError, setControlPasswordError] = useState("")

  const ctrlPassErr = "Les mots de passe ne correspondent pas!"
  const ctrlPassOk = "Les mots de passe sont identiques!"


  const handleRegister = async (e) => {
    e.preventDefault();
    const pseudoError = document.querySelector(".pseudo_error");
    const emailError = document.querySelector(".email_error");
    const passwordError = document.querySelector(".password_error");
    const controlPasswordError = document.querySelector(
      ".control-password_error"
    );


    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/users/signup`,
      data: {
        pseudo,
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        swal("Success", "Nouveau compte créé avec succès!", "success");
        setFormSubmit(true);
      })
      .catch((err) => {
/*         pseudoError.innerHTML = err.data.errors.pseudo;
          emailError.innerHTML = err.data.errors.email;
          passwordError.innerHTML = err.data.errors.password; */
          swal("Error", "Le compte existe déjà!", "error");
        console.log(err);
        return { err };
      });
  };

  return (
    <React.Fragment>
      {formSubmit ? (
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
          <label htmlFor="control-password">Vérification Password : </label>
          <input
            type="password"
            name="control_password"
            id="control-password"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
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
