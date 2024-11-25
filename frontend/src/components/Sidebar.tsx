import React from 'react';
import { NavLink } from 'react-router-dom';
import { ClipboardList, Edit, PlusCircle } from 'lucide-react';
import MAVECLogo from '../MAVEC.png'; // Importación explícita de la imagen

const Sidebar: React.FC = () => {
  const menuItems = [
    { path: '/', icon: <ClipboardList size={24} />, text: 'Revisar' },
    { path: '/edit', icon: <Edit size={24} />, text: 'Editar' },
    { path: '/add', icon: <PlusCircle size={24} />, text: 'Agregar' },
  ];

  return (
<div className="h-screen w-64 bg-gradient-to-b from-blue-800/50 to-gray-700/60 text-white p-4">


      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img 
          src={MAVECLogo} 
          alt="Logo de MAVEC" 
          className="h-20 w-auto object-contain"
        />
      </div>

      {/* Título */}
      <div >
        
      </div>

      {/* Navegación */}
      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-4 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-white-300 hover:bg-gray-700'
              }`
            }
          >
            {item.icon}
            <span>{item.text}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
