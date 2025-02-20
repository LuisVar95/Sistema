import React, { useState } from 'react';
import { FaChevronDown, FaStar, FaStarHalfAlt, FaRegStar, FaLeaf, FaCalendarAlt, FaCannabis } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import GraficoCrecimiento from '../components/GraficoCrecimiento';
import GraficoProporcion from '../components/GraficoProporcion';
import GraficoRendimiento from '../components/GraficoRendimiento';

const Cultivos = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderStars = (percentage) => {
    const fullStars = Math.floor(percentage / 20);
    const halfStar = percentage % 20 >= 10 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} className="text-yellow-500" />)}
        {[...Array(halfStar)].map((_, i) => <FaStarHalfAlt key={`half-${i}`} className="text-yellow-500" />)}
        {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} className="text-yellow-500" />)}
      </>
    );
  };

  const cultivos = [
    { id: 1, nombre: 'Cultivo 1', inicio: '2023-01-01', fin: '2023-06-01', plantas: 10, puntuacion: 80, variedad: 'Indica' },
    { id: 2, nombre: 'Cultivo 2', inicio: '2023-02-01', fin: '2023-07-01', plantas: 15, puntuacion: 90, variedad: 'Sativa' },
    { id: 3, nombre: 'Cultivo 3', inicio: '2023-03-01', fin: '2023-08-01', plantas: 12, puntuacion: 75, variedad: 'Híbrido' },
  ];

  // Datos para los gráficos
  const rendimientoData = [
    { nombre: 'Cultivo 1', rendimiento: 2.5 },
    { nombre: 'Cultivo 2', rendimiento: 3.0 },
    { nombre: 'Cultivo 3', rendimiento: 2.8 },
  ];

  const dataPie = [
    { name: 'Cultivos Completados', value: 10 },
    { name: 'Cultivos No Completados', value: 2 },
  ];

  const crecimientoData = [
    { fecha: '2023-01-01', altura: 10 },
    { fecha: '2023-01-15', altura: 20 },
    { fecha: '2023-02-01', altura: 30 },
    { fecha: '2023-02-15', altura: 40 },
    { fecha: '2023-03-01', altura: 55 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaCannabis className="text-4xl text-green-600" /> Gestión de Cultivos
        </h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Nuevo Cultivo
        </button>
      </nav>
      <div className="p-8">
        <div className="grid grid-cols-1 gap-4">
          {cultivos.map((cultivo, index) => (
            <div key={cultivo.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaLeaf className="text-green-600" /> {cultivo.nombre}
                  </h3>
                  <div className="text-gray-600 mt-2">
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-green-600" /> <span className="font-medium">Inicio:</span> {cultivo.inicio}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-green-600" /> <span className="font-medium">Fin:</span> {cultivo.fin}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Plantas totales:</span> {cultivo.plantas}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Variedad:</span> {cultivo.variedad}
                    </p>
                  </div>
                </div>
                <button onClick={() => toggleExpand(index)} className="text-gray-500 hover:text-gray-700">
                  <FaChevronDown />
                </button>
              </div>
              {expandedIndex === index && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700">Plantas</h4>
                  <ul>
                    {Array.from({ length: cultivo.plantas }, (_, i) => (
                      <li key={i} className="flex justify-between items-center mt-2 border border-gray-200 p-2">
                        <Link to={`/planta/${cultivo.id}-${i + 1}`} className="text-blue-500 hover:underline">Planta {i + 1}</Link>
                        <div className="flex items-center">
                          {renderStars(cultivo.puntuacion)}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Sección adicional para estadísticas de cultivo */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800">Estadísticas de Cultivo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            <GraficoRendimiento data={rendimientoData} />
            <GraficoProporcion data={dataPie} />
            <GraficoCrecimiento data={crecimientoData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cultivos;