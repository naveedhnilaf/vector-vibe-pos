'use client';

import React from 'react';
import Link from 'next/link';
import { RiDashboardFill, RiShoppingBag3Fill, RiBankCardFill, RiGroupFill, RiSettings4Fill, RiLogoutBoxRFill } from 'react-icons/ri';

export default function Sidebar({ className = '', isOpen = true, role = 'admin', onLogout }) {
  const adminNav = [
    { key: 'dashboard', label: 'Dashboard', href: '/admin', icon: RiDashboardFill },
    { key: 'products', label: 'Products', href: '/products', icon: RiShoppingBag3Fill },
    { key: 'sales', label: 'Sales', href: '/sales', icon: RiBankCardFill },
    { key: 'customers', label: 'Customers', href: '/customers', icon: RiGroupFill },
    { key: 'settings', label: 'Settings', href: '/settings', icon: RiSettings4Fill },
  ];

  const customerNav = [
    { key: 'home', label: 'Home', href: '/customer', icon: RiDashboardFill },
    { key: 'products', label: 'Products', href: '/products', icon: RiShoppingBag3Fill },
    { key: 'settings', label: 'Settings', href: '/settings', icon: RiSettings4Fill },
  ];

  const nav = role === 'customer' ? customerNav : adminNav;

  if (!isOpen) return null;

  return (
    <aside className={`flex w-64 flex-none flex-col gap-3 rounded-2xl bg-slate-900/40 p-4 transition-all duration-200 ${className}`}>
      <div className="mb-3 px-2">
        <div className="text-sm font-semibold text-slate-300">Navigation</div>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.key}
              href={item.href}
              className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/50 transition"
            >
              <Icon size={20} className="flex-shrink-0 text-emerald-300" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 border-t border-slate-700/50 pt-3">
        {onLogout && (
          <button
            onClick={onLogout}
            type="button"
            className="w-full flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-400/50 transition"
          >
            <RiLogoutBoxRFill size={18} />
            <span>Logout</span>
          </button>
        )}
        <div className="px-2 py-1 text-center text-xs text-slate-500">v1.0 • Offline</div>
      </div>
    </aside>
  );
}