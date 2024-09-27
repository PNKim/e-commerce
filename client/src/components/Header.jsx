import { useNavigate } from "react-router-dom";
import LoginPage from "./Login";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buttonLogin, setState } from "../redux/authSlice";
import { setSearchProduct } from "../redux/productSlice";
import { DebounceInput } from "react-debounce-input";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { seenLogin, status, isToken } = useSelector((state) => {
    return state.counter;
  });
  const { searchProduct } = useSelector((state) => {
    return state.product;
  });

  const [open, setOpen] = useState(false);

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(setState({ user: null }));
  };

  return (
    <header className="w-full box-border m-0 p-0 fixed z-50 ">
      {seenLogin ? <LoginPage /> : null}
      <section className="flex flex-col items-center z-10">
        <div className="w-full p-8 bg-gradient-to-l from-gray-500 to-gray-800 text-white text-2xl flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              navigate("/");
            }}
          >
            KimShop
          </button>
          <div className="flex items-center gap-5">
            <label htmlFor="product">search</label>
            <DebounceInput
              type="text"
              debounceTimeout={300}
              placeholder="name product"
              className="px-4 bg-white text-black rounded-2xl"
              value={searchProduct}
              onChange={(e) => {
                dispatch(setSearchProduct(e.target.value));
              }}
            />
          </div>
          {isToken && status.user ? (
            <div>
              <div className="dropdown dropdown-bottom">
                <button
                  tabIndex={0}
                  onClick={() => {
                    setOpen(!open);
                  }}
                  className="btn m-1 text-xl text-gray-300"
                >
                  {status.user.firstname}
                </button>
                {open && (
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 text-xl shadow"
                  >
                    <li>
                      <button
                        onClick={() => {
                          navigate(`/cart/${status.user.id}`);
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
                          navigate(`/order/${status.user.id}`);
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
              className="btn text-xl text-white z-5"
              onClick={() => {
                dispatch(buttonLogin());
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
