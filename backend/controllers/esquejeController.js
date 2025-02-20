import Esqueje from '../models/Esqueje.js';

// Obtener todos los esquejes
export const obtenerEsquejes = async (req, res) => {
  try {
    const esquejes = await Esqueje.findAll();
    res.json(esquejes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los esquejes' });
  }
};

// Obtener un esqueje específico
export const obtenerEsqueje = async (req, res) => {
  const { id } = req.params;
  try {
    const esqueje = await Esqueje.findByPk(id);
    if (!esqueje) {
      return res.status(404).json({ error: 'Esqueje no encontrado' });
    }
    res.json(esqueje);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el esqueje' });
  }
};

// Crear un nuevo esqueje
export const crearEsqueje = async (req, res) => {
  const { nombre, fecha_inicio, fecha_corte, estado, planta_madre_id } =
    req.body;
  try {
    const nuevoEsqueje = await Esqueje.create({
      nombre,
      fecha_inicio,
      fecha_corte,
      estado,
      planta_madre_id,
    });
    res.status(201).json(nuevoEsqueje);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el esqueje' });
  }
};

// Editar un esqueje
export const editarEsqueje = async (req, res) => {
  const { id } = req.params;
  const { nombre, fecha_inicio, fecha_corte, estado, planta_madre_id } =
    req.body;
  try {
    const esqueje = await Esqueje.findByPk(id);
    if (!esqueje) {
      return res.status(404).json({ error: 'Esqueje no encontrado' });
    }
    await esqueje.update({
      nombre,
      fecha_inicio,
      fecha_corte,
      estado,
      planta_madre_id,
    });
    res.json(esqueje);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el esqueje' });
  }
};

// Eliminar un esqueje
export const eliminarEsqueje = async (req, res) => {
  const { id } = req.params;
  try {
    const esqueje = await Esqueje.findByPk(id);
    if (!esqueje) {
      return res.status(404).json({ error: 'Esqueje no encontrado' });
    }
    await esqueje.destroy();
    res.json({ mensaje: 'Esqueje eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el esqueje' });
  }
};
