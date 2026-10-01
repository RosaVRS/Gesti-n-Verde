export type NavTab = 'dashboard' | 'cargar_lecturas' | 'datos_plantel';

export type TipoRecurso = 'AGUA' | 'ENERGIA';
export type CategoriaDesecho = 'ORGANICO' | 'RECICLABLE' | 'NO_RECICLABLE' | 'PELIGROSO';

export interface PlantelConfig {
  nombrePlantel: string;
  codigoPlantel: string;
  institucionReferencia: string;
  poblacionEstudiantil: number;   // Alumnos
  personalCoordinadores: number;  // Servicios operacionales y mantenimiento
  personalUsuariosFinales: number;// Administrativos y Docentes
  superficieTotalM2: number;       // Predio escolar
  superficieAreasVerdesM2: number; // Áreas verdes permeables
  diasHabilesMes: number;
  metaConsumoHidricoLPorAlumno: number; // L/alumno/mes
  limiteConsumoEnergeticoKwh: number;   // kWh/mes o kWh/alumno
  metaReciclajeEcoSchoolsPct: number;   // %
  umbralTemperaturaAlerta: number;      // °C
}

export interface HistoricoMes {
  mes: string;         // 'Ene', 'Feb', etc.
  nombreMes: string;   // 'Enero', 'Febrero', etc.
  aguaLPorAlumno: number;         // Consumo hídrico mensual por alumno en litros
  energiaKwhPorAlumno: number;    // Consumo energético en kWh/mes por alumno
  aguaTotalM3: number;
  energiaTotalKwh: number;
}

export interface LecturaSensorAmbiental {
  temperaturaC: number;
  humedadPct: number;
  estado: 'OPTIMO' | 'ALERTA';
  ultimaCaptura: string;
}

export interface ConsumoRecurso {
  id: string;
  tipo_recurso: TipoRecurso;
  valor: number; // m3 para agua, kWh para energía
  unidad: string;
  periodo: string; // ej. "2026-07"
  fecha_registro: string;
  registrado_por: string;
  cargo_responsable: 'COORDINADOR' | 'USUARIO_FINAL';
  costo_estimado?: number;
  notas?: string;
}

export interface RegistroDesecho {
  id: string;
  categoria: CategoriaDesecho;
  peso_kg: number;
  periodo: string;
  destino: string;
  fecha_registro: string;
  registrado_por: string;
}

export interface ReglaProduccionInferencia {
  id: string;
  norma: 'ISO 14001' | 'LEED para Escuelas' | 'Eco-Schools' | 'Sensor Ambiental';
  criterio: string;
  reglaSiEntonces: string;
  variableAnalizada: string;
  valorActual: string | number;
  rangoToleranciaLimite: string;
  cumple: boolean;
  estadoTolerancia: 'DENTRO_DE_TOLERANCIA' | 'CERCA_DEL_LIMITE' | 'EXCEDIDO';
  diagnostico: string;
  planDeAccionCorrectivo: string;
}

export interface DiagnosticoAutomatizado {
  id: string;
  tipo: 'AGUA' | 'ENERGIA' | 'DESECHOS' | 'SENSOR_AMBIENTAL';
  severidad: 'ALERTA' | 'CUMPLIMIENTO' | 'CRITICA';
  titulo: string;
  mensaje: string;
  normaReferencia: string;
  planDeAccionCorrectivo: string;
  fecha: string;
}

export interface IndicadoresGestionVerde {
  consumoHidricoLPorAlumno: number;       // 1,240 L/est
  tendenciaHidricaPct: number;            // -12%
  consumoEnergeticoKwhPorAlumno: number;  // 28.4 kWh/est
  limiteLeedKwh: number;                  // 35 kWh
  tasaReciclajeDesechosPct: number;       // 62.5%
  metaEcoSchoolsDesechos: number;         // 50%
  porcentajeAreasVerdesPermeables: number;// 24.8%
  estatusLeed: string;
  temperaturaSensorC: number;
  humedadSensorPct: number;
  estadoSensor: 'OPTIMO' | 'ALERTA';
}
