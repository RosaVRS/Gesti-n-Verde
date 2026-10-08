import React, { useState } from 'react';
import {
  Leaf,
  Lock,
  User,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { UsuarioSesion } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (user: UsuarioSesion) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedUser = usernameInput.trim();
    const trimmedPass = passwordInput.trim();

    // Validación estricta de credenciales: Admin 123 / Superv 123
    if (trimmedUser.toLowerCase() === 'admin' && trimmedPass === '123') {
      const user: UsuarioSesion = {
        id: 'usr-admin',
        nombre: 'Administrador',
        username: 'Admin',
        rol: 'ADMINISTRADOR',
        estandarSeleccionado: 'LEED'
      };
      onLoginSuccess(user);
    } else if (trimmedUser.toLowerCase() === 'superv' && trimmedPass === '123') {
      const user: UsuarioSesion = {
        id: 'usr-superv',
        nombre: 'Supervisor',
        username: 'Superv',
        rol: 'SUPERVISOR',
        estandarSeleccionado: 'LEED'
      };
      onLoginSuccess(user);
    } else {
      setErrorMessage('Credenciales incorrectas. Verifique el usuario y la contraseña.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#013324] via-[#014732] to-[#032b1f] flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/30 animate-in fade-in zoom-in-95 duration-200">
        {/* Cabecera de la Marca */}
        <div className="bg-[#014732] p-8 text-white text-center relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 mb-4 shadow-inner">
            <Leaf className="w-9 h-9 fill-emerald-400 text-emerald-400" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
            Gestión Verde para Escuelas
          </h1>
          <p className="text-xs text-emerald-100/80 mt-1.5 font-medium">
            Plataforma de Auditoría Ambiental y Certificación Escolar
          </p>
        </div>

        {/* Formulario de Inicio de Sesión */}
        <div className="p-7 sm:p-8 space-y-6">
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-xl text-xs flex items-center gap-2 animate-in shake">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Input Usuario */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Usuario
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Usuario"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm text-slate-900 font-mono focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  required
                />
              </div>
            </div>

            {/* Input Contraseña */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm text-slate-900 font-mono focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  required
                />
              </div>
            </div>

            {/* Botón de Ingreso */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#016542] hover:bg-[#014e33] text-white font-semibold text-sm transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
            >
              <span>Ingresar al Sistema</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
