import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import clienteAxios from '../../../config/clienteAxios';
const PlantaModal = ({
  isOpen,
  onClose,
  onSave,
  titulo = "Agregar Nueva Planta",
  initialValues = null // Si se envían valores iniciales se entiende que es modo edición
}) => {
  // Estado para los campos del formulario.
  const [planta, setPlanta] = useState({
    variedad: '',
    info_planta: '',
    info_semanas: '',
    cultivo_id: '',
    tipo: 'semilla', // Valor inicial (puede ser "semilla" o vacío)
  });
  // Estado para almacenar la lista de cultivos (para el select)
  const [cultivos, setCultivos] = useState([]);
  // Estado para almacenar los archivos seleccionados de imágenes generales
  const [files, setFiles] = useState([]);
  // Estado para almacenar el archivo de foto de perfil
  const [profilePicture, setProfilePicture] = useState(null);
  // Al abrir el modal, se obtiene la lista de cultivos
  useEffect(() => {
    if (isOpen) {
      const fetchCultivos = async () => {
        try {
          const { data } = await clienteAxios.get('/cultivos');
          setCultivos(data);
        } catch (error) {
          console.error('Error al obtener cultivos:', error);
        }
      };
      fetchCultivos();
    }
  }, [isOpen]);
  // Cuando se abre el modal se revisa si hay valores iniciales; si existen, se cargan al estado del formulario.
  useEffect(() => {
    if (isOpen) {
      if (initialValues) {
        setPlanta(initialValues);
      } else {
        setPlanta({
          variedad: '',
          info_planta: '',
          info_semanas: '',
          cultivo_id: '',
        });
      }
      setFiles([]);
      setProfilePicture(null);
    }
  }, [isOpen, initialValues]);
  // Manejo de cambio para campos de texto
  const handleChange = (e) => {
    setPlanta({
      ...planta,
      [e.target.name]: e.target.value,
    });
  };
  // Manejo para el input de archivos de imágenes generales
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };
  // Manejo para el input de la foto de perfil
  const handleProfileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };
  // Al enviar el formulario se crea un FormData para incluir tanto los campos como los archivos
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('variedad', planta.variedad);
    formData.append('info_planta', planta.info_planta);
    formData.append('info_semanas', planta.info_semanas);
    formData.append('cultivo_id', parseInt(planta.cultivo_id, 10));
    formData.append('tipo', planta.tipo); // Agregamos el campo "tipo"
    files.forEach((file) => {
      formData.append('photos', file);
    });
    if (profilePicture) {
      formData.append('fotoPerfil', profilePicture);
    }
    onSave(formData);
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={titulo}
      ariaHideApp={false} // Recuerda configurar ReactModal.setAppElement('#root') en producción
      className="relative bg-white w-full max-w-2xl mx-auto mt-20 p-8 rounded-lg shadow-xl outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center"
    >
      <div className="mb-6 border-b pb-4">
        <h2 className="text-3xl font-semibold text-gray-800">{titulo}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <label className="block text-gray-700 mb-2">Variedad</label>
            <input
              type="text"
              name="variedad"
              value={planta.variedad}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Información de la Planta</label>
            <textarea
              name="info_planta"
              value={planta.info_planta}
              onChange={handleChange}
              required
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-green-600 transition"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Información de Semanas</label>
            <textarea
              name="info_semanas"
              value={planta.info_semanas}
              onChange={handleChange}
              required
              className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-green-600 transition"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Cultivo</label>
            <select
              name="cultivo_id"
              value={planta.cultivo_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition"
            >
              <option value="">Selecciona un cultivo</option>
              {cultivos.map((cultivo) => (
                <option key={cultivo.id} value={cultivo.id}>
                  {cultivo.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Tipo</label>
            <select
              name="tipo"
              value={planta.tipo}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition"
            >
              <option value="semilla">Semilla</option>
              <option value="esqueje">Esqueje</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Selecciona Imágenes</label>
            <input
              type="file"
              name="photos"
              onChange={handleFileChange}
              multiple
              accept="image/*"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Foto de Perfil</label>
            <input
              type="file"
              name="fotoPerfil"
              onChange={handleProfileChange}
              accept="image/*"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition"
            />
          </div>
        </div>
        <div className="flex justify-end mt-8 space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {initialValues ? "Guardar Cambios" : "Crear"}
          </button>
        </div>
      </form>
    </ReactModal>
  );
};
export default PlantaModal;