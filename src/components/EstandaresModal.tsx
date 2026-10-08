import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Layers,
  FileCheck,
  TrendingDown,
  X,
  Droplet,
  Zap,
  Recycle,
  Sparkles,
  ShieldCheck,
  Building,
  CheckSquare,
  Square
} from 'lucide-react';
import {
  EstandarEvaluacion,
  LeedPrerrequisitos,
  LeedEvaluacion,
  Iso14001Evaluacion,
  EcoSchoolsChecklistItem,
  EcoSchoolsEvaluacion,
  HistoricoMes
} from '../types';

interface EstandaresModalProps {
  isOpen: boolean;
  onClose: () => void;
  estandarActivo: EstandarEvaluacion;
  onSelectEstandar: (estandar: EstandarEvaluacion) => void;
  evaluacionLeed: LeedEvaluacion;
  evaluacionIso: Iso14001Evaluacion;
  evaluacionEcoSchools: EcoSchoolsEvaluacion;
  leedPrerrequisitos: LeedPrerrequisitos;
  onToggleLeedPrerrequisitoAreaReciclaje: () => void;
  ecoChecklist: EcoSchoolsChecklistItem[];
  onToggleEcoChecklistItem: (id: string) => void;
  historico: HistoricoMes[];
}

export const EstandaresModal: React.FC<EstandaresModalProps> = ({
  isOpen,
  onClose,
  estandarActivo,
  onSelectEstandar,
  evaluacionLeed,
  evaluacionIso,
  evaluacionEcoSchools,
  leedPrerrequisitos,
  onToggleLeedPrerrequisitoAreaReciclaje,
  ecoChecklist,
  onToggleEcoChecklistItem,
  historico,
}) => {
  const [tabActiva, setTabActiva] = useState<EstandarEvaluacion>(estandarActivo);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-[#014732] p-6 text-white flex items-center justify-between border-b border-emerald-800/50">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <span className="text-xs uppercase font-mono tracking-wider text-emerald-300">
                Lógica de Auditoría Internacional
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-sans mt-0.5">
              Marco de Evaluación y Estándares Escolares
            </h2>
            <p className="text-xs text-emerald-100/80 mt-1">
              Seleccione el estándar activo para gobernar las reglas condicionales del panel de control.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-800/40 transition"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selector de los 3 Estándares Internacionales */}
        <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={() => {
              setTabActiva('LEED');
              onSelectEstandar('LEED');
            }}
            className={`flex-1 min-w-[180px] py-3 px-4 rounded-2xl text-left border transition-all ${
              tabActiva === 'LEED'
                ? 'bg-white border-emerald-600 shadow-sm ring-2 ring-emerald-500/20'
                : 'bg-white/60 border-slate-200 hover:bg-white text-slate-600'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-900 font-sans">
                A. Estándar LEED
              </span>
              {tabActiva === 'LEED' && (
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              Reglas físicas y matemáticas estrictas (Línea Base y reducciones).
            </p>
          </button>

          <button
            onClick={() => {
              setTabActiva('ISO_14001');
              onSelectEstandar('ISO_14001');
            }}
            className={`flex-1 min-w-[180px] py-3 px-4 rounded-2xl text-left border transition-all ${
              tabActiva === 'ISO_14001'
                ? 'bg-white border-emerald-600 shadow-sm ring-2 ring-emerald-500/20'
                : 'bg-white/60 border-slate-200 hover:bg-white text-slate-600'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-900 font-sans">
                B. Estándar ISO 14001
              </span>
              {tabActiva === 'ISO_14001' && (
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              Procedimental y progresivo (Año 0 y mejora continua mes a mes).
            </p>
          </button>

          <button
            onClick={() => {
              setTabActiva('ECO_SCHOOLS');
              onSelectEstandar('ECO_SCHOOLS');
            }}
            className={`flex-1 min-w-[180px] py-3 px-4 rounded-2xl text-left border transition-all ${
              tabActiva === 'ECO_SCHOOLS'
                ? 'bg-white border-emerald-600 shadow-sm ring-2 ring-emerald-500/20'
                : 'bg-white/60 border-slate-200 hover:bg-white text-slate-600'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-900 font-sans">
                C. Estándar Eco-Schools
              </span>
              {tabActiva === 'ECO_SCHOOLS' && (
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              Lista de verificación (Checklists de brigadas y mantenimiento).
            </p>
          </button>
        </div>

        {/* Contenido Dinámico por Estándar */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: ESTÁNDAR LEED */}
          {tabActiva === 'LEED' && (
            <div className="space-y-6">
              {/* Banner de Prerrequisitos */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-emerald-700" />
                    <h3 className="text-sm font-bold text-emerald-950 font-sans">
                      1. Prerrequisitos de Infraestructura Inicial (Obligatorios)
                    </h3>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    evaluacionLeed.prerrequisitosCumplidos
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {evaluacionLeed.prerrequisitosCumplidos ? '✓ Prerrequisitos Conformes' : '⚠ Prerrequisitos Incompletos'}
                  </span>
                </div>
                <p className="text-xs text-emerald-900/80 leading-relaxed">
                  Para poder evaluarse bajo LEED, el recinto escolar debe contar obligatoriamente con el espacio físico construido para clasificación y el inventario técnico verificado:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Prerrequisito 1: Área de reciclaje */}
                  <div className="bg-white rounded-xl p-3.5 border border-emerald-200/80 flex items-start justify-between gap-3 shadow-2xs">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Área Física de Reciclaje Construida
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Espacio físico delimitado para papel, cartón, vidrio, plástico y metal.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={onToggleLeedPrerrequisitoAreaReciclaje}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                        leedPrerrequisitos.areaReciclajeConstruida
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {leedPrerrequisitos.areaReciclajeConstruida ? 'Instalada' : 'Faltante'}
                    </button>
                  </div>

                  {/* Prerrequisito 2: Inventario técnico de artefactos */}
                  <div className="bg-white rounded-xl p-3.5 border border-emerald-200/80 space-y-1 shadow-2xs">
                    <span className="text-xs font-bold text-slate-900 block">
                      Inventario Técnico de Griferías e Inodoros
                    </span>
                    <div className="flex justify-between text-[11px] text-slate-600 font-mono">
                      <span>Inodoros: <strong>{leedPrerrequisitos.inventarioTecnicoSanitarios.inodorosLitrosPorDescarga} L/descarga</strong> (≤ 6.0 L)</span>
                      <span>Grifos: <strong>{leedPrerrequisitos.inventarioTecnicoSanitarios.grifosLitrosPorMinuto} L/min</strong> (≤ 2.2 L)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evaluación de Línea Base y Reducciones Exigidas */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 font-sans flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-emerald-600" />
                  2. Reducciones Reales Exigidas vs. Línea Base (Baseline)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Agua: Reducción 20% */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span>Ahorro Hídrico (Agua)</span>
                      <Droplet className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold font-mono text-slate-900">
                        {evaluacionLeed.reduccionAguaLogradaPct}%
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        de reducción
                      </span>
                    </div>
                    <div className="text-[11px] space-y-0.5">
                      <p className="text-slate-500">Línea base: <strong className="text-slate-700">{evaluacionLeed.lineaBaseAguaLPorAlumno} L</strong></p>
                      <p className={evaluacionLeed.cumpleReduccionAgua ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'}>
                        {evaluacionLeed.cumpleReduccionAgua ? '✓ Supera el 20% exigido' : '⚠ Exige al menos 20% de ahorro'}
                      </p>
                    </div>
                  </div>

                  {/* Energía: Reducción 3% a 5% */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span>Eficiencia Energética</span>
                      <Zap className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold font-mono text-slate-900">
                        {evaluacionLeed.reduccionEnergiaLogradaPct}%
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        de reducción
                      </span>
                    </div>
                    <div className="text-[11px] space-y-0.5">
                      <p className="text-slate-500">Línea base: <strong className="text-slate-700">{evaluacionLeed.lineaBaseEnergiaKwhPorAlumno} kWh</strong></p>
                      <p className={evaluacionLeed.cumpleReduccionEnergia ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'}>
                        {evaluacionLeed.cumpleReduccionEnergia ? '✓ Dentro del rango (3%–5%)' : '⚠ Menor al 3% exigido'}
                      </p>
                    </div>
                  </div>

                  {/* Residuos: Desviación 50% a 75% */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span>Tasa de Reciclaje</span>
                      <Recycle className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold font-mono text-slate-900">
                        {evaluacionLeed.tasaReciclajeActualPct}%
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        valorizado
                      </span>
                    </div>
                    <div className="text-[11px] space-y-0.5">
                      <p className="text-slate-500">Meta exigida: <strong className="text-slate-700">50% a 75%</strong></p>
                      <p className={evaluacionLeed.cumpleReciclaje ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'}>
                        {evaluacionLeed.cumpleReciclaje ? '✓ Cumple rango de desviación' : '⚠ Menor al 50% mínimo'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ESTÁNDAR ISO 14001 */}
          {tabActiva === 'ISO_14001' && (
            <div className="space-y-5">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-emerald-700" />
                    <h3 className="text-sm font-bold text-slate-900 font-sans">
                      Línea de Consumo Inicial (Año 0 de Referencia)
                    </h3>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    Ciclo PHVA Activo
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bajo la norma ISO 14001:2015, la escuela ingresa su consumo inicial (Enero 2026). La plataforma verifica mes a mes que los consumos disminuyan o se mantengan para demostrar <strong>mejora continua acumulada</strong>.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white rounded-xl p-3 border border-slate-200">
                    <span className="text-xs font-bold text-slate-700 block">Agua Inicial (Año 0)</span>
                    <span className="text-xl font-bold font-mono text-slate-900">
                      {evaluacionIso.consumoInicialAnoCero.aguaLPorAlumno} L/est
                    </span>
                    <span className="text-[11px] text-emerald-600 block mt-1">
                      ↓ -{evaluacionIso.reduccionAguaVsAnoCeroPct}% reducción acumulada
                    </span>
                  </div>

                  <div className="bg-white rounded-xl p-3 border border-slate-200">
                    <span className="text-xs font-bold text-slate-700 block">Energía Inicial (Año 0)</span>
                    <span className="text-xl font-bold font-mono text-slate-900">
                      {evaluacionIso.consumoInicialAnoCero.energiaKwhPorAlumno} kWh/est
                    </span>
                    <span className="text-[11px] text-emerald-600 block mt-1">
                      ↓ -{evaluacionIso.reduccionEnergiaVsAnoCeroPct}% reducción acumulada
                    </span>
                  </div>
                </div>
              </div>

              {/* Registro Histórico Mensual */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Verificación de Mejora Continua Mes a Mes
                </h4>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-semibold text-[10px] uppercase">
                      <tr>
                        <th className="py-2.5 px-3">Mes Auditado</th>
                        <th className="py-2.5 px-3">Agua (L/est)</th>
                        <th className="py-2.5 px-3">Energía (kWh/est)</th>
                        <th className="py-2.5 px-3">Tendencia</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-sans">
                      {historico.map((h, i) => (
                        <tr key={h.mes} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-semibold">{h.nombreMes}</td>
                          <td className="py-2 px-3 font-mono">{h.aguaLPorAlumno} L</td>
                          <td className="py-2 px-3 font-mono">{h.energiaKwhPorAlumno} kWh</td>
                          <td className="py-2 px-3">
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                              ✓ En descenso progresivo
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ESTÁNDAR ECO-SCHOOLS */}
          {tabActiva === 'ECO_SCHOOLS' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-emerald-600" />
                    Lista de Verificación (Checklist de Acciones Concretas)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Haga clic sobre las acciones para registrar su cumplimiento por parte de la comunidad escolar:
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono text-emerald-700">
                    {evaluacionEcoSchools.porcentajeCumplimiento}%
                  </span>
                  <span className="text-[10px] block text-slate-400">Meta: ≥ 80% Bandera Verde</span>
                </div>
              </div>

              {/* Interactive Checklist */}
              <div className="space-y-2.5 pt-1">
                {ecoChecklist.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onToggleEcoChecklistItem(item.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                      item.completado
                        ? 'bg-emerald-50/60 border-emerald-300 text-slate-800'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0 text-emerald-700">
                      {item.completado ? (
                        <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-bold ${item.completado ? 'text-emerald-950' : 'text-slate-800'}`}>
                          {item.titulo}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-slate-200 font-mono text-slate-500">
                          {item.categoria}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        {item.descripcion}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Responsable: <strong className="text-slate-600">{item.responsable}</strong>
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Estándar activo para el diagnóstico: <strong className="text-slate-800 font-sans">{tabActiva}</strong>
          </div>
          <button
            onClick={() => {
              onSelectEstandar(tabActiva);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#016542] hover:bg-[#014e33] text-white text-xs font-bold transition shadow-xs"
          >
            Aplicar y Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
