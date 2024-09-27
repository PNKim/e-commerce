import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { buttonLogin, buttonRegister } from "../redux/authSlice";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();

  const register = async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        data
      );
      dispatch(buttonRegister());
    } catch (e) {
      alert("Please fill out all fields");
    }
  };

  const validateData = (data) => {
    const { username, password, firstname, lastname, address } = data;
    if (!username && !password && !firstname && !lastname && !address) {
      throw new Error("error");
    }
  };

  return (
    <div className="w-full h-screen p-5 flex flex-col justify-center items-center absolute z-10">
      <span className="sm:w-[25%] min-w-[300px] h-fit p-10 bg-white rounded-3xl flex flex-col gap-10 items-center absolute z-3">
        {" "}
        <h2 className="relative text-xl z-4">Register</h2>
        <form
          className="w-full flex flex-col items-center gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            const data = { username, password, firstname, lastname, address };
            try {
              validateData(data);
              register(data);
            } catch (e) {
              console.log("error");
            }
          }}
        >
          <input
            name="username"
            type="text"
            value={username}
            placeholder="username"
            className="w-full h-10 outline-none text-center flex relative z-4 bg-gray-200"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            name="password"
            type="password"
            value={password}
            placeholder="password"
            className="w-full h-10 outline-none text-center flex relative z-4 bg-gray-200"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            name="firstname"
            type="text"
            value={firstname}
            placeholder="firstname"
            className="w-full h-10 outline-none text-center flex relative z-4 bg-gray-200"
            onChange={(e) => setFirstname(e.target.value)}
          />

          <input
            name="lastname"
            type="text"
            value={lastname}
            placeholder="lastname"
            className="w-full h-10 outline-none text-center flex relative z-4 bg-gray-200"
            onChange={(e) => setLastname(e.target.value)}
          />

          <input
            name="address"
            type="text"
            value={address}
            placeholder="address"
            className="w-full h-10 outline-none text-center flex relative z-4 bg-gray-200"
            onChange={(e) => setAddress(e.target.value)}
          />

          <button
            className="w-full text-xl btn btn-outline bg-blue-gray-600 text-white relative text-center z-4"
            type="submit"
          >
            Register
          </button>
        </form>
        <button
          className="px-4 py-2 bg-gray-200 rounded-full absolute top-4 right-4 z-4"
          type="button"
          onClick={() => {
            dispatch(buttonRegister());
            dispatch(buttonLogin());
          }}
        >
          X
        </button>
      </span>
    </div>
  );
}

export default Register;
