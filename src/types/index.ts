export type TipoRecurso = 'AGUA' | 'LUZ';
export type CategoriaResiduo = 'ORGANICO' | 'RECICLABLE' | 'NO_RECICLABLE' | 'PELIGROSO';

export interface LecturaAmbiental {
  id: string;
  nodo_id: string;
  nombre_nodo: string;
  ubicacion: string;
  temperatura: number; // °C
  humedad: number;    // %
  rssi?: number;       // dBm (WiFi signal)
  bateria?: number;    // %
  fecha_registro: string;
  estado_alerta?: 'NORMAL' | 'PRECAUCION' | 'CRITICO';
}

export interface ConsumoRecurso {
  id: string;
  tipo_recurso: TipoRecurso;
  valor: number; // m3 para agua, kWh para luz
  unidad: string;
  periodo: string; // ej. "2026-09"
  fecha_registro: string;
  registrado_por: string;
  costo_estimado?: number;
  meta_limite?: number;
}

export interface RegistroResiduo {
  id: string;
  categoria: CategoriaResiduo;
  peso_kg: number;
  periodo: string;
  destino: string;
  fecha_registro: string;
  registrado_por: string;
}

export interface ReglaCheck {
  id: string;
  norma: 'ISO 14001' | 'Eco-Schools' | 'Confort Ambiental';
  criterio: string;
  valorActual: string | number;
  valorReferencia: string;
  cumple: boolean;
  puntosOtorgados?: number;
  puntosMaximos?: number;
  observacion: string;
}

export interface AlertaAmbiental {
  id: string;
  tipo: 'TEMPERATURA' | 'HUMEDAD' | 'CONSUMO_AGUA' | 'CONSUMO_LUZ' | 'RESIDUOS';
  severidad: 'BAJA' | 'MEDIA' | 'CRITICA';
  titulo: string;
  mensaje: string;
  normaAfectada: string;
  recomendacion: string;
  fecha: string;
  resuelta: boolean;
}

export interface IndicadoresGlobales {
  poblacionEstudiantil: number;
  superficieM2: number;
  temperaturaPromedio: number;
  humedadPromedio: number;
  indiceConfortGeneral: number; // %
  iso14001Cumplimiento: number; // %
  ecoSchoolsBanderaVerde: boolean;
  tasaReciclaje: number; // %
  consumoAguaPerCapitaDia: number; // Litros / estudiante / día
  consumoElectricoMensual: number; // kWh
}
