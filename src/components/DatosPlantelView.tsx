import React, { useState } from 'react';
import {
  Building2,
  Users,
  Trees,
  CheckCircle2,
  Save,
  RotateCcw
} from 'lucide-react';
import { PlantelConfig } from '../types';

interface DatosPlantelViewProps {
  plantel: PlantelConfig;
  onUpdatePlantel: (newConfig: PlantelConfig) => void;
  onResetDefaults: () => void;
}

export const DatosPlantelView: React.FC<DatosPlantelViewProps> = ({
  plantel,
  onUpdatePlantel,
  onResetDefaults,
}) => {
  const [formData, setFormData] = useState<PlantelConfig>(plantel);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field: keyof PlantelConfig, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: typeof prev[field] === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePlantel(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header: Clean title without subtitles or extra suffixes */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
          Datos del Plantel
        </h1>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>¡Parámetros del plantel guardados con éxito!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100 space-y-6">
        {/* Identificación del Plantel */}
        <div>
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            Identificación de la Institución
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Nombre de la Institución Educativa
              </label>
              <input
                type="text"
                value={formData.nombrePlantel}
                onChange={(e) => handleChange('nombrePlantel', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-emerald-600"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Código del Plantel
              </label>
              <input
                type="text"
                value={formData.codigoPlantel}
                onChange={(e) => handleChange('codigoPlantel', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-mono focus:outline-none focus:border-emerald-600"
                required
              />
            </div>
          </div>
        </div>

        {/* Demografía Escolar */}
        <div>
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            Demografía Escolar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Alumnos Matriculados
              </label>
              <input
                type="number"
                min="1"
                value={formData.poblacionEstudiantil}
                onChange={(e) => handleChange('poblacionEstudiantil', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-mono focus:outline-none focus:border-emerald-600"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Personal Administrador
              </label>
              <input
                type="number"
                min="0"
                value={formData.personalCoordinadores}
                onChange={(e) => handleChange('personalCoordinadores', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-mono focus:outline-none focus:border-emerald-600"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Personal Supervisor
              </label>
              <input
                type="number"
                min="0"
                value={formData.personalUsuariosFinales}
                onChange={(e) => handleChange('personalUsuariosFinales', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-mono focus:outline-none focus:border-emerald-600"
                required
              />
            </div>
          </div>
        </div>

        {/* Superficie Total y Áreas Verdes Permeables */}
        <div>
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
            <Trees className="w-5 h-5 text-emerald-600" />
            Superficie del Predio y Áreas Verdes Permeables
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Superficie Total del Plantel (m²)
              </label>
              <input
                type="number"
                min="100"
                value={formData.superficieTotalM2}
                onChange={(e) => handleChange('superficieTotalM2', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-mono focus:outline-none focus:border-emerald-600"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Superficie de Áreas Verdes Permeables (m²)
              </label>
              <input
                type="number"
                min="0"
                value={formData.superficieAreasVerdesM2}
                onChange={(e) => handleChange('superficieAreasVerdesM2', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-mono focus:outline-none focus:border-emerald-600"
                required
              />
            </div>
          </div>
        </div>

        {/* Metas y Límites de Sostenibilidad */}
        <div>
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Límites y Metas de Sostenibilidad
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Límite Hídrico LEED (L/alumno)
              </label>
              <input
                type="number"
                min="100"
                value={formData.metaConsumoHidricoLPorAlumno}
                onChange={(e) => handleChange('metaConsumoHidricoLPorAlumno', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-mono focus:outline-none focus:border-emerald-600"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Límite Eléctrico LEED (kWh)
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                value={formData.limiteConsumoEnergeticoKwh}
                onChange={(e) => handleChange('limiteConsumoEnergeticoKwh', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-mono focus:outline-none focus:border-emerald-600"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Meta Reciclaje Eco-Schools (%)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.metaReciclajeEcoSchoolsPct}
                onChange={(e) => handleChange('metaReciclajeEcoSchoolsPct', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-mono focus:outline-none focus:border-emerald-600"
                required
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              onResetDefaults();
              setFormData(plantel);
            }}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-4 h-4" />
            Restablecer Valores Iniciales
          </button>

          <button
            type="submit"
            className="py-2.5 px-6 rounded-xl bg-[#016542] hover:bg-[#014e33] text-white font-semibold text-sm transition-all shadow-sm active:scale-[0.98] flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};
