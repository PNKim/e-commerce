import MainHomePage from "../components/MainHomePage";
import { useAuth } from "../authentication/auth";
function HomePage() {
  const { seenLogin } = useAuth();

  return (
    <div className="flex flex-col items-center">
      <div
        className={
          seenLogin
            ? "flex flex-col items-center opacity-30 z-1 "
            : "flex flex-col items-center z-1"
        }
      >
        <MainHomePage />
        <footer className="h-[10%]">Contact</footer>
      </div>
    </div>
  );
}

export default HomePage;
