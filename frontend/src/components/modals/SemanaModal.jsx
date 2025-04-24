import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
const SemanaModal = ({
  isOpen,
  onClose,
  onSave,
  plantaId, // Se recibe el id de la planta al que asociar la nueva semana
  titulo = "Crear Nueva Semana",
  initialValues = null // Si se envían valores iniciales se entiende que es modo edición
}) => {
  // Estados para los campos del formulario de la semana
  const [numero, setNumero] = useState('');
  const [textoExplicativo, setTextoExplicativo] = useState('');
  const [foto, setFoto] = useState(null);
  const [mensaje, setMensaje] = useState('');
  // Al abrir el modal, se cargan los valores iniciales (en modo edición)
  useEffect(() => {
    if (isOpen) {
      if (initialValues) {
        setNumero(initialValues.numero);
        setTextoExplicativo(initialValues.textoExplicativo);
      } else {
        setNumero('');
        setTextoExplicativo('');
      }
      setFoto(null);
      setMensaje('');
    }
  }, [isOpen, initialValues]);
  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Crear un objeto FormData para enviar tanto texto como archivo
    const formData = new FormData();
    formData.append('numero', numero);
    formData.append('textoExplicativo', textoExplicativo);
    if (foto) {
      formData.append('foto', foto);
    }
    // Se delega la acción de guardar (por ejemplo, enviar la petición POST)
    try {
      onSave(formData, plantaId);
      setMensaje('Semana creada exitosamente');
    } catch (error) {
      console.error("Error al crear la semana:", error);
      setMensaje('Error al crear la semana');
    }
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
      {mensaje && <p className="mb-4 text-green-600">{mensaje}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="numero">
            Número de Semana
          </label>
          <input
            type="number"
            name="numero"
            id="numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="textoExplicativo">
            Texto Explicativo
          </label>
          <textarea
            name="textoExplicativo"
            id="textoExplicativo"
            value={textoExplicativo}
            onChange={(e) => setTextoExplicativo(e.target.value)}
            required
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-green-600 transition"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="foto">
            Foto (opcional)
          </label>
          <input
            type="file"
            name="foto"
            id="foto"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files[0])}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition"
          />
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
export default SemanaModal;