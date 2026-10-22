import React, { useState } from 'react';
import {
  Leaf,
  Lock,
  Mail,
  User,
  ShieldCheck,
  GraduationCap,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  Sparkles,
  TreePine,
  Droplets,
  Zap,
  Recycle
} from 'lucide-react';
import { UsuarioSesion, RolUsuario } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (user: UsuarioSesion) => void;
}

interface StoredUser {
  nombre: string;
  email: string;
  password: string;
  rol: RolUsuario;
}

// Cuentas predeterminadas del sistema para acceso rápido
const DEFAULT_ACCOUNTS: StoredUser[] = [
  {
    nombre: 'Administrador del Plantel',
    email: 'admin@escuela.edu',
    password: '123',
    rol: 'ADMINISTRADOR'
  },
  {
    nombre: 'Prof. Carlos Mendoza (Docente)',
    email: 'docente@escuela.edu',
    password: '123',
    rol: 'DOCENTE'
  }
];

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Estado para Iniciar Sesión
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Estado para Registro
  const [regNombre, setRegNombre] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regRol, setRegRol] = useState<RolUsuario>('DOCENTE');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Mensajes de retroalimentación
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Carga de usuarios registrados persistidos en localStorage
  const getRegisteredUsers = (): StoredUser[] => {
    try {
      const stored = localStorage.getItem('eco_registered_users');
      if (stored) {
        const parsed: StoredUser[] = JSON.parse(stored);
        return [...DEFAULT_ACCOUNTS, ...parsed];
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_ACCOUNTS;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const emailTrimmed = loginEmail.trim().toLowerCase();
    const passTrimmed = loginPassword.trim();

    if (!emailTrimmed || !passTrimmed) {
      setErrorMessage('Por favor ingrese su correo electrónico y contraseña.');
      return;
    }

    const allUsers = getRegisteredUsers();

    // Búsqueda por correo exacto o alias convenientes ('admin', 'docente')
    const userFound = allUsers.find((u) => {
      const uEmail = u.email.toLowerCase();
      const isEmailMatch = uEmail === emailTrimmed;
      const isAliasMatch =
        (emailTrimmed === 'admin' && u.rol === 'ADMINISTRADOR') ||
        (emailTrimmed === 'docente' && u.rol === 'DOCENTE');
      return (isEmailMatch || isAliasMatch) && u.password === passTrimmed;
    });

    if (userFound) {
      setSuccessMessage(`¡Bienvenido al sistema, ${userFound.nombre}!`);
      setTimeout(() => {
        const sessionUser: UsuarioSesion = {
          id: `usr-${Date.now()}`,
          nombre: userFound.nombre,
          email: userFound.email,
          username: userFound.rol === 'ADMINISTRADOR' ? 'Admin' : 'Docente',
          rol: userFound.rol,
          estandarSeleccionado: 'LEED'
        };
        onLoginSuccess(sessionUser);
      }, 500);
    } else {
      setErrorMessage('Credenciales incorrectas. Verifique correo y contraseña, o regístrese como nuevo usuario.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const nombreTrimmed = regNombre.trim();
    const emailTrimmed = regEmail.trim().toLowerCase();
    const passTrimmed = regPassword.trim();
    const confirmPassTrimmed = regConfirmPassword.trim();

    if (!nombreTrimmed || !emailTrimmed || !passTrimmed) {
      setErrorMessage('Por favor complete todos los campos obligatorios.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      setErrorMessage('Por favor ingrese un correo electrónico válido (ejemplo: usuario@escuela.edu).');
      return;
    }

    if (passTrimmed.length < 3) {
      setErrorMessage('La contraseña debe tener al menos 3 caracteres.');
      return;
    }

    if (passTrimmed !== confirmPassTrimmed) {
      setErrorMessage('Las contraseñas no coinciden. Por favor revise nuevamente.');
      return;
    }

    const allUsers = getRegisteredUsers();
    const alreadyExists = allUsers.some((u) => u.email.toLowerCase() === emailTrimmed);

    if (alreadyExists) {
      setErrorMessage('Ya existe una cuenta con este correo. Puede ingresar directamente.');
      return;
    }

    const newUser: StoredUser = {
      nombre: nombreTrimmed,
      email: emailTrimmed,
      password: passTrimmed,
      rol: regRol
    };

    try {
      const existing = localStorage.getItem('eco_registered_users');
      const list: StoredUser[] = existing ? JSON.parse(existing) : [];
      list.push(newUser);
      localStorage.setItem('eco_registered_users', JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }

    setSuccessMessage('¡Cuenta creada exitosamente! Ingresando a la plataforma...');

    setTimeout(() => {
      const sessionUser: UsuarioSesion = {
        id: `usr-${Date.now()}`,
        nombre: newUser.nombre,
        email: newUser.email,
        username: newUser.rol === 'ADMINISTRADOR' ? 'Admin' : 'Docente',
        rol: newUser.rol,
        estandarSeleccionado: 'LEED'
      };
      onLoginSuccess(sessionUser);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-600 selection:text-white flex flex-col justify-between">
      {/* 1. NAVEGACIÓN SUPERIOR (Header en Tema Claro) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo e Identidad */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-600/20">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900">Escuela</span>
                <span className="text-xl font-black text-emerald-600">Verde</span>
              </div>
            </div>
          </div>

          {/* Insignias de Estándares Internacionales */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              LEED v4.1
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              ISO 14001
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Eco-Schools
            </span>
          </div>
        </div>
      </header>

      {/* 2. SECCIÓN PRINCIPAL (HERO + FORMULARIO DE ACCESO - TEMA CLARO) */}
      <main className="flex-1 relative py-12 lg:py-20 overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/30 to-slate-50 flex items-center">
        {/* Efectos Ambientales de Fondo en Tonos Suaves */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-200/35 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-teal-200/30 rounded-full blur-[140px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)`,
            backgroundSize: '28px 28px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Columna Izquierda: Información Institucional */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Auditoría Ambiental y Certificación para Instituciones Educativas</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Transformando Escuelas en Espacios Sostenibles con{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700">
                  Rigor Científico
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                Evalúa reducciones reales de agua, energía y gestión de desechos bajo estándares internacionales{' '}
                <strong className="text-slate-900 font-semibold">LEED v4.1</strong>,{' '}
                <strong className="text-slate-900 font-semibold">ISO 14001:2015</strong> y{' '}
                <strong className="text-slate-900 font-semibold">Eco-Schools</strong>.
              </p>

              {/* Indicadores Clave de Impacto (Estilo Claro y Legible) */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2 max-w-xl">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-emerald-200 transition-colors">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg sm:text-xl font-mono tabular-nums">
                    <Droplets className="w-5 h-5 text-emerald-500" />
                    <span>≥20%</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1 font-medium leading-tight">
                    Ahorro Hídrico estricto vs Línea Base
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-amber-200 transition-colors">
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-lg sm:text-xl font-mono tabular-nums">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <span>3% - 5%</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1 font-medium leading-tight">
                    Meta de eficiencia energética continua
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-teal-200 transition-colors">
                  <div className="flex items-center gap-2 text-teal-600 font-bold text-lg sm:text-xl font-mono tabular-nums">
                    <Recycle className="w-5 h-5 text-teal-500" />
                    <span>≥50%</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1 font-medium leading-tight">
                    Tasa de reciclaje y valorización de residuos
                  </p>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Tarjeta Interactiva de Inicio de Sesión y Registro */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl shadow-[0_20px_50px_-10px_rgba(15,23,42,0.12)] border border-slate-200 overflow-hidden text-slate-800 transition-all">
                
                {/* Cabecera de la Tarjeta */}
                <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-6 text-white text-center relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/15 border border-white/20 text-white mb-2.5 shadow-sm">
                    <TreePine className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Portal de Acceso al Plantel
                  </h2>
                  <p className="text-xs text-emerald-100 mt-1 font-medium">
                    Seleccione su rol o cree una cuenta institucional
                  </p>

                  {/* Pestañas: Iniciar Sesión vs Registrarse */}
                  <div className="mt-5 bg-black/20 p-1 rounded-xl flex items-center border border-white/15">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('login');
                        setErrorMessage('');
                        setSuccessMessage('');
                      }}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        activeTab === 'login'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      Iniciar Sesión
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('register');
                        setErrorMessage('');
                        setSuccessMessage('');
                      }}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        activeTab === 'register'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      Registrar Usuario
                    </button>
                  </div>
                </div>

                {/* Mensajes de Alerta */}
                {errorMessage && (
                  <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {successMessage && (
                  <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-800 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-semibold">{successMessage}</span>
                  </div>
                )}

                {/* Formulario de INICIAR SESIÓN */}
                {activeTab === 'login' ? (
                  <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Correo Institucional
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="admin@escuela.edu o docente@escuela.edu"
                          className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Contraseña
                        </label>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Ingresar a la Plataforma</span>
                    </button>
                  </form>
                ) : (
                  /* Formulario de REGISTRO */
                  <form onSubmit={handleRegisterSubmit} className="p-6 space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Nombre Completo
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={regNombre}
                          onChange={(e) => setRegNombre(e.target.value)}
                          placeholder="Ej: Lic. Elena Valenzuela"
                          className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Correo Institucional
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="usuario@escuela.edu"
                          className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Rol en la Institución
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setRegRol('DOCENTE')}
                          className={`p-2.5 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-all ${
                            regRol === 'DOCENTE'
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600'
                              : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div className="leading-tight">
                            <div className="text-xs">Docente</div>
                            <div className="text-[9px] text-slate-500 font-normal">Carga lecturas</div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setRegRol('ADMINISTRADOR')}
                          className={`p-2.5 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-all ${
                            regRol === 'ADMINISTRADOR'
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600'
                              : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div className="leading-tight">
                            <div className="text-xs">Administrador</div>
                            <div className="text-[9px] text-slate-500 font-normal">Control total</div>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Contraseña
                        </label>
                        <div className="relative">
                          <input
                            type={showRegPassword ? 'text' : 'password'}
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            placeholder="Clave"
                            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Confirmar
                        </label>
                        <div className="relative">
                          <input
                            type={showRegPassword ? 'text' : 'password'}
                            value={regConfirmPassword}
                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                            placeholder="Repetir"
                            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showRegPassword}
                          onChange={(e) => setShowRegPassword(e.target.checked)}
                          className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <span>Mostrar contraseñas</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Crear Cuenta y Acceder</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* 3. PIE DE PÁGINA (Footer Limpio en Tema Claro) */}
      <footer className="bg-white text-slate-500 py-6 border-t border-slate-200 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-900">Escuela Verde</span>
            <span className="text-slate-500">— Plataforma de Auditoría Ambiental Escolar</span>
          </div>
          <div className="text-center sm:text-right text-slate-500">
            Normativas: LEED v4.1 O+M • ISO 14001:2015 • Eco-Schools
          </div>
        </div>
      </footer>
    </div>
  );
};
