import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import PlantaModal from '../components/modals/PlantaModal';
import clienteAxios from '../../config/clienteAxios';
const Plantas = () => {
  const [plantas, setPlantas] = useState([]);
  const [cultivos, setCultivos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  // Obtener cultivos para relacionarlos con las plantas
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
  // Obtener plantas
  useEffect(() => {
    const obtenerPlantas = async () => {
      try {
        const { data } = await clienteAxios.get('/plantas');
        // Transformamos la data para incluir la información del cultivo relacionado y el id
        const plantasTransformadas = data.map(planta => {
          const cultivoRelacionado = cultivos.find(cul => cul.id === planta.cultivo_id);
          return {
            id: planta.id,
            nombre: planta.variedad,
            imagen: planta.fotoPerfil 
              ? `http://localhost:4000/${planta.fotoPerfil.replace(/\\/g, '/')}` 
              : '',
            cultivo: cultivoRelacionado ? cultivoRelacionado.nombre : 'Desconocido',
            // Incluimos las fechas del cultivo
            fechaInicio: cultivoRelacionado ? cultivoRelacionado.fecha_inicio : '',
            fechaFin: cultivoRelacionado 
              ? (cultivoRelacionado.fecha_fin ? cultivoRelacionado.fecha_fin : 'Pendiente') 
              : ''
          };
        });
        setPlantas(plantasTransformadas);
      } catch (error) {
        console.error('Error al obtener plantas:', error);
      }
    };
    // Solo obtenemos las plantas cuando ya se tenga la info de cultivos
    if (cultivos.length > 0) {
      obtenerPlantas();
    }
  }, [cultivos]);
  const abrirModal = () => {
    setModalAbierto(true);
  };
  const cerrarModal = () => {
    setModalAbierto(false);
  };
  const guardarPlanta = async (plantaNueva) => {
    try {
      const response = await clienteAxios.post('/plantas/crear', plantaNueva);
      if (response.status === 201 || response.status === 200) {
        console.log('Planta guardada correctamente');
        setPlantas(prevState => [...prevState, plantaNueva]);
        cerrarModal();
      } else {
        console.error('Error al guardar la planta', response);
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaLeaf className="text-4xl text-green-600" /> Gestión de Plantas
        </h1>
        <button
          onClick={abrirModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Agregar Planta
        </button>
      </nav>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plantas.map((planta, index) => (
            <Link
              to={`/plantas/${planta.id}`}
              key={index}
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center">
                <img
                  src={planta.imagen}
                  alt={`Imagen de ${planta.nombre}`}
                  className="w-20 h-20 rounded-full border-2 border-gray-300 mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{planta.nombre}</h2>
                  <span className="text-sm text-gray-500 font-medium">
                    Cultivo: {planta.cultivo}
                  </span>
                  <p className="text-xs text-gray-500">
                    Inicio: {planta.fechaInicio} - Fin: {planta.fechaFin}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <PlantaModal
        isOpen={modalAbierto}
        onClose={cerrarModal}
        onSave={guardarPlanta}
      />
    </div>
  );
};
export default Plantas;