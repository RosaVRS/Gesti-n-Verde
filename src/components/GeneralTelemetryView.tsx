import React, { useState, useMemo } from 'react';
import {
  Thermometer,
  Droplets,
  Activity,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  ShieldCheck,
  Search,
  Download,
  Radio,
  ArrowUpDown,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Clock,
  Check
} from 'lucide-react';
import { LecturaAmbiental } from '../types';

interface GeneralTelemetryViewProps {
  lecturas: LecturaAmbiental[];
  onAddManualReading: (nodo_id: string, temp: number, hum: number, ubicacion?: string) => void;
  isSimulating: boolean;
  setIsSimulating: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const GeneralTelemetryView: React.FC<GeneralTelemetryViewProps> = ({
  lecturas,
  onAddManualReading,
  isSimulating,
  setIsSimulating,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'COMFORT' | 'ALERT'>('ALL');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'temp_desc' | 'temp_asc'>('recent');
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showCaptureModal, setShowCaptureModal] = useState(false);

  // Formulario para probar lectura del sensor general
  const [formTemp, setFormTemp] = useState('23.0');
  const [formHum, setFormHum] = useState('49.5');

  // Última lectura en vivo captada por el sensor general
  const ultimaLectura = lecturas[0] || {
    temperatura: 22.8,
    humedad: 48.5,
    fecha_registro: new Date().toISOString()
  };

  // Estadísticas globales del sensor general
  const total = lecturas.length;
  const tempPromedio = total > 0 ? lecturas.reduce((acc, l) => acc + l.temperatura, 0) / total : 22.5;
  const humPromedio = total > 0 ? lecturas.reduce((acc, l) => acc + l.humedad, 0) / total : 52.0;

  // Criterio de confort térmico institucional (20°C a 25.5°C y 30% a 60% HR)
  const lecturasConfort = useMemo(() => {
    return lecturas.filter(
      l => l.temperatura >= 20.0 && l.temperatura <= 25.5 && l.humedad >= 30.0 && l.humedad <= 60.0
    );
  }, [lecturas]);

  const indiceConfortGlobal = total > 0 ? Math.round((lecturasConfort.length / total) * 100) : 100;
  const tempMin = total > 0 ? Math.min(...lecturas.map(l => l.temperatura)) : 20.0;
  const tempMax = total > 0 ? Math.max(...lecturas.map(l => l.temperatura)) : 26.0;

  // Filtrado y ordenación acomodada del historial
  const lecturasFiltradas = useMemo(() => {
    let result = lecturas.filter(item => {
      const query = searchTerm.toLowerCase();
      const matchSearch =
        item.temperatura.toString().includes(query) ||
        item.humedad.toString().includes(query) ||
        new Date(item.fecha_registro).toLocaleString().toLowerCase().includes(query);

      const isComfort =
        item.temperatura >= 20.0 &&
        item.temperatura <= 25.5 &&
        item.humedad >= 30.0 &&
        item.humedad <= 60.0;

      let matchFilter = true;
      if (filterStatus === 'COMFORT') matchFilter = isComfort;
      if (filterStatus === 'ALERT') matchFilter = !isComfort;

      return matchSearch && matchFilter;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.fecha_registro).getTime() - new Date(a.fecha_registro).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.fecha_registro).getTime() - new Date(b.fecha_registro).getTime();
      }
      if (sortBy === 'temp_desc') {
        return b.temperatura - a.temperatura;
      }
      if (sortBy === 'temp_asc') {
        return a.temperatura - b.temperatura;
      }
      return 0;
    });

    return result;
  }, [lecturas, searchTerm, filterStatus, sortBy]);

  // Paginación acomodada
  const totalPages = Math.max(1, Math.ceil(lecturasFiltradas.length / pageSize));
  const currentPageClamped = Math.min(currentPage, totalPages);
  const startIndex = (currentPageClamped - 1) * pageSize;
  const paginatedLecturas = lecturasFiltradas.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSimularCapturaSensor = (e: React.FormEvent) => {
    e.preventDefault();
    const tempNum = parseFloat(formTemp);
    const humNum = parseFloat(formHum);
    if (!isNaN(tempNum) && !isNaN(humNum)) {
      onAddManualReading('SENSOR-GRAL-01', tempNum, humNum, 'Campus Escolar Central');
      setShowCaptureModal(false);
    }
  };

  const handleExportCSV = () => {
    const headers = 'Numero_Registro,Sensor,Ubicacion,Temperatura_C,Humedad_Porcentaje,Diagnostico_Confort,Fecha_Hora\n';
    const rows = lecturasFiltradas
      .map((l, idx) => {
        const isComfort =
          l.temperatura >= 20.0 && l.temperatura <= 25.5 && l.humedad >= 30.0 && l.humedad <= 60.0;
        const estado = isComfort ? 'Confort Óptimo' : l.temperatura > 25.5 ? 'Temperatura Alta' : 'Fuera de Rango';
        return `${idx + 1},"Sensor Ambiental General","Campus Escolar Central",${l.temperatura},${l.humedad},"${estado}","${l.fecha_registro}"`;
      })
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `telemetria_sensor_general_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isCurrentComfort =
    ultimaLectura.temperatura >= 20.0 &&
    ultimaLectura.temperatura <= 25.5 &&
    ultimaLectura.humedad >= 30.0 &&
    ultimaLectura.humedad <= 60.0;

  return (
    <div className="space-y-6">
      {/* Banner Principal del Sensor General */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                Sensor General en Vivo
              </span>
              <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 text-xs font-medium border border-teal-500/20">
                Dispositivo de Medición Único
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Telemetría Ambiental General
            </h2>
            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              Monitoreo centralizado del campus escolar con valores de temperatura y humedad <span className="text-emerald-400 font-semibold">obtenidos directamente por el sensor ambiental general</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setShowCaptureModal(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 transition active:scale-95"
              title="Registrar o probar lectura transmitida por el sensor general"
            >
              <Cpu className="w-4 h-4" />
              Probar Envío de Sensor
            </button>
            <button
              onClick={() => setIsSimulating(prev => !prev)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center gap-2 transition ${
                isSimulating
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              {isSimulating ? 'Medición en Vivo Activa' : 'Medición Pausada'}
            </button>
          </div>
        </div>
      </div>

      {/* Tarjeta Destacada: Estado en Vivo del Sensor Ambiental General */}
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Identificación del Sensor */}
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-950/50 shrink-0">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base sm:text-lg">Sensor Ambiental General</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono text-[11px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  SENSOR-GRAL-01
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Campus Escolar Central</span>
                <span>•</span>
                <span>Actualización periódica continua</span>
              </p>
            </div>
          </div>

          {/* Mediciones actuales en vivo */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Temperatura Captada</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-extrabold font-mono text-rose-300">
                  {ultimaLectura.temperatura.toFixed(1)}
                </span>
                <span className="text-xs text-rose-400 font-semibold">°C</span>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Humedad Captada</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-extrabold font-mono text-cyan-300">
                  {ultimaLectura.humedad.toFixed(1)}
                </span>
                <span className="text-xs text-cyan-400 font-semibold">%</span>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Diagnóstico de Confort</span>
              <div className="flex items-center gap-1.5 mt-1">
                {isCurrentComfort ? (
                  <span className="text-emerald-300 text-xs font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Óptimo (20°C - 25.5°C)
                  </span>
                ) : (
                  <span className="text-amber-300 text-xs font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    Fuera de Rango
                  </span>
                )}
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 font-mono text-xs text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Sensor en Línea</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjetas de Métricas Generales Directas del Sensor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Temperatura Promedio */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <Thermometer className="w-4 h-4" />
              Temperatura Promedio
            </span>
            <span className="text-[10px] text-slate-400 font-mono bg-slate-800 px-1.5 py-0.5 rounded">Sensor</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
              {tempPromedio.toFixed(1)}
            </span>
            <span className="text-base font-semibold text-rose-400">°C</span>
          </div>
          <div className="mt-3 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-2.5">
            <span>Rango registrado:</span>
            <span className="font-mono text-slate-200 font-medium">
              {tempMin.toFixed(1)}°C — {tempMax.toFixed(1)}°C
            </span>
          </div>
        </div>

        {/* Humedad Promedio */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Droplets className="w-4 h-4" />
              Humedad Promedio
            </span>
            <span className="text-[10px] text-slate-400 font-mono bg-slate-800 px-1.5 py-0.5 rounded">Sensor</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
              {humPromedio.toFixed(1)}
            </span>
            <span className="text-base font-semibold text-cyan-400">%</span>
          </div>
          <div className="mt-3 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-2.5">
            <span>Rango ideal recomendado:</span>
            <span className="font-mono text-emerald-400 font-semibold">30% — 60%</span>
          </div>
        </div>

        {/* Confort Ambiental Global */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Confort Térmico Global
            </span>
            <span className="text-[10px] text-slate-400 font-mono bg-slate-800 px-1.5 py-0.5 rounded">Campus</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
              {indiceConfortGlobal}
            </span>
            <span className="text-base font-semibold text-emerald-400">%</span>
          </div>
          <div className="mt-3 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-2.5">
            <span>Condición ambiental:</span>
            <span className="font-semibold text-emerald-300">
              {indiceConfortGlobal >= 75 ? 'Ambiente Agradable' : 'Requiere Ventilación'}
            </span>
          </div>
        </div>

        {/* Total de Mediciones */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <Radio className="w-4 h-4" />
              Sensor General
            </span>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded">Activo</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
              {total}
            </span>
            <span className="text-base font-semibold text-teal-400">Lecturas</span>
          </div>
          <div className="mt-3 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-2.5">
            <span>Última lectura:</span>
            <span className="font-mono text-emerald-400 font-semibold">
              {new Date(ultimaLectura.fecha_registro).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>

      {/* Registro Histórico de Telemetría Ambiental Acomodado */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-0">
        {/* Cabecera del Registro Histórico */}
        <div className="bg-slate-850/90 p-5 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Registro Histórico de Telemetría Ambiental
              </h3>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
                Valores Obtenidos por el Sensor
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                {lecturasFiltradas.length} mediciones registradas
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Historial cronológico de mediciones captadas por el sensor ambiental general del campus escolar.
            </p>
          </div>

          {/* Botones de acción rápida */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition active:scale-95"
              title="Descargar historial de telemetría del sensor en formato CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Barra de Filtros, Búsqueda y Ordenamiento Acomodada */}
        <div className="bg-slate-950/70 p-4 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          {/* Buscador */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Buscar por temperatura, humedad o fecha..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Ordenamiento */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="recent">Más recientes primero</option>
                <option value="oldest">Más antiguos primero</option>
                <option value="temp_desc">Mayor Temperatura</option>
                <option value="temp_asc">Menor Temperatura</option>
              </select>
            </div>

            {/* Filtros de estado de confort */}
            <div className="flex rounded-lg bg-slate-900 p-1 border border-slate-800 text-xs">
              <button
                onClick={() => {
                  setFilterStatus('ALL');
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md transition ${
                  filterStatus === 'ALL'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Todas las Mediciones
              </button>
              <button
                onClick={() => {
                  setFilterStatus('COMFORT');
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md transition flex items-center gap-1 ${
                  filterStatus === 'COMFORT'
                    ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Confort Óptimo
              </button>
              <button
                onClick={() => {
                  setFilterStatus('ALERT');
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md transition flex items-center gap-1 ${
                  filterStatus === 'ALERT'
                    ? 'bg-amber-500/20 text-amber-300 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Fuera de Rango
              </button>
            </div>

            {/* Selector de cantidad por página */}
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <span>Filas:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabla Acomodada y Prolija */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800 tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold w-16">#</th>
                <th className="py-3.5 px-4 font-semibold">Sensor Emisor</th>
                <th className="py-3.5 px-4 font-semibold">Temperatura Captada</th>
                <th className="py-3.5 px-4 font-semibold">Humedad Captada</th>
                <th className="py-3.5 px-4 font-semibold">Diagnóstico de Confort</th>
                <th className="py-3.5 px-4 font-semibold">Estado de Medición</th>
                <th className="py-3.5 px-4 text-right font-semibold">Fecha y Hora de Medición</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-sans text-slate-300">
              {paginatedLecturas.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-slate-500">
                    <Activity className="w-9 h-9 text-slate-600 mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-medium text-slate-400">No se encontraron lecturas del sensor con los filtros seleccionados.</p>
                  </td>
                </tr>
              ) : (
                paginatedLecturas.map((item, index) => {
                  const isComfort =
                    item.temperatura >= 20.0 &&
                    item.temperatura <= 25.5 &&
                    item.humedad >= 30.0 &&
                    item.humedad <= 60.0;
                  const isHot = item.temperatura > 25.5;
                  const isCold = item.temperatura < 20.0;
                  const isHumid = item.humedad > 60.0;
                  const registroNumero = lecturasFiltradas.length - (startIndex + index);

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-850/70 transition group"
                    >
                      {/* Número de lectura */}
                      <td className="py-3.5 px-4 font-mono text-slate-500">
                        #{registroNumero.toString().padStart(3, '0')}
                      </td>

                      {/* Sensor */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-sm shadow-emerald-400"></span>
                          <div>
                            <span className="font-mono font-bold text-white group-hover:text-emerald-300 transition text-xs">
                              Sensor Ambiental General
                            </span>
                            <span className="text-[10px] text-slate-500 block font-mono">
                              Campus Escolar Central (SENSOR-GRAL-01)
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Temperatura Medida */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-sm font-bold px-2 py-0.5 rounded ${
                              isComfort
                                ? 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/20'
                                : isHot
                                ? 'text-amber-300 bg-amber-500/15 border border-amber-500/20'
                                : 'text-blue-300 bg-blue-500/15 border border-blue-500/20'
                            }`}
                          >
                            {item.temperatura.toFixed(1)} °C
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {isComfort ? 'Óptima' : isHot ? 'Alta' : 'Baja'}
                          </span>
                        </div>
                      </td>

                      {/* Humedad Medida */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-sm font-bold px-2 py-0.5 rounded ${
                              item.humedad >= 30 && item.humedad <= 60
                                ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/20'
                                : 'text-amber-300 bg-amber-500/15 border border-amber-500/20'
                            }`}
                          >
                            {item.humedad.toFixed(1)} %
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {item.humedad >= 30 && item.humedad <= 60 ? 'Ideal' : isHumid ? 'Elevada' : 'Seca'}
                          </span>
                        </div>
                      </td>

                      {/* Diagnóstico de Confort */}
                      <td className="py-3.5 px-4">
                        {isComfort ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-[11px] font-medium border border-emerald-500/30">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            Confort Óptimo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 text-[11px] font-medium border border-amber-500/30">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                            {isHot ? 'Sobrecalentamiento' : isCold ? 'Baja Temperatura' : 'Humedad Fuera de Rango'}
                          </span>
                        )}
                      </td>

                      {/* Estado de Medición */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950 text-slate-300 text-[11px] font-mono border border-slate-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          Automática en Vivo
                        </span>
                      </td>

                      {/* Fecha y Hora de Captura */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="text-slate-200 font-mono text-xs font-medium">
                          {new Date(item.fecha_registro).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {new Date(item.fecha_registro).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación Acomodada y Pie de Tabla */}
        <div className="bg-slate-950/90 px-5 py-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>
              Mostrando <strong className="text-white">{lecturasFiltradas.length > 0 ? startIndex + 1 : 0}</strong> a{' '}
              <strong className="text-white">{Math.min(startIndex + pageSize, lecturasFiltradas.length)}</strong> de{' '}
              <strong className="text-white">{lecturasFiltradas.length}</strong> mediciones del sensor general
            </span>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(currentPageClamped - 1)}
                disabled={currentPageClamped <= 1}
                className="px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 text-xs"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Anterior
              </button>

              <div className="flex items-center gap-1 px-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPageClamped) <= 1)
                  .map((page, idx, arr) => {
                    const prev = arr[idx - 1];
                    return (
                      <React.Fragment key={page}>
                        {prev && page - prev > 1 && <span className="px-1 text-slate-600">...</span>}
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`w-7 h-7 rounded-lg text-xs font-mono font-medium transition ${
                            currentPageClamped === page
                              ? 'bg-emerald-600 text-white font-bold'
                              : 'bg-slate-900 border border-slate-700/80 text-slate-400 hover:text-white hover:bg-slate-800'
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  })}
              </div>

              <button
                onClick={() => handlePageChange(currentPageClamped + 1)}
                disabled={currentPageClamped >= totalPages}
                className="px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 text-xs"
              >
                Siguiente
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Nota Informativa del Sensor General */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3 text-xs text-slate-400">
        <Radio className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
        <p>
          <strong className="text-slate-200">Dispositivo Único:</strong> Todas las mediciones del historial son captadas directamente por el sensor ambiental general institucional (temperatura y humedad relativa en tiempo real).
        </p>
      </div>

      {/* Modal para probar o inyectar lectura del sensor general */}
      {showCaptureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  Probar Envío del Sensor General
                </h3>
              </div>
              <button
                onClick={() => setShowCaptureModal(false)}
                className="text-slate-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Inyecta una lectura manual enviada por el sensor ambiental general para verificar su incorporación inmediata al historial.
            </p>

            <form onSubmit={handleSimularCapturaSensor} className="space-y-4 text-xs">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white block">Sensor Ambiental General</span>
                  <span className="font-mono text-[11px] text-slate-400">ID: SENSOR-GRAL-01</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">En Línea</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Temperatura del Sensor (°C)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="10"
                    max="50"
                    value={formTemp}
                    onChange={(e) => setFormTemp(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                    required
                  />
                  <span className="text-[10px] text-slate-500">Óptimo: 20°C - 25.5°C</span>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Humedad del Sensor (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={formHum}
                    onChange={(e) => setFormHum(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                    required
                  />
                  <span className="text-[10px] text-slate-500">Ideal: 30% - 60%</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCaptureModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-md transition"
                >
                  Registrar Lectura
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
