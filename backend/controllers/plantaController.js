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

// Obtener una sola planta por ID
export const obtenerPlanta = async (req, res) => {
  const { id } = req.params;
  try {
    const planta = await Planta.findByPk(id);
    if (!planta) {
      return res.status(404).json({ error: 'Planta no encontrada' });
    }
    res.json(planta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la planta' });
  }
};

export const crearPlanta = async (req, res) => {
  const { variedad, info_planta, info_semanas, cultivo_id, tipo } = req.body;
  const fotos =
    req.files && req.files.fotos
      ? req.files.fotos.map((file) => file.path)
      : null;
  const fotoPerfil =
    req.files && req.files.fotoPerfil ? req.files.fotoPerfil[0].path : null;
  try {
    const nuevaPlanta = await Planta.create({
      variedad,
      info_planta,
      info_semanas,
      cultivo_id,
      tipo, // Agregamos el nuevo campo
      fotos,
      fotoPerfil,
    });
    const io = req.app.get('io');
    io.emit('planta:creada', nuevaPlanta);
    res.status(201).json(nuevaPlanta);
  } catch (error) {
    console.error('Error al crear la planta:', error);
    res.status(400).json({ error: 'Error al crear la planta' });
  }
};

export const editarPlanta = async (req, res) => {
  const { id } = req.params;
  const { variedad, info_planta, info_semanas, cultivo_id, tipo } = req.body;
  const fotos =
    req.files && req.files.fotos
      ? req.files.fotos.map((file) => file.path)
      : undefined;
  const fotoPerfil =
    req.files && req.files.fotoPerfil
      ? req.files.fotoPerfil[0].path
      : undefined;
  try {
    const planta = await Planta.findByPk(id);
    if (!planta) {
      return res.status(404).json({ error: 'Planta no encontrada' });
    }
    planta.variedad = variedad;
    planta.info_planta = info_planta;
    planta.info_semanas = info_semanas;
    planta.cultivo_id = cultivo_id;
    planta.tipo = tipo; // Actualizamos el campo "tipo"
    if (fotos !== undefined) {
      planta.fotos = fotos;
    }
    if (fotoPerfil !== undefined) {
      planta.fotoPerfil = fotoPerfil;
    }
    await planta.save();
    const io = req.app.get('io');
    io.emit('planta:actualizada', planta);
    res.json(planta);
  } catch (error) {
    console.error('Error al actualizar la planta:', error);
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
    // Emitir evento de planta eliminada
    const io = req.app.get('io');
    io.emit('planta:eliminada', id);
    res.json({ mensaje: 'Planta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la planta' });
  }
};
