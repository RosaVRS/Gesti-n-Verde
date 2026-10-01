import React, { useState } from 'react';
import {
  FileEdit,
  Plus,
  Droplet,
  Zap,
  Recycle,
  CheckCircle2,
  Calendar,
  User,
  Trash2,
  Download,
  AlertCircle
} from 'lucide-react';
import { ConsumoRecurso, RegistroDesecho, PlantelConfig } from '../types';

interface CargarLecturasViewProps {
  plantel: PlantelConfig;
  consumos: ConsumoRecurso[];
  desechos: RegistroDesecho[];
  onAddConsumo: (consumo: Omit<ConsumoRecurso, 'id' | 'fecha_registro'>) => void;
  onAddDesecho: (desecho: Omit<RegistroDesecho, 'id' | 'fecha_registro'>) => void;
  onDeleteConsumo: (id: string) => void;
}

export const CargarLecturasView: React.FC<CargarLecturasViewProps> = ({
  plantel,
  consumos,
  desechos,
  onAddConsumo,
  onAddDesecho,
  onDeleteConsumo,
}) => {
  const [activeFormTab, setActiveFormTab] = useState<'recursos' | 'desechos'>('recursos');

  // Form states for Consumo Hídrico / Energético
  const [tipoRecurso, setTipoRecurso] = useState<'AGUA' | 'ENERGIA'>('AGUA');
  const [valorRecurso, setValorRecurso] = useState('558.0');
  const [periodoRecurso, setPeriodoRecurso] = useState('2026-08');
  const [cargoResponsable, setCargoResponsable] = useState<'COORDINADOR' | 'USUARIO_FINAL'>('COORDINADOR');
  const [responsableNombre, setResponsableNombre] = useState('Coordinador de Servicios Operacionales y Mantenimiento');
  const [costoRecurso, setCostoRecurso] = useState('2230.0');
  const [notasRecurso, setNotasRecurso] = useState('Lectura regular mensual del medidor principal');
  const [successMsg, setSuccessMsg] = useState('');

  // Form states for Desechos Sólidos
  const [categoriaDesecho, setCategoriaDesecho] = useState<'ORGANICO' | 'RECICLABLE' | 'NO_RECICLABLE' | 'PELIGROSO'>('RECICLABLE');
  const [pesoKg, setPesoKg] = useState('380');
  const [destinoDesecho, setDestinoDesecho] = useState('Asociación Certificada de Reciclaje (Papel, cartón y plástico)');
  const [responsableDesecho, setResponsableDesecho] = useState('Docente / Comité Ambiental');

  const handleSubRecurso = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(valorRecurso);
    if (isNaN(val) || val <= 0) return;

    onAddConsumo({
      tipo_recurso: tipoRecurso,
      valor: val,
      unidad: tipoRecurso === 'AGUA' ? 'm³' : 'kWh',
      periodo: periodoRecurso,
      registrado_por: responsableNombre,
      cargo_responsable: cargoResponsable,
      costo_estimado: parseFloat(costoRecurso) || 0,
      notas: notasRecurso
    });

    setSuccessMsg(`¡Registro de ${tipoRecurso === 'AGUA' ? 'Consumo Hídrico' : 'Consumo Energético'} guardado con éxito!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleSubDesecho = (e: React.FormEvent) => {
    e.preventDefault();
    const peso = parseFloat(pesoKg);
    if (isNaN(peso) || peso <= 0) return;

    onAddDesecho({
      categoria: categoriaDesecho,
      peso_kg: peso,
      periodo: periodoRecurso,
      destino: destinoDesecho,
      registrado_por: responsableDesecho
    });

    setSuccessMsg('¡Clasificación de desecho sólido guardada correctamente!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Cálculo de variables matemáticas por alumno
  const valorNum = parseFloat(valorRecurso) || 0;
  const perAlumno = tipoRecurso === 'AGUA'
    ? plantel.poblacionEstudiantil > 0 ? (valorNum * 1000) / plantel.poblacionEstudiantil : 0
    : plantel.poblacionEstudiantil > 0 ? valorNum / plantel.poblacionEstudiantil : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
          Cargar Lecturas
        </h1>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Grid: Form + Info Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Container */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 shadow-xs border border-slate-100 space-y-5">
          {/* Tab Selector */}
          <div className="flex rounded-xl bg-slate-100 p-1 text-sm font-medium">
            <button
              onClick={() => setActiveFormTab('recursos')}
              className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-2 ${
                activeFormTab === 'recursos'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Droplet className="w-4 h-4 text-blue-500" />
              Consumo Hídrico & Energético
            </button>
            <button
              onClick={() => setActiveFormTab('desechos')}
              className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-2 ${
                activeFormTab === 'desechos'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Recycle className="w-4 h-4 text-emerald-600" />
              Desechos Sólidos
            </button>
          </div>

          {activeFormTab === 'recursos' ? (
            <form onSubmit={handleSubRecurso} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Tipo de Consumo
                  </label>
                  <select
                    value={tipoRecurso}
                    onChange={(e) => setTipoRecurso(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="AGUA">Consumo Hídrico (m³)</option>
                    <option value="ENERGIA">Consumo Energético (kWh)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Periodo Facturado
                  </label>
                  <input
                    type="month"
                    value={periodoRecurso}
                    onChange={(e) => setPeriodoRecurso(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-emerald-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Valor Total ({tipoRecurso === 'AGUA' ? 'm³' : 'kWh'})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={valorRecurso}
                    onChange={(e) => setValorRecurso(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-mono focus:outline-none focus:border-emerald-600"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Costo Estimado Facturado ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={costoRecurso}
                    onChange={(e) => setCostoRecurso(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-mono focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Rol del Responsable
                  </label>
                  <select
                    value={cargoResponsable}
                    onChange={(e) => setCargoResponsable(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="COORDINADOR">Coordinador (Servicios Operacionales y Mantenimiento)</option>
                    <option value="USUARIO_FINAL">Usuario Final (Personal Administrativo / Docente)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nombre del Responsable
                  </label>
                  <input
                    type="text"
                    value={responsableNombre}
                    onChange={(e) => setResponsableNombre(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-emerald-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Notas de Auditoría
                </label>
                <input
                  type="text"
                  value={notasRecurso}
                  onChange={(e) => setNotasRecurso(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#016542] hover:bg-[#014e33] text-white font-semibold text-sm transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Registrar Consumo
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubDesecho} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Clasificación de Desechos Sólidos
                  </label>
                  <select
                    value={categoriaDesecho}
                    onChange={(e) => setCategoriaDesecho(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="RECICLABLE">Reciclables (Plásticos, Papel, Cartón, Latas)</option>
                    <option value="ORGANICO">Orgánicos (Compostaje para áreas verdes)</option>
                    <option value="NO_RECICLABLE">No Aprovechables (Desechos ordinarios)</option>
                    <option value="PELIGROSO">Peligrosos (Residuos de laboratorios)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Peso Registrado (kg)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={pesoKg}
                    onChange={(e) => setPesoKg(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-mono focus:outline-none focus:border-emerald-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Destino Certificado / Tratamiento
                </label>
                <input
                  type="text"
                  value={destinoDesecho}
                  onChange={(e) => setDestinoDesecho(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Registrado por
                </label>
                <input
                  type="text"
                  value={responsableDesecho}
                  onChange={(e) => setResponsableDesecho(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-emerald-600"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#016542] hover:bg-[#014e33] text-white font-semibold text-sm transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Guardar Pesaje de Desecho Sólido
              </button>
            </form>
          )}
        </div>

        {/* Guidance and Sustainability Standards */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-xs border border-slate-100 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-base">
              Criterios de Sostenibilidad
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Las lecturas ingresadas son evaluadas automáticamente por las reglas de sostenibilidad del plantel:
            </p>

            <div className="space-y-2.5 pt-1 text-xs">
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-blue-900">
                <span className="font-bold block">Meta Hídrica LEED</span>
                <span className="text-[11px] text-blue-800">
                  Máximo: ≤ {plantel.metaConsumoHidricoLPorAlumno} L/alumno mensual.
                </span>
              </div>

              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-amber-900">
                <span className="font-bold block">Límite Eléctrico LEED</span>
                <span className="text-[11px] text-amber-800">
                  Límite: ≤ {plantel.limiteConsumoEnergeticoKwh} kWh/alumno mensual.
                </span>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-emerald-900">
                <span className="font-bold block">Tasa de Reciclaje Eco-Schools</span>
                <span className="text-[11px] text-emerald-800">
                  Meta: &gt; {plantel.metaReciclajeEcoSchoolsPct}% de residuos valorizados.
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-400">
            Población activa: <strong className="text-slate-700">{plantel.poblacionEstudiantil} alumnos</strong>.
          </div>
        </div>
      </div>

      {/* Historial de Consumos Registrados */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Historial de Consumos
            </h3>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
            {consumos.length} registros
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Recurso</th>
                <th className="py-3 px-4">Periodo</th>
                <th className="py-3 px-4">Valor Total</th>
                <th className="py-3 px-4">Por Alumno</th>
                <th className="py-3 px-4">Costo</th>
                <th className="py-3 px-4">Responsable</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans text-slate-700">
              {consumos.map((c) => {
                const perAlumnoCalc = c.tipo_recurso === 'AGUA'
                  ? (c.valor * 1000) / plantel.poblacionEstudiantil
                  : c.valor / plantel.poblacionEstudiantil;
                return (
                  <tr key={c.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4 font-semibold">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] ${
                        c.tipo_recurso === 'AGUA'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {c.tipo_recurso === 'AGUA' ? <Droplet className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                        {c.tipo_recurso === 'AGUA' ? 'Consumo Hídrico' : 'Consumo Energético'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-medium">{c.periodo}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {c.valor.toLocaleString()} {c.unidad}
                    </td>
                    <td className="py-3 px-4 font-mono text-emerald-700 font-semibold">
                      {perAlumnoCalc.toFixed(1)} {c.tipo_recurso === 'AGUA' ? 'L/alumno' : 'kWh/alumno'}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">
                      ${c.costo_estimado?.toFixed(2) || '0.00'}
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">
                      {c.registrado_por}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onDeleteConsumo(c.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded transition"
                        title="Eliminar registro"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
