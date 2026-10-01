import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { CargarLecturasView } from './components/CargarLecturasView';
import { DatosPlantelView } from './components/DatosPlantelView';
import { PdfReportModal } from './components/PdfReportModal';
import {
  INITIAL_PLANTEL,
  INITIAL_HISTORICO,
  INITIAL_DESECHOS,
  INITIAL_SENSOR,
  ejecutarMotorInferencia
} from './utils/rulesEngine';
import {
  NavTab,
  PlantelConfig,
  HistoricoMes,
  ConsumoRecurso,
  RegistroDesecho,
  LecturaSensorAmbiental
} from './types';
import { Menu, Leaf } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // App core state basado en el Capítulo III (González & González, 2026)
  const [plantel, setPlantel] = useState<PlantelConfig>(INITIAL_PLANTEL);
  const [historico, setHistorico] = useState<HistoricoMes[]>(INITIAL_HISTORICO);
  const [desechos, setDesechos] = useState<RegistroDesecho[]>(INITIAL_DESECHOS);
  const [sensor, setSensor] = useState<LecturaSensorAmbiental>(INITIAL_SENSOR);

  const [consumos, setConsumos] = useState<ConsumoRecurso[]>([
    {
      id: 'con-01',
      tipo_recurso: 'AGUA',
      valor: 558.0,
      unidad: 'm³',
      periodo: '2026-07',
      fecha_registro: '2026-07-28T09:00:00Z',
      registrado_por: 'Coordinador de Servicios Operacionales y Mantenimiento',
      cargo_responsable: 'COORDINADOR',
      costo_estimado: 2232.0,
      notas: 'Lectura regular de medidor de agua potable (Caso de Estudio)'
    },
    {
      id: 'con-02',
      tipo_recurso: 'ENERGIA',
      valor: 12780.0,
      unidad: 'kWh',
      periodo: '2026-07',
      fecha_registro: '2026-07-28T09:30:00Z',
      registrado_por: 'Coordinador de Servicios Operacionales y Mantenimiento',
      cargo_responsable: 'COORDINADOR',
      costo_estimado: 3067.2,
      notas: 'Lectura mensual de acometida eléctrica principal'
    },
    {
      id: 'con-03',
      tipo_recurso: 'AGUA',
      valor: 562.5,
      unidad: 'm³',
      periodo: '2026-06',
      fecha_registro: '2026-06-28T09:00:00Z',
      registrado_por: 'Usuario Final (Personal Administrativo)',
      cargo_responsable: 'USUARIO_FINAL',
      costo_estimado: 2250.0
    },
    {
      id: 'con-04',
      tipo_recurso: 'ENERGIA',
      valor: 12780.0,
      unidad: 'kWh',
      periodo: '2026-06',
      fecha_registro: '2026-06-28T09:30:00Z',
      registrado_por: 'Usuario Final (Personal Administrativo)',
      cargo_responsable: 'USUARIO_FINAL',
      costo_estimado: 3067.2
    }
  ]);

  // Recalcular inferencia lógica con el Sistema Experto (Librería Experta)
  const { indicadores, reglas, diagnosticos } = useMemo(() => {
    return ejecutarMotorInferencia(plantel, historico, desechos, sensor);
  }, [plantel, historico, desechos, sensor]);

  // Handlers para agregar consumos y desechos
  const handleAddConsumo = (nuevo: Omit<ConsumoRecurso, 'id' | 'fecha_registro'>) => {
    const item: ConsumoRecurso = {
      ...nuevo,
      id: `con-${Date.now()}`,
      fecha_registro: new Date().toISOString()
    };
    setConsumos((prev) => [item, ...prev]);

    // Recalcular variable matemática clave por alumno (pág. 11)
    const perAlumno = nuevo.tipo_recurso === 'AGUA'
      ? Math.round((nuevo.valor * 1000) / plantel.poblacionEstudiantil)
      : parseFloat((nuevo.valor / plantel.poblacionEstudiantil).toFixed(1));

    setHistorico((prev) => {
      const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const monthIdx = parseInt(nuevo.periodo.split('-')[1] || '7', 10) - 1;
      const monthLabel = monthNames[monthIdx] || 'Ago';

      const existingIndex = prev.findIndex((h) => h.mes === monthLabel);
      if (existingIndex >= 0) {
        const copy = [...prev];
        if (nuevo.tipo_recurso === 'AGUA') {
          copy[existingIndex] = {
            ...copy[existingIndex],
            aguaLPorAlumno: perAlumno,
            aguaTotalM3: nuevo.valor
          };
        } else {
          copy[existingIndex] = {
            ...copy[existingIndex],
            energiaKwhPorAlumno: perAlumno,
            energiaTotalKwh: nuevo.valor
          };
        }
        return copy;
      } else {
        const newHist: HistoricoMes = {
          mes: monthLabel,
          nombreMes: nuevo.periodo,
          aguaLPorAlumno: nuevo.tipo_recurso === 'AGUA' ? perAlumno : 1240,
          energiaKwhPorAlumno: nuevo.tipo_recurso === 'ENERGIA' ? perAlumno : 28.4,
          aguaTotalM3: nuevo.tipo_recurso === 'AGUA' ? nuevo.valor : 558,
          energiaTotalKwh: nuevo.tipo_recurso === 'ENERGIA' ? nuevo.valor : 12780
        };
        return [...prev, newHist];
      }
    });
  };

  const handleAddDesecho = (nuevo: Omit<RegistroDesecho, 'id' | 'fecha_registro'>) => {
    const item: RegistroDesecho = {
      ...nuevo,
      id: `des-${Date.now()}`,
      fecha_registro: new Date().toISOString()
    };
    setDesechos((prev) => [item, ...prev]);
  };

  const handleDeleteConsumo = (id: string) => {
    setConsumos((prev) => prev.filter((c) => c.id !== id));
  };

  const handleUpdatePlantel = (newConfig: PlantelConfig) => {
    setPlantel(newConfig);
  };

  const handleResetDefaults = () => {
    setPlantel(INITIAL_PLANTEL);
    setHistorico(INITIAL_HISTORICO);
    setDesechos(INITIAL_DESECHOS);
    setSensor(INITIAL_SENSOR);
  };

  return (
    <div className="min-h-screen bg-[#f0f5f2] text-slate-800 flex font-sans antialiased selection:bg-emerald-600 selection:text-white">
      {/* Sidebar fijo a la izquierda (4 pestañas estándar) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0 transition-all duration-300">
        {/* Mobile Header Bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-[#014732] text-white px-4 py-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400 fill-emerald-400" />
            <span className="font-bold text-base font-sans">Gestión Verde para Escuelas</span>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/50"
            aria-label="Abrir navegación"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Content View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              indicadores={indicadores}
              historico={historico}
              diagnosticos={diagnosticos}
              onOpenPdfReport={() => setIsPdfModalOpen(true)}
            />
          )}

          {activeTab === 'cargar_lecturas' && (
            <CargarLecturasView
              plantel={plantel}
              consumos={consumos}
              desechos={desechos}
              onAddConsumo={handleAddConsumo}
              onAddDesecho={handleAddDesecho}
              onDeleteConsumo={handleDeleteConsumo}
            />
          )}

          {activeTab === 'datos_plantel' && (
            <DatosPlantelView
              plantel={plantel}
              onUpdatePlantel={handleUpdatePlantel}
              onResetDefaults={handleResetDefaults}
            />
          )}
        </main>
      </div>

      {/* Modal Generador de Reporte PDF Oficial */}
      <PdfReportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        plantel={plantel}
        indicadores={indicadores}
        historico={historico}
        diagnosticos={diagnosticos}
      />
    </div>
  );
}
