import React from 'react';
import {
  LayoutDashboard,
  FileEdit,
  Building2,
  Leaf,
  X
} from 'lucide-react';
import { NavTab } from '../types';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
}) => {
  const navItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'cargar_lecturas' as NavTab,
      label: 'Cargar Lecturas',
      icon: FileEdit,
    },
    {
      id: 'datos_plantel' as NavTab,
      label: 'Datos Plantel',
      icon: Building2,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#014732] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 p-5 overflow-y-auto">
          {/* Logo & Brand: Gestion Verde para Escuelas */}
          <div className="flex items-center justify-between pb-8 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-emerald-400 shrink-0">
                <Leaf className="w-7 h-7 text-emerald-400 fill-emerald-400" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-sans leading-snug">
                Gestión Verde para Escuelas
              </span>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/40"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left group ${
                    isActive
                      ? 'bg-[#065f46] text-white shadow-xs ring-1 ring-emerald-500/30'
                      : 'text-emerald-100/75 hover:text-white hover:bg-emerald-800/35'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${
                      isActive ? 'text-emerald-300' : 'text-emerald-300/80'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-5 border-t border-emerald-800/40">
          <p className="text-[11px] text-emerald-100 font-semibold font-sans">
            Estándares: ISO 14001 | LEED | Eco-Schools
          </p>
        </div>
      </aside>
    </>
  );
};
