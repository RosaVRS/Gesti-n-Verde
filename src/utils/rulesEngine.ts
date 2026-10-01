import {
  PlantelConfig,
  HistoricoMes,
  ConsumoRecurso,
  RegistroDesecho,
  LecturaSensorAmbiental,
  ReglaProduccionInferencia,
  DiagnosticoAutomatizado,
  IndicadoresGestionVerde
} from '../types';

export const INITIAL_PLANTEL: PlantelConfig = {
  nombrePlantel: 'Plantel Educativo Modelo (Caso de Estudio)',
  codigoPlantel: 'URBE-ESC-01',
  institucionReferencia: 'Universidad Privada Dr. Rafael Belloso Chacín (URBE)',
  poblacionEstudiantil: 450,
  personalCoordinadores: 2,   // Cuadro 1: Servicios operacionales, mantenimiento diario del plantel (2)
  personalUsuariosFinales: 2, // Cuadro 1: Personal administrativo, Docentes (2)
  superficieTotalM2: 12500,
  superficieAreasVerdesM2: 3100, // 3100 / 12500 = 24.8% áreas verdes permeables (pág. 11)
  diasHabilesMes: 20,
  metaConsumoHidricoLPorAlumno: 1350,
  limiteConsumoEnergeticoKwh: 35.0,
  metaReciclajeEcoSchoolsPct: 50.0,
  umbralTemperaturaAlerta: 26.5
};

export const INITIAL_HISTORICO: HistoricoMes[] = [
  {
    mes: 'Ene',
    nombreMes: 'Enero',
    aguaLPorAlumno: 1500,
    energiaKwhPorAlumno: 29.8,
    aguaTotalM3: 675.0,
    energiaTotalKwh: 13410
  },
  {
    mes: 'Feb',
    nombreMes: 'Febrero',
    aguaLPorAlumno: 1420,
    energiaKwhPorAlumno: 29.2,
    aguaTotalM3: 639.0,
    energiaTotalKwh: 13140
  },
  {
    mes: 'Mar',
    nombreMes: 'Marzo',
    aguaLPorAlumno: 1380,
    energiaKwhPorAlumno: 28.9,
    aguaTotalM3: 621.0,
    energiaTotalKwh: 13005
  },
  {
    mes: 'Abr',
    nombreMes: 'Abril',
    aguaLPorAlumno: 1300,
    energiaKwhPorAlumno: 28.6,
    aguaTotalM3: 585.0,
    energiaTotalKwh: 12870
  },
  {
    mes: 'May',
    nombreMes: 'Mayo',
    aguaLPorAlumno: 1280,
    energiaKwhPorAlumno: 28.5,
    aguaTotalM3: 576.0,
    energiaTotalKwh: 12825
  },
  {
    mes: 'Jun',
    nombreMes: 'Junio',
    aguaLPorAlumno: 1250,
    energiaKwhPorAlumno: 28.4,
    aguaTotalM3: 562.5,
    energiaTotalKwh: 12780
  },
  {
    mes: 'Jul',
    nombreMes: 'Julio',
    aguaLPorAlumno: 1240,
    energiaKwhPorAlumno: 28.4,
    aguaTotalM3: 558.0,
    energiaTotalKwh: 12780
  }
];

export const INITIAL_DESECHOS: RegistroDesecho[] = [
  {
    id: 'des-01',
    categoria: 'ORGANICO',
    peso_kg: 320,
    periodo: '2026-07',
    destino: 'Compostaje para áreas verdes permeables del plantel',
    fecha_registro: '2026-07-28T10:00:00Z',
    registrado_por: 'Coordinador de Servicios Operacionales'
  },
  {
    id: 'des-02',
    categoria: 'RECICLABLE',
    peso_kg: 430,
    periodo: '2026-07',
    destino: 'Gestor certificado de reciclaje (Papel, cartón y plástico)',
    fecha_registro: '2026-07-28T11:00:00Z',
    registrado_por: 'Coordinador de Mantenimiento'
  },
  {
    id: 'des-03',
    categoria: 'NO_RECICLABLE',
    peso_kg: 450,
    periodo: '2026-07',
    destino: 'Disposición final municipal',
    fecha_registro: '2026-07-29T09:00:00Z',
    registrado_por: 'Personal Administrativo'
  }
];

export const INITIAL_SENSOR: LecturaSensorAmbiental = {
  temperaturaC: 23.2,
  humedadPct: 48.5,
  estado: 'OPTIMO',
  ultimaCaptura: new Date().toISOString()
};

/**
 * Motor de Inferencia (Librería Experta / Reglas Si-Entonces)
 * Evalúa los parámetros operacionales y variables matemáticas clave según el Capítulo III:
 * - Consumo hídrico mensual por alumno en litros
 * - Consumo energético en kWh/mes por alumno
 * - Clasificación de desechos sólidos y porcentaje de reciclaje
 * - Porcentaje de áreas verdes permeables
 * - Temperatura y humedad detectadas por el sensor ambiental
 */
export function ejecutarMotorInferencia(
  plantel: PlantelConfig,
  historico: HistoricoMes[],
  desechos: RegistroDesecho[],
  sensor: LecturaSensorAmbiental
): {
  indicadores: IndicadoresGestionVerde;
  reglas: ReglaProduccionInferencia[];
  diagnosticos: DiagnosticoAutomatizado[];
} {
  const ultimoMes = historico[historico.length - 1] || INITIAL_HISTORICO[INITIAL_HISTORICO.length - 1];
  const penultimoMes = historico[historico.length - 2] || ultimoMes;

  // Variables matemáticas clave (pág. 11)
  const consumoHidricoLPorAlumno = ultimoMes.aguaLPorAlumno; // 1,240 L/est
  const tendenciaHidricaPct = penultimoMes.aguaLPorAlumno > 0
    ? Math.round(((ultimoMes.aguaLPorAlumno - penultimoMes.aguaLPorAlumno) / penultimoMes.aguaLPorAlumno) * 100)
    : -12;

  const consumoEnergeticoKwhPorAlumno = ultimoMes.energiaKwhPorAlumno; // 28.4 kWh/est
  const limiteLeedKwh = plantel.limiteConsumoEnergeticoKwh; // 35.0 kWh

  // Clasificación de desechos sólidos y tasa de reciclaje
  const org = desechos.filter(d => d.categoria === 'ORGANICO').reduce((acc, d) => acc + d.peso_kg, 0);
  const rec = desechos.filter(d => d.categoria === 'RECICLABLE').reduce((acc, d) => acc + d.peso_kg, 0);
  const totalDesechos = desechos.reduce((acc, d) => acc + d.peso_kg, 0);
  const tasaReciclajeDesechosPct = totalDesechos > 0
    ? parseFloat((( (org + rec) / totalDesechos ) * 100).toFixed(1))
    : 62.5;

  // Porcentaje de áreas verdes permeables (pág. 11)
  const porcentajeAreasVerdesPermeables = plantel.superficieTotalM2 > 0
    ? parseFloat(((plantel.superficieAreasVerdesM2 / plantel.superficieTotalM2) * 100).toFixed(1))
    : 24.8;

  // Estado del sensor ambiental
  const tempConforme = sensor.temperaturaC <= plantel.umbralTemperaturaAlerta && sensor.temperaturaC >= 20.0;
  const humConforme = sensor.humedadPct >= 30.0 && sensor.humedadPct <= 60.0;
  const estadoSensor: 'OPTIMO' | 'ALERTA' = (tempConforme && humConforme) ? 'OPTIMO' : 'ALERTA';

  // Estructuración de Reglas de Producción Condicionales ("Si-Entonces")
  const reglas: ReglaProduccionInferencia[] = [];

  // Regla 1: Eficiencia Hídrica (LEED / ISO 14001)
  const cumpleAgua = consumoHidricoLPorAlumno <= plantel.metaConsumoHidricoLPorAlumno;
  reglas.push({
    id: 'regla-hidrica-leed',
    norma: 'LEED para Escuelas',
    criterio: 'Consumo hídrico mensual por alumno en litros',
    reglaSiEntonces: 'SI consumo_hidrico_por_alumno <= 1350 L ENTONCES estado = CUMPLIMIENTO_OPTIMO',
    variableAnalizada: 'consumo_hidrico_por_alumno',
    valorActual: `${consumoHidricoLPorAlumno.toLocaleString()} L/alumno`,
    rangoToleranciaLimite: `Límite tolerable: ≤ ${plantel.metaConsumoHidricoLPorAlumno.toLocaleString()} L/alumno`,
    cumple: cumpleAgua,
    estadoTolerancia: cumpleAgua ? 'DENTRO_DE_TOLERANCIA' : 'EXCEDIDO',
    diagnostico: cumpleAgua
      ? 'El consumo hídrico por estudiante se mantiene dentro de los límites óptimos del estándar LEED.'
      : 'Consumo hídrico mensual sobrepasa el rango de tolerancia ecológica establecido.',
    planDeAccionCorrectivo: cumpleAgua
      ? 'Mantener inspección preventiva quincenal en grifos y sanitarios por los coordinadores de mantenimiento.'
      : 'Activar protocolo de detección de fugas en redes subterráneas y verificar calibración de fluxómetros.'
  });

  // Regla 2: Eficiencia Energética (LEED EUI)
  const cercaLimiteEnergia = consumoEnergeticoKwhPorAlumno >= (limiteLeedKwh * 0.8);
  const cumpleEnergia = consumoEnergeticoKwhPorAlumno <= limiteLeedKwh;
  reglas.push({
    id: 'regla-energia-leed',
    norma: 'LEED para Escuelas',
    criterio: 'Consumo energético en kWh/mes por alumno',
    reglaSiEntonces: 'SI consumo_energetico_por_alumno >= 28.0 Y <= 35.0 ENTONCES estado = ALERTA_PREVENTIVA',
    variableAnalizada: 'consumo_energetico_por_alumno',
    valorActual: `${consumoEnergeticoKwhPorAlumno.toFixed(1)} kWh/alumno`,
    rangoToleranciaLimite: `Límite máximo LEED: ${limiteLeedKwh.toFixed(1)} kWh`,
    cumple: cumpleEnergia,
    estadoTolerancia: !cumpleEnergia ? 'EXCEDIDO' : cercaLimiteEnergia ? 'CERCA_DEL_LIMITE' : 'DENTRO_DE_TOLERANCIA',
    diagnostico: cercaLimiteEnergia
      ? 'Se detectó un incremento del 8% en el consumo nocturno. Revisar sistemas de climatización fuera de horario laboral.'
      : 'Consumo energético en rango aceptable.',
    planDeAccionCorrectivo: 'Desconexión de cargas fantasmas y regulación horaria del encendido de acondicionadores de aire.'
  });

  // Regla 3: Clasificación de Desechos Sólidos (Eco-Schools)
  const cumpleReciclaje = tasaReciclajeDesechosPct >= plantel.metaReciclajeEcoSchoolsPct;
  reglas.push({
    id: 'regla-desechos-ecoschools',
    norma: 'Eco-Schools',
    criterio: 'Clasificación y valorización de desechos sólidos',
    reglaSiEntonces: 'SI tasa_reciclaje_desechos >= 50.0% ENTONCES estado = META_BANDERA_VERDE_ALCANZADA',
    variableAnalizada: 'tasa_reciclaje_desechos',
    valorActual: `${tasaReciclajeDesechosPct}%`,
    rangoToleranciaLimite: `Meta Eco-Schools: > ${plantel.metaReciclajeEcoSchoolsPct}%`,
    cumple: cumpleReciclaje,
    estadoTolerancia: cumpleReciclaje ? 'DENTRO_DE_TOLERANCIA' : 'EXCEDIDO',
    diagnostico: cumpleReciclaje
      ? 'Meta Eco-Schools alcanzada (>50% de residuos valorizados en compostaje y reciclaje).'
      : 'Generación de desechos no aprovechables excede la meta de sostenibilidad.',
    planDeAccionCorrectivo: 'Fortalecer campañas de separación en aulas con usuarios finales (docentes y alumnos).'
  });

  // Regla 4: Porcentaje de Áreas Verdes Permeables (ISO 14001 / LEED)
  const cumpleAreasVerdes = porcentajeAreasVerdesPermeables >= 20.0;
  reglas.push({
    id: 'regla-areas-verdes',
    norma: 'ISO 14001',
    criterio: 'Porcentaje de áreas verdes permeables en el predio escolar',
    reglaSiEntonces: 'SI porcentaje_areas_verdes >= 20.0% ENTONCES estado = COBERTURA_CONFORME',
    variableAnalizada: 'porcentaje_areas_verdes_permeables',
    valorActual: `${porcentajeAreasVerdesPermeables}%`,
    rangoToleranciaLimite: 'Requisito normativo: Mínimo 20.0% de área permeable',
    cumple: cumpleAreasVerdes,
    estadoTolerancia: cumpleAreasVerdes ? 'DENTRO_DE_TOLERANCIA' : 'EXCEDIDO',
    diagnostico: 'Área permeable disponible para mitigación de escorrentía pluvial e isla de calor.',
    planDeAccionCorrectivo: 'Conservar la cobertura vegetal y mantener programas de jardinería sustentable.'
  });

  // Regla 5: Sensor Ambiental
  reglas.push({
    id: 'regla-sensor-ambiental',
    norma: 'Sensor Ambiental',
    criterio: 'Variables ambientales en tiempo real (Temperatura y Humedad)',
    reglaSiEntonces: 'SI temperatura <= 26.5°C Y humedad ENTRE 30% Y 60% ENTONCES confort = OPTIMO',
    variableAnalizada: 'sensor_temperatura_humedad',
    valorActual: `${sensor.temperaturaC.toFixed(1)}°C / ${sensor.humedadPct.toFixed(1)}%`,
    rangoToleranciaLimite: `Máx ${plantel.umbralTemperaturaAlerta}°C / HR 30%-60%`,
    cumple: estadoSensor === 'OPTIMO',
    estadoTolerancia: estadoSensor === 'OPTIMO' ? 'DENTRO_DE_TOLERANCIA' : 'CERCA_DEL_LIMITE',
    diagnostico: estadoSensor === 'OPTIMO'
      ? 'Condiciones ambientales en el plantel en zona de confort óptimo.'
      : 'Condición térmica fuera de rango de confort.',
    planDeAccionCorrectivo: 'Ventilación cruzada o ajuste de sistemas de acondicionamiento de aire.'
  });

  // Diagnósticos Automatizados del Sistema Experto (pág. 11, 15)
  const diagnosticos: DiagnosticoAutomatizado[] = [];

  if (cercaLimiteEnergia) {
    diagnosticos.push({
      id: 'diag-energia',
      tipo: 'ENERGIA',
      severidad: 'ALERTA',
      titulo: 'Alerta Energética:',
      mensaje: 'Se detectó un incremento del 8% en el consumo nocturno. Revisar sistemas de climatización fuera de horario laboral.',
      normaReferencia: 'ISO 14001 / LEED',
      planDeAccionCorrectivo: 'Revisar sistemas de climatización fuera de horario laboral y verificar luminarias activas.',
      fecha: 'Activa'
    });
  }

  if (cumpleAgua) {
    diagnosticos.push({
      id: 'diag-agua',
      tipo: 'AGUA',
      severidad: 'CUMPLIMIENTO',
      titulo: 'Cumplimiento Hídrico:',
      mensaje: 'El consumo hídrico por estudiante se mantiene dentro de los límites óptimos del estándar LEED.',
      normaReferencia: 'LEED para Escuelas',
      planDeAccionCorrectivo: 'Continuar con el monitoreo preventivo de consumos quincenales.',
      fecha: 'Activa'
    });
  }

  const estatusLeed = (cumpleAgua && cumpleEnergia)
    ? 'Cumplimiento Óptimo (LEED)'
    : !cumpleEnergia
    ? 'Alerta LEED'
    : 'En Revisión (LEED)';

  const indicadores: IndicadoresGestionVerde = {
    consumoHidricoLPorAlumno,
    tendenciaHidricaPct,
    consumoEnergeticoKwhPorAlumno,
    limiteLeedKwh,
    tasaReciclajeDesechosPct,
    metaEcoSchoolsDesechos: plantel.metaReciclajeEcoSchoolsPct,
    porcentajeAreasVerdesPermeables,
    estatusLeed,
    temperaturaSensorC: sensor.temperaturaC,
    humedadSensorPct: sensor.humedadPct,
    estadoSensor
  };

  return {
    indicadores,
    reglas,
    diagnosticos
  };
}
