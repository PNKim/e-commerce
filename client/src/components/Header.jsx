import { useNavigate } from "react-router-dom";
import LoginPage from "./Login";
import { useAuth } from "../authentication/auth";

function Header() {
  const navigate = useNavigate();
  const { state, getdata, logout, istoken, buttonLogin, seenLogin } = useAuth();

  return (
    <header className="w-full box-border m-0 p-0 relative">
      {seenLogin ? <LoginPage /> : null}
      <section
        className={
          seenLogin
            ? "flex flex-col items-center opacity-30 z-1 "
            : "flex flex-col items-center z-1"
        }
      >
        <div className="w-full p-8 bg-gray-700 text-white text-2xl flex justify-between">
          <button
            type="button"
            onClick={() => {
              navigate("/");
            }}
          >
            KimShop
          </button>
          {istoken ? (
            <div>
              <button
                onClick={() => {
                  getdata();
                }}
              >
                {state.user.firstname}
              </button>
              <button
                className="z-6"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
              <button
                onClick={() => {
                  navigate("/cart");
                }}
              >
                Cart
              </button>
            </div>
          ) : (
            <button
              className="z-5"
              onClick={() => {
                buttonLogin();
              }}
            >
              Login
            </button>
          )}
        </div>
      </section>
    </header>
  );
}
export default Header;
