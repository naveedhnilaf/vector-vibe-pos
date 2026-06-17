'use client';

import React from 'react';
import { RiShoppingBag3Fill, RiShoppingCart2Fill, RiNotification3Fill } from 'react-icons/ri';

export default function Navbar({ onSearch, cartCount = 0, onCartClick, onMenuClick }) {
  return (
    <header
      className="flex items-center justify-between gap-4 px-6 py-3 border border-white/10 backdrop-blur-xl"
      style={{
        background: 'rgba(15, 23, 42, 0.5)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
        borderRadius: '16px',
        margin: '12px',
      }}
    >
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="rounded-md p-2 text-slate-300 hover:bg-white/10 transition">☰</button>

        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, rgba(52,211,153,0.25), rgba(99,102,241,0.25))',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 12px rgba(52,211,153,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          <RiShoppingBag3Fill size={22} className="text-emerald-300" />
        </div>

        <div>
          <div className="text-sm text-slate-400">Point of Sale</div>
          <div className="text-lg font-semibold text-slate-100">Vector Vibe POS</div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-2xl">
          <input
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder="Search products, SKU, category..."
            className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-2 text-sm text-slate-200 outline-none focus:border-emerald-400 transition"
            style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)' }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-300 transition shadow-lg shadow-emerald-400/30">
          New Access
        </button>

        <button
          onClick={onCartClick}
          className="relative flex items-center justify-center rounded-full border border-white/10 p-2.5 text-slate-300 hover:border-emerald-400/50 hover:text-emerald-300 transition backdrop-blur-sm"
          style={{ background: 'rgba(255,255,255,0.03)' }}
          aria-label="Cart"
        >
          <RiShoppingCart2Fill size={18} />
          {cartCount > 0 && (
            <span
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-xs font-bold text-slate-900"
              style={{ boxShadow: '0 2px 6px rgba(52, 211, 153, 0.5)' }}
            >
              {cartCount}
            </span>
          )}
        </button>

        <button
          className="flex items-center justify-center rounded-full border border-white/10 p-2.5 text-slate-300 hover:border-slate-400/50 transition"
          style={{ background: 'rgba(255,255,255,0.03)' }}
          aria-label="Notifications"
        >
          <RiNotification3Fill size={18} />
        </button>

        <div
          className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <div
            className="h-8 w-8 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #4f8ef7, #6f5ef7)',
              boxShadow: '0 2px 8px rgba(79, 142, 247, 0.4)',
            }}
          />
          <div className="hidden text-sm text-slate-200 md:block">Admin</div>
        </div>
      </div>
    </header>
  );
}