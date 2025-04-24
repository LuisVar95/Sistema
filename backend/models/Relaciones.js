import Cultivo from './Cultivo.js';
import Planta from './Planta.js';
import Semana from './Semana.js';
// Asociaciones entre Cultivo y Planta
Planta.belongsTo(Cultivo, { foreignKey: 'cultivo_id' });
Cultivo.hasMany(Planta, { foreignKey: 'cultivo_id' });
// Asociaciones entre Planta y Semana
Planta.hasMany(Semana, { foreignKey: 'planta_id' });
Semana.belongsTo(Planta, { foreignKey: 'planta_id' });
// Exporta los modelos para usarlos en otras partes de la aplicación
export { Cultivo, Planta, Semana };
