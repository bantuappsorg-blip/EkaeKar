import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Monitor, Server, Database, Radio, Wifi, Shield, Cpu, Cloud, Activity, ArrowRightLeft } from 'lucide-react';

export default function SystemArchitecture() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Architecture</h1>
        <p className="mt-2 text-slate-600 max-w-3xl">
          High-level overview of the Ekae-Kar ecosystem, designed to scale to 50,000+ vehicles with real-time tracking and high availability.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="relative">
          {/* Clients Layer */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Client Layer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex items-start gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                  <Smartphone size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Owner Mobile App</h4>
                  <p className="text-sm text-slate-500 mt-1">iOS & Android app for vehicle owners. Real-time tracking, alerts, and remote immobilization.</p>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex items-start gap-4">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                  <Monitor size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Admin/Fleet Dashboard</h4>
                  <p className="text-sm text-slate-500 mt-1">Web portal for fleet managers and system admins. Bulk management, analytics, and billing.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Edge/Gateway Layer */}
          <div className="mb-12 relative">
            <div className="absolute -top-8 left-1/2 w-px h-8 bg-slate-300"></div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Edge & API Gateway</h3>
            <div className="bg-slate-900 p-6 rounded-xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Shield className="text-red-400" size={32} />
                <div>
                  <h4 className="font-semibold">Cloudflare WAF & Load Balancer</h4>
                  <p className="text-sm text-slate-400">DDoS protection, rate limiting, and SSL termination.</p>
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-slate-700"></div>
              <div className="flex items-center gap-4">
                <Server className="text-blue-400" size={32} />
                <div>
                  <h4 className="font-semibold">API Gateway (Kong/Envoy)</h4>
                  <p className="text-sm text-slate-400">Request routing, auth validation, and WebSocket termination.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Microservices Layer */}
          <div className="mb-12 relative">
            <div className="absolute -top-8 left-1/2 w-px h-8 bg-slate-300"></div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Microservices</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ServiceCard title="Auth & Identity" desc="JWT issuance, device mTLS cert validation, RBAC." icon={<Shield size={20} />} />
              <ServiceCard title="Telematics Ingestion" desc="High-throughput GPS data processing & validation." icon={<Activity size={20} />} />
              <ServiceCard title="Geo-Spatial Engine" desc="Geofencing evaluation, route snapping, distance calc." icon={<Cloud size={20} />} />
              <ServiceCard title="Device Management" desc="OTA updates, config sync, heartbeat monitoring." icon={<Cpu size={20} />} />
              <ServiceCard title="Notification Service" desc="Push notifications, SMS fallback routing, emails." icon={<Radio size={20} />} />
              <ServiceCard title="Billing & Subscriptions" desc="Stripe integration, plan limits, automated cutoff." icon={<Database size={20} />} />
            </div>
          </div>

          {/* Data Layer */}
          <div className="mb-12 relative">
            <div className="absolute -top-8 left-1/2 w-px h-8 bg-slate-300"></div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Data Persistence</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
                <div className="flex items-center gap-3 mb-2">
                  <Database className="text-orange-600" size={20} />
                  <h4 className="font-semibold text-slate-900">TimescaleDB</h4>
                </div>
                <p className="text-sm text-slate-600">Time-series storage for high-volume GPS telemetry data.</p>
              </div>
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <Database className="text-blue-600" size={20} />
                  <h4 className="font-semibold text-slate-900">PostgreSQL</h4>
                </div>
                <p className="text-sm text-slate-600">Relational data: Users, Vehicles, Subscriptions, Geofences.</p>
              </div>
              <div className="bg-red-50 p-5 rounded-xl border border-red-200">
                <div className="flex items-center gap-3 mb-2">
                  <Server className="text-red-600" size={20} />
                  <h4 className="font-semibold text-slate-900">Redis Cluster</h4>
                </div>
                <p className="text-sm text-slate-600">Caching, rate limiting, and Pub/Sub for WebSocket events.</p>
              </div>
            </div>
          </div>

          {/* Hardware Layer */}
          <div className="relative">
            <div className="absolute -top-8 left-1/2 w-px h-8 bg-slate-300"></div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Vehicle Hardware</h3>
            <div className="flex flex-col md:flex-row gap-6 p-6 bg-slate-100 rounded-xl border border-slate-200">
              <div className="flex-1 bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Radio className="text-indigo-600" size={24} />
                    <h4 className="font-semibold text-slate-900">Android Radio Tracker</h4>
                  </div>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">PRIMARY</span>
                </div>
                <p className="text-sm text-slate-600 mb-4">In-dash unit. Connects via 4G/LTE, WiFi fallback. Handles rich telemetry and media.</p>
                <div className="flex gap-2">
                  <Badge icon={<Wifi size={12} />} text="4G/WiFi" />
                  <Badge icon={<Database size={12} />} text="Offline Cache" />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRightLeft className="text-slate-400" size={24} />
              </div>

              <div className="flex-1 bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Cpu className="text-slate-600" size={24} />
                    <h4 className="font-semibold text-slate-900">Hidden GSM Tracker</h4>
                  </div>
                  <span className="px-2 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded">BACKUP</span>
                </div>
                <p className="text-sm text-slate-600 mb-4">Deeply concealed unit with independent battery. Activates if primary is compromised.</p>
                <div className="flex gap-2">
                  <Badge icon={<Radio size={12} />} text="GSM/SMS" />
                  <Badge icon={<Activity size={12} />} text="Low Power" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-2 text-slate-800">
        {icon}
        <h5 className="font-semibold text-sm">{title}</h5>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
      {icon}
      {text}
    </span>
  );
}
