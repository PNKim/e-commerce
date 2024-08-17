import { useNavigate } from "react-router-dom";
import LoginPage from "./Login";
import { useAuth } from "../authentication/auth";

function Header() {
  const navigate = useNavigate();
  const { state, logout, isToken, buttonLogin, seenLogin } = useAuth();

  return (
    <header className="w-full box-border m-0 p-0 fixed z-10 ">
      {seenLogin ? <LoginPage /> : null}
      <section
        className={
          seenLogin
            ? "flex flex-col items-center opacity-30 z-10 "
            : "flex flex-col items-center z-10"
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
          {isToken ? (
            <div>
              <details className="dropdown">
                <summary className="btn m-1 text-xl text-gray-300">
                  {state.user.firstname}
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 text-xl shadow">
                  <li>
                    <button
                      onClick={() => {
                        navigate(`/cart/${state.user.id}`);
                        window.location.reload();
                      }}
                    >
                      Cart
                    </button>
                  </li>
                  <li>
                    <button
                      className="z-6"
                      onClick={() => {
                        navigate(`/order/${state.user.id}`);
                        window.location.reload();
                      }}
                    >
                      Order
                    </button>
                  </li>
                  <li>
                    <button
                      className="z-6"
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </details>
            </div>
          ) : (
            <button
              className="btn text-xl z-5"
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
