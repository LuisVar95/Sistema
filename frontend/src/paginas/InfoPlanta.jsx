import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import clienteAxios from '../../config/clienteAxios';
import SemanaModal from '../components/modals/SemanaModal';
const InfoPlanta = () => {
  const { id } = useParams();
  const [planta, setPlanta] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [semanas, setSemanas] = useState([]);
  // Obtener la información de la planta
  useEffect(() => {
    const fetchPlanta = async () => {
      try {
        const { data } = await clienteAxios.get(`/plantas/${id}`);
        setPlanta(data);
      } catch (error) {
        console.error('Error al obtener la planta:', error);
      }
    };
    fetchPlanta();
  }, [id]);
  // Obtener las semanas asociadas a la planta
  useEffect(() => {
    const fetchSemanas = async () => {
      try {
        const { data } = await clienteAxios.get(`/plantas/${id}/semanas`);
        setSemanas(data);
      } catch (error) {
        console.error('Error al obtener las semanas:', error);
      }
    };
    fetchSemanas();
  }, [id, mensaje]);
  // Función para guardar la nueva semana (se delega al modal)
  const handleSaveSemana = async (formData, plantaId) => {
    try {
      await clienteAxios.post(`/plantas/${plantaId}/semanas`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMensaje('Semana creada exitosamente');
      setModalOpen(false);
      // Actualizar la lista de semanas después de crear una nueva
      const { data } = await clienteAxios.get(`/plantas/${plantaId}/semanas`);
      setSemanas(data);
    } catch (error) {
      console.error('Error al crear la semana:', error);
      setMensaje('Error al crear la semana');
    }
  };
  if (!planta)
    return (
      <p className="text-center mt-6 text-xl">
        Cargando información de la planta...
      </p>
    );
  return (
    <div className="relative min-h-screen py-12">
      {/* Botón en la esquina superior derecha (fuera del contenedor principal) */}
      <div className="absolute top-4 right-52">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition"
        >
          Agregar Nueva Semana
        </button>
      </div>
      {/* Contenedor principal con sombra para la información de la planta y las semanas */}
      <div className="mx-auto bg-white shadow-2xl rounded-lg overflow-hidden p-10 mt-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columna para la foto de perfil */}
          <div className="flex items-center justify-center">
            {planta.fotoPerfil ? (
              <img
                className="w-64 h-64 object-cover rounded-full shadow-md"
                src={`http://localhost:4000/${planta.fotoPerfil}`}
                alt={`Foto de perfil de ${planta.variedad}`}
              />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center bg-gray-100 rounded-full">
                <span className="text-gray-500">Sin foto de perfil</span>
              </div>
            )}
          </div>
          {/* Columna para la información de la planta */}
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-bold text-green-600">
              {planta.variedad}
            </h1>
            <p className="text-lg text-gray-700">{planta.info_planta}</p>
            <p className="text-md text-gray-500">
              Cultivo ID: {planta.cultivo_id}
            </p>
          </div>
        </div>
        {/* Sección para mostrar las semanas asociadas a la planta */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            Semanas de la Planta
          </h2>
          {semanas.length > 0 ? (
            semanas.map((semana) => (
              <div
                key={semana.id}
                className="border-b border-gray-200 py-4 last:border-none"
              >
                <p className="text-lg font-semibold text-gray-600">
                  Semana {semana.numero}
                </p>
                <p className="text-gray-600">{semana.textoExplicativo}</p>
                {semana.foto && (
                  <img
                    src={`http://localhost:4000/${semana.foto}`}
                    alt={`Semana ${semana.numero}`}
                    className="mt-2 w-full max-w-sm rounded shadow"
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay semanas registradas aún.</p>
          )}
        </div>
      </div>
      {/* Modal para crear nueva semana */}
      <SemanaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveSemana}
        plantaId={id}
        titulo="Crear Nueva Semana"
      />
      {mensaje && (
        <p className="mt-4 text-center text-green-700 font-medium">
          {mensaje}
        </p>
      )}
    </div>
  );
};
export default InfoPlanta;