import { useNavigate } from "react-router-dom";
import LoginPage from "./Login";
import { useAuth } from "../authentication/auth";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const { state, logout, isToken, buttonLogin, seenLogin } = useAuth();
  const [open, setOpen] = useState(false);

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
              <div className="dropdown dropdown-bottom">
                <button
                  tabIndex={0}
                  onClick={() => {
                    setOpen(!open);
                  }}
                  className="btn m-1 text-xl text-gray-300"
                >
                  {state.user.firstname}
                </button>
                {open && (
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 text-xl shadow"
                  >
                    <li>
                      <button
                        onClick={() => {
                          navigate(`/cart/${state.user.id}`);
                          setOpen(!open);
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
                          setOpen(!open);
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
                )}
              </div>
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
