import { useState } from "react";
import Register from "./Register";
import { useAuth } from "../authentication/auth";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, buttonLogin, buttonRegister, seenRegister } = useAuth();

  return (
    <div className="w-full h-screen p-5 flex flex-col justify-center items-center absolute z-10 gap-20">
      {seenRegister ? <Register /> : null}
      <span className="w-[50%] h-[80%] bg-white absolute z-3"></span>
      <h2 className="relative z-4">Login</h2>
      <form
        className="flex flex-col gap-20"
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
          className="w-96 text-center flex relative z-4 "
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          value={password}
          placeholder="password"
          className="w-96 text-center flex relative z-4"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-center flex justify-around">
          <button
            className="w-[40%] text-xl btn btn-outline bg-blue-gray-600 text-white relative text-center z-4"
            type="submit"
          >
            Login
          </button>
          <button
            className="w-[40%] text-xl btn btn-outline bg-blue-gray-600 text-white relative text-center z-4"
            type="button"
            onClick={buttonRegister}
          >
            Register
          </button>
        </div>
      </form>
      <button
        className="p-2 bg-gray-200 absolute top-[11%] right-[26%] z-4"
        type="button"
        onClick={buttonLogin}
      >
        X
      </button>
    </div>
  );
}

export default LoginPage;
