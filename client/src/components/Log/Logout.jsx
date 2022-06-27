import React from "react";
import axios from "axios";
import cookie from "js-cookie";

import logout_icon from "../../assets/logout_icon.jpg";

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const handleLogout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/users/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/login";
  };

  return (
    <li onClick={handleLogout}>
      <img src={logout_icon} alt="logout_icon" height="30em" />
    </li>
  );
};

export default Logout;
