import React from 'react';
import { FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Plantas = () => {
  // Datos estáticos de ejemplo para varias plantas
  const plantas = [
    {
      nombre: 'Bubble Kush',
      imagen: './public/img/planta1.jpg',
      descripcion: 'Robusta, de gran tamaño, con un 80% de resina.',
      cultivo: 'Chocolo - Febrero 20 del 2024',
    },
    {
      nombre: 'Chocolope',
      imagen: './public/img/planta2.jpg',
      descripcion: 'Robusta, de gran tamaño, con un 80% de resina muy aromática',
      cultivo: 'Chocolo - Febrero 20 del 2024',
    },
    {
      nombre: 'OG Kush',
      imagen: './public/img/planta3.webp',
      descripcion: 'Robusta, de gran tamaño, con un 80% de resina.',
      cultivo: 'Chocolo - Febrero 20 del 2024',
    },
    // Puedes añadir más plantas aquí
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaLeaf className="text-4xl text-green-600" /> Gestión de Plantas
        </h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Agregar Planta
        </button>
      </nav>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plantas.map((planta, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => console.log(`Clic en ${planta.nombre}`)}
            >
              <div className="flex items-center">
                <img
                  src={planta.imagen}
                  alt={`Imagen de ${planta.nombre}`}
                  className="w-20 h-20 rounded-full border-2 border-gray-300 mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{planta.nombre}</h2>
                  <p className="text-gray-600">{planta.descripcion}</p>
                  <span className="text-sm text-gray-500 font-medium">Cultivo: {planta.cultivo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plantas;