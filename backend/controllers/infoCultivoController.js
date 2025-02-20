import InfoCultivo from '../models/InfoCultivo.js';

// Obtener todos los cultivos
export const obtenerCultivos = async (req, res) => {
  try {
    const cultivos = await InfoCultivo.findAll();
    res.json(cultivos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los cultivos' });
  }
};

// Crear un nuevo cultivo
export const crearCultivo = async (req, res) => {
  const { nombre, tipo, total_plantas, fecha_inicio, fecha_fin } = req.body;

  try {
    const nuevoCultivo = await InfoCultivo.create({
      nombre,
      tipo,
      total_plantas,
      fecha_inicio,
      fecha_fin,
    });
    res.status(201).json(nuevoCultivo);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el cultivo' });
  }
};

// Editar un cultivo
export const editarCultivo = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, total_plantas, fecha_inicio, fecha_fin } = req.body;

  try {
    const cultivo = await InfoCultivo.findByPk(id);

    if (!cultivo) {
      return res.status(404).json({ error: 'Cultivo no encontrado' });
    }

    cultivo.nombre = nombre;
    cultivo.tipo = tipo;
    cultivo.total_plantas = total_plantas;
    cultivo.fecha_inicio = fecha_inicio;
    cultivo.fecha_fin = fecha_fin;

    await cultivo.save();
    res.json(cultivo);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el cultivo' });
  }
};

// Eliminar un cultivo
export const eliminarCultivo = async (req, res) => {
  const { id } = req.params;
  try {
    const cultivo = await InfoCultivo.findByPk(id);
    if (!cultivo) {
      return res.status(404).json({ error: 'Cultivo no encontrado' });
    }
    await cultivo.destroy();
    res.json({ mensaje: 'Cultivo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el cultivo' });
  }
};
