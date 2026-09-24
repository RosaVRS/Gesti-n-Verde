import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { GeneralTelemetryView } from './components/GeneralTelemetryView';
import { ConsumosView } from './components/ConsumosView';
import { NormativasView } from './components/NormativasView';
import {
  INITIAL_NODES,
  INITIAL_CONSUMOS,
  INITIAL_RESIDUOS,
  calcularIndicadoresYReglas
} from './utils/rulesEngine';
import { LecturaAmbiental, ConsumoRecurso, RegistroResiduo } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'telemetria' | 'consumos' | 'normativas'>('telemetria');

  const [lecturas, setLecturas] = useState<LecturaAmbiental[]>(INITIAL_NODES);
  const [consumos, setConsumos] = useState<ConsumoRecurso[]>(INITIAL_CONSUMOS);
  const [residuos, setResiduos] = useState<RegistroResiduo[]>(INITIAL_RESIDUOS);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [poblacion] = useState<number>(450);

  // Recalcular métricas, normativas y alertas en tiempo real
  const { indicadores, reglas, alertas } = useMemo(() => {
    return calcularIndicadoresYReglas(lecturas, consumos, residuos, poblacion, 20);
  }, [lecturas, consumos, residuos, poblacion]);

  // Simulación de fluctuaciones ambientales captadas por el sensor general
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setLecturas((prev) => {
        const lastReading = prev[0];
        const curTemp = lastReading ? lastReading.temperatura : 22.8;
        const curHum = lastReading ? lastReading.humedad : 48.5;

        const deltaTemp = (Math.random() - 0.49) * 0.4;
        const deltaHum = (Math.random() - 0.49) * 0.8;
        const newTemp = Math.max(18.5, Math.min(32.5, parseFloat((curTemp + deltaTemp).toFixed(1))));
        const newHum = Math.max(28.0, Math.min(85.0, parseFloat((curHum + deltaHum).toFixed(1))));

        const isComfort = newTemp >= 20.0 && newTemp <= 25.5 && newHum >= 30.0 && newHum <= 60.0;

        const newLectura: LecturaAmbiental = {
          id: `lec-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          nodo_id: 'SENSOR-GRAL-01',
          nombre_nodo: 'Sensor Ambiental General',
          ubicacion: 'Campus Escolar Central',
          temperatura: newTemp,
          humedad: newHum,
          rssi: -62 + Math.floor((Math.random() - 0.5) * 4),
          bateria: Math.max(60, (lastReading?.bateria || 96) - (Math.random() > 0.95 ? 1 : 0)),
          fecha_registro: new Date().toISOString(),
          estado_alerta: isComfort ? 'NORMAL' : 'PRECAUCION'
        };

        return [newLectura, ...prev.slice(0, 99)];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleRefreshTelemetry = () => {
    const now = new Date().toISOString();
    const last = lecturas[0];
    const baseTemp = last ? last.temperatura : 22.8;
    const baseHum = last ? last.humedad : 48.5;
    const deltaTemp = (Math.random() - 0.5) * 0.4;
    const deltaHum = (Math.random() - 0.5) * 1.0;
    const temp = parseFloat((baseTemp + deltaTemp).toFixed(1));
    const hum = parseFloat((baseHum + deltaHum).toFixed(1));
    const isComfort = temp >= 20.0 && temp <= 25.5 && hum >= 30.0 && hum <= 60.0;

    const newReading: LecturaAmbiental = {
      id: `lec-${Date.now()}`,
      nodo_id: 'SENSOR-GRAL-01',
      nombre_nodo: 'Sensor Ambiental General',
      ubicacion: 'Campus Escolar Central',
      temperatura: temp,
      humedad: hum,
      rssi: -62 + Math.floor((Math.random() - 0.5) * 3),
      bateria: last?.bateria || 95,
      fecha_registro: now,
      estado_alerta: isComfort ? 'NORMAL' : 'PRECAUCION'
    };
    setLecturas((prev) => [newReading, ...prev.slice(0, 99)]);
  };

  const handleAddManualReading = (
    _sensor_id: string,
    temperatura: number,
    humedad: number,
    ubicacion: string = 'Campus Escolar Central'
  ) => {
    const isComfort = temperatura >= 20.0 && temperatura <= 25.5 && humedad >= 30.0 && humedad <= 60.0;
    const newLectura: LecturaAmbiental = {
      id: `lec-${Date.now()}`,
      nodo_id: 'SENSOR-GRAL-01',
      nombre_nodo: 'Sensor Ambiental General',
      ubicacion,
      temperatura,
      humedad,
      rssi: -62,
      bateria: 96,
      fecha_registro: new Date().toISOString(),
      estado_alerta: isComfort ? 'NORMAL' : 'PRECAUCION'
    };

    setLecturas((prev) => [newLectura, ...prev.slice(0, 99)]);
  };

  const handleAddConsumo = (nuevoConsumo: Omit<ConsumoRecurso, 'id' | 'fecha_registro'>) => {
    const item: ConsumoRecurso = {
      ...nuevoConsumo,
      id: `con-${Date.now()}`,
      fecha_registro: new Date().toISOString()
    };
    setConsumos((prev) => [item, ...prev]);
  };

  const handleAddResiduo = (nuevoResiduo: Omit<RegistroResiduo, 'id' | 'fecha_registro'>) => {
    const item: RegistroResiduo = {
      ...nuevoResiduo,
      id: `res-${Date.now()}`,
      fecha_registro: new Date().toISOString()
    };
    setResiduos((prev) => [item, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header con Indicadores Globales y Navegación */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        indicadores={indicadores}
        isSimulating={isSimulating}
        setIsSimulating={setIsSimulating}
        onRefreshTelemetry={handleRefreshTelemetry}
      />

      {/* Área de Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'telemetria' && (
          <GeneralTelemetryView
            lecturas={lecturas}
            onAddManualReading={handleAddManualReading}
            isSimulating={isSimulating}
            setIsSimulating={setIsSimulating}
          />
        )}

        {activeTab === 'consumos' && (
          <ConsumosView
            consumos={consumos}
            residuos={residuos}
            onAddConsumo={handleAddConsumo}
            onAddResiduo={handleAddResiduo}
            poblacion={poblacion}
          />
        )}

        {activeTab === 'normativas' && (
          <NormativasView
            indicadores={indicadores}
            reglas={reglas}
            alertas={alertas}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-slate-400">Gestión Verde</span>
            <span>— Sistema de Gestión Ambiental Escolar y Telemetría General</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>ISO 14001:2015</span>
            <span>•</span>
            <span>Eco-Schools Bandera Verde</span>
            <span>•</span>
            <span>Confort Térmico & Hábitat Escolar</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
