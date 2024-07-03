import { useState } from "react";
import { useAuth } from "../authentication/auth";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");

  const { register, buttonLogin, buttonRegister } = useAuth();

  return (
    <div className="w-full h-screen p-5 flex flex-col justify-center items-center absolute z-10 gap-20">
      <span className="w-[50%] h-[80%] bg-white absolute z-3"></span>
      <h2 className="relative z-4">Register</h2>
      <form
        className="flex flex-col items-center gap-10"
        onSubmit={(e) => {
          e.preventDefault();
          const data = { username, password, firstname, lastname, address };
          register(data);
        }}
      >
        <input
          type="text"
          value={username}
          placeholder="username"
          className="w-96 text-center flex relative z-4"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          value={password}
          placeholder="password"
          className="w-96 text-center flex relative z-4"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          value={firstname}
          placeholder="firstname"
          className="w-96 text-center flex relative z-4"
          onChange={(e) => setFirstname(e.target.value)}
        />

        <input
          type="text"
          value={lastname}
          placeholder="lastname"
          className="w-96 text-center flex relative z-4"
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          value={address}
          placeholder="address"
          className="w-96 text-center flex relative z-4"
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          className="w-[40%] p-5 text-xl bg-gray-400 relative text-center z-4"
          type="submit"
        >
          Register
        </button>
      </form>
      <button
        className="p-2 bg-gray-200 absolute top-[11%] right-[26%] z-4"
        type="button"
        onClick={() => {
          buttonRegister();
          buttonLogin();
        }}
      >
        X
      </button>
    </div>
  );
}

export default Register;
