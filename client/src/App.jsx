import "./App.css";
import UnAuthenticatedApp from "./pages/UnAuthenticatedApp";
import AuthenticationApp from "./pages/AuthenticatedApp";
import { useEffect } from "react";
import { useAuth } from "./authentication/auth";

function App() {
  const { isToken } = useAuth();

  useEffect(() => {
    document.title = "KimShop";
  }, []);

  return <>{isToken ? <AuthenticationApp /> : <UnAuthenticatedApp />}</>;
}

export default App;
