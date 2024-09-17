import "./App.css";
import UnAuthenticatedApp from "./pages/UnAuthenticatedApp";
import AuthenticationApp from "./pages/AuthenticatedApp";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "./redux/authSlice";
import { jwtDecode } from "jwt-decode";

function App() {
  const dispatch = useDispatch();
  const { isToken } = useSelector((state) => {
    return state.counter;
  });

  useEffect(() => {
    document.title = "KimShop";
    if (isToken) {
      const token = localStorage.getItem("token");
      const userDataFromToken = jwtDecode(token);
      dispatch(setState({ user: userDataFromToken }));
    }
  }, [isToken]);

  return <>{isToken ? <AuthenticationApp /> : <UnAuthenticatedApp />}</>;
}

export default App;
