import Semana from '../models/Semana.js';
import Planta from '../models/Planta.js';

export const obtenerSemanas = async (req, res) => {
  const { plantaId } = req.params;

  // Validar que plantaId sea un número
  if (isNaN(plantaId)) {
    return res
      .status(400)
      .json({ error: 'El ID de la planta debe ser un número' });
  }
  try {
    // Consultamos las semanas que pertenecen a la planta con el ID indicado
    const semanas = await Semana.findAll({
      where: { planta_id: plantaId },
      // Opcional: incluir datos de la planta
      include: [{ model: Planta, attributes: ['variedad'] }],
    });
    if (!semanas || semanas.length === 0) {
      return res
        .status(404)
        .json({ message: 'No se encontraron semanas para esta planta' });
    }
    res.json(semanas);
  } catch (error) {
    console.error('Error al obtener las semanas:', error);
    res.status(500).json({ error: 'Error al obtener las semanas' });
  }
};

export const crearSemana = async (req, res) => {
  // Obtenemos el ID de la planta desde los parámetros de la URL
  const { plantaId } = req.params;
  const { numero, textoExplicativo } = req.body;

  // Opcional: Validar que la planta_id sea un número
  if (isNaN(plantaId)) {
    return res
      .status(400)
      .json({ error: 'El ID de la planta debe ser un número' });
  }
  // Procesar la imagen si se envía
  const foto = req.files && req.files.foto ? req.files.foto[0].path : null;
  try {
    // (Opcional) Puedes verificar si la planta existe antes de crear la semana
    const planta = await Planta.findByPk(plantaId);
    if (!planta) {
      return res.status(404).json({ error: 'Planta no encontrada' });
    }
    // Crear la nueva semana asociada a la planta indicada
    const nuevaSemana = await Semana.create({
      numero,
      textoExplicativo,
      planta_id: plantaId, // Asignamos el ID obtenido desde los params
      foto,
    });
    // Si usas sockets para notificar, puedes emitir un evento
    const io = req.app.get('io');
    if (io) {
      io.emit('semana:creada', nuevaSemana);
    }
    res.status(201).json(nuevaSemana);
  } catch (error) {
    console.error('Error al crear la semana:', error);
    res.status(400).json({ error: 'Error al crear la semana' });
  }
};
