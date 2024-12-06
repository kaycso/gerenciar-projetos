import Navbar from "./NavBar";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-zinc-900 px-12 py-3">
      <div>
        <img src="/costs_logo.png" alt="Logo do site Costs" />
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
