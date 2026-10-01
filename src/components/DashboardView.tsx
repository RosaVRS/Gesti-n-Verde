import React, { useState } from 'react';
import {
  Droplet,
  Zap,
  Recycle,
  Trees,
  Brain,
  AlertTriangle,
  CheckCircle2,
  FileDown,
  Thermometer,
  Droplets
} from 'lucide-react';
import { IndicadoresGestionVerde, HistoricoMes, DiagnosticoAutomatizado } from '../types';

interface DashboardViewProps {
  indicadores: IndicadoresGestionVerde;
  historico: HistoricoMes[];
  diagnosticos: DiagnosticoAutomatizado[];
  onOpenPdfReport: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  indicadores,
  historico,
  diagnosticos,
  onOpenPdfReport,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // SVG Chart Dimensions & Calculations
  const chartWidth = 620;
  const chartHeight = 240;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 35;

  const yMax = 1600;
  const ySteps = [1600, 1400, 1200, 1000, 800, 600, 400, 200, 0];

  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;

  const getX = (index: number) => {
    return paddingLeft + (index / (historico.length - 1)) * plotWidth;
  };

  const getY = (value: number) => {
    return paddingTop + plotHeight - (value / yMax) * plotHeight;
  };

  // Generate SVG path for Water (Agua - L/estudiante)
  const aguaPoints = historico.map((h, i) => `${getX(i)},${getY(h.aguaLPorAlumno)}`);
  const aguaLinePath = `M ${aguaPoints.join(' L ')}`;
  const aguaAreaPath = `${aguaLinePath} L ${getX(historico.length - 1)},${getY(0)} L ${getX(0)},${getY(0)} Z`;

  // Generate SVG path for Energy (Energía - kWh/estudiante)
  const energiaPoints = historico.map((h, i) => `${getX(i)},${getY(h.energiaKwhPorAlumno)}`);
  const energiaLinePath = `M ${energiaPoints.join(' L ')}`;

  return (
    <div className="space-y-6">
      {/* Header Section: Clean title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
          Panel de Control
        </h1>
      </div>

      {/* Top 6 KPI Cards: Recurso Hídrico, Eficiencia Energética, Tasa de Reciclaje, Superficie Vegetal, Temperatura, Humedad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Card 1: RECURSO HÍDRICO */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              RECURSO HÍDRICO
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
              <Droplet className="w-4 h-4 fill-blue-500" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline">
            <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
              {indicadores.consumoHidricoLPorAlumno.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-slate-400 ml-1.5">
              L/est
            </span>
          </div>
          <div className="mt-3 flex items-center text-xs font-medium text-emerald-600">
            <span>↓ {indicadores.tendenciaHidricaPct}% vs mes anterior</span>
          </div>
        </div>

        {/* Card 2: EFICIENCIA ENERGÉTICA */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              EFICIENCIA ENERGÉTICA
            </span>
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
              <Zap className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline">
            <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
              {indicadores.consumoEnergeticoKwhPorAlumno.toFixed(1)}
            </span>
            <span className="text-xs font-semibold text-slate-400 ml-1.5">
              kWh/est
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-amber-600">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>Cerca del límite ({indicadores.limiteLeedKwh.toFixed(0)} kWh)</span>
          </div>
        </div>

        {/* Card 3: TASA DE RECICLAJE */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              TASA DE RECICLAJE
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
              <Recycle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline">
            <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
              {indicadores.tasaReciclajeDesechosPct}%
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Meta alcanzada (&gt;50%)</span>
          </div>
        </div>

        {/* Card 4: SUPERFICIE VEGETAL */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              SUPERFICIE VEGETAL
            </span>
            <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
              <Trees className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline">
            <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
              {indicadores.porcentajeAreasVerdesPermeables}%
            </span>
          </div>
          <div className="mt-3 flex items-center text-xs font-medium text-slate-500">
            <span>Área permeable disponible</span>
          </div>
        </div>

        {/* Card 5: TEMPERATURA (Nueva Tarjeta Solicitada) */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              TEMPERATURA
            </span>
            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
              <Thermometer className="w-4 h-4 text-rose-500" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline">
            <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
              {indicadores.temperaturaSensorC.toFixed(1)}
            </span>
            <span className="text-xs font-semibold text-rose-600 ml-1.5 font-mono">
              °C
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Sensor ambiental activo</span>
          </div>
        </div>

        {/* Card 6: HUMEDAD (Nueva Tarjeta Solicitada) */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              HUMEDAD
            </span>
            <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 shrink-0">
              <Droplets className="w-4 h-4 text-sky-500" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline">
            <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
              {indicadores.humedadSensorPct.toFixed(1)}
            </span>
            <span className="text-xs font-semibold text-sky-600 ml-1.5 font-mono">
              %
            </span>
          </div>
          <div className="mt-3 flex items-center text-xs font-medium text-slate-500">
            <span>Rango óptimo (30% - 60%)</span>
          </div>
        </div>
      </div>

      {/* Middle & Bottom Grid (Chart + Diagnóstico del Sistema Experto en el Dashboard) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Histórico de Consumo (Agua vs Energía) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 shadow-xs border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 font-sans">
                Histórico de Consumo (Agua vs Energía)
              </h2>
            </div>

            {/* Responsive Chart Container */}
            <div className="mt-4 relative w-full overflow-x-auto">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-auto min-w-[500px] select-none"
              >
                {/* Horizontal Grid Lines & Y Axis Labels */}
                {ySteps.map((val) => {
                  const y = getY(val);
                  return (
                    <g key={val}>
                      <line
                        x1={paddingLeft}
                        y1={y}
                        x2={chartWidth - paddingRight}
                        y2={y}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                      <text
                        x={paddingLeft - 8}
                        y={y + 4}
                        textAnchor="end"
                        fontSize="10"
                        fill="#94a3b8"
                        fontFamily="sans-serif"
                      >
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* X Axis Labels */}
                {historico.map((h, i) => {
                  const x = getX(i);
                  return (
                    <text
                      key={h.mes}
                      x={x}
                      y={chartHeight - 10}
                      textAnchor="middle"
                      fontSize="11"
                      fill="#64748b"
                      fontFamily="sans-serif"
                    >
                      {h.mes}
                    </text>
                  );
                })}

                {/* Area Gradient Definition */}
                <defs>
                  <linearGradient id="blueAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01" />
                  </linearGradient>
                </defs>

                {/* Water (Agua) Area Fill */}
                <path d={aguaAreaPath} fill="url(#blueAreaGrad)" />

                {/* Water (Agua) Line */}
                <path
                  d={aguaLinePath}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Energy (Energía) Line */}
                <path
                  d={energiaLinePath}
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points - Water (Blue dots) */}
                {historico.map((h, i) => (
                  <circle
                    key={`agua-${i}`}
                    cx={getX(i)}
                    cy={getY(h.aguaLPorAlumno)}
                    r={hoveredPoint === i ? 5 : 3.5}
                    fill="#3b82f6"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                ))}

                {/* Data Points - Energy (Orange dots) */}
                {historico.map((h, i) => (
                  <circle
                    key={`energia-${i}`}
                    cx={getX(i)}
                    cy={getY(h.energiaKwhPorAlumno)}
                    r={hoveredPoint === i ? 5 : 3.5}
                    fill="#ea580c"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                ))}

                {/* Hover Guideline */}
                {hoveredPoint !== null && (
                  <line
                    x1={getX(hoveredPoint)}
                    y1={paddingTop}
                    x2={getX(hoveredPoint)}
                    y2={paddingTop + plotHeight}
                    stroke="#94a3b8"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                )}
              </svg>

              {/* Tooltip Card Floating */}
              {hoveredPoint !== null && (
                <div
                  className="absolute bg-slate-900 text-white text-[11px] p-2.5 rounded-lg shadow-lg pointer-events-none transition-all duration-100 z-10 space-y-1"
                  style={{
                    left: `${Math.min(Math.max(15, (getX(hoveredPoint) / chartWidth) * 100), 75)}%`,
                    top: '20px'
                  }}
                >
                  <p className="font-bold text-slate-200 border-b border-slate-700 pb-1">
                    {historico[hoveredPoint].nombreMes}
                  </p>
                  <p className="text-blue-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    Agua: {historico[hoveredPoint].aguaLPorAlumno} L/est
                  </p>
                  <p className="text-amber-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    Energía: {historico[hoveredPoint].energiaKwhPorAlumno} kWh/est
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Chart Legend */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-6 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-6 h-3 border-2 border-blue-500 bg-blue-500/10 rounded-xs"></span>
              <span>Agua (L/estudiante)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-3 border-2 border-amber-600 bg-amber-600/10 rounded-xs"></span>
              <span>Energía (kWh/estudiante)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Diagnóstico del Sistema Experto */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-xs border border-slate-100 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  Diagnóstico del Sistema Experto
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Evaluación basada en reglas lógicas condicionales (ISO 14001 / LEED):
              </p>
            </div>

            {/* Diagnostic Alert 1: Amber warning */}
            <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-xl p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Alerta Energética:</span>
              </div>
              <p className="text-xs text-amber-900/85 leading-relaxed">
                Se detectó un incremento del 8% en el consumo nocturno. Revisar sistemas de climatización fuera de horario laboral.
              </p>
            </div>

            {/* Diagnostic Alert 2: Green compliance */}
            <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Cumplimiento Hídrico:</span>
              </div>
              <p className="text-xs text-emerald-900/85 leading-relaxed">
                El consumo hídrico por estudiante se mantiene dentro de los límites óptimos del estándar LEED.
              </p>
            </div>
          </div>

          {/* Action Button: Generar Reporte PDF */}
          <div className="mt-6 pt-2">
            <button
              onClick={onOpenPdfReport}
              className="w-full py-3 px-4 rounded-xl bg-[#016542] hover:bg-[#014e33] text-white font-semibold text-sm transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <FileDown className="w-4 h-4" />
              Generar Reporte PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
