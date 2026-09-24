import React from 'react';
import { Leaf, Award, ShieldCheck, RefreshCw, CheckCircle2, Activity, Droplets, Thermometer } from 'lucide-react';
import { IndicadoresGlobales } from '../types';

interface HeaderProps {
  activeTab: 'telemetria' | 'consumos' | 'normativas';
  setActiveTab: (tab: 'telemetria' | 'consumos' | 'normativas') => void;
  indicadores: IndicadoresGlobales;
  isSimulating: boolean;
  setIsSimulating: (val: boolean | ((prev: boolean) => boolean)) => void;
  onRefreshTelemetry: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  indicadores,
  isSimulating,
  setIsSimulating,
  onRefreshTelemetry,
}) => {
  return (
    <header className="border-b border-emerald-900/40 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      {/* Top Banner: Status & Global Indicators */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/60 text-xs">
        <div className="flex items-center gap-3 text-slate-300">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Sistema de Gestión Ambiental Escolar
          </div>
          <span className="text-slate-600">|</span>
          <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Telemetría de Sensores en Vivo</span>
          </div>
          <span className="hidden sm:inline text-slate-600">|</span>
          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <Thermometer className="w-3.5 h-3.5 text-rose-400" />
            <span>Promedio: {indicadores.temperaturaPromedio}°C</span>
          </div>
        </div>

        {/* Global Compliance Indicators */}
        <div className="flex items-center gap-2">
          {/* Confort Térmico General Badge */}
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
            <span className="font-semibold">Confort:</span>
            <span>{indicadores.indiceConfortGeneral}%</span>
          </div>

          {/* ISO 14001 Badge */}
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-teal-500/10 text-teal-300 border border-teal-500/20 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-semibold">ISO 14001:</span>
            <span>{indicadores.iso14001Cumplimiento}%</span>
          </div>

          {/* Eco-Schools Bandera Verde */}
          {indicadores.ecoSchoolsBanderaVerde ? (
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium">Bandera Verde</span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
              <span>Bandera Verde: En Trámite</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-950/50 ring-2 ring-emerald-400/30">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Gestión Verde
                <span className="text-xs font-normal px-2 py-0.5 rounded-md bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                  Gestión Ambiental Educativa
                </span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Monitoreo ambiental, control de consumo de recursos y auditoría de sostenibilidad
            </p>
          </div>
        </div>

        {/* Live Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setIsSimulating(prev => !prev)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-2 ${
              isSimulating
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30 ring-1 ring-emerald-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title="Activar o pausar actualización de telemetría"
          >
            <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`}></span>
            {isSimulating ? 'Telemetría Activa' : 'Pausado'}
          </button>

          <button
            onClick={onRefreshTelemetry}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg border border-slate-700 text-xs flex items-center justify-center transition"
            title="Actualizar mediciones de telemetría"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto scrollbar-none gap-2">
        <button
          onClick={() => setActiveTab('telemetria')}
          className={`pb-3 px-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'telemetria'
              ? 'border-emerald-400 text-emerald-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4 text-cyan-400" />
          Telemetría Ambiental (Sensores)
        </button>

        <button
          onClick={() => setActiveTab('consumos')}
          className={`pb-3 px-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'consumos'
              ? 'border-emerald-400 text-emerald-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Droplets className="w-4 h-4 text-amber-400" />
          Consumos de Recursos & Residuos
        </button>

        <button
          onClick={() => setActiveTab('normativas')}
          className={`pb-3 px-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'normativas'
              ? 'border-emerald-400 text-emerald-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4 text-teal-400" />
          Evaluación & Sostenibilidad (ISO 14001)
        </button>
      </div>
    </header>
  );
};
