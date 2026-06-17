'use client';

import React from 'react';

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/30">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold">Settings</h1>
            <p className="text-sm text-slate-400">
              Configure POS preferences, payment options, and store settings.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
                <p className="text-sm text-slate-400">General settings</p>
                <p className="mt-3 text-slate-200">Update store name, currency, and basic preferences.</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
                <p className="text-sm text-slate-400">Payment & security</p>
                <p className="mt-3 text-slate-200">Add payment methods, user roles, and security rules.</p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">Placeholder controls</p>
              <p className="mt-3 text-slate-200">
                You can replace this with toggles, inputs, and admin settings next.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}