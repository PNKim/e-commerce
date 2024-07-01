import { useState } from "react";
import Register from "./Register";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [seenRegister, setSeenRegister] = useState(false);
  const toggleLogin = props.toggle;

  const toggleRegister = () => {
    setSeenRegister(!seenRegister);
  };

  return (
    <div className="w-full h-full p-5 flex flex-col justify-center items-center absolute z-10 gap-20">
      {seenRegister ? (
        <Register toggleRegister={toggleRegister} toggleLogin={toggleLogin} />
      ) : null}
      <span className="w-[50%] h-[80%] bg-white absolute z-3"></span>
      <h2 className="relative z-4">Login</h2>
      <form
        className="flex flex-col gap-20"
        onSubmit={(e) => {
          e.preventDefault();
          toggleLogin();
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
        <div className="text-center flex justify-around">
          <button
            className="w-[40%] p-5 text-xl bg-gray-400 relative text-center z-4"
            type="submit"
          >
            Login
          </button>
          <button
            className="w-[40%] p-5 text-xl bg-gray-400 relative text-center z-4"
            type="button"
            onClick={toggleRegister}
          >
            Register
          </button>
        </div>
      </form>
      <button
        className="p-2 bg-gray-200 absolute top-[11%] right-[26%] z-4"
        type="button"
        onClick={toggleLogin}
      >
        X
      </button>
    </div>
  );
}

export default Login;
