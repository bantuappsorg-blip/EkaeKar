import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, FileCode2, Network, Cpu, Smartphone } from 'lucide-react';

export default function SecurityChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set([
    'mtls', 'payload-enc', 'jwt'
  ]));

  const toggleCheck = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const categories = [
    {
      title: "Transport & Network Security",
      icon: <Network className="text-blue-500" />,
      items: [
        { id: 'mtls', label: 'Mutual TLS (mTLS)', desc: 'Require client certificates for all device-to-server API communication to prevent spoofing.' },
        { id: 'waf', label: 'Web Application Firewall (WAF)', desc: 'Deploy WAF at the edge to block SQLi, XSS, and implement strict rate limiting per IP/Device ID.' },
        { id: 'cert-pinning', label: 'Certificate Pinning', desc: 'Pin server certificates within the Android Radio app to prevent Man-in-the-Middle (MitM) attacks.' }
      ]
    },
    {
      title: "Data & Payload Security",
      icon: <Lock className="text-red-500" />,
      items: [
        { id: 'payload-enc', label: 'SMS Payload Encryption', desc: 'Encrypt SMS fallback data using AES-256-GCM with pre-shared keys unique to each device.' },
        { id: 'db-enc', label: 'Database Encryption at Rest', desc: 'Encrypt TimescaleDB and PostgreSQL volumes using cloud-provider KMS.' },
        { id: 'pii-masking', label: 'PII Masking', desc: 'Mask owner details and exact home locations in admin dashboards unless explicit access is granted.' }
      ]
    },
    {
      title: "Authentication & Authorization",
      icon: <ShieldCheck className="text-purple-500" />,
      items: [
        { id: 'jwt', label: 'Short-lived JWTs', desc: 'Use JWTs with 15-minute expiration and implement refresh token rotation for mobile/web clients.' },
        { id: 'rbac', label: 'Strict RBAC', desc: 'Enforce Role-Based Access Control. Fleet managers can only see assigned vehicles; installers only see provisioning APIs.' },
        { id: 'device-auth', label: 'Hardware Root of Trust', desc: 'Store private keys in Android Keystore (TEE) or dedicated secure element on the hidden tracker.' }
      ]
    },
    {
      title: "Device & Application Hardening",
      icon: <Cpu className="text-amber-500" />,
      items: [
        { id: 'obfuscation', label: 'Code Obfuscation', desc: 'Use ProGuard/R8 for Android Radio app to deter reverse engineering of API endpoints and logic.' },
        { id: 'tamper', label: 'Physical Tamper Detection', desc: 'Implement hardware triggers (e.g., light sensor, power cut detection) to instantly alert the backend and activate the hidden tracker.' },
        { id: 'ota', label: 'Signed OTA Updates', desc: 'Ensure all Over-The-Air firmware updates are cryptographically signed and verified before installation.' }
      ]
    }
  ];

  const progress = Math.round((checkedItems.size / categories.reduce((acc, cat) => acc + cat.items.length, 0)) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Security Hardening</h1>
          <p className="mt-2 text-slate-600 max-w-2xl">
            Comprehensive security checklist to protect vehicle telemetry, user privacy, and prevent unauthorized access or device spoofing.
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm min-w-[200px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-slate-700">Implementation</span>
            <span className="text-sm font-bold text-red-600">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div className="bg-red-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map((category, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-3">
              {category.icon}
              <h2 className="font-bold text-slate-900">{category.title}</h2>
            </div>
            <div className="p-2">
              {category.items.map((item) => {
                const isChecked = checkedItems.has(item.id);
                return (
                  <div 
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`
                      p-4 m-2 rounded-xl cursor-pointer transition-all border
                      ${isChecked 
                        ? 'bg-red-50/50 border-red-200' 
                        : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'}
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`
                        mt-0.5 shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors
                        ${isChecked ? 'bg-red-500 border-red-500 text-white' : 'border-slate-300 bg-white'}
                      `}>
                        {isChecked && <ShieldCheck size={14} />}
                      </div>
                      <div>
                        <h3 className={`font-semibold text-sm ${isChecked ? 'text-red-900' : 'text-slate-900'}`}>
                          {item.label}
                        </h3>
                        <p className={`text-xs mt-1 leading-relaxed ${isChecked ? 'text-red-700/80' : 'text-slate-500'}`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
