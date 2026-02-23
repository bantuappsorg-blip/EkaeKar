import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, 
  Wifi, 
  Radio, 
  Smartphone, 
  Database, 
  Activity, 
  ChevronRight, 
  MapPin, 
  Car, 
  AlertTriangle, 
  Lock, 
  Server,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Check,
  X,
  LayoutDashboard,
  Network,
  ShieldCheck,
  KeyRound,
  Menu,
  LogOut,
  ArrowRightLeft
} from 'lucide-react';
import SystemArchitecture from './components/SystemArchitecture';
import DataFlow from './components/DataFlow';
import ApiStructure from './components/ApiStructure';
import SecurityChecklist from './components/SecurityChecklist';
import ProvisioningFlow from './components/ProvisioningFlow';

type Tab = 'architecture' | 'dataflow' | 'api' | 'security' | 'provisioning';

export default function App() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState('admin@ekae-kar.com');
  const [password, setPassword] = useState('superadmin_secure');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState<{email?: string, password?: string}>({});
  
  // Dashboard State
  const [activeTab, setActiveTab] = useState<Tab>('architecture');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
    if (savedEmail) {
      setEmail(savedEmail);
    }
    if (savedLoginStatus) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {email?: string, password?: string} = {};
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoggedIn(true);
      setIsLoginOpen(false);
      
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('isLoggedIn');
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const dashboardTabs = [
    { id: 'architecture', label: 'System Architecture', icon: Network },
    { id: 'dataflow', label: 'Failover Data Flow', icon: ArrowRightLeft },
    { id: 'api', label: 'API Structure', icon: Server },
    { id: 'security', label: 'Security Checklist', icon: ShieldCheck },
    { id: 'provisioning', label: 'Provisioning Flow', icon: KeyRound },
  ] as const;

  const renderDashboardContent = () => {
    switch (activeTab) {
      case 'architecture': return <SystemArchitecture />;
      case 'dataflow': return <DataFlow />;
      case 'api': return <ApiStructure />;
      case 'security': return <SecurityChecklist />;
      case 'provisioning': return <ProvisioningFlow />;
      default: return <SystemArchitecture />;
    }
  };

  if (isLoggedIn) {
    return (
      <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#D32F2F] flex items-center justify-center">
                <MapPin size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Ekae-Kar</span>
            </div>
            <button 
              className="lg:hidden text-slate-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="px-6 pb-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Admin Dashboard
            </p>
          </div>

          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {dashboardTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-[#D32F2F]/10 text-[#D32F2F]' 
                      : 'hover:bg-slate-800 hover:text-white'}
                  `}
                >
                  <Icon size={18} className={isActive ? 'text-[#D32F2F]' : 'text-slate-500'} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50">
          <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between lg:justify-end shrink-0">
            <button 
              className="lg:hidden text-slate-600 hover:text-slate-900"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="hidden sm:inline">Welcome, Super Admin</span>
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                SA
              </div>
            </div>
          </header>
          
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            <div className="max-w-6xl mx-auto">
              {renderDashboardContent()}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#D32F2F] selection:text-white">
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D32F2F] rounded-lg flex items-center justify-center">
              <MapPin size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Ekae-Kar</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="text-sm font-bold text-white hover:text-gray-300 transition-colors hidden sm:block"
            >
              Login
            </button>
            <button className="bg-[#D32F2F] hover:bg-[#b72828] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-[0_0_15px_rgba(211,47,47,0.3)] hover:shadow-[0_0_25px_rgba(211,47,47,0.5)]">
              Get Ekae-Kar
            </button>
          </div>
        </div>
      </nav>

      {isLoginOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#141414] border border-white/10 rounded-2xl p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <button 
              onClick={() => setIsLoginOpen(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-[#D32F2F] rounded-lg flex items-center justify-center">
                <MapPin size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Ekae-Kar</span>
            </div>

            <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D32F2F] transition-colors`} 
                />
                {errors.email && <p className="text-[#D32F2F] text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-white/5 border ${errors.password ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D32F2F] transition-colors`} 
                />
                {errors.password && <p className="text-[#D32F2F] text-xs mt-1">{errors.password}</p>}
              </div>
              
              <div className="flex items-center justify-between text-sm mt-2 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-white/10 bg-white/5 text-[#D32F2F] focus:ring-[#D32F2F]" 
                  />
                  <span className="text-gray-400">Remember me</span>
                </label>
                <a href="#" className="text-[#D32F2F] hover:text-[#ff6b6b] transition-colors">Forgot password?</a>
              </div>

              <button type="submit" className="w-full bg-[#D32F2F] hover:bg-[#b72828] text-white py-3 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(211,47,47,0.3)]">
                Login
              </button>
              
              <div className="mt-6 p-4 bg-[#D32F2F]/10 border border-[#D32F2F]/20 rounded-xl text-sm text-gray-300">
                <p className="font-bold text-[#D32F2F] mb-2 flex items-center gap-2">
                  <ShieldAlert size={16} />
                  Super Admin Credentials
                </p>
                <div className="space-y-1 font-mono text-xs">
                  <p><span className="text-gray-500">Email:</span> admin@ekae-kar.com</p>
                  <p><span className="text-gray-500">Pass:</span> superadmin_secure</p>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(211,47,47,0.15)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#D32F2F] animate-pulse" />
                Hybrid Tracking Technology
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                The Smart Car Tracker That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D32F2F] to-[#ff6b6b]">Never Stops.</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl">
                Unbreakable hybrid tracking combining GPS, Mobile Data, WiFi, and SMS fallback. When others go offline, Ekae-Kar keeps you connected.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#D32F2F] hover:bg-[#b72828] text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(211,47,47,0.4)] flex items-center justify-center gap-2 group">
                  Start Tracking Today
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-all border border-white/10 flex items-center justify-center gap-2">
                  View Demo
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:h-[600px] flex items-center justify-center"
            >
              <div className="relative w-full aspect-square max-w-md">
                <div className="absolute inset-0 rounded-full border border-[#D32F2F]/20 animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border border-[#D32F2F]/40 animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-8 rounded-full border border-[#D32F2F]/60 border-dashed animate-[spin_20s_linear_infinite]" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <Car size={120} className="text-white/80" strokeWidth={1} />
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#D32F2F] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(211,47,47,0.8)] animate-bounce">
                      <MapPin size={24} className="text-white" />
                    </div>
                  </div>
                </div>

                <div className="absolute top-10 left-10 bg-black/80 backdrop-blur border border-white/10 p-3 rounded-xl shadow-xl">
                  <Wifi className="text-[#D32F2F]" size={20} />
                </div>
                <div className="absolute bottom-20 right-10 bg-black/80 backdrop-blur border border-white/10 p-3 rounded-xl shadow-xl">
                  <Radio className="text-[#D32F2F]" size={20} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-[#0f0f0f] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Engineered for Absolute Reliability</h2>
            <p className="text-gray-400 text-lg">Our hybrid ecosystem ensures your vehicle is always connected, monitored, and secure.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Wifi />}
              title="Hybrid Tracking"
              desc="Seamlessly switches between GPS, 4G/LTE, trusted WiFi, and SMS fallback to maintain connection anywhere."
            />
            <FeatureCard 
              icon={<ShieldAlert />}
              title="Anti-theft & Risk Scoring"
              desc="Advanced algorithms detect suspicious behavior, unauthorized movement, and calculate real-time risk scores."
            />
            <FeatureCard 
              icon={<Radio />}
              title="Dual Device Failover"
              desc="Primary Android Radio tracker backed by a deeply concealed, battery-powered GSM tracker."
            />
            <FeatureCard 
              icon={<Activity />}
              title="Fleet Management"
              desc="Comprehensive dashboard for managing thousands of vehicles, routes, and driver behavior."
            />
            <FeatureCard 
              icon={<Database />}
              title="Offline Auto-Sync"
              desc="Stores GPS points locally during dead zones and batch-syncs automatically when connection is restored."
            />
            <FeatureCard 
              icon={<Smartphone />}
              title="Remote Immobilization"
              desc="Instantly disable the vehicle's engine safely from your mobile app in case of confirmed theft."
            />
          </div>
        </div>
      </section>

      <section id="security" className="py-24 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-[radial-gradient(circle_at_center,rgba(211,47,47,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Insurance-Grade Security</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Ekae-Kar doesn't just track; it actively defends. Our dual-layer hardware architecture means thieves can't simply unplug the system.
              </p>
              
              <div className="space-y-6">
                <SecurityItem 
                  title="Tamper Detection"
                  desc="Instant alerts for power disconnects, SIM removal, or physical tampering attempts."
                />
                <SecurityItem 
                  title="Hidden Backup Activation"
                  desc="If the primary unit is compromised, the concealed battery-powered tracker wakes up instantly."
                />
                <SecurityItem 
                  title="Encrypted Telemetry"
                  desc="All data is secured with AES-256 encryption and mutual TLS authentication."
                />
              </div>
            </div>

            <div className="relative">
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D32F2F] to-transparent opacity-50" />
                
                <div className="flex flex-col gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                        <Server className="text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-bold">Primary Radio Tracker</h4>
                        <p className="text-xs text-gray-400">4G/LTE • Continuous Tracking</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30 animate-pulse">
                      TAMPER DETECTED
                    </div>
                  </div>

                  <div className="flex justify-center -my-4 relative z-0">
                    <div className="w-px h-12 bg-gradient-to-b from-red-500/50 to-emerald-500/50" />
                  </div>

                  <div className="bg-[#D32F2F]/10 border border-[#D32F2F]/30 rounded-xl p-5 flex items-center justify-between relative z-10 shadow-[0_0_30px_rgba(211,47,47,0.15)]">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#D32F2F]/20 flex items-center justify-center border border-[#D32F2F]/50">
                        <Lock className="text-[#D32F2F]" />
                      </div>
                      <div>
                        <h4 className="font-bold">Hidden GSM Tracker</h4>
                        <p className="text-xs text-gray-400">Independent Battery • Stealth Mode</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                      ACTIVATED
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 bg-[#0a0a0a] border-t border-white/5 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-[radial-gradient(circle_at_center,rgba(211,47,47,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h2>
            <p className="text-gray-400 text-lg mb-8">Choose the level of protection that fits your needs. Upgrade anytime.</p>
            
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-14 h-7 rounded-full bg-white/10 border border-white/20 relative transition-colors hover:bg-white/20"
              >
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-[#D32F2F] transition-all ${isAnnual ? 'left-8' : 'left-1'}`} />
              </button>
              <span className={`text-sm font-medium flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
                Annually
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D32F2F]/20 text-[#D32F2F] border border-[#D32F2F]/30">
                  SAVE 10%
                </span>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
              <h3 className="text-2xl font-bold mb-2">Ekae-Kar Basic</h3>
              <p className="text-gray-400 text-sm mb-6">Radio Only Tracking</p>
              <div className="mb-8">
                <span className="text-4xl font-bold">R{isAnnual ? Math.round(199 * 0.9) : 199}</span>
                <span className="text-gray-400">/month</span>
                {isAnnual && <div className="text-sm text-[#D32F2F] mt-1">Billed R{Math.round(199 * 0.9 * 12)} yearly</div>}
              </div>
              <ul className="space-y-4 mb-8">
                <PricingFeature text="GPS + Mobile Data tracking" />
                <PricingFeature text="SMS fallback" />
                <PricingFeature text="Offline data sync" />
                <PricingFeature text="Anti-tamper alerts" />
                <PricingFeature text="Risk scoring dashboard" />
              </ul>
              <button className="w-full py-4 rounded-full font-bold transition-all border border-white/20 hover:bg-white/10">
                Subscribe Basic
              </button>
            </div>

            <div className="bg-[#141414] border border-[#D32F2F]/50 rounded-3xl p-8 relative shadow-[0_0_30px_rgba(211,47,47,0.15)] transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-[#D32F2F] rounded-full text-xs font-bold tracking-wider">
                RECOMMENDED
              </div>
              <h3 className="text-2xl font-bold mb-2">Ekae-Kar Pro</h3>
              <p className="text-[#D32F2F] text-sm mb-6 font-medium">Radio + Hidden Backup Tracker</p>
              <div className="mb-8">
                <span className="text-4xl font-bold">R{isAnnual ? Math.round(399 * 0.9) : 399}</span>
                <span className="text-gray-400">/month</span>
                {isAnnual && <div className="text-sm text-[#D32F2F] mt-1">Billed R{Math.round(399 * 0.9 * 12)} yearly</div>}
              </div>
              <ul className="space-y-4 mb-8">
                <PricingFeature text="Everything in Basic" />
                <PricingFeature text="Dual-device failover" highlighted />
                <PricingFeature text="Hidden GSM backup tracker" highlighted />
                <PricingFeature text="Fleet management support" highlighted />
                <PricingFeature text="Insurance-grade anti-theft" highlighted />
                <PricingFeature text="Priority customer support" highlighted />
              </ul>
              <button className="w-full bg-[#D32F2F] hover:bg-[#b72828] text-white py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(211,47,47,0.4)]">
                Subscribe Pro Now
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <h3 className="text-2xl font-bold mb-8 text-center">Compare Features</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-6 font-medium text-gray-400">Feature</th>
                  <th className="py-4 px-6 font-medium text-center">Basic</th>
                  <th className="py-4 px-6 font-bold text-center text-[#D32F2F]">Pro</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <TableRow feature="GPS + Mobile Data Tracking" basic={true} pro={true} />
                <TableRow feature="SMS Fallback & Offline Sync" basic={true} pro={true} />
                <TableRow feature="Anti-Tamper Alerts" basic={true} pro={true} />
                <TableRow feature="Risk Scoring Dashboard" basic={true} pro={true} />
                <TableRow feature="Hidden GSM Backup Tracker" basic={false} pro={true} />
                <TableRow feature="Dual-Device Failover" basic={false} pro={true} />
                <TableRow feature="Fleet Management Support" basic={false} pro={true} />
                <TableRow feature="Insurance-Grade Anti-Theft" basic={false} pro={true} />
                <TableRow feature="Priority 24/7 Support" basic={false} pro={true} />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#D32F2F] mix-blend-multiply opacity-10" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Secure Your Vehicle?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of vehicle owners and fleet managers who trust Ekae-Kar for ultimate peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#D32F2F] hover:bg-[#b72828] text-white px-10 py-5 rounded-full text-lg font-bold transition-all shadow-[0_0_30px_rgba(211,47,47,0.5)] hover:scale-105">
              Get Ekae-Kar Now
            </button>
            <button className="bg-white text-black hover:bg-gray-100 px-10 py-5 rounded-full text-lg font-bold transition-all hover:scale-105">
              Start Free Fleet Trial
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-[#050505] border-t border-white/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#D32F2F] rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">Ekae-Kar</span>
              </div>
              <p className="text-gray-400 max-w-sm mb-6">
                The ultimate hybrid GPS tracking ecosystem. Unbreakable security, intelligent failover, and real-time fleet management.
              </p>
              <div className="flex gap-4">
                <SocialIcon icon={<Twitter size={20} />} />
                <SocialIcon icon={<Facebook size={20} />} />
                <SocialIcon icon={<Instagram size={20} />} />
                <SocialIcon icon={<Linkedin size={20} />} />
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fleet Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hardware Specs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center md:text-left text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>© 2026 Ekae-Kar Systems. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Designed for absolute security.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group">
      <div className="w-12 h-12 bg-[#D32F2F]/10 text-[#D32F2F] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function SecurityItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">
        <div className="w-6 h-6 rounded-full bg-[#D32F2F]/20 flex items-center justify-center">
          <AlertTriangle size={12} className="text-[#D32F2F]" />
        </div>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <p className="text-gray-400 text-sm">{desc}</p>
      </div>
    </div>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#D32F2F] hover:border-[#D32F2F] transition-all">
      {icon}
    </a>
  );
}

function PricingFeature({ text, highlighted = false }: { text: string, highlighted?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <div className={`mt-0.5 rounded-full p-0.5 ${highlighted ? 'bg-[#D32F2F]/20 text-[#D32F2F]' : 'bg-white/10 text-white'}`}>
        <Check size={14} />
      </div>
      <span className={highlighted ? 'text-white font-medium' : 'text-gray-300'}>{text}</span>
    </li>
  );
}

function TableRow({ feature, basic, pro }: { feature: string, basic: boolean, pro: boolean }) {
  return (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
      <td className="py-4 px-6 text-gray-300">{feature}</td>
      <td className="py-4 px-6 text-center">
        {basic ? <Check size={18} className="mx-auto text-gray-400" /> : <X size={18} className="mx-auto text-gray-600" />}
      </td>
      <td className="py-4 px-6 text-center">
        {pro ? <Check size={18} className="mx-auto text-[#D32F2F]" /> : <X size={18} className="mx-auto text-gray-600" />}
      </td>
    </tr>
  );
}
