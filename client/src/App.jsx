import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import UseGlobalStyle from "./utils/style/GlobalStyle";

import { UserIdContext } from "./components/AppContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { getUser } from "./actions/user_actions";
import swal from "sweetalert";

function App() {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState("");
  const [pseudo, setPseudo] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        methode: "get",
        url: `${process.env.REACT_APP_API_URL}api/token`,
        withCredentials: true,
      })
        .then((res) => {
          setUserId(res.data.user_Id);
          setRole(res.data.role);
          setPseudo(res.data.pseudo);
        })
        .catch((err) => {
          swal({
            title: "Attention!",
            text: "Vous n'êtes plus authentifié! Veuillez vous connecter!",
            icon: "error",
          });
        });
    };
    fetchToken();

    if (userId) {
      dispatch(getUser(userId));
      document.title = "Groupomania - Social-Network";
    }
  }, [dispatch, userId]);

  return (
    <Router>
      <UseGlobalStyle />
      <UserIdContext.Provider value={{ userId, role, pseudo }}>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserIdContext.Provider>
      <UseGlobalStyle />
    </Router>
  );
}

export default App;
