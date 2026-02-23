import React from 'react';
import { motion } from 'motion/react';
import { Radio, Wifi, MessageSquare, Database, AlertTriangle, ArrowDown, ShieldAlert } from 'lucide-react';

export default function DataFlow() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dual-Device Failover Flow</h1>
        <p className="mt-2 text-slate-600 max-w-3xl">
          The hybrid communication strategy ensures continuous tracking even in poor network conditions or during tampering attempts.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="max-w-3xl mx-auto">
          
          {/* Step 1 */}
          <FlowStep 
            number={1}
            title="Primary Telemetry Attempt"
            desc="Android Radio attempts to send high-frequency GPS data (1Hz) via primary Mobile Data (4G/LTE)."
            icon={<Radio className="text-blue-500" />}
            status="primary"
          />

          <FlowArrow />

          {/* Step 2 */}
          <FlowStep 
            number={2}
            title="Trusted WiFi Fallback"
            desc="If Mobile Data is unavailable, the system scans for pre-configured Trusted WiFi networks (e.g., home garage, fleet depot)."
            icon={<Wifi className="text-red-500" />}
            status="fallback"
          />

          <FlowArrow />

          {/* Step 3 */}
          <FlowStep 
            number={3}
            title="Offline Storage & Batch Sync"
            desc="If no IP network is available, GPS points are encrypted and stored locally. When a connection is restored, data is batch-synced to the server."
            icon={<Database className="text-amber-500" />}
            status="fallback"
          />

          <FlowArrow />

          {/* Step 4 */}
          <div className="relative">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-16 bg-red-500 rounded-full"></div>
            <FlowStep 
              number={4}
              title="Critical Event SMS Fallback"
              desc="If a critical event occurs (e.g., geofence breach, crash detected) while offline, the Radio sends an encrypted SMS payload to the server gateway."
              icon={<MessageSquare className="text-red-500" />}
              status="critical"
            />
          </div>

          <div className="my-8 flex items-center justify-center">
            <div className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-full flex items-center gap-2 shadow-lg">
              <ShieldAlert size={16} className="text-red-400" />
              TAMPER DETECTION / PRIMARY OFFLINE
            </div>
          </div>

          {/* Step 5 */}
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-2 bg-slate-800 rounded-full"></div>
            <FlowStep 
              number={5}
              title="Hidden Backup Activation"
              desc="If the primary Android Radio stops sending heartbeats or reports tampering (power cut), the Hidden GSM Tracker wakes from sleep mode."
              icon={<AlertTriangle className="text-slate-700" />}
              status="backup"
            />

            <FlowArrow />

            <FlowStep 
              number={6}
              title="Stealth Tracking Mode"
              desc="Hidden Tracker sends low-frequency updates (e.g., every 5 mins) via GSM/SMS to preserve its independent battery while providing recovery coordinates."
              icon={<Radio className="text-slate-700" />}
              status="backup"
            />
          </div>

        </div>
      </div>
    </motion.div>
  );
}

function FlowStep({ number, title, desc, icon, status }: { number: number, title: string, desc: string, icon: React.ReactNode, status: 'primary' | 'fallback' | 'critical' | 'backup' }) {
  const getStatusStyles = () => {
    switch(status) {
      case 'primary': return 'border-blue-200 bg-blue-50/50';
      case 'fallback': return 'border-slate-200 bg-slate-50';
      case 'critical': return 'border-red-200 bg-red-50/50';
      case 'backup': return 'border-slate-300 bg-slate-100';
    }
  };

  return (
    <div className={`p-6 rounded-xl border ${getStatusStyles()} flex gap-6 items-start`}>
      <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 font-bold text-slate-400">
        {number}
      </div>
      <div>
        <div className="flex items-center gap-3 mb-2">
          {icon}
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        </div>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex justify-center py-3">
      <ArrowDown className="text-slate-300" size={24} />
    </div>
  );
}
