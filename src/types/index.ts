export type NavTab = 'dashboard' | 'cargar_lecturas' | 'datos_plantel';

export type RolUsuario = 'ADMINISTRADOR' | 'SUPERVISOR';

export type EstandarEvaluacion = 'LEED' | 'ISO_14001' | 'ECO_SCHOOLS';

export interface UsuarioSesion {
  id: string;
  nombre: string;       // "Administrador" o "Supervisor"
  username: string;     // "Admin" o "Superv"
  rol: RolUsuario;
  estandarSeleccionado: EstandarEvaluacion;
}

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
  cargo_responsable: 'ADMINISTRADOR' | 'SUPERVISOR';
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

/* --- Estándar LEED: Prerrequisitos, Inventario Técnico y Línea Base --- */
export interface LeedPrerrequisitos {
  areaReciclajeConstruida: boolean;
  inventarioTecnicoSanitarios: {
    inodorosLitrosPorDescarga: number;
    grifosLitrosPorMinuto: number;
  };
  demandaElectricaInstaladaKwh: number;
  superficieTopograficaM2: {
    areaConstruida: number;
    areasVerdes: number;
  };
  reduccionAguaExigidaPct: number;
  reduccionEnergiaExigidaPct: number;
  desviacionDesechosMinimaPct: number;
}

export interface LeedEvaluacion {
  prerrequisitosCumplidos: boolean;
  lineaBaseAguaLPorAlumno: number;
  reduccionAguaLogradaPct: number;
  cumpleReduccionAgua: boolean;
  lineaBaseEnergiaKwhPorAlumno: number;
  reduccionEnergiaLogradaPct: number;
  cumpleReduccionEnergia: boolean;
  tasaReciclajeActualPct: number;
  cumpleReciclaje: boolean;
  cumpleTotalLeed: boolean;
  nivelCertificacion: 'Platino' | 'Oro' | 'Plata' | 'Certificado' | 'No Aprobado';
}

/* --- Estándar ISO 14001: Consumo Inicial (Año 0) y Mejora Continua Mes a Mes --- */
export interface Iso14001Evaluacion {
  consumoInicialAnoCero: {
    aguaLPorAlumno: number;
    energiaKwhPorAlumno: number;
    fechaInicio: string;
  };
  reduccionAguaVsAnoCeroPct: number;
  reduccionEnergiaVsAnoCeroPct: number;
  mesAMesMejoraContinua: boolean;
  cumplimientoCicloPHVA: boolean;
}

/* --- Estándar Eco-Schools: Lista de Verificación (Checklist de Acciones Concretas) --- */
export interface EcoSchoolsChecklistItem {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: 'AGUA' | 'ENERGIA' | 'DESECHOS' | 'BIODIVERSIDAD' | 'COMUNIDAD';
  completado: boolean;
  responsable: string;
}

export interface EcoSchoolsEvaluacion {
  totalAcciones: number;
  accionesCompletadas: number;
  porcentajeCumplimiento: number;
  calificaBanderaVerde: boolean;
}

/* --- Huella Ecológica / Huella de Carbono & Dictamen "Escuela Verde" --- */
export interface HuellaCarbonoCalculo {
  emisionesElectricidadKgCO2e: number;
  emisionesAguaKgCO2e: number;
  emisionesDesechosKgCO2e: number;
  capturaAreasVerdesKgCO2e: number;
  huellaNetaActualTonCO2e: number;
  huellaNetaLineaBaseTonCO2e: number;
  reduccionHuellaPct: number;
  umbralReduccionEscuelaVerdePct: number;
  esEscuelaVerde: boolean;
  estatusCertificacion: 'ESCUELA_VERDE_CERTIFICADA' | 'EN_TRANSICION_ECOLOGICA';
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
  consumoHidricoLPorAlumno: number;
  tendenciaHidricaPct: number;
  consumoEnergeticoKwhPorAlumno: number;
  limiteLeedKwh: number;
  tasaReciclajeDesechosPct: number;
  metaEcoSchoolsDesechos: number;
  porcentajeAreasVerdesPermeables: number;
  estatusLeed: string;
  temperaturaSensorC: number;
  humedadSensorPct: number;
  estadoSensor: 'OPTIMO' | 'ALERTA';
  estandarActivo: EstandarEvaluacion;
  evaluacionLeed: LeedEvaluacion;
  evaluacionIso: Iso14001Evaluacion;
  evaluacionEcoSchools: EcoSchoolsEvaluacion;
  huellaCarbono: HuellaCarbonoCalculo;
}
