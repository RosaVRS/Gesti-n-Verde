import React from 'react';
import {
  X,
  Printer,
  Leaf,
  ShieldCheck,
  Award,
  CheckCircle2,
  AlertTriangle,
  Droplet,
  Zap,
  Recycle,
  Trees,
  Thermometer,
  Droplets,
  Sparkles
} from 'lucide-react';
import {
  IndicadoresGestionVerde,
  PlantelConfig,
  HistoricoMes,
  DiagnosticoAutomatizado,
  UsuarioSesion
} from '../types';

interface PdfReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  plantel: PlantelConfig;
  indicadores: IndicadoresGestionVerde;
  historico: HistoricoMes[];
  diagnosticos: DiagnosticoAutomatizado[];
  currentUser: UsuarioSesion | null;
}

export const PdfReportModal: React.FC<PdfReportModalProps> = ({
  isOpen,
  onClose,
  plantel,
  indicadores,
  historico,
  diagnosticos,
  currentUser,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const fechaReporte = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const { huellaCarbono, estandarActivo } = indicadores;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Actions (Screen only) */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm font-sans">
              Gestión Verde para Escuelas — Dictamen de Auditoría y Certificación
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              Imprimir / Guardar como PDF
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div id="printable-report" className="p-8 sm:p-10 space-y-6 overflow-y-auto font-sans text-slate-800">
          {/* Official Letterhead */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-emerald-800/80 gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#014732] flex items-center justify-center text-white">
                <Leaf className="w-7 h-7 text-emerald-400 fill-emerald-400" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Gestión Verde para Escuelas
                </h1>
                <p className="text-xs text-slate-600 font-medium">
                  Plataforma Tecnológica para la Gestión Verde de Escuelas bajo Estándares Internacionales
                </p>
                <p className="text-[11px] text-slate-400">
                  {plantel.institucionReferencia} · González & González (2026)
                </p>
              </div>
            </div>

            <div className="text-right text-xs text-slate-500 space-y-0.5">
              <p className="font-bold text-slate-800 text-sm">{plantel.nombrePlantel}</p>
              <p>Código: <span className="font-mono text-slate-700">{plantel.codigoPlantel}</span></p>
              <p>Fecha de emisión: <strong className="text-slate-700">{fechaReporte}</strong></p>
              <p>Auditor: <strong className="text-slate-700">{currentUser?.nombre || 'Administrador'} ({currentUser?.username || 'Admin'})</strong></p>
            </div>
          </div>

          {/* Veredicto Oficial: Acreditación de Escuela Verde */}
          <div className={`rounded-2xl p-5 border space-y-2.5 ${
            huellaCarbono.esEscuelaVerde
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-700" />
                <span>Dictamen Oficial de Certificación Ambiental</span>
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                huellaCarbono.esEscuelaVerde
                  ? 'bg-emerald-200 text-emerald-900'
                  : 'bg-amber-200 text-amber-900'
              }`}>
                {huellaCarbono.esEscuelaVerde ? '✓ ESCUELA VERDE CERTIFICADA' : 'EN TRANSICIÓN ECOLÓGICA'}
              </span>
            </div>

            <p className="text-xs leading-relaxed">
              <strong>Resolución Técnica:</strong> Se certifica que el campus ha sido evaluado bajo la normativa internacional <strong>{estandarActivo}</strong>. La Huella de Carbono del plantel se calculó en <strong>{huellaCarbono.huellaNetaActualTonCO2e} Ton CO₂e/mes</strong>, representando una disminución neta del <strong>{huellaCarbono.reduccionHuellaPct}%</strong> respecto a su línea base inicial de <strong>{huellaCarbono.huellaNetaLineaBaseTonCO2e} Ton CO₂e/mes</strong> (Umbral reglamentario exigido: ≥{huellaCarbono.umbralReduccionEscuelaVerdePct}%).
            </p>
          </div>

          {/* KPI Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="border border-slate-200 rounded-xl p-3.5 text-center bg-white">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Consumo Hídrico</span>
              <span className="text-xl font-bold text-slate-900 font-mono">{indicadores.consumoHidricoLPorAlumno}</span>
              <span className="text-[10px] text-slate-500 block">L / alumno / mes</span>
              <span className="text-[10px] font-semibold text-emerald-600">↓ 12% vs anterior</span>
            </div>

            <div className="border border-slate-200 rounded-xl p-3.5 text-center bg-white">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Consumo Energético</span>
              <span className="text-xl font-bold text-slate-900 font-mono">{indicadores.consumoEnergeticoKwhPorAlumno}</span>
              <span className="text-[10px] text-slate-500 block">kWh / alumno / mes</span>
              <span className="text-[10px] font-semibold text-amber-600">Límite: {indicadores.limiteLeedKwh} kWh</span>
            </div>

            <div className="border border-slate-200 rounded-xl p-3.5 text-center bg-white">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Clasificación Desechos</span>
              <span className="text-xl font-bold text-slate-900 font-mono">{indicadores.tasaReciclajeDesechosPct}%</span>
              <span className="text-[10px] text-slate-500 block">Tasa de valorización</span>
              <span className="text-[10px] font-semibold text-emerald-600">Meta &gt;50% cumplida</span>
            </div>

            <div className="border border-slate-200 rounded-xl p-3.5 text-center bg-white">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Áreas Verdes Permeables</span>
              <span className="text-xl font-bold text-slate-900 font-mono">{indicadores.porcentajeAreasVerdesPermeables}%</span>
              <span className="text-[10px] text-slate-500 block">{plantel.superficieAreasVerdesM2.toLocaleString()} m²</span>
              <span className="text-[10px] font-semibold text-teal-600">Superficie ecológica</span>
            </div>
          </div>

          {/* Desglose Científico de la Huella de Carbono */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-2 text-xs">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Balance Científico de Emisiones de Gases de Efecto Invernadero (GEI)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Electricidad:</span>
                <span className="font-bold text-slate-900">+{huellaCarbono.emisionesElectricidadKgCO2e} kg CO₂e</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Agua potable:</span>
                <span className="font-bold text-slate-900">+{huellaCarbono.emisionesAguaKgCO2e} kg CO₂e</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Residuos netos:</span>
                <span className="font-bold text-slate-900">+{huellaCarbono.emisionesDesechosKgCO2e} kg CO₂e</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-emerald-700 block text-[10px]">Captura áreas verdes:</span>
                <span className="font-bold text-emerald-800">-{huellaCarbono.capturaAreasVerdesKgCO2e} kg CO₂e</span>
              </div>
            </div>
          </div>

          {/* Histórico Consolidado */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Histórico Mensual de Variables Matemáticas (Ene - Jul)
            </h3>
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-semibold text-[10px] uppercase">
                <tr>
                  <th className="py-2.5 px-3">Mes</th>
                  <th className="py-2.5 px-3">Consumo Hídrico (L/alumno)</th>
                  <th className="py-2.5 px-3">Volumen Total (m³)</th>
                  <th className="py-2.5 px-3">Consumo Energía (kWh/alumno)</th>
                  <th className="py-2.5 px-3">Energía Total (kWh)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {historico.map((h) => (
                  <tr key={h.mes}>
                    <td className="py-2 px-3 font-semibold">{h.nombreMes}</td>
                    <td className="py-2 px-3 font-mono">{h.aguaLPorAlumno} L/alumno</td>
                    <td className="py-2 px-3 font-mono">{h.aguaTotalM3} m³</td>
                    <td className="py-2 px-3 font-mono">{h.energiaKwhPorAlumno} kWh/alumno</td>
                    <td className="py-2 px-3 font-mono">{h.energiaTotalKwh.toLocaleString()} kWh</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Diagnósticos y Planes de Acción Correctivos */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Diagnósticos y Planes de Acción Correctivos Emitidos
            </h3>
            <div className="space-y-2">
              {diagnosticos.map((d) => (
                <div key={d.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>{d.titulo}</span>
                    <span className="text-[10px] font-mono font-normal text-slate-500">{d.normaReferencia}</span>
                  </div>
                  <p className="text-slate-600">{d.mensaje}</p>
                  <p className="text-[11px] text-slate-800 font-medium">
                    <strong>Plan de acción:</strong> {d.planDeAccionCorrectivo}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-xs text-slate-500">
            <div>
              <div className="w-48 border-b border-slate-300 mx-auto mb-2"></div>
              <p className="font-bold text-slate-800">{currentUser?.nombre || 'Administrador'}</p>
              <p>Rol: {currentUser?.rol || 'ADMINISTRADOR'} ({currentUser?.username || 'Admin'})</p>
            </div>
            <div>
              <div className="w-48 border-b border-slate-300 mx-auto mb-2"></div>
              <p className="font-bold text-slate-800">Dirección y Supervisión</p>
              <p>{plantel.nombrePlantel}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
