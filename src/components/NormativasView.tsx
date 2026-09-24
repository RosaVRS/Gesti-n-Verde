import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileCheck,
  Printer,
  Sparkles,
  TrendingUp,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { IndicadoresGlobales, ReglaCheck, AlertaAmbiental } from '../types';

interface NormativasViewProps {
  indicadores: IndicadoresGlobales;
  reglas: ReglaCheck[];
  alertas: AlertaAmbiental[];
}

export const NormativasView: React.FC<NormativasViewProps> = ({
  indicadores,
  reglas,
  alertas,
}) => {
  const [selectedStandard, setSelectedStandard] = useState<'ALL' | 'ISO' | 'ECO' | 'CONFORT'>('ALL');
  const [showAuditModal, setShowAuditModal] = useState(false);

  const filteredReglas = reglas.filter((r) => {
    if (selectedStandard === 'ISO') return r.norma === 'ISO 14001';
    if (selectedStandard === 'ECO') return r.norma === 'Eco-Schools';
    if (selectedStandard === 'CONFORT') return r.norma === 'Confort Ambiental';
    return true;
  });

  const triggerAuditCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#06b6d4', '#14b8a6', '#3b82f6']
    });
    setShowAuditModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Standards Summary Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ISO 14001 Card */}
        <div className="bg-gradient-to-br from-teal-950/50 via-slate-900 to-slate-900 border border-teal-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-md bg-teal-500/20 text-teal-300 text-xs font-mono font-bold border border-teal-500/30">
              ISO 14001:2015 (SGA)
            </span>
            <ShieldCheck className="w-6 h-6 text-teal-400" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-white font-mono flex items-baseline gap-2">
              <span>{indicadores.iso14001Cumplimiento}%</span>
              <span className="text-sm font-semibold text-slate-400">Conformidad</span>
            </div>
            <div className="text-sm font-semibold text-teal-300 mt-1">
              Estado: {indicadores.iso14001Cumplimiento >= 70 ? 'Conforme para Auditoría' : 'Revisión Requerida'}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Gestión responsable de residuos, control operacional y reducción de consumos de agua y energía.
            </p>
          </div>
        </div>

        {/* Eco-Schools Bandera Verde Card */}
        <div className="bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">
              Eco-Schools Internacional
            </span>
            <Sparkles className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-white flex items-center gap-2">
              {indicadores.ecoSchoolsBanderaVerde ? (
                <span className="text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  Bandera Verde Aprobada
                </span>
              ) : (
                <span className="text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                  En Evaluación
                </span>
              )}
            </div>
            <div className="text-sm font-semibold text-emerald-400 mt-1">
              Tasa de Aprovechamiento: {indicadores.tasaReciclaje}% (Meta: ≥50%)
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Comité ambiental activo, compostaje de residuos orgánicos y uso eficiente de recursos.
            </p>
          </div>
        </div>

        {/* Confort Térmico & Eficiencia Card */}
        <div className="bg-gradient-to-br from-cyan-950/50 via-slate-900 to-slate-900 border border-cyan-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30">
              Confort Ambiental & Hábitat
            </span>
            <Award className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-white font-mono flex items-baseline gap-2">
              <span>{indicadores.indiceConfortGeneral}%</span>
              <span className="text-sm font-semibold text-slate-400">Espacios Óptimos</span>
            </div>
            <div className="text-sm font-semibold text-cyan-300 mt-1">
              Temp: {indicadores.temperaturaPromedio}°C | Hum: {indicadores.humedadPromedio}%
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Condiciones de confort interior para optimizar la salud, bienestar y rendimiento pedagógico.
            </p>
          </div>
        </div>
      </div>

      {/* Action Bar & Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Filtrar Criterios:</span>
          <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs">
            <button
              onClick={() => setSelectedStandard('ALL')}
              className={`px-3 py-1 rounded-md transition ${selectedStandard === 'ALL' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              Todos ({reglas.length})
            </button>
            <button
              onClick={() => setSelectedStandard('ISO')}
              className={`px-3 py-1 rounded-md transition ${selectedStandard === 'ISO' ? 'bg-teal-500/20 text-teal-300 font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              ISO 14001
            </button>
            <button
              onClick={() => setSelectedStandard('ECO')}
              className={`px-3 py-1 rounded-md transition ${selectedStandard === 'ECO' ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              Eco-Schools
            </button>
            <button
              onClick={() => setSelectedStandard('CONFORT')}
              className={`px-3 py-1 rounded-md transition ${selectedStandard === 'CONFORT' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              Confort Ambiental
            </button>
          </div>
        </div>

        <button
          onClick={triggerAuditCelebration}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition active:scale-95"
        >
          <FileCheck className="w-4 h-4" />
          Generar Dictamen de Auditoría Oficial
        </button>
      </div>

      {/* Rules Breakdown Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700/80 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            Matriz de Evaluación Normativa y Sostenibilidad
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {filteredReglas.filter(r => r.cumple).length} de {filteredReglas.length} Criterios Cumplidos
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4">Norma</th>
                <th className="py-2.5 px-4">Criterio Evaluado</th>
                <th className="py-2.5 px-4">Valor Registrado</th>
                <th className="py-2.5 px-4">Umbral / Referencia</th>
                <th className="py-2.5 px-4">Puntuación</th>
                <th className="py-2.5 px-4 text-right">Dictamen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-sans text-slate-300">
              {filteredReglas.map((regla) => (
                <tr key={regla.id} className="hover:bg-slate-850/50 transition">
                  <td className="py-3 px-4 font-mono font-semibold">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      regla.norma === 'ISO 14001'
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                        : regla.norma === 'Eco-Schools'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    }`}>
                      {regla.norma}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{regla.criterio}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{regla.observacion}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-white font-medium">
                    {regla.valorActual}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                    {regla.valorReferencia}
                  </td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">
                    {regla.puntosOtorgados !== undefined ? `${regla.puntosOtorgados} / ${regla.puntosMaximos}` : 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {regla.cumple ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-medium border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Conforme
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[11px] font-medium border border-rose-500/30">
                        <XCircle className="w-3.5 h-3.5" />
                        No Conforme
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alarms and Action Items */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Alertas Ambientales y Acciones Correctivas ({alertas.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Detección automática en tiempo real
          </span>
        </div>

        {alertas.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
            No existen alertas activas. Todos los parámetros ambientales y consumos están dentro de los límites ecológicos.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {alertas.map((alerta) => (
              <div
                key={alerta.id}
                className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-2 hover:border-slate-700 transition"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {alerta.normaAfectada}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {new Date(alerta.fecha).toLocaleTimeString()}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1.5">{alerta.titulo}</h4>
                  <p className="text-xs text-slate-300 mt-1">{alerta.mensaje}</p>
                </div>

                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 text-[11px] text-emerald-300 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-200">Acción sugerida: </span>
                    {alerta.recomendacion}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Official Environmental Audit Certificate Modal */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-950/50">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Dictamen de Auditoría de Gestión Ambiental Escolar
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sistema de Gestión Verde - Certificación y Trazabilidad Institucional
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAuditModal(false)}
                className="text-slate-400 hover:text-white p-1 text-sm"
              >
                ✕
              </button>
            </div>

            {/* Certificate Body */}
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-800 text-[11px] font-mono">
                <div>
                  <span className="text-slate-500">Institución Educativa:</span>
                  <p className="text-white font-bold">Colegio Piloto Ambiental Santa Fe</p>
                </div>
                <div>
                  <span className="text-slate-500">Periodo Evaluado:</span>
                  <p className="text-white font-bold">Septiembre 2026 (Ciclo Académico)</p>
                </div>
                <div>
                  <span className="text-slate-500">Sistema SGA:</span>
                  <p className="text-emerald-400">Gestión Verde Institucional</p>
                </div>
                <div>
                  <span className="text-slate-500">Monitoreo Ambiental:</span>
                  <p className="text-cyan-400">Telemetría Ambiental Activa en Campus</p>
                </div>
              </div>

              {/* Badges outcome */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm">Resumen de Calificaciones Obtenidas:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900 p-3 rounded-xl border border-teal-500/30 text-center">
                    <span className="text-xs text-teal-300 uppercase font-bold">ISO 14001:2015</span>
                    <p className="text-2xl font-mono font-bold text-white mt-1">{indicadores.iso14001Cumplimiento}%</p>
                    <span className="text-xs text-slate-400">
                      {indicadores.iso14001Cumplimiento >= 70 ? 'Conforme para Certificación' : 'En Mejora'}
                    </span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-emerald-500/30 text-center">
                    <span className="text-xs text-emerald-300 uppercase font-bold">Eco-Schools Internacional</span>
                    <p className="text-2xl font-mono font-bold text-white mt-1">
                      {indicadores.ecoSchoolsBanderaVerde ? 'Aprobado' : 'En Trámite'}
                    </p>
                    <span className="text-xs text-slate-400">Bandera Verde</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-400 italic pt-2">
                "Se certifica que la institución cumple con los parámetros de confort térmico y ambiental interior,
                mantiene una tasa de desviación de residuos del {indicadores.tasaReciclaje}% hacia compostaje y aprovechamiento,
                y registra un consumo de agua potable de {indicadores.consumoAguaPerCapitaDia} L/estudiante/día dentro del margen regulatorio."
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500 font-mono">
                Dictamen institucional de evaluación de sostenibilidad
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Imprimir Acta
                </button>
                <button
                  onClick={() => setShowAuditModal(false)}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
