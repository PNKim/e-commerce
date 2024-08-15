import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const navigate = useNavigate();
  const token = localStorage.token;
  let userDataFromToken;
  if (token) {
    userDataFromToken = jwtDecode(token);
  }
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: userDataFromToken,
  });

  const [seenLogin, setSeenLogin] = useState(false);
  const [seenRegister, setSeenRegister] = useState(false);
  const [isToken, setIsToken] = useState(
    Boolean(window.localStorage.getItem("token"))
  );

  const login = async (data) => {
    try {
      const Login = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        data
      );
      const token = Login.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      setState({ ...state, user: userDataFromToken });
      setIsToken(Boolean(window.localStorage.getItem("token")));
      buttonLogin();
    } catch (e) {
      alert("Invalid username or password");
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setIsToken(Boolean(window.localStorage.getItem("token")));
  };

  const register = async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        data
      );
      buttonRegister();
    } catch (e) {
      alert("Please fill out all fields");
    }
  };

  const buttonLogin = () => {
    setSeenLogin(!seenLogin);
  };

  const buttonRegister = () => {
    setSeenRegister(!seenRegister);
  };

  const checkToken = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/us`);
    } catch (e) {
      setIsToken(Boolean(window.localStorage.getItem("token")));
      alert("please Log-in again");
      navigate("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        register,
        isToken,
        setIsToken,
        buttonLogin,
        buttonRegister,
        seenLogin,
        seenRegister,
        checkToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
