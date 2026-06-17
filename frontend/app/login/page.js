'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiEyeFill, RiEyeOffFill, RiShoppingBag3Fill } from 'react-icons/ri';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [cardTransform, setCardTransform] = useState('');
  const cardRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      'user',
      JSON.stringify({
        name: email || 'User',
        role,
      })
    );

    router.push('/dashboard');
  };

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    const rx = -(py * 10).toFixed(2);
    const ry = (px * 12).toFixed(2);
    setCardTransform(`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`);
  };

  const onLeave = () => setCardTransform('perspective(900px) rotateX(0deg) rotateY(0deg)');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black flex items-center justify-center p-6">
      <div className="relative w-full max-w-4xl">
        <div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ transform: cardTransform, transition: 'transform 120ms ease-out' }}
          className="mx-auto flex h-full w-full items-stretch gap-8 rounded-3xl bg-slate-900/70 p-8 shadow-2xl backdrop-blur-lg border border-slate-800"
        >
          <div className="hidden w-1/2 flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-emerald-600/10 to-sky-600/6 p-6 md:flex">
            <div className="relative h-56 w-56 flex items-center justify-center">
              <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-400 to-teal-300 opacity-25 blur-3xl transform -rotate-12" />
              <div className="absolute right-0 bottom-0 h-40 w-40 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-400 opacity-20 blur-2xl" />
              <div
                className="relative flex h-32 w-32 items-center justify-center rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(52,211,153,0.25), rgba(99,102,241,0.25))',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 8px 32px rgba(52,211,153,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                <RiShoppingBag3Fill size={56} className="text-emerald-300" />
              </div>
            </div>
            <p className="mt-2 max-w-xs text-sm text-slate-300">
              Welcome to Vector Vibe POS — secure access with an elegant 3D login experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full rounded-2xl bg-slate-950/60 p-6 backdrop-blur-sm">
            <h1 className="text-3xl font-semibold text-white">Sign in</h1>
            <p className="mt-2 text-sm text-slate-400">Enter your credentials to continue to the dashboard.</p>

            <label className="mt-6 block text-sm text-slate-300">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-400"
              />
            </label>

            <label className="mt-4 block text-sm text-slate-300">
              Password
              <div className="mt-2 flex items-center gap-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-slate-300 hover:text-white transition"
                >
                  {showPassword ? <RiEyeOffFill size={18} /> : <RiEyeFill size={18} />}
                </button>
              </div>
              <div className="mt-2 text-xs text-slate-500">Tip: click the eye to toggle visibility</div>
            </label>

            <label className="mt-4 block text-sm text-slate-300">
              Role
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-400"
              >
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select>
            </label>

            <div className="mt-6 flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-700 bg-slate-900" />
                Remember me
              </label>
              <a className="text-sm text-emerald-300 hover:underline" href="#">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-emerald-400 px-4 py-3 font-semibold text-slate-900 shadow hover:bg-emerald-300"
            >
              Sign In
            </button>

            <div className="mt-5 text-center text-xs text-slate-500">By signing in you agree to the Terms of Service.</div>
          </form>
        </div>
      </div>
    </div>
  );
}