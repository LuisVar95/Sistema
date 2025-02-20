import { Link, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { FaLeaf, FaClipboard, FaCut, FaSeedling, FaCannabis, FaHome, FaUser, FaQuestionCircle } from 'react-icons/fa';

const Layout = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path ? 'bg-gray-700' : '';
  };

  return (
    <div className="min-h-screen">
      <aside className="bg-gray-800 text-white w-64 min-h-screen fixed flex flex-col justify-between">
        <div>
          {/* Logo - mantener igual */}
          <div className="h-24 flex items-center justify-center bg-gray-900 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <FaCannabis className="text-green-500 text-4xl" />
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  Control Cultivo
                </h2>
                <p className="text-xs text-gray-400">Sistema de Gestión</p>
              </div>
            </div>
          </div>
          {/* Menú de navegación reorganizado */}
          <nav className="mt-8">
            <Link to="/" className={`flex items-center gap-2 p-4 hover:bg-gray-700 ${getLinkClass('/')}`}>
              <FaHome className="text-xl" />
              <span>Home</span>
            </Link>
            <Link to="/cultivos" className={`flex items-center gap-2 p-4 hover:bg-gray-700 ${getLinkClass('/cultivos')}`}>
              <FaLeaf className="text-xl" />
              <span>Cultivos</span>
            </Link>
            <Link to="/plantas" className={`flex items-center gap-2 p-4 hover:bg-gray-700 ${getLinkClass('/plantas')}`}>
              <FaSeedling className="text-xl" />
              <span>Plantas</span>
            </Link>
            <Link to="/esquejes" className={`flex items-center gap-2 p-4 hover:bg-gray-700 ${getLinkClass('/esquejes')}`}>
              <FaCut className="text-xl" />
              <span>Esquejes</span>
            </Link>
            <Link to="/registros" className={`flex items-center gap-2 p-4 hover:bg-gray-700 ${getLinkClass('/registros')}`}>
              <FaClipboard className="text-xl" />
              <span>Registros</span>
            </Link>
          </nav>
        </div>
        {/* Enlaces adicionales al final */}
        <nav className="mb-4">
          <div className="border-t border-gray-700"></div>
          <Link to="/login" className={`flex items-center gap-2 p-4 hover:bg-gray-700 ${getLinkClass('/login')}`}>
            <FaUser className="text-xl" />
            <span>Login</span>
          </Link>
          <Link to="/help" className={`flex items-center gap-2 p-4 hover:bg-gray-700 ${getLinkClass('/help')}`}>
            <FaQuestionCircle className="text-xl" />
            <span>Help</span>
          </Link>
        </nav>
      </aside>
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;