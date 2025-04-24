import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import clienteAxios from '../../../config/clienteAxios';
const CultivoModal = ({
  isOpen,
  onClose,
  onSave,
  titulo = "Agregar Nuevo Cultivo",
  initialValues = null // Si se envían valores iniciales se entiende que es modo edición (si lo requieres)
}) => {
  // Estado para los campos del formulario.
  const [cultivo, setCultivo] = useState({
    nombre: '',
    fecha_inicio: '',
    fecha_fin: ''
  });
  // Cuando el modal se abre se carga el formulario. Si existen initialValues se usan, de lo contrario se reinicia.
  useEffect(() => {
    if (isOpen) {
      if (initialValues) {
        setCultivo(initialValues);
      } else {
        setCultivo({
          nombre: '',
          fecha_inicio: '',
          fecha_fin: ''
        });
      }
    }
  }, [isOpen, initialValues]);
  // Manejo del cambio de los inputs
  const handleChange = (e) => {
    setCultivo({
      ...cultivo,
      [e.target.name]: e.target.value
    });
  };
  // Al enviar el formulario, se envían los datos (no es necesario FormData si no se envían archivos)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Se pueden validar los campos obligatorios; en este caso "nombre" y "fecha_inicio"
    if (!cultivo.nombre || !cultivo.fecha_inicio) {
      alert("Por favor ingresa Nombre y Fecha de Inicio");
      return;
    }
    // Se construye el objeto a enviar. Si la fecha_fin es una cadena vacía se puede enviar null.
    const datos = {
      nombre: cultivo.nombre,
      fecha_inicio: cultivo.fecha_inicio,
      fecha_fin: cultivo.fecha_fin ? cultivo.fecha_fin : null,
    };
    onSave(datos);
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={titulo}
      ariaHideApp={false} // Recuerda configurar ReactModal.setAppElement('#root') en producción
      className="relative bg-white w-full max-w-xl mx-auto mt-20 p-8 rounded-lg shadow-xl outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center"
    >
      <div className="mb-6 border-b pb-4">
        <h2 className="text-3xl font-semibold text-gray-800">{titulo}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={cultivo.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Fecha de Inicio</label>
            <input
              type="date"
              name="fecha_inicio"
              value={cultivo.fecha_inicio}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Fecha de Fin (opcional)</label>
            <input
              type="date"
              name="fecha_fin"
              value={cultivo.fecha_fin}
              onChange={handleChange}
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
export default CultivoModal;