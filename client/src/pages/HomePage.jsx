import MainHomePage from "../components/MainHomePage";
import { useAuth } from "../authentication/auth";
function HomePage() {
  const { seenLogin } = useAuth();

  return (
    <div className="w-full min-h-screen pt-28 flex flex-col items-center">
      <div
        className={
          seenLogin
            ? "w-full flex flex-col items-center opacity-30 z-1 "
            : "w-full flex flex-col items-center z-1"
        }
      >
        <MainHomePage />
      </div>
    </div>
  );
}

export default HomePage;
