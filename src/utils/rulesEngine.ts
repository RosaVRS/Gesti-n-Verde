import {
  LecturaAmbiental,
  ConsumoRecurso,
  RegistroResiduo,
  ReglaCheck,
  AlertaAmbiental,
  IndicadoresGlobales
} from '../types';

export const INITIAL_NODES: LecturaAmbiental[] = [
  {
    id: 'lec-001',
    nodo_id: 'SENSOR-GRAL-01',
    nombre_nodo: 'Sensor Ambiental General',
    ubicacion: 'Campus Escolar Central',
    temperatura: 22.8,
    humedad: 48.5,
    rssi: -62,
    bateria: 95,
    fecha_registro: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
    estado_alerta: 'NORMAL',
  },
  {
    id: 'lec-002',
    nodo_id: 'SENSOR-GRAL-01',
    nombre_nodo: 'Sensor Ambiental General',
    ubicacion: 'Campus Escolar Central',
    temperatura: 23.0,
    humedad: 49.2,
    rssi: -62,
    bateria: 95,
    fecha_registro: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    estado_alerta: 'NORMAL',
  },
  {
    id: 'lec-003',
    nodo_id: 'SENSOR-GRAL-01',
    nombre_nodo: 'Sensor Ambiental General',
    ubicacion: 'Campus Escolar Central',
    temperatura: 23.4,
    humedad: 50.1,
    rssi: -63,
    bateria: 95,
    fecha_registro: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
    estado_alerta: 'NORMAL',
  },
  {
    id: 'lec-004',
    nodo_id: 'SENSOR-GRAL-01',
    nombre_nodo: 'Sensor Ambiental General',
    ubicacion: 'Campus Escolar Central',
    temperatura: 23.1,
    humedad: 49.8,
    rssi: -62,
    bateria: 96,
    fecha_registro: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    estado_alerta: 'NORMAL',
  },
  {
    id: 'lec-005',
    nodo_id: 'SENSOR-GRAL-01',
    nombre_nodo: 'Sensor Ambiental General',
    ubicacion: 'Campus Escolar Central',
    temperatura: 22.7,
    humedad: 48.9,
    rssi: -61,
    bateria: 96,
    fecha_registro: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    estado_alerta: 'NORMAL',
  },
  {
    id: 'lec-006',
    nodo_id: 'SENSOR-GRAL-01',
    nombre_nodo: 'Sensor Ambiental General',
    ubicacion: 'Campus Escolar Central',
    temperatura: 22.4,
    humedad: 48.0,
    rssi: -63,
    bateria: 96,
    fecha_registro: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    estado_alerta: 'NORMAL',
  },
  {
    id: 'lec-007',
    nodo_id: 'SENSOR-GRAL-01',
    nombre_nodo: 'Sensor Ambiental General',
    ubicacion: 'Campus Escolar Central',
    temperatura: 22.1,
    humedad: 47.4,
    rssi: -62,
    bateria: 97,
    fecha_registro: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    estado_alerta: 'NORMAL',
  },
  {
    id: 'lec-008',
    nodo_id: 'SENSOR-GRAL-01',
    nombre_nodo: 'Sensor Ambiental General',
    ubicacion: 'Campus Escolar Central',
    temperatura: 21.9,
    humedad: 46.8,
    rssi: -64,
    bateria: 97,
    fecha_registro: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    estado_alerta: 'NORMAL',
  },
  {
    id: 'lec-009',
    nodo_id: 'SENSOR-GRAL-01',
    nombre_nodo: 'Sensor Ambiental General',
    ubicacion: 'Campus Escolar Central',
    temperatura: 21.6,
    humedad: 46.0,
    rssi: -63,
    bateria: 98,
    fecha_registro: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    estado_alerta: 'NORMAL',
  },
  {
    id: 'lec-010',
    nodo_id: 'SENSOR-GRAL-01',
    nombre_nodo: 'Sensor Ambiental General',
    ubicacion: 'Campus Escolar Central',
    temperatura: 21.4,
    humedad: 45.5,
    rssi: -62,
    bateria: 98,
    fecha_registro: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    estado_alerta: 'NORMAL',
  },
  {
    id: 'lec-011',
    nodo_id: 'SENSOR-GRAL-01',
    nombre_nodo: 'Sensor Ambiental General',
    ubicacion: 'Campus Escolar Central',
    temperatura: 21.2,
    humedad: 45.0,
    rssi: -61,
    bateria: 99,
    fecha_registro: new Date(Date.now() - 1000 * 60 * 100).toISOString(),
    estado_alerta: 'NORMAL',
  },
  {
    id: 'lec-012',
    nodo_id: 'SENSOR-GRAL-01',
    nombre_nodo: 'Sensor Ambiental General',
    ubicacion: 'Campus Escolar Central',
    temperatura: 21.0,
    humedad: 44.5,
    rssi: -62,
    bateria: 99,
    fecha_registro: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    estado_alerta: 'NORMAL',
  }
];

export const INITIAL_CONSUMOS: ConsumoRecurso[] = [
  {
    id: 'con-01',
    tipo_recurso: 'AGUA',
    valor: 118.5,
    unidad: 'm³',
    periodo: '2026-09',
    fecha_registro: '2026-09-20T08:30:00Z',
    registrado_por: 'Ing. Carlos Mendoza (Gestión Física)',
    costo_estimado: 474.0,
    meta_limite: 140.0
  },
  {
    id: 'con-02',
    tipo_recurso: 'LUZ',
    valor: 2650.0,
    unidad: 'kWh',
    periodo: '2026-09',
    fecha_registro: '2026-09-21T09:15:00Z',
    registrado_por: 'Ing. Carlos Mendoza (Gestión Física)',
    costo_estimado: 636.0,
    meta_limite: 3000.0
  },
  {
    id: 'con-03',
    tipo_recurso: 'AGUA',
    valor: 135.0,
    unidad: 'm³',
    periodo: '2026-08',
    fecha_registro: '2026-08-25T10:00:00Z',
    registrado_por: 'Lic. Maria Soto (Coordinación)',
    costo_estimado: 540.0,
    meta_limite: 140.0
  },
  {
    id: 'con-04',
    tipo_recurso: 'LUZ',
    valor: 2890.0,
    unidad: 'kWh',
    periodo: '2026-08',
    fecha_registro: '2026-08-25T10:30:00Z',
    registrado_por: 'Lic. Maria Soto (Coordinación)',
    costo_estimado: 693.6,
    meta_limite: 3000.0
  }
];

export const INITIAL_RESIDUOS: RegistroResiduo[] = [
  {
    id: 'res-01',
    categoria: 'ORGANICO',
    peso_kg: 380,
    periodo: '2026-09',
    destino: 'Compostaje Huerto Escolar y Biodigestor',
    fecha_registro: '2026-09-22T11:00:00Z',
    registrado_por: 'Brigada Ecológica Estudiantil'
  },
  {
    id: 'res-02',
    categoria: 'RECICLABLE',
    peso_kg: 340,
    periodo: '2026-09',
    destino: 'Asociación de Recicladores de Oficio (Certificada)',
    fecha_registro: '2026-09-22T11:30:00Z',
    registrado_por: 'Brigada Ecológica Estudiantil'
  },
  {
    id: 'res-03',
    categoria: 'NO_RECICLABLE',
    peso_kg: 190,
    periodo: '2026-09',
    destino: 'Relleno Sanitario Municipal',
    fecha_registro: '2026-09-22T12:00:00Z',
    registrado_por: 'Conserjería Institucional'
  },
  {
    id: 'res-04',
    categoria: 'PELIGROSO',
    peso_kg: 12,
    periodo: '2026-09',
    destino: 'Gestor Especializado de Residuos Hospitalarios / Químicos',
    fecha_registro: '2026-09-23T09:00:00Z',
    registrado_por: 'Prof. Química Orgánica'
  }
];

export function calcularIndicadoresYReglas(
  lecturas: LecturaAmbiental[],
  consumos: ConsumoRecurso[],
  residuos: RegistroResiduo[],
  poblacion: number = 450,
  diasHabilesMes: number = 20
): { indicadores: IndicadoresGlobales; reglas: ReglaCheck[]; alertas: AlertaAmbiental[] } {
  // Consumos del periodo actual (Septiembre 2026)
  const aguaActual = consumos.find(c => c.tipo_recurso === 'AGUA' && c.periodo === '2026-09')?.valor || 120;
  const luzActual = consumos.find(c => c.tipo_recurso === 'LUZ' && c.periodo === '2026-09')?.valor || 2600;

  // Residuos del periodo actual
  const residuosPeriodo = residuos.filter(r => r.periodo === '2026-09');
  const org = residuosPeriodo.filter(r => r.categoria === 'ORGANICO').reduce((acc, r) => acc + r.peso_kg, 0);
  const rec = residuosPeriodo.filter(r => r.categoria === 'RECICLABLE').reduce((acc, r) => acc + r.peso_kg, 0);
  const totalResiduos = residuosPeriodo.reduce((acc, r) => acc + r.peso_kg, 0);

  const desviadosAprovechables = org + rec;
  const tasaReciclaje = totalResiduos > 0 ? (desviadosAprovechables / totalResiduos) * 100 : 0;

  // Agua en litros per cápita diario
  const litrosTotales = aguaActual * 1000;
  const aguaPerCapita = poblacion > 0 ? litrosTotales / (poblacion * diasHabilesMes) : 0;

  // Telemetría general institucional
  const totalLecturas = lecturas.length;
  const sumaTemp = lecturas.reduce((acc, l) => acc + l.temperatura, 0);
  const sumaHum = lecturas.reduce((acc, l) => acc + l.humedad, 0);
  const tempPromedio = totalLecturas > 0 ? sumaTemp / totalLecturas : 22.5;
  const humPromedio = totalLecturas > 0 ? sumaHum / totalLecturas : 52.0;

  // Confort térmico institucional medido por el sensor ambiental general
  const lecturasEnConfort = lecturas.filter(l => l.temperatura >= 20.0 && l.temperatura <= 25.5 && l.humedad >= 30.0 && l.humedad <= 60.0);
  const confortPorcentaje = totalLecturas > 0 ? (lecturasEnConfort.length / totalLecturas) * 100 : 100;

  const reglas: ReglaCheck[] = [];
  const alertas: AlertaAmbiental[] = [];

  // Regla 1: Confort Térmico Interior (ASHRAE 55)
  const cumpleConfort = confortPorcentaje >= 75;
  reglas.push({
    id: 'conf-amb-01',
    norma: 'Confort Ambiental',
    criterio: 'Confort Térmico y Ambiental General',
    valorActual: `${confortPorcentaje.toFixed(1)}% de lecturas en rango óptimo`,
    valorReferencia: 'Mínimo 75% en rango (20°C - 25.5°C, 30% - 60% HR)',
    cumple: cumpleConfort,
    puntosOtorgados: cumpleConfort ? 25 : 12,
    puntosMaximos: 25,
    observacion: cumpleConfort ? 'Confort térmico adecuado medido por el sensor general' : 'Valores del sensor fuera del rango óptimo'
  });

  // Regla 2: Eficiencia Hídrica Escolar
  const cumpleAgua = aguaPerCapita <= 16.0;
  reglas.push({
    id: 'rec-agua-01',
    norma: 'ISO 14001',
    criterio: 'Eficiencia y Ahorro en el Consumo de Agua Potable',
    valorActual: `${aguaPerCapita.toFixed(1)} L / estudiante / día`,
    valorReferencia: 'Meta institucional: ≤ 16.0 L / estudiante / día',
    cumple: cumpleAgua,
    puntosOtorgados: cumpleAgua ? 25 : 10,
    puntosMaximos: 25,
    observacion: cumpleAgua ? 'Consumo controlado de griferías y servicios' : 'Consumo elevado de agua per cápita'
  });

  // Regla 3: Eficiencia Energética
  const kwhEstudianteMes = luzActual / poblacion;
  const cumpleLuz = kwhEstudianteMes <= 7.5;
  reglas.push({
    id: 'rec-luz-01',
    norma: 'ISO 14001',
    criterio: 'Uso Racional de la Energía Eléctrica',
    valorActual: `${kwhEstudianteMes.toFixed(2)} kWh / estudiante / mes`,
    valorReferencia: 'Meta institucional: ≤ 7.5 kWh / estudiante / mes',
    cumple: cumpleLuz,
    puntosOtorgados: cumpleLuz ? 20 : 10,
    puntosMaximos: 20,
    observacion: cumpleLuz ? 'Consumo eléctrico dentro de los márgenes programados' : 'Oportunidad de reducción con sensores de presencia y luminarias eficientes'
  });

  // Regla 4: ISO 14001 Tasa de Desviación de Residuos
  const cumpleIsoResiduos = tasaReciclaje >= 55.0;
  reglas.push({
    id: 'iso-res-01',
    norma: 'ISO 14001',
    criterio: 'Aprovechamiento y Valorización de Residuos Sólidos (Sección 8.1)',
    valorActual: `${tasaReciclaje.toFixed(1)}% tasa de aprovechamiento`,
    valorReferencia: 'Mínimo 50% de residuos desviados de vertedero',
    cumple: cumpleIsoResiduos,
    puntosOtorgados: cumpleIsoResiduos ? 15 : 5,
    puntosMaximos: 15,
    observacion: cumpleIsoResiduos ? 'Excelente tasa gracias a compostaje y recolección selectiva' : 'Se requiere intensificar campañas de separación en la fuente'
  });

  // Regla 5: Eco-Schools Bandera Verde
  const cumpleEcoSchools = tasaReciclaje >= 50.0 && aguaPerCapita <= 16.0;
  reglas.push({
    id: 'eco-sch-01',
    norma: 'Eco-Schools',
    criterio: 'Criterios Globales de Sostenibilidad (Bandera Verde)',
    valorActual: `Reciclaje: ${tasaReciclaje.toFixed(0)}% | Agua: ${aguaPerCapita.toFixed(1)} L`,
    valorReferencia: 'Reciclaje > 50% y Consumo Responsable de Recursos',
    cumple: cumpleEcoSchools,
    puntosOtorgados: cumpleEcoSchools ? 15 : 5,
    puntosMaximos: 15,
    observacion: cumpleEcoSchools ? 'Cumple con los estándares ambientales para Bandera Verde' : 'Pendiente intensificar metas de reducción de huella ecológica'
  });

  // Alertas automáticas emitidas a partir de las lecturas del sensor general
  const ultimaLectura = lecturas[0];
  if (ultimaLectura) {
    if (ultimaLectura.temperatura > 26.0) {
      alertas.push({
        id: `alt-${ultimaLectura.id}-temp`,
        tipo: 'TEMPERATURA',
        severidad: ultimaLectura.temperatura > 28.5 ? 'CRITICA' : 'MEDIA',
        titulo: 'Temperatura Alta en Sensor General',
        mensaje: `La temperatura captada por el sensor general es de ${ultimaLectura.temperatura}°C (supera el óptimo de 25.5°C).`,
        normaAfectada: 'Confort Ambiental Interior',
        recomendacion: 'Verificar ventilación para restablecer condiciones óptimas en el campus.',
        fecha: ultimaLectura.fecha_registro,
        resuelta: false
      });
    }
    if (ultimaLectura.humedad > 65.0) {
      alertas.push({
        id: `alt-${ultimaLectura.id}-hum`,
        tipo: 'HUMEDAD',
        severidad: 'MEDIA',
        titulo: 'Humedad Elevada en Sensor General',
        mensaje: `La humedad captada por el sensor general es del ${ultimaLectura.humedad}% (límite sugerido 60%).`,
        normaAfectada: 'ISO 14001:2015',
        recomendacion: 'Verificar circulación de aire para evitar condensación.',
        fecha: ultimaLectura.fecha_registro,
        resuelta: false
      });
    }
  }

  if (aguaPerCapita > 16.0) {
    alertas.push({
      id: 'alt-agua-01',
      tipo: 'CONSUMO_AGUA',
      severidad: 'CRITICA',
      titulo: 'Consumo hídrico sobre la meta institucional',
      mensaje: `Consumo de ${aguaPerCapita.toFixed(1)} L/alumno/día sobrepasa el límite de 16.0 L.`,
      normaAfectada: 'ISO 14001:2015',
      recomendacion: 'Inspeccionar válvulas de descarga en sanitarios y grifos para descartar fugas.',
      fecha: new Date().toISOString(),
      resuelta: false
    });
  }

  // Porcentaje ISO 14001
  const isoCumplimiento = Math.min(100, Math.round((tasaReciclaje * 0.5) + (cumpleAgua ? 30 : 15) + (cumpleConfort ? 20 : 10)));

  const indicadores: IndicadoresGlobales = {
    poblacionEstudiantil: poblacion,
    superficieM2: 3200,
    temperaturaPromedio: Math.round(tempPromedio * 10) / 10,
    humedadPromedio: Math.round(humPromedio * 10) / 10,
    indiceConfortGeneral: Math.round(confortPorcentaje),
    iso14001Cumplimiento: isoCumplimiento,
    ecoSchoolsBanderaVerde: cumpleEcoSchools,
    tasaReciclaje: Math.round(tasaReciclaje * 10) / 10,
    consumoAguaPerCapitaDia: Math.round(aguaPerCapita * 10) / 10,
    consumoElectricoMensual: luzActual
  };

  return { indicadores, reglas, alertas };
}
