import React, { useState } from 'react';
import {
  User,
  CheckCircle2,
  X,
  LogOut,
  Save
} from 'lucide-react';
import { UsuarioSesion, EstandarEvaluacion } from '../types';

interface PerfilUsuarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UsuarioSesion;
  onUpdateEstandar: (nuevoEstandar: EstandarEvaluacion) => void;
  onLogout: () => void;
}

export const PerfilUsuarioModal: React.FC<PerfilUsuarioModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateEstandar,
  onLogout,
}) => {
  const [estandarTemp, setEstandarTemp] = useState<EstandarEvaluacion>(currentUser.estandarSeleccionado);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateEstandar(estandarTemp);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        {/* Header Modal */}
        <div className="bg-[#014732] p-6 text-white flex items-center justify-between border-b border-emerald-800/50">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner ${
              currentUser.rol === 'ADMINISTRADOR'
                ? 'bg-emerald-600 text-white border border-emerald-400/40'
                : 'bg-blue-600 text-white border border-blue-400/40'
            }`}>
              {currentUser.nombre.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-sans">
                  {currentUser.nombre}
                </h2>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  currentUser.rol === 'ADMINISTRADOR'
                    ? 'bg-emerald-400/20 text-emerald-200 border border-emerald-400/30'
                    : 'bg-blue-400/20 text-blue-200 border border-blue-400/30'
                }`}>
                  {currentUser.rol}
                </span>
              </div>
              <p className="text-xs text-emerald-200/80">
                Usuario del sistema: <strong className="text-white font-mono">{currentUser.username}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-800/40 transition"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario de Configuración del Perfil */}
        <form onSubmit={handleSave} className="p-6 space-y-6">
          {savedSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>¡Estándar actualizado exitosamente en el perfil del usuario!</span>
            </div>
          )}

          {/* Selector de Estándar Internacional Aplicado al Perfil */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Estándar Internacional Asignado a su Perfil
              </label>
            </div>

            <div className="space-y-2.5">
              {/* Opción LEED */}
              <label
                onClick={() => setEstandarTemp('LEED')}
                className={`p-4 rounded-2xl border flex items-center gap-3 cursor-pointer transition ${
                  estandarTemp === 'LEED'
                    ? 'bg-emerald-50/60 border-emerald-600 shadow-xs ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="estandar"
                  value="LEED"
                  checked={estandarTemp === 'LEED'}
                  onChange={() => setEstandarTemp('LEED')}
                  className="accent-emerald-600"
                />
                <span className="text-sm font-bold text-slate-900 font-sans">
                  LEED
                </span>
              </label>

              {/* Opción ISO 14001 */}
              <label
                onClick={() => setEstandarTemp('ISO_14001')}
                className={`p-4 rounded-2xl border flex items-center gap-3 cursor-pointer transition ${
                  estandarTemp === 'ISO_14001'
                    ? 'bg-emerald-50/60 border-emerald-600 shadow-xs ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="estandar"
                  value="ISO_14001"
                  checked={estandarTemp === 'ISO_14001'}
                  onChange={() => setEstandarTemp('ISO_14001')}
                  className="accent-emerald-600"
                />
                <span className="text-sm font-bold text-slate-900 font-sans">
                  ISO 14001
                </span>
              </label>

              {/* Opción Eco-Schools */}
              <label
                onClick={() => setEstandarTemp('ECO_SCHOOLS')}
                className={`p-4 rounded-2xl border flex items-center gap-3 cursor-pointer transition ${
                  estandarTemp === 'ECO_SCHOOLS'
                    ? 'bg-emerald-50/60 border-emerald-600 shadow-xs ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="estandar"
                  value="ECO_SCHOOLS"
                  checked={estandarTemp === 'ECO_SCHOOLS'}
                  onChange={() => setEstandarTemp('ECO_SCHOOLS')}
                  className="accent-emerald-600"
                />
                <span className="text-sm font-bold text-slate-900 font-sans">
                  Eco-Schools
                </span>
              </label>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onLogout}
              className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#016542] hover:bg-[#014e33] text-white text-xs font-bold transition flex items-center gap-2 shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Guardar en Perfil</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
