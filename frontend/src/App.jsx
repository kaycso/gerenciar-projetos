import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="relative flex-1 bg-slate-50 py-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
