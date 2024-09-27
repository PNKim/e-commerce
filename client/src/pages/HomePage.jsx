import MainHomePage from "../components/MainHomePage";

function HomePage() {
  return (
    <div className="w-full min-h-screen pt-28 flex flex-col items-center">
      <div className="w-full flex flex-col items-center z-1">
        <MainHomePage />
      </div>
    </div>
  );
}

export default HomePage;
