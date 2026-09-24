import React, { useState } from 'react';
import {
  Droplet,
  Zap,
  Trash2,
  Plus,
  Calendar,
  User,
  DollarSign,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  FileSpreadsheet,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { ConsumoRecurso, RegistroResiduo, TipoRecurso, CategoriaResiduo } from '../types';

interface ConsumosViewProps {
  consumos: ConsumoRecurso[];
  residuos: RegistroResiduo[];
  onAddConsumo: (consumo: Omit<ConsumoRecurso, 'id' | 'fecha_registro'>) => void;
  onAddResiduo: (residuo: Omit<RegistroResiduo, 'id' | 'fecha_registro'>) => void;
  poblacion: number;
}

export const ConsumosView: React.FC<ConsumosViewProps> = ({
  consumos,
  residuos,
  onAddConsumo,
  onAddResiduo,
  poblacion,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'recursos' | 'residuos'>('recursos');

  // Form states for Consumo
  const [tipoRecurso, setTipoRecurso] = useState<TipoRecurso>('AGUA');
  const [valorConsumo, setValorConsumo] = useState('');
  const [periodoConsumo, setPeriodoConsumo] = useState('2026-09');
  const [costoEstimado, setCostoEstimado] = useState('');
  const [responsableConsumo, setResponsableConsumo] = useState('Administración Escolar');

  // Form states for Residuo
  const [catResiduo, setCatResiduo] = useState<CategoriaResiduo>('ORGANICO');
  const [pesoKg, setPesoKg] = useState('');
  const [periodoResiduo, setPeriodoResiduo] = useState('2026-09');
  const [destinoResiduo, setDestinoResiduo] = useState('Huerto Escolar (Compostaje)');
  const [responsableResiduo, setResponsableResiduo] = useState('Brigada Verde Estudiantil');

  const handleSubmmitConsumo = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(valorConsumo);
    if (!isNaN(val) && val >= 0) {
      onAddConsumo({
        tipo_recurso: tipoRecurso,
        valor: val,
        unidad: tipoRecurso === 'AGUA' ? 'm³' : 'kWh',
        periodo: periodoConsumo,
        registrado_por: responsableConsumo,
        costo_estimado: costoEstimado ? parseFloat(costoEstimado) : undefined,
        meta_limite: tipoRecurso === 'AGUA' ? 140 : 3000
      });
      setValorConsumo('');
      setCostoEstimado('');
    }
  };

  const handleSubmitResiduo = (e: React.FormEvent) => {
    e.preventDefault();
    const peso = parseFloat(pesoKg);
    if (!isNaN(peso) && peso >= 0) {
      onAddResiduo({
        categoria: catResiduo,
        peso_kg: peso,
        periodo: periodoResiduo,
        destino: destinoResiduo,
        registrado_por: responsableResiduo
      });
      setPesoKg('');
    }
  };

  // Calculations for current period (2026-09)
  const currentAgua = consumos.find(c => c.tipo_recurso === 'AGUA' && c.periodo === '2026-09')?.valor || 0;
  const currentLuz = consumos.find(c => c.tipo_recurso === 'LUZ' && c.periodo === '2026-09')?.valor || 0;

  const currentResiduos = residuos.filter(r => r.periodo === '2026-09');
  const totalKg = currentResiduos.reduce((acc, r) => acc + r.peso_kg, 0);
  const organicoKg = currentResiduos.filter(r => r.categoria === 'ORGANICO').reduce((acc, r) => acc + r.peso_kg, 0);
  const reciclableKg = currentResiduos.filter(r => r.categoria === 'RECICLABLE').reduce((acc, r) => acc + r.peso_kg, 0);
  const peligrosoKg = currentResiduos.filter(r => r.categoria === 'PELIGROSO').reduce((acc, r) => acc + r.peso_kg, 0);
  const noReciclableKg = currentResiduos.filter(r => r.categoria === 'NO_RECICLABLE').reduce((acc, r) => acc + r.peso_kg, 0);

  const tasaDesviacion = totalKg > 0 ? ((organicoKg + reciclableKg) / totalKg) * 100 : 0;
  const litrosPerCapitaDia = poblacion > 0 ? (currentAgua * 1000) / (poblacion * 20) : 0;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Agua Potable */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Droplet className="w-4 h-4" />
              Consumo de Agua
            </span>
            <span className="font-mono text-slate-500">Sept 2026</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-white">{currentAgua.toFixed(1)}</span>
            <span className="text-sm font-semibold text-cyan-300">m³</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-2">
            <span className="flex items-center gap-1" title="Per cápita significa 'por persona': consumo promedio diario de agua por cada estudiante">
              Per cápita (por persona):
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            </span>
            <span className={`font-mono font-bold ${litrosPerCapitaDia <= 15 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {litrosPerCapitaDia.toFixed(1)} L / persona / día
            </span>
          </div>
        </div>

        {/* Energía Eléctrica */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              Energía Eléctrica
            </span>
            <span className="font-mono text-slate-500">Sept 2026</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-white">{currentLuz.toLocaleString()}</span>
            <span className="text-sm font-semibold text-amber-300">kWh</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-2">
            <span>Intensidad:</span>
            <span className="font-mono text-slate-300">
              {(currentLuz / poblacion).toFixed(1)} kWh / estudiante
            </span>
          </div>
        </div>

        {/* Residuos Desviados / Reciclaje */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Trash2 className="w-4 h-4" />
              Tasa Desviación
            </span>
            <span className="font-mono text-slate-500">ISO 14001</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-white">{tasaDesviacion.toFixed(1)}</span>
            <span className="text-sm font-semibold text-emerald-300">%</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-2">
            <span>Meta Eco-Schools:</span>
            <span className="font-mono text-emerald-400 font-semibold">
              ≥ 50% (Cumple)
            </span>
          </div>
        </div>

        {/* Población Escolar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <User className="w-4 h-4" />
              Población Escolar
            </span>
            <span className="font-mono text-slate-500">Activa</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-white">{poblacion}</span>
            <span className="text-sm font-semibold text-teal-300">Personas</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-2">
            <span>Días lectivos/mes:</span>
            <span className="font-mono text-slate-300">20 días hábiles</span>
          </div>
        </div>
      </div>

      {/* Sub tabs: Recursos (Agua/Luz) vs Residuos */}
      <div className="flex border-b border-slate-800 gap-4">
        <button
          onClick={() => setActiveSubTab('recursos')}
          className={`pb-2.5 text-xs font-semibold uppercase tracking-wider transition border-b-2 flex items-center gap-2 ${
            activeSubTab === 'recursos'
              ? 'border-emerald-400 text-emerald-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Droplet className="w-3.5 h-3.5 text-cyan-400" />
          Consumos Hídrico & Eléctrico (ConsumoRecurso)
        </button>

        <button
          onClick={() => setActiveSubTab('residuos')}
          className={`pb-2.5 text-xs font-semibold uppercase tracking-wider transition border-b-2 flex items-center gap-2 ${
            activeSubTab === 'residuos'
              ? 'border-emerald-400 text-emerald-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trash2 className="w-3.5 h-3.5 text-emerald-400" />
          Clasificación & Gestión de Residuos (RegistroResiduo)
        </button>
      </div>

      {/* Main Form and Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Registration Form */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {activeSubTab === 'recursos' ? 'Registrar Consumo de Recurso' : 'Registrar Pesaje de Residuos'}
              </h3>
              <p className="text-[11px] text-slate-400">
                Registro institucional para auditoría de sostenibilidad ambiental
              </p>
            </div>
          </div>

          {activeSubTab === 'recursos' ? (
            <form onSubmit={handleSubmmitConsumo} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Tipo de Recurso
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTipoRecurso('AGUA')}
                    className={`py-2 px-3 rounded-lg border font-medium flex items-center justify-center gap-1.5 transition ${
                      tipoRecurso === 'AGUA'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Droplet className="w-3.5 h-3.5" />
                    Agua (m³)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoRecurso('LUZ')}
                    className={`py-2 px-3 rounded-lg border font-medium flex items-center justify-center gap-1.5 transition ${
                      tipoRecurso === 'LUZ'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Luz (kWh)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Valor Consumido ({tipoRecurso === 'AGUA' ? 'Metros Cúbicos m³' : 'Kilovatios-hora kWh'})
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  required
                  placeholder={tipoRecurso === 'AGUA' ? 'Ej: 125.4' : 'Ej: 2750'}
                  value={valorConsumo}
                  onChange={(e) => setValorConsumo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Periodo (YYYY-MM)
                  </label>
                  <input
                    type="month"
                    value={periodoConsumo}
                    onChange={(e) => setPeriodoConsumo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Costo Estimado ($ USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Opcional"
                    value={costoEstimado}
                    onChange={(e) => setCostoEstimado(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Usuario Registrador (registrado_por)
                </label>
                <input
                  type="text"
                  value={responsableConsumo}
                  onChange={(e) => setResponsableConsumo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition active:scale-95 shadow-md shadow-emerald-950/40"
              >
                Guardar Registro de Consumo
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmitResiduo} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Categoría del Residuo
                </label>
                <select
                  value={catResiduo}
                  onChange={(e) => {
                    const cat = e.target.value as CategoriaResiduo;
                    setCatResiduo(cat);
                    if (cat === 'ORGANICO') setDestinoResiduo('Huerto Escolar (Compostaje)');
                    if (cat === 'RECICLABLE') setDestinoResiduo('Empresa Recicladora Certificada');
                    if (cat === 'NO_RECICLABLE') setDestinoResiduo('Relleno Sanitario');
                    if (cat === 'PELIGROSO') setDestinoResiduo('Gestor Especializado de Químicos');
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                >
                  <option value="ORGANICO">Materia Orgánica (Compost)</option>
                  <option value="RECICLABLE">Aprovechable (Papel, Vidrio, Plástico)</option>
                  <option value="NO_RECICLABLE">Ordinario / Basura común</option>
                  <option value="PELIGROSO">Peligroso (Pilas, Reactivos Lab)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Peso en Kilogramos (kg)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  required
                  placeholder="Ej: 85.5"
                  value={pesoKg}
                  onChange={(e) => setPesoKg(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Destino o Gestor Ambiental
                </label>
                <input
                  type="text"
                  value={destinoResiduo}
                  onChange={(e) => setDestinoResiduo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Periodo (YYYY-MM)
                  </label>
                  <input
                    type="month"
                    value={periodoResiduo}
                    onChange={(e) => setPeriodoResiduo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Registrado Por
                  </label>
                  <input
                    type="text"
                    value={responsableResiduo}
                    onChange={(e) => setResponsableResiduo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition active:scale-95 shadow-md shadow-emerald-950/40"
              >
                Guardar Registro de Pesaje
              </button>
            </form>
          )}
        </div>

        {/* Historical Table */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700/80 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              {activeSubTab === 'recursos'
                ? 'Histórico de Consumos Hídricos y Eléctricos'
                : 'Inventario de Desviación y Clasificación de Residuos'}
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Trazabilidad Institucional Continua
            </span>
          </div>

          <div className="overflow-x-auto">
            {activeSubTab === 'recursos' ? (
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-4">Periodo</th>
                    <th className="py-2.5 px-4">Recurso</th>
                    <th className="py-2.5 px-4">Valor Registrado</th>
                    <th className="py-2.5 px-4">Costo Est.</th>
                    <th className="py-2.5 px-4">Registrado Por</th>
                    <th className="py-2.5 px-4 text-right">Cumplimiento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
                  {consumos.map((c) => {
                    const isAgua = c.tipo_recurso === 'AGUA';
                    const perCapita = isAgua ? (c.valor * 1000) / (poblacion * 20) : null;
                    const complies = isAgua ? perCapita! <= 15.0 : c.valor <= 3000;
                    return (
                      <tr key={c.id} className="hover:bg-slate-850/50 transition">
                        <td className="py-2.5 px-4 font-bold text-white">
                          {c.periodo}
                        </td>
                        <td className="py-2.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 w-max ${
                            isAgua
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {isAgua ? <Droplet className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                            {isAgua ? 'Agua Potable' : 'Energía Eléctrica'}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 font-bold text-white">
                          {c.valor} {c.unidad}
                        </td>
                        <td className="py-2.5 px-4 text-slate-400">
                          {c.costo_estimado ? `$${c.costo_estimado.toFixed(2)}` : 'N/D'}
                        </td>
                        <td className="py-2.5 px-4 font-sans text-slate-300">
                          {c.registrado_por}
                        </td>
                        <td className="py-2.5 px-4 text-right font-sans">
                          {complies ? (
                            <span className="text-emerald-400 text-[11px] font-medium inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Bajo Umbral
                            </span>
                          ) : (
                            <span className="text-amber-400 text-[11px] font-medium inline-flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              Sobreconsumo
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-4">Periodo</th>
                    <th className="py-2.5 px-4">Categoría</th>
                    <th className="py-2.5 px-4">Peso (kg)</th>
                    <th className="py-2.5 px-4">Destino Final</th>
                    <th className="py-2.5 px-4">Responsable</th>
                    <th className="py-2.5 px-4 text-right">Tasa Desviación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
                  {residuos.map((r) => {
                    const isDiverted = r.categoria === 'ORGANICO' || r.categoria === 'RECICLABLE';
                    return (
                      <tr key={r.id} className="hover:bg-slate-850/50 transition">
                        <td className="py-2.5 px-4 font-bold text-white">
                          {r.periodo}
                        </td>
                        <td className="py-2.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold w-max block ${
                            r.categoria === 'ORGANICO'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : r.categoria === 'RECICLABLE'
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                              : r.categoria === 'PELIGROSO'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-slate-800 text-slate-300'
                          }`}>
                            {r.categoria}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 font-bold text-white">
                          {r.peso_kg} kg
                        </td>
                        <td className="py-2.5 px-4 font-sans text-slate-300">
                          {r.destino}
                        </td>
                        <td className="py-2.5 px-4 font-sans text-slate-400">
                          {r.registrado_por}
                        </td>
                        <td className="py-2.5 px-4 text-right font-sans">
                          {isDiverted ? (
                            <span className="text-emerald-400 text-[11px] font-medium">
                              Aprovechable (+ISO 14001)
                            </span>
                          ) : (
                            <span className="text-slate-500 text-[11px]">
                              Vertedero / Tratamiento
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
