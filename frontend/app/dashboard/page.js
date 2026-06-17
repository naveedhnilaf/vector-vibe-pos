'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.replace('/login');
      return;
    }

    const user = JSON.parse(userData);

    if (user.role === 'customer') {
      router.replace('/customer');
    } else if (user.role === 'admin') {
      router.replace('/admin');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center">
        <p className="text-sm text-slate-400">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}