// infoPlantaController.js
import InfoPlanta from '../models/InfoPlanta.js';

// Obtener toda la información de plantas
export const obtenerInfoPlantas = async (req, res) => {
  try {
    const infoPlantas = await InfoPlanta.findAll();
    res.json(infoPlantas);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al obtener la información de plantas' });
  }
};

// Crear nueva información de planta
export const crearInfoPlanta = async (req, res) => {
  const {
    fecha,
    descripcion,
    riego,
    defectos,
    virtudes,
    fertilizacion,
    ph,
    ec,
    planta_id,
  } = req.body;
  try {
    const nuevaInfoPlanta = await InfoPlanta.create({
      fecha,
      descripcion,
      riego,
      defectos,
      virtudes,
      fertilizacion,
      ph,
      ec,
      planta_id,
    });
    res.status(201).json(nuevaInfoPlanta);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error al crear la información de la planta' });
  }
};

// Editar información de planta
export const editarInfoPlanta = async (req, res) => {
  const { id } = req.params;
  const {
    fecha,
    descripcion,
    riego,
    defectos,
    virtudes,
    fertilizacion,
    ph,
    ec,
    planta_id,
  } = req.body;
  try {
    const infoPlanta = await InfoPlanta.findByPk(id);
    if (!infoPlanta) {
      return res
        .status(404)
        .json({ error: 'Información de planta no encontrada' });
    }
    await infoPlanta.update({
      fecha,
      descripcion,
      riego,
      defectos,
      virtudes,
      fertilizacion,
      ph,
      ec,
      planta_id,
    });
    res.json(infoPlanta);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error al actualizar la información de la planta' });
  }
};

// Eliminar información de planta
export const eliminarInfoPlanta = async (req, res) => {
  const { id } = req.params;
  try {
    const infoPlanta = await InfoPlanta.findByPk(id);
    if (!infoPlanta) {
      return res
        .status(404)
        .json({ error: 'Información de planta no encontrada' });
    }
    await infoPlanta.destroy();
    res.json({ mensaje: 'Información de planta eliminada correctamente' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al eliminar la información de la planta' });
  }
};
