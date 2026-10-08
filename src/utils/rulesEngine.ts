import {
  PlantelConfig,
  HistoricoMes,
  ConsumoRecurso,
  RegistroDesecho,
  LecturaSensorAmbiental,
  ReglaProduccionInferencia,
  DiagnosticoAutomatizado,
  IndicadoresGestionVerde,
  EstandarEvaluacion,
  LeedPrerrequisitos,
  LeedEvaluacion,
  Iso14001Evaluacion,
  EcoSchoolsChecklistItem,
  EcoSchoolsEvaluacion,
  HuellaCarbonoCalculo
} from '../types';

export const INITIAL_PLANTEL: PlantelConfig = {
  nombrePlantel: 'Plantel Educativo Modelo (Caso de Estudio)',
  codigoPlantel: 'URBE-ESC-01',
  institucionReferencia: 'Universidad Privada Dr. Rafael Belloso Chacín (URBE)',
  poblacionEstudiantil: 450,
  personalCoordinadores: 2,
  personalUsuariosFinales: 2,
  superficieTotalM2: 12500,
  superficieAreasVerdesM2: 3100, // 24.8% área permeable
  diasHabilesMes: 20,
  metaConsumoHidricoLPorAlumno: 1350,
  limiteConsumoEnergeticoKwh: 35.0,
  metaReciclajeEcoSchoolsPct: 50.0,
  umbralTemperaturaAlerta: 26.5
};

export const INITIAL_LEED_PRERREQUISITOS: LeedPrerrequisitos = {
  areaReciclajeConstruida: true, // Espacio físico construido para clasificar papel, cartón, vidrio, plástico y metal
  inventarioTecnicoSanitarios: {
    inodorosLitrosPorDescarga: 4.8, // 4.8 L/descarga (bajo consumo exigido por LEED)
    grifosLitrosPorMinuto: 1.9      // 1.9 L/min con aireadores
  },
  demandaElectricaInstaladaKwh: 14500,
  superficieTopograficaM2: {
    areaConstruida: 9400,
    areasVerdes: 3100
  },
  reduccionAguaExigidaPct: 20.0,    // LEED exige mínimo 20% de reducción
  reduccionEnergiaExigidaPct: 4.0,  // LEED exige entre 3% y 5%
  desviacionDesechosMinimaPct: 50.0 // Mínimo 50% de reciclaje
};

export const INITIAL_ECO_SCHOOLS_CHECKLIST: EcoSchoolsChecklistItem[] = [
  {
    id: 'eco-1',
    titulo: 'Mantenimiento Preventivo de Tuberías y Grifos',
    descripcion: 'Inspección técnica quincenal y sellado inmediato de fugas en sanitarios y bebederos.',
    categoria: 'AGUA',
    completado: true,
    responsable: 'Coordinador de Mantenimiento'
  },
  {
    id: 'eco-2',
    titulo: 'Brigada Ecológica Estudiantil Activa',
    descripcion: 'Comité ambiental conformado con alumnos de diversos grados realizando patrullas ecológicas.',
    categoria: 'COMUNIDAD',
    completado: true,
    responsable: 'Docente de Ciencias / Brigada'
  },
  {
    id: 'eco-3',
    titulo: 'Puntos Ecológicos y Separación en Aulas',
    descripcion: 'Estaciones de clasificación de 3 contenedores (orgánico, reciclable, ordinario) en pasillos y salones.',
    categoria: 'DESECHOS',
    completado: true,
    responsable: 'Comité Ambiental Escolar'
  },
  {
    id: 'eco-4',
    titulo: 'Huerto Escolar y Compostaje de Residuos',
    descripcion: 'Aprovechamiento de residuos del comedor para abono orgánico en las áreas verdes permeables.',
    categoria: 'BIODIVERSIDAD',
    completado: true,
    responsable: 'Docentes y Alumnos'
  },
  {
    id: 'eco-5',
    titulo: 'Protocolo de Apagado Fuera de Horario Escolar',
    descripcion: 'Desconexión sistemática de aires acondicionados, luminarias y equipos de cómputo al terminar la jornada.',
    categoria: 'ENERGIA',
    completado: false,
    responsable: 'Personal de Apoyo y Administrativo'
  }
];

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
 * Motor de Inferencia y Lógica de Evaluación:
 * 1. Estándar LEED: Prerrequisitos + Línea Base y Reducciones Exigidas (Agua >=20%, Energía 3-5%, Desechos 50-75%)
 * 2. Estándar ISO 14001: Consumo Inicial (Año 0) y Demostración de Mejora Continua mes a mes
 * 3. Estándar Eco-Schools: Lista de Verificación (Checklists) de Acciones Concretas (Brigadas, Mantenimiento)
 * 4. Determinación de "Escuela Verde": Cálculo de Huella de Carbono neta vs Línea Base
 */
export function ejecutarMotorInferencia(
  plantel: PlantelConfig,
  historico: HistoricoMes[],
  desechos: RegistroDesecho[],
  sensor: LecturaSensorAmbiental,
  estandarActivo: EstandarEvaluacion = 'LEED',
  leedPrerrequisitos: LeedPrerrequisitos = INITIAL_LEED_PRERREQUISITOS,
  ecoChecklist: EcoSchoolsChecklistItem[] = INITIAL_ECO_SCHOOLS_CHECKLIST
): {
  indicadores: IndicadoresGestionVerde;
  reglas: ReglaProduccionInferencia[];
  diagnosticos: DiagnosticoAutomatizado[];
} {
  const primerMes = historico[0] || INITIAL_HISTORICO[0];
  const ultimoMes = historico[historico.length - 1] || INITIAL_HISTORICO[INITIAL_HISTORICO.length - 1];
  const penultimoMes = historico[historico.length - 2] || ultimoMes;

  // Variables matemáticas clave
  const consumoHidricoLPorAlumno = ultimoMes.aguaLPorAlumno;
  const tendenciaHidricaPct = penultimoMes.aguaLPorAlumno > 0
    ? Math.round(((ultimoMes.aguaLPorAlumno - penultimoMes.aguaLPorAlumno) / penultimoMes.aguaLPorAlumno) * 100)
    : -12;

  const consumoEnergeticoKwhPorAlumno = ultimoMes.energiaKwhPorAlumno;
  const limiteLeedKwh = plantel.limiteConsumoEnergeticoKwh;

  // Tasa de reciclaje
  const org = desechos.filter(d => d.categoria === 'ORGANICO').reduce((acc, d) => acc + d.peso_kg, 0);
  const rec = desechos.filter(d => d.categoria === 'RECICLABLE').reduce((acc, d) => acc + d.peso_kg, 0);
  const noRec = desechos.filter(d => d.categoria === 'NO_RECICLABLE').reduce((acc, d) => acc + d.peso_kg, 0);
  const totalDesechos = desechos.reduce((acc, d) => acc + d.peso_kg, 0);
  const tasaReciclajeDesechosPct = totalDesechos > 0
    ? parseFloat((( (org + rec) / totalDesechos ) * 100).toFixed(1))
    : 62.5;

  // Áreas verdes permeables
  const porcentajeAreasVerdesPermeables = plantel.superficieTotalM2 > 0
    ? parseFloat(((plantel.superficieAreasVerdesM2 / plantel.superficieTotalM2) * 100).toFixed(1))
    : 24.8;

  // Sensor
  const tempConforme = sensor.temperaturaC <= plantel.umbralTemperaturaAlerta && sensor.temperaturaC >= 20.0;
  const humConforme = sensor.humedadPct >= 30.0 && sensor.humedadPct <= 60.0;
  const estadoSensor: 'OPTIMO' | 'ALERTA' = (tempConforme && humConforme) ? 'OPTIMO' : 'ALERTA';

  // --- A. EVALUACIÓN ESTÁNDAR LEED (Prerrequisitos y Línea Base) ---
  const prerrequisitosCumplidos = leedPrerrequisitos.areaReciclajeConstruida &&
    leedPrerrequisitos.inventarioTecnicoSanitarios.inodorosLitrosPorDescarga <= 6.0 &&
    leedPrerrequisitos.inventarioTecnicoSanitarios.grifosLitrosPorMinuto <= 2.2;

  const lineaBaseAgua = primerMes.aguaLPorAlumno; // ej. 1500 L/est
  const reduccionAguaLogradaPct = lineaBaseAgua > 0
    ? parseFloat((((lineaBaseAgua - consumoHidricoLPorAlumno) / lineaBaseAgua) * 100).toFixed(1))
    : 0;
  const cumpleReduccionAgua = reduccionAguaLogradaPct >= leedPrerrequisitos.reduccionAguaExigidaPct; // >= 20%

  const lineaBaseEnergia = primerMes.energiaKwhPorAlumno; // ej. 29.8 kWh/est
  const reduccionEnergiaLogradaPct = lineaBaseEnergia > 0
    ? parseFloat((((lineaBaseEnergia - consumoEnergeticoKwhPorAlumno) / lineaBaseEnergia) * 100).toFixed(1))
    : 0;
  const cumpleReduccionEnergia = reduccionEnergiaLogradaPct >= leedPrerrequisitos.reduccionEnergiaExigidaPct; // >= 4%

  const cumpleReciclajeLeed = tasaReciclajeDesechosPct >= leedPrerrequisitos.desviacionDesechosMinimaPct; // >= 50%
  const cumpleTotalLeed = prerrequisitosCumplidos && cumpleReduccionAgua && cumpleReduccionEnergia && cumpleReciclajeLeed;

  const evaluacionLeed: LeedEvaluacion = {
    prerrequisitosCumplidos,
    lineaBaseAguaLPorAlumno: lineaBaseAgua,
    reduccionAguaLogradaPct,
    cumpleReduccionAgua,
    lineaBaseEnergiaKwhPorAlumno: lineaBaseEnergia,
    reduccionEnergiaLogradaPct,
    cumpleReduccionEnergia,
    tasaReciclajeActualPct: tasaReciclajeDesechosPct,
    cumpleReciclaje: cumpleReciclajeLeed,
    cumpleTotalLeed,
    nivelCertificacion: cumpleTotalLeed
      ? (reduccionAguaLogradaPct >= 25 && reduccionEnergiaLogradaPct >= 6 ? 'Platino' : 'Oro')
      : 'No Aprobado'
  };

  // --- B. EVALUACIÓN ESTÁNDAR ISO 14001 (Mejora Continua mes a mes vs Año 0) ---
  const reduccionAguaVsAnoCero = primerMes.aguaLPorAlumno > 0
    ? parseFloat((((primerMes.aguaLPorAlumno - ultimoMes.aguaLPorAlumno) / primerMes.aguaLPorAlumno) * 100).toFixed(1))
    : 0;
  const reduccionEnergiaVsAnoCero = primerMes.energiaKwhPorAlumno > 0
    ? parseFloat((((primerMes.energiaKwhPorAlumno - ultimoMes.energiaKwhPorAlumno) / primerMes.energiaKwhPorAlumno) * 100).toFixed(1))
    : 0;

  // Verificación mes a mes de no incremento severo
  let mesAMesMejoraContinua = true;
  for (let i = 1; i < historico.length; i++) {
    if (historico[i].aguaLPorAlumno > historico[i - 1].aguaLPorAlumno * 1.05 ||
        historico[i].energiaKwhPorAlumno > historico[i - 1].energiaKwhPorAlumno * 1.05) {
      mesAMesMejoraContinua = false;
      break;
    }
  }

  const evaluacionIso: Iso14001Evaluacion = {
    consumoInicialAnoCero: {
      aguaLPorAlumno: primerMes.aguaLPorAlumno,
      energiaKwhPorAlumno: primerMes.energiaKwhPorAlumno,
      fechaInicio: 'Enero 2026'
    },
    reduccionAguaVsAnoCeroPct: reduccionAguaVsAnoCero,
    reduccionEnergiaVsAnoCeroPct: reduccionEnergiaVsAnoCero,
    mesAMesMejoraContinua,
    cumplimientoCicloPHVA: mesAMesMejoraContinua && reduccionAguaVsAnoCero > 0
  };

  // --- C. EVALUACIÓN ESTÁNDAR ECO-SCHOOLS (Checklist de Acciones Concretas) ---
  const totalAcciones = ecoChecklist.length;
  const accionesCompletadas = ecoChecklist.filter(item => item.completado).length;
  const porcentajeCumplimientoEco = totalAcciones > 0
    ? Math.round((accionesCompletadas / totalAcciones) * 100)
    : 0;
  const calificaBanderaVerde = porcentajeCumplimientoEco >= 80 && tasaReciclajeDesechosPct >= 50;

  const evaluacionEcoSchools: EcoSchoolsEvaluacion = {
    totalAcciones,
    accionesCompletadas,
    porcentajeCumplimiento: porcentajeCumplimientoEco,
    calificaBanderaVerde
  };

  // --- D. CÁLCULO CIENTÍFICO DE HUELLA ECOLÓGICA / HUELLA DE CARBONO ---
  // Factores de emisión:
  // - Electricidad: 0.42 kg CO2e / kWh
  // - Agua bombeada y saneamiento: 0.35 kg CO2e / m3
  // - Desechos ordinarios a vertedero: 1.25 kg CO2e / kg
  // - Desechos reciclados/compostados: -0.85 kg CO2e / kg evitado
  // - Captura de carbono por área verde: -0.15 kg CO2e / m2 / mes
  const emisionesElectricidadActual = (ultimoMes.energiaTotalKwh * 0.42);
  const emisionesAguaActual = (ultimoMes.aguaTotalM3 * 0.35);
  const emisionesDesechosActual = (noRec * 1.25) - ((org + rec) * 0.85);
  const capturaAreasVerdes = (plantel.superficieAreasVerdesM2 * 0.15);

  const huellaNetaActualKg = Math.max(0, emisionesElectricidadActual + emisionesAguaActual + emisionesDesechosActual - capturaAreasVerdes);
  const huellaNetaActualTon = parseFloat((huellaNetaActualKg / 1000).toFixed(2));

  // Línea Base (Mes 0)
  const emisionesElectricidadBase = (primerMes.energiaTotalKwh * 0.42);
  const emisionesAguaBase = (primerMes.aguaTotalM3 * 0.35);
  const emisionesDesechosBase = (totalDesechos * 1.15); // Antes de programa de reciclaje
  const huellaNetaBaseKg = Math.max(0, emisionesElectricidadBase + emisionesAguaBase + emisionesDesechosBase - capturaAreasVerdes);
  const huellaNetaLineaBaseTon = parseFloat((huellaNetaBaseKg / 1000).toFixed(2));

  const reduccionHuellaPct = huellaNetaLineaBaseTon > 0
    ? parseFloat((((huellaNetaLineaBaseTon - huellaNetaActualTon) / huellaNetaLineaBaseTon) * 100).toFixed(1))
    : 0;

  // Condición de Escuela Verde según la directriz del profesor:
  // La escuela se considera "Verde" en el momento en que su Huella de Carbono disminuye >= 15% vs Línea Base
  const umbralReduccionEscuelaVerdePct = 15.0;
  const esEscuelaVerde = reduccionHuellaPct >= umbralReduccionEscuelaVerdePct && (
    (estandarActivo === 'LEED' && cumpleTotalLeed) ||
    (estandarActivo === 'ISO_14001' && evaluacionIso.cumplimientoCicloPHVA) ||
    (estandarActivo === 'ECO_SCHOOLS' && calificaBanderaVerde)
  );

  const huellaCarbono: HuellaCarbonoCalculo = {
    emisionesElectricidadKgCO2e: Math.round(emisionesElectricidadActual),
    emisionesAguaKgCO2e: Math.round(emisionesAguaActual),
    emisionesDesechosKgCO2e: Math.round(emisionesDesechosActual),
    capturaAreasVerdesKgCO2e: Math.round(capturaAreasVerdes),
    huellaNetaActualTonCO2e: huellaNetaActualTon,
    huellaNetaLineaBaseTonCO2e: huellaNetaLineaBaseTon,
    reduccionHuellaPct,
    umbralReduccionEscuelaVerdePct,
    esEscuelaVerde,
    estatusCertificacion: esEscuelaVerde ? 'ESCUELA_VERDE_CERTIFICADA' : 'EN_TRANSICION_ECOLOGICA'
  };

  // --- REGLAS DE PRODUCCIÓN SI-ENTONCES ---
  const reglas: ReglaProduccionInferencia[] = [];

  // Regla LEED: Reducción hídrica del 20%
  reglas.push({
    id: 'regla-leed-agua',
    norma: 'LEED para Escuelas',
    criterio: 'Reducción estricta de agua vs Línea Base (>= 20%)',
    reglaSiEntonces: 'SI reduccion_agua_vs_linea_base >= 20.0% Y prerrequisitos_cumplidos ENTONCES leed_agua = APROBADO',
    variableAnalizada: 'reduccion_agua_vs_linea_base',
    valorActual: `${reduccionAguaLogradaPct}% reducción (${consumoHidricoLPorAlumno} L/est)`,
    rangoToleranciaLimite: `Exigencia LEED: Mínimo 20.0% reducción (Base: ${lineaBaseAgua} L)`,
    cumple: cumpleReduccionAgua,
    estadoTolerancia: cumpleReduccionAgua ? 'DENTRO_DE_TOLERANCIA' : 'EXCEDIDO',
    diagnostico: cumpleReduccionAgua
      ? `Meta LEED alcanzada: Se redujo un ${reduccionAguaLogradaPct}% de consumo hídrico respecto a la línea base.`
      : `Reducción insuficiente (${reduccionAguaLogradaPct}%). Se requiere alcanzar al menos el 20.0% de ahorro.`,
    planDeAccionCorrectivo: 'Inspeccionar grifos de 1.9 L/min y ajustar presión de fluxómetros institucionales.'
  });

  // Regla LEED: Eficiencia energética (3% a 5%)
  reglas.push({
    id: 'regla-leed-energia',
    norma: 'LEED para Escuelas',
    criterio: 'Reducción energética vs Línea Base (3% - 5%)',
    reglaSiEntonces: 'SI reduccion_energia_vs_linea_base >= 4.0% ENTONCES leed_energia = APROBADO',
    variableAnalizada: 'reduccion_energia_vs_linea_base',
    valorActual: `${reduccionEnergiaLogradaPct}% reducción (${consumoEnergeticoKwhPorAlumno} kWh/est)`,
    rangoToleranciaLimite: `Exigencia LEED: 3% a 5% reducción (Base: ${lineaBaseEnergia} kWh)`,
    cumple: cumpleReduccionEnergia,
    estadoTolerancia: cumpleReduccionEnergia ? 'DENTRO_DE_TOLERANCIA' : 'CERCA_DEL_LIMITE',
    diagnostico: cumpleReduccionEnergia
      ? `Ahorro energético del ${reduccionEnergiaLogradaPct}% consolidado dentro del rango exigido por LEED.`
      : `Ahorro del ${reduccionEnergiaLogradaPct}% cercano al umbral preventivo.`,
    planDeAccionCorrectivo: 'Programación de apagado automático de climatización fuera de horario laboral.'
  });

  // Regla ISO 14001: Mejora continua progresiva
  reglas.push({
    id: 'regla-iso-mejora',
    norma: 'ISO 14001',
    criterio: 'Demostración de Mejora Continua mes a mes (Ciclo PHVA)',
    reglaSiEntonces: 'SI consumo_mes_actual <= consumo_mes_anterior ENTONCES mejora_continua = VERIFICADA',
    variableAnalizada: 'tendencia_consumos_mes_a_mes',
    valorActual: `Reducción acumulada: -${reduccionAguaVsAnoCero}% Agua / -${reduccionEnergiaVsAnoCero}% Energía`,
    rangoToleranciaLimite: 'Requisito ISO: Consumos en descenso progresivo sin picos >5%',
    cumple: mesAMesMejoraContinua,
    estadoTolerancia: mesAMesMejoraContinua ? 'DENTRO_DE_TOLERANCIA' : 'EXCEDIDO',
    diagnostico: mesAMesMejoraContinua
      ? 'Tendencia progresiva de mejora continua verificada conforme a ISO 14001:2015.'
      : 'Se detectaron incrementos atípicos en meses intermedios que requieren auditoría interna.',
    planDeAccionCorrectivo: 'Ejecutar revisión del ciclo PHVA y ajustar metas ambientales departamentales.'
  });

  // Regla Eco-Schools: Checklist de Acciones Concretas
  reglas.push({
    id: 'regla-ecoschools-acciones',
    norma: 'Eco-Schools',
    criterio: 'Lista de verificación de acciones escolares concretas (>= 80%)',
    reglaSiEntonces: 'SI porcentaje_checklist >= 80% Y tasa_reciclaje >= 50% ENTONCES bandera_verde = OTORGADA',
    variableAnalizada: 'checklist_acciones_concretas',
    valorActual: `${porcentajeCumplimientoEco}% (${accionesCompletadas}/${totalAcciones} acciones cumplidas)`,
    rangoToleranciaLimite: 'Requisito Eco-Schools: Mínimo 80% de checklist y >50% reciclaje',
    cumple: calificaBanderaVerde,
    estadoTolerancia: calificaBanderaVerde ? 'DENTRO_DE_TOLERANCIA' : 'CERCA_DEL_LIMITE',
    diagnostico: calificaBanderaVerde
      ? 'Cumplimiento sobresaliente del programa Eco-Schools con brigadas y protocolos activos.'
      : 'Checklist al ' + porcentajeCumplimientoEco + '%. Se requiere completar las acciones pendientes para Bandera Verde.',
    planDeAccionCorrectivo: 'Activar el protocolo de apagado nocturno con el personal administrativo y de apoyo.'
  });

  // Diagnósticos Automatizados del Sistema Experto
  const diagnosticos: DiagnosticoAutomatizado[] = [];

  if (esEscuelaVerde) {
    diagnosticos.push({
      id: 'diag-escuela-verde',
      tipo: 'SENSOR_AMBIENTAL',
      severidad: 'CUMPLIMIENTO',
      titulo: 'Dictamen Oficial: Escuela Verde Certificada',
      mensaje: `La Huella de Carbono del plantel disminuyó un ${reduccionHuellaPct}% respecto a la línea base (Meta: >=${umbralReduccionEscuelaVerdePct}%), cumpliendo a cabalidad con el estándar ${estandarActivo}.`,
      normaReferencia: estandarActivo,
      planDeAccionCorrectivo: 'Generar reporte de auditoría oficial para postulación al reconocimiento ambiental internacional.',
      fecha: 'Activa'
    });
  } else {
    diagnosticos.push({
      id: 'diag-en-transicion',
      tipo: 'SENSOR_AMBIENTAL',
      severidad: 'ALERTA',
      titulo: 'En Proceso de Transición Ecológica',
      mensaje: `La reducción de Huella de Carbono actual es de ${reduccionHuellaPct}% (Faltan ${(umbralReduccionEscuelaVerdePct - reduccionHuellaPct).toFixed(1)}% para alcanzar la acreditación de Escuela Verde).`,
      normaReferencia: estandarActivo,
      planDeAccionCorrectivo: 'Optimizar el consumo nocturno de energía y elevar la clasificación de materiales reciclables.',
      fecha: 'Activa'
    });
  }

  if (estandarActivo === 'LEED' && !cumpleTotalLeed) {
    diagnosticos.push({
      id: 'diag-leed-alerta',
      tipo: 'ENERGIA',
      severidad: 'ALERTA',
      titulo: 'Alerta de Prerrequisitos LEED:',
      mensaje: 'Verificar inventario de inodoros/lavamanos y asegurar que el área de reciclaje física esté operativa al 100%.',
      normaReferencia: 'LEED para Escuelas',
      planDeAccionCorrectivo: 'Completar los registros técnicos de artefactos en el módulo de Datos del Plantel.',
      fecha: 'Activa'
    });
  }

  const estatusLeed = esEscuelaVerde ? 'Cumplimiento Óptimo' : 'En Proceso';

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
    estadoSensor,
    estandarActivo,
    evaluacionLeed,
    evaluacionIso,
    evaluacionEcoSchools,
    huellaCarbono
  };

  return {
    indicadores,
    reglas,
    diagnosticos
  };
}
