import Planta from '../models/Planta.js';

// Obtener todas las plantas
export const obtenerPlantas = async (req, res) => {
  try {
    const plantas = await Planta.findAll();
    res.json(plantas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las plantas' });
  }
};

// Crear una nueva planta
export const crearPlanta = async (req, res) => {
  const { nombre, fotos } = req.body;
  try {
    const nuevaPlanta = await Planta.create({ nombre, fotos });
    res.status(201).json(nuevaPlanta);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la planta' });
  }
};

// Editar una planta
export const editarPlanta = async (req, res) => {
  const { id } = req.params;
  const { nombre, fotos } = req.body;
  try {
    const planta = await Planta.findByPk(id);
    if (!planta) {
      return res.status(404).json({ error: 'Planta no encontrada' });
    }
    planta.nombre = nombre;
    planta.fotos = fotos;
    await planta.save();
    res.json(planta);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la planta' });
  }
};

// Eliminar una planta
export const eliminarPlanta = async (req, res) => {
  const { id } = req.params;
  try {
    const planta = await Planta.findByPk(id);
    if (!planta) {
      return res.status(404).json({ error: 'Planta no encontrada' });
    }
    await planta.destroy();
    res.json({ mensaje: 'Planta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la planta' });
  }
};
