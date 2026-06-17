'use client';

import React from 'react';

export default function SalesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/30">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold">Sales</h1>
            <p className="text-sm text-slate-400">
              View your transaction history, revenue trends, and recent sales activity.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
                <p className="text-sm text-slate-400">Total sales</p>
                <p className="mt-3 text-3xl font-semibold text-emerald-300">$12,480</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
                <p className="text-sm text-slate-400">Orders today</p>
                <p className="mt-3 text-3xl font-semibold text-slate-100">18</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
                <p className="text-sm text-slate-400">Average ticket</p>
                <p className="mt-3 text-3xl font-semibold text-slate-100">$87.20</p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">Sales placeholder</p>
              <p className="mt-3 text-slate-200">
                Add charts, filters, and transaction details here as the next step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}