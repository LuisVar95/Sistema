import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaLeaf, FaCalendarAlt, FaCannabis } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PlantaModal from '../components/modals/PlantaModal';
import CultivoModal from '../components/modals/CultivoModal';
import clienteAxios from '../../config/clienteAxios';
import { io } from 'socket.io-client';
const Cultivos = () => {
  // Estados para almacenar cultivos y plantas
  const [cultivos, setCultivos] = useState([]);
  const [plantas, setPlantas] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  // Estados para controlar los modales (para planta y cultivo)
  const [modalPlantaOpen, setModalPlantaOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' o 'edit'
  const [currentCultivoId, setCurrentCultivoId] = useState(null);
  const [currentPlanta, setCurrentPlanta] = useState(null);
  const [cultivoModalOpen, setCultivoModalOpen] = useState(false);
  // Configurar Socket.IO para recibir eventos en tiempo real
  useEffect(() => {
    const socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.on('planta:creada', (nuevaPlanta) => {
      setPlantas((prevPlantas) => [...prevPlantas, nuevaPlanta]);
    });
    socket.on('planta:actualizada', (plantaActualizada) => {
      setPlantas((prevPlantas) =>
        prevPlantas.map((p) => (p.id === plantaActualizada.id ? plantaActualizada : p))
      );
    });
    socket.on('planta:eliminada', (plantaId) => {
      setPlantas((prevPlantas) => prevPlantas.filter((p) => p.id !== plantaId));
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  // Obtener cultivos desde el endpoint
  useEffect(() => {
    const fetchCultivos = async () => {
      try {
        const { data } = await clienteAxios.get('/cultivos');
        setCultivos(data);
      } catch (error) {
        console.error('Error al obtener cultivos:', error);
      }
    };
    fetchCultivos();
  }, []);
  // Obtener plantas desde el endpoint
  useEffect(() => {
    const fetchPlantas = async () => {
      try {
        const { data } = await clienteAxios.get('/plantas');
        setPlantas(data);
      } catch (error) {
        console.error('Error al obtener plantas:', error);
      }
    };
    fetchPlantas();
  }, []);
  // Permite expandir/contraer la vista de un cultivo
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  // Devuelve las plantas filtradas por cultivo (usando el campo "cultivo_id")
  const getPlantasPorCultivo = (cultivoId) => {
    return plantas.filter((planta) => planta.cultivo_id === cultivoId);
  };
  // Abrir modal para crear planta
  const openModalCrearPlanta = (cultivoId) => {
    setCurrentCultivoId(cultivoId);
    setModalMode('create');
    setModalPlantaOpen(true);
  };
  // Abrir modal para editar planta
  const handleEditPlanta = (planta) => {
    setCurrentPlanta(planta);
    setModalMode('edit');
    setModalPlantaOpen(true);
  };
  // Función para cerrar el modal de planta
  const closeModalPlanta = () => {
    setModalPlantaOpen(false);
    setCurrentCultivoId(null);
    setCurrentPlanta(null);
    setModalMode('create');
  };
  // Función para guardar la planta (creación o edición)
  const handleSavePlanta = async (formData) => {
    try {
      if (modalMode === 'edit' && currentPlanta) {
        const response = await clienteAxios.put(
          `/plantas/editar/${currentPlanta.id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setPlantas((prevPlantas) =>
          prevPlantas.map((p) => (p.id === currentPlanta.id ? response.data : p))
        );
      } else {
        formData.set('cultivo_id', currentCultivoId);
        const response = await clienteAxios.post('/plantas/crear', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setPlantas((prevPlantas) => [...prevPlantas, response.data]);
      }
      closeModalPlanta();
    } catch (error) {
      console.error(`Error al ${modalMode === 'edit' ? 'actualizar' : 'crear'} la planta:`, error);
    }
  };
  // Función para eliminar una planta
  const handleDeletePlanta = async (plantaId) => {
    if (window.confirm('¿Estás seguro de eliminar esta planta?')) {
      try {
        await clienteAxios.delete(`/plantas/eliminar/${plantaId}`);
        setPlantas((prevPlantas) => prevPlantas.filter((p) => p.id !== plantaId));
      } catch (error) {
        console.error('Error al eliminar la planta:', error);
      }
    }
  };
  // Abrir modal para crear cultivo
  const openModalCultivo = () => {
    setCultivoModalOpen(true);
  };
  // Cerrar modal de cultivo
  const closeModalCultivo = () => {
    setCultivoModalOpen(false);
  };
  // Función para guardar el nuevo cultivo
  const handleSaveCultivo = async (datos) => {
    try {
      const response = await clienteAxios.post('/cultivos/crear', datos);
      setCultivos((prevCultivos) => [...prevCultivos, response.data]);
      closeModalCultivo();
    } catch (error) {
      console.error('Error al crear el cultivo:', error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaCannabis className="text-4xl text-green-600" /> Gestión de Cultivos
        </h1>
        <button onClick={openModalCultivo} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Nuevo Cultivo
        </button>
      </nav>
      <div className="p-8">
        {cultivos.length > 0 ? (
          cultivos.map((cultivo, index) => (
            <div key={cultivo.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaLeaf className="text-green-600" /> {cultivo.nombre}
                  </h3>
                  <div className="text-gray-600 mt-2">
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-green-600" />
                      <span className="font-medium">Inicio:</span> {cultivo.fecha_inicio}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-green-600" />
                      <span className="font-medium">Fin:</span> {cultivo.fecha_fin ? cultivo.fecha_fin : 'Pendiente'}
                    </p>
                  </div>
                </div>
                <button onClick={() => toggleExpand(index)} className="text-gray-500 hover:text-gray-700">
                  {expandedIndex === index ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              {expandedIndex === index && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow transition-all">
                  <h4 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                    Plantas del Cultivo
                  </h4>
                  {getPlantasPorCultivo(cultivo.id).length > 0 ? (
                    <div className="space-y-4">
                      {getPlantasPorCultivo(cultivo.id).map((planta) => (
                        <div key={planta.id} className="flex items-center bg-white rounded-lg shadow hover:shadow-lg transition p-4">
                          {planta.fotoPerfil && (
                            <div className="flex-shrink-0">
                              <img
                                src={`http://localhost:4000/${
                                  planta.fotoPerfil ? planta.fotoPerfil.replace(/\\/g, '/') : ''
                                }`}
                                alt={`Planta ${planta.id}`}
                                className="w-36 h-36 object-cover rounded-lg border border-gray-300"
                              />
                            </div>
                          )}
                          <div className="ml-4 flex-grow">
                            <p className="text-xl font-medium text-gray-700">{planta.variedad}</p>
                            <p className="text-gray-600 mt-1 text-sm">
                              <span className="font-medium">Info:</span> {planta.info_planta}
                            </p>
                            <p className="text-gray-600 mt-1 text-sm">
                              <span className="font-medium">Semanas:</span> {planta.info_semanas}
                            </p>
                          </div>
                          <div className="ml-4 flex flex-col gap-2">
                            <Link
                              to={`/plantas/${planta.id}`}
                              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                            >
                              Ver
                            </Link>
                            <button
                              onClick={() => handleEditPlanta(planta)}
                              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeletePlanta(planta.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No hay plantas registradas en este cultivo.</p>
                  )}
                  <button
                    onClick={() => openModalCrearPlanta(cultivo.id)}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors shadow"
                  >
                    Agregar Planta
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No hay cultivos registrados.</p>
        )}
      </div>
      <PlantaModal
        isOpen={modalPlantaOpen}
        onClose={closeModalPlanta}
        onSave={handleSavePlanta}
        titulo={modalMode === 'edit' ? 'Editar Planta' : 'Agregar Nueva Planta'}
        initialValues={modalMode === 'edit' ? currentPlanta : null}
      />
      <CultivoModal
        isOpen={cultivoModalOpen}
        onClose={closeModalCultivo}
        onSave={handleSaveCultivo}
        titulo="Agregar Nuevo Cultivo"
      />
    </div>
  );
};
export default Cultivos;