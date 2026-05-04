'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Shield, LogOut, CheckCircle2 } from 'lucide-react';

interface SettingsState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
}

export default function Settings() {
  const router = useRouter();

  const [settings, setSettings] = useState<SettingsState>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    location: 'New York, USA',
  });

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const update = (key: keyof SettingsState, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }, 900);
  };

  const handlePasswordUpdate = () => {
    if (password.length < 6) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPassword('');
      setPasswordUpdated(true);
      setTimeout(() => setPasswordUpdated(false), 2500);
    }, 900);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const initials = settings.firstName.charAt(0) + settings.lastName.charAt(0);

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-24 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Account Settings</h1>
            <p className="text-slate-500 text-sm">Manage your profile and security preferences</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-red-500 hover:bg-red-50 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* SUCCESS MESSAGES */}
        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-xl border border-green-100"
            >
              <CheckCircle2 size={18} />
              Profile updated successfully
            </motion.div>
          )}

          {passwordUpdated && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-3 rounded-xl border border-blue-100"
            >
              <CheckCircle2 size={18} />
              Password updated successfully
            </motion.div>
          )}
        </AnimatePresence>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">
              {initials}
            </div>
            <div>
              <h2 className="text-lg font-semibold">Profile</h2>
              <p className="text-sm text-slate-500">Personal information</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="input"
              value={settings.firstName}
              onChange={(e) => update('firstName', e.target.value)}
              placeholder="First name"
            />
            <input
              className="input"
              value={settings.lastName}
              onChange={(e) => update('lastName', e.target.value)}
              placeholder="Last name"
            />
            <input
              className="input"
              value={settings.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="Email"
            />
            <input
              className="input"
              value={settings.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="Phone"
            />
            <input
              className="input md:col-span-2"
              value={settings.location}
              onChange={(e) => update('location', e.target.value)}
              placeholder="Location"
            />
          </div>

          <button
            onClick={handleSave}
            className="mt-5 w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-black transition"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* SECURITY CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-slate-700" />
            <div>
              <h2 className="text-lg font-semibold">Security</h2>
              <p className="text-sm text-slate-500">Update your password</p>
            </div>
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password (min 6 chars)"
              className="input pr-10"
            />

            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-500">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            onClick={handlePasswordUpdate}
            disabled={password.length < 6}
            className="mt-4 w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-black transition disabled:opacity-40"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </div>

      {/* INPUT STYLE */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          outline: none;
          transition: all 0.2s ease;
        }

        .input:focus {
          background: white;
          border-color: #cbd5e1;
          box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.05);
        }
      `}</style>
    </main>
  );
}
