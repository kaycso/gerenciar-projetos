import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="py-8 flex-1 bg-slate-50">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
