import { useState } from "react";
import Register from "./Register";
import { useAuth } from "../authentication/auth";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, buttonLogin, buttonRegister, seenRegister } = useAuth();

  return (
    <div className="w-full h-screen p-5 flex flex-col justify-center items-center absolute z-20">
      {seenRegister ? <Register /> : null}
      <span className="sm:w-[40%] md:w-[30%] lg:w-[20%] h-fit p-10 bg-white rounded-3xl flex flex-col gap-10 items-center absolute z-3">
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
          <div className="w-full text-center flex flex-col sm:flex-row justify-center gap-5">
            <button
              className="w-full sm:w-[40%] text-xl btn btn-outline bg-blue-gray-600 text-white relative text-center z-4"
              type="submit"
            >
              Login
            </button>
            <button
              className="w-full sm:w-[40%] text-xl btn btn-outline bg-blue-gray-600 text-white relative text-center z-4"
              type="button"
              onClick={buttonRegister}
            >
              Register
            </button>
          </div>
        </form>
        <button
          className="px-4 py-2 bg-gray-200 rounded-full absolute top-4 right-4 z-4"
          type="button"
          onClick={buttonLogin}
        >
          X
        </button>
      </span>
    </div>
  );
}

export default LoginPage;
