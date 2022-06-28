import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}auth/signin`,
        withCredentials: true,
        data: {
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);

          if (res.data.errors) {
          } else {
            window.location = "/";
          }
        })
        .catch((err) => {
          swal(
            "Error",
            "Connexion impossible: Vérifier votre email ou votre mot de passe!",
            "error"
          );
          console.log(err);
        });
    } else if (password === "" || email === "") {
      swal("Error", "Veuillez compléter le formulaire!", "error");
    }
  };

  return (
    <form action="" onSubmit={handleLogin}>
      <label htmlFor="email">Email : </label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
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
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
