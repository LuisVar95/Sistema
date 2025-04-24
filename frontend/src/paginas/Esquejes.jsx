import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import clienteAxios from '../../config/clienteAxios';
const Esquejes = () => {
  const [esquejes, setEsquejes] = useState([]);
  const [cultivos, setCultivos] = useState([]);
  // Obtener cultivos para relacionarlos con los esquejes
  useEffect(() => {
    const obtenerCultivos = async () => {
      try {
        const { data } = await clienteAxios.get('/cultivos');
        setCultivos(data);
      } catch (error) {
        console.error('Error al obtener cultivos:', error);
      }
    };
    obtenerCultivos();
  }, []);
  // Obtener plantas y filtrar únicamente aquellas con tipo "esqueje"
  useEffect(() => {
    const obtenerEsquejes = async () => {
      try {
        const { data } = await clienteAxios.get('/plantas');
        const registrosEsquejes = data.filter(planta => planta.tipo === 'esqueje');
        const esquejesTransformados = registrosEsquejes.map(esqueje => {
          const cultivoRelacionado = cultivos.find(cul => cul.id === esqueje.cultivo_id);
          return {
            id: esqueje.id,
            nombre: esqueje.variedad,
            imagen: esqueje.fotoPerfil
              ? `http://localhost:4000/${esqueje.fotoPerfil.replace(/\\/g, '/')}`
              : '',
            cultivo: cultivoRelacionado ? cultivoRelacionado.nombre : 'Desconocido',
            fechaInicio: cultivoRelacionado ? cultivoRelacionado.fecha_inicio : '',
            fechaFin: cultivoRelacionado
              ? (cultivoRelacionado.fecha_fin ? cultivoRelacionado.fecha_fin : 'Pendiente')
              : ''
          };
        });
        setEsquejes(esquejesTransformados);
      } catch (error) {
        console.error('Error al obtener esquejes:', error);
      }
    };
    if (cultivos.length > 0) {
      obtenerEsquejes();
    }
  }, [cultivos]);
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaLeaf className="text-4xl text-green-600" /> Gestión de Esquejes
        </h1>
      </nav>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {esquejes.map((esqueje, index) => (
            <Link
              to={`/plantas/${esqueje.id}`}
              key={index}
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center">
                <img
                  src={esqueje.imagen}
                  alt={`Imagen de ${esqueje.nombre}`}
                  className="w-20 h-20 rounded-full border-2 border-gray-300 mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{esqueje.nombre}</h2>
                  <span className="text-sm text-gray-500 font-medium">
                    Cultivo: {esqueje.cultivo}
                  </span>
                  <p className="text-xs text-gray-500">
                    Inicio: {esqueje.fechaInicio} - Fin: {esqueje.fechaFin}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Esquejes;