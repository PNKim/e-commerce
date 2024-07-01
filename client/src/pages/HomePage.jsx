import GetDataHomePage from "../dataFromServer/GetDataHomePage";
import Login from "./Login";
import { useState } from "react";

function HomePage() {
  const [seenLogin, setSeenLogin] = useState(false);

  const toggleLogin = () => {
    setSeenLogin(!seenLogin);
  };

  return (
    <div className="w-full h-screen box-border m-0 p-0 flex flex-col relative">
      {seenLogin ? <Login toggle={toggleLogin} /> : null}
      <section className={seenLogin ? "opacity-30 z-1 h-full" : "z-1 h-full"}>
        <header className="w-full p-8 bg-gray-700 text-white text-2xl flex justify-between">
          <h1>KimShop</h1>
          <button onClick={toggleLogin}>Login</button>
        </header>
        <main className="my-5 h-[80%] flex flex-col items-center">
          <GetDataHomePage />
        </main>
        <footer className="h-[10%]">Contact</footer>
      </section>
    </div>
  );
}

export default HomePage;
