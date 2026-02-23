import React from 'react';
import { motion } from 'motion/react';
import { Server, Zap, Lock, RefreshCw } from 'lucide-react';

export default function ApiStructure() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">API Structure & Endpoints</h1>
        <p className="mt-2 text-slate-600 max-w-3xl">
          RESTful endpoints for management and ingestion, coupled with WebSockets for real-time bidirectional communication.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* REST API */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <Server className="text-blue-500" size={24} />
            <h2 className="text-xl font-bold text-slate-900">REST API (v1)</h2>
          </div>

          <div className="space-y-4">
            <EndpointGroup title="Device Authentication">
              <Endpoint method="POST" path="/api/v1/auth/device/provision" desc="Exchange provisioning token for mTLS certs." />
              <Endpoint method="POST" path="/api/v1/auth/device/token" desc="Get short-lived JWT using mTLS cert." />
            </EndpointGroup>

            <EndpointGroup title="Telematics Ingestion">
              <Endpoint method="POST" path="/api/v1/telematics/live" desc="Submit single high-priority GPS point." />
              <Endpoint method="POST" path="/api/v1/telematics/batch" desc="Submit array of offline-stored GPS points." />
              <Endpoint method="POST" path="/api/v1/telematics/sms-webhook" desc="Webhook for Twilio/Nexmo to forward SMS payload." />
            </EndpointGroup>

            <EndpointGroup title="Vehicle & Fleet Management">
              <Endpoint method="GET" path="/api/v1/vehicles" desc="List vehicles for owner/fleet admin." />
              <Endpoint method="GET" path="/api/v1/vehicles/:id/location" desc="Get latest known location and status." />
              <Endpoint method="POST" path="/api/v1/vehicles/:id/command" desc="Send async command (e.g., immobilize, siren)." />
            </EndpointGroup>

            <EndpointGroup title="Geofencing">
              <Endpoint method="POST" path="/api/v1/geofences" desc="Create a new polygon/circular geofence." />
              <Endpoint method="GET" path="/api/v1/vehicles/:id/geofences" desc="List active geofences for a vehicle." />
            </EndpointGroup>
          </div>
        </div>

        {/* WebSocket API */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <Zap className="text-amber-500" size={24} />
            <h2 className="text-xl font-bold text-slate-900">WebSocket (Real-time)</h2>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 text-slate-300 font-mono text-sm shadow-lg">
            <div className="flex items-center gap-2 mb-4 text-red-400">
              <Lock size={16} />
              <span>wss://api.ekae-kar.com/ws/live?token=JWT</span>
            </div>
            
            <p className="text-slate-500 mb-4">// Client Subscriptions</p>
            <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto mb-6">
{`{
  "action": "subscribe",
  "topic": "vehicle.12345.location"
}`}
            </pre>

            <p className="text-slate-500 mb-4">// Server Events (Downstream)</p>
            <div className="space-y-4">
              <WsEvent 
                name="location_update" 
                payload={`{ lat: 34.05, lng: -118.24, speed: 65, hdg: 180 }`} 
              />
              <WsEvent 
                name="alert_triggered" 
                payload={`{ type: "geofence_exit", severity: "high", ts: 1710000000 }`} 
              />
              <WsEvent 
                name="device_status" 
                payload={`{ status: "offline", reason: "power_loss", fallback_active: true }`} 
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-4">
            <RefreshCw className="text-blue-500 shrink-0 mt-1" size={20} />
            <div>
              <h4 className="font-semibold text-slate-900">Connection Resilience</h4>
              <p className="text-sm text-slate-600 mt-1">
                Clients must implement exponential backoff for WebSocket reconnections. 
                Missed events during disconnects should be reconciled via the <code className="bg-blue-100 px-1 rounded">GET /api/v1/vehicles/:id/location</code> endpoint upon reconnection.
              </p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function EndpointGroup({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

function Endpoint({ method, path, desc }: { method: string, path: string, desc: string }) {
  const getMethodColor = () => {
    switch(method) {
      case 'GET': return 'bg-red-100 text-red-700';
      case 'POST': return 'bg-blue-100 text-blue-700';
      case 'PUT': return 'bg-amber-100 text-amber-700';
      case 'DELETE': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="bg-white border border-slate-200 p-3 rounded-lg flex flex-col sm:flex-row sm:items-center gap-3 hover:border-slate-300 transition-colors">
      <span className={`px-2 py-1 rounded text-xs font-bold w-16 text-center shrink-0 ${getMethodColor()}`}>
        {method}
      </span>
      <div className="flex-1">
        <code className="text-sm font-mono text-slate-800 font-semibold">{path}</code>
        <p className="text-xs text-slate-500 mt-1">{desc}</p>
      </div>
    </div>
  );
}

function WsEvent({ name, payload }: { name: string, payload: string }) {
  return (
    <div className="border-l-2 border-slate-700 pl-4">
      <span className="text-blue-400 font-semibold">{name}</span>
      <p className="text-slate-400 text-xs mt-1">{payload}</p>
    </div>
  );
}
