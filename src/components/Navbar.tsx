import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white">
      <div className="container mx-auto flex items-center justify-between px-6 py-2">
        <div className="logo">
          <Link to="/">Pokemon App</Link>
        </div>

        <ul className="flex items-center gap-4 text-lg font-bold">
          <li className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-1 text-white hover:bg-indigo-500">
            <Link to="/">Home</Link>
          </li>

          {isAuthenticated ? (
            <li
              className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-1 text-white hover:bg-indigo-500"
              onClick={handleLogout}
            >
              Logout
            </li>
          ) : (
            <li className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-1 text-white hover:bg-indigo-500">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
