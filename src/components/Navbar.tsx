import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white">
      <div className="container mx-auto flex items-center justify-between px-6 py-2">
        {/* Logo a la izquierda */}
        <div className="logo">
          <Link to="/">Pokemon TCG</Link>
        </div>

        {/* Menú a la derecha */}
        <ul className="flex items-center gap-4 text-lg font-bold">
          <li
            className="cursor-pointer rounded-lg px-4 py-1 text-gray-800"
            style={{
              backgroundColor: "#F3C56E",
            }}
          >
            <Link to="/">Home</Link>
          </li>
          {/* <li className="cursor-pointer rounded-lg border border-yellow-400 bg-yellow-400 px-4 py-1 text-gray-800 transition-all hover:scale-105 hover:bg-gray-800 hover:text-yellow-400 active:scale-95">
            <Link to="/about">Nosotros</Link>
          </li>
          <li className="cursor-pointer rounded-lg border border-yellow-400 bg-yellow-400 px-4 py-1 text-gray-800 transition-all hover:scale-105 hover:bg-gray-800 hover:text-yellow-400 active:scale-95">
            <Link to="/services">Servicios</Link>
          </li>
          <li className="cursor-pointer rounded-lg border border-yellow-400 bg-yellow-400 px-4 py-1 text-gray-800 transition-all hover:scale-105 hover:bg-gray-800 hover:text-yellow-400 active:scale-95">
            <Link to="/contact">Contacto</Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
