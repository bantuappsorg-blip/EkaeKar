import React from 'react';
import { motion } from 'motion/react';
import { Factory, Wrench, QrCode, Smartphone, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ProvisioningFlow() {
  const steps = [
    {
      icon: <Factory size={24} />,
      title: "1. Manufacturing & Flashing",
      actor: "Manufacturer",
      desc: "Devices are flashed with a unique hardware ID (IMEI/MAC) and an initial bootstrap certificate. The Hidden Tracker is pre-configured with a dormant SIM.",
      color: "bg-slate-100 text-slate-600 border-slate-200"
    },
    {
      icon: <Wrench size={24} />,
      title: "2. Physical Installation",
      actor: "Certified Installer",
      desc: "Installer mounts the Android Radio in the dash and conceals the Hidden Tracker. They pair the two devices via secure Bluetooth LE or serial connection.",
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      icon: <QrCode size={24} />,
      title: "3. Registration Scan",
      actor: "Certified Installer",
      desc: "Using the Admin App, the installer scans QR codes on both devices and the vehicle VIN. This links the hardware to the specific vehicle in the database.",
      color: "bg-purple-50 text-purple-600 border-purple-200"
    },
    {
      icon: <ServerIcon />,
      title: "4. Certificate Exchange",
      actor: "System Backend",
      desc: "Devices connect to the Provisioning API using bootstrap certs. The backend verifies the installer's scan and issues operational mTLS certificates and encryption keys.",
      color: "bg-amber-50 text-amber-600 border-amber-200"
    },
    {
      icon: <Smartphone size={24} />,
      title: "5. Owner Claiming",
      actor: "Vehicle Owner",
      desc: "Owner downloads the Mobile App, enters the VIN and a secure PIN provided by the dealer. The app links the owner's account to the vehicle.",
      color: "bg-indigo-50 text-indigo-600 border-indigo-200"
    },
    {
      icon: <CheckCircle2 size={24} />,
      title: "6. Activation & Billing",
      actor: "System Backend",
      desc: "Subscription is activated via Stripe. Real-time tracking begins, and the Hidden Tracker enters deep sleep mode, awaiting a wake signal.",
      color: "bg-red-50 text-red-600 border-red-200"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Device Registration & Provisioning</h1>
        <p className="mt-2 text-slate-600 max-w-3xl">
          Secure, multi-step workflow to ensure devices are legitimately installed, cryptographically verified, and securely linked to the correct owner.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative">
        {/* Vertical Line for Desktop */}
        <div className="hidden md:block absolute left-1/2 top-12 bottom-12 w-px bg-slate-200 -translate-x-1/2"></div>

        <div className="space-y-12 relative">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Content */}
                <div className={`flex-1 w-full md:w-1/2 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                  <div className={`
                    inline-block p-6 rounded-2xl border bg-white shadow-sm relative
                    ${isEven ? 'md:mr-12' : 'md:ml-12'}
                  `}>
                    <div className="flex items-center gap-3 mb-3 justify-start">
                      <div className={`p-2 rounded-lg border ${step.color}`}>
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{step.title}</h3>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{step.actor}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed text-left">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-white border-4 border-slate-200 rounded-full items-center justify-center z-10">
                  <span className="text-slate-400 font-bold text-sm">{index + 1}</span>
                </div>

                {/* Empty Space for alignment */}
                <div className="hidden md:block flex-1 w-1/2"></div>

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center -my-4 text-slate-300">
                    <ArrowRight className="rotate-90" size={24} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function ServerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  );
}
