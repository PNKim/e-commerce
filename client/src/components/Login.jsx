import { useState } from "react";
import Register from "./Register";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { buttonLogin, buttonRegister, setState } from "../redux/authSlice";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { seenRegister } = useSelector((state) => {
    return state.counter;
  });

  const login = async (data) => {
    try {
      const Login = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        data
      );
      const token = Login.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      dispatch(setState({ user: userDataFromToken }));
      dispatch(buttonLogin());
    } catch (e) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="w-full h-screen p-5 flex flex-col justify-center items-center absolute z-20">
      {seenRegister ? <Register /> : null}
      <span className="sm:w-[40%] md:w-[30%] lg:w-[20%] min-w-[300px] h-fit p-10 bg-white rounded-3xl flex flex-col gap-10 items-center absolute z-3">
        <h1 className="text-xl relative z-4">Login</h1>
        <form
          className="w-full flex flex-col gap-10"
          onSubmit={(e) => {
            e.preventDefault();
            const data = { username, password };
            login(data);
          }}
        >
          <input
            type="text"
            value={username}
            placeholder="username"
            className="w-full h-10 text-center flex relative z-4 bg-gray-200"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            value={password}
            placeholder="password"
            className="w-full h-10 text-center flex relative z-4 bg-gray-200"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="w-full text-center flex flex-col justify-center gap-5">
            <button
              className="w-full text-xl btn btn-outline bg-blue-gray-600 text-white relative text-center z-4"
              type="submit"
            >
              Login
            </button>
            <button
              className="w-full text-xl btn btn-outline bg-blue-gray-600 text-white relative text-center z-4"
              type="button"
              onClick={() => {
                dispatch(buttonRegister());
              }}
            >
              Register
            </button>
          </div>
        </form>
        <button
          className="px-4 py-2 bg-gray-200 rounded-full absolute top-4 right-4 z-4"
          type="button"
          onClick={() => {
            dispatch(buttonLogin());
          }}
        >
          X
        </button>
      </span>
    </div>
  );
}

export default LoginPage;
