import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="my-8 flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
