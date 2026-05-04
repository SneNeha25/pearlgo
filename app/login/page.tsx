'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState<'login' | 'register'>('login');

  // login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // register
  const [name, setName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClose = () => router.push('/');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('LOGIN', { email, password });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('REGISTER', { name, regEmail, regPassword });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 px-4">
      {/* MODAL */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex relative">
        {/* CLOSE BUTTON */}
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        {/* LEFT IMAGE */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
            alt="Sri Lanka Travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-xl font-bold">Explore Sri Lanka</h2>
            <p className="text-sm opacity-90">Plan your journey with Pearlgo</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 p-6 md:p-10">
          {/* TABS */}
          <div className="flex justify-center gap-8 mb-6">
            <button
              onClick={() => setMode('login')}
              className={`text-sm font-semibold pb-2 transition ${
                mode === 'login' ? 'text-[#004aad] border-b-2 border-[#004aad]' : 'text-gray-400'
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setMode('register')}
              className={`text-sm font-semibold pb-2 transition ${
                mode === 'register' ? 'text-[#004aad] border-b-2 border-[#004aad]' : 'text-gray-400'
              }`}
            >
              Register
            </button>
          </div>

          {/* TITLE */}
          <h1 className="text-2xl font-bold text-center text-[#004aad]">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h1>

          <p className="text-center text-xs text-gray-500 mt-1">
            {mode === 'login' ? 'Sign in to continue your journey' : 'Join Pearlgo and start exploring'}
          </p>

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <div>
                <label className="text-xs text-gray-600">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full mt-1 px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#004aad] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full mt-1 px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#004aad] outline-none"
                  required
                />
              </div>

              <button className="w-full bg-[#004aad] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-800 transition">
                LOGIN
              </button>

              <p
                onClick={() => setMode('register')}
                className="text-center text-xs text-[#004aad] cursor-pointer hover:underline"
              >
                Don’t have an account? Register
              </p>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="mt-6 space-y-4">
              <div>
                <label className="text-xs text-gray-600">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full mt-1 px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#004aad]"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">Email</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full mt-1 px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#004aad]"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">Password</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Create password"
                  className="w-full mt-1 px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#004aad]"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full mt-1 px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#004aad]"
                  required
                />
              </div>

              <button className="w-full bg-[#004aad] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-800 transition">
                REGISTER
              </button>

              <p
                onClick={() => setMode('login')}
                className="text-center text-xs text-[#004aad] cursor-pointer hover:underline"
              >
                Already have an account? Login
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
