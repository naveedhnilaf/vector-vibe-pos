'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import ProductCard from '../../components/ProductCard';

const sampleOrders = [
  { id: 'ord_001', date: 'Jun 14', total: 89.95, status: 'Delivered' },
  { id: 'ord_002', date: 'Jun 09', total: 42.75, status: 'Processing' },
  { id: 'ord_003', date: 'Jun 02', total: 128.4, status: 'Delivered' },
];

export default function CustomerPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const parsed = JSON.parse(userData);
    if (parsed.role !== 'customer') {
      router.push('/dashboard');
      return;
    }

    setUser(parsed);
  }, [router]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const recommended = useMemo(() => {
    if (!query) return products.slice(0, 4);
    const lower = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lower) ||
        product.category.toLowerCase().includes(lower) ||
        product.description.toLowerCase().includes(lower)
    );
  }, [products, query]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar onSearch={setQuery} onMenuClick={() => setSidebarOpen((open) => !open)} />
      <div className="mx-auto max-w-[1400px] px-4 py-6">
        <div className="flex gap-6">
          <Sidebar isOpen={sidebarOpen} role="customer" onLogout={handleLogout} />
          <main className="flex-1">
            <div className="mb-6 grid gap-4 lg:grid-cols-[1.7fr_1fr]">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl">
                <div className="flex flex-col gap-3">
                  <h1 className="text-3xl font-semibold">Welcome back, {user?.name || 'Customer'}</h1>
                  <p className="text-sm text-slate-400">
                    Here is your customer dashboard. Track orders, view rewards, and discover recommendations.
                  </p>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
                    <p className="text-sm text-slate-400">Loyalty tier</p>
                    <p className="mt-3 text-3xl font-semibold text-emerald-300">Gold</p>
                  </div>
                  <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
                    <p className="text-sm text-slate-400">Orders this month</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-100">4</p>
                  </div>
                  <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
                    <p className="text-sm text-slate-400">Saved credits</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-100">$18.50</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
                  <p className="text-sm text-slate-400">Recent orders</p>
                  <div className="mt-4 space-y-3">
                    {sampleOrders.map((order) => (
                      <div key={order.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm text-slate-300">Order {order.id}</p>
                            <p className="text-sm text-slate-500">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-300">${order.total.toFixed(2)}</p>
                            <p className="text-xs text-emerald-300">{order.status}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
                  <p className="text-sm text-slate-400">Customer support</p>
                  <p className="mt-3 text-slate-200">
                    Need help? Visit settings to update your profile or reach out to support.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Recommended for you</h2>
                  <p className="text-sm text-slate-400">Products based on your recent activity.</p>
                </div>
              </div>

              {loading ? (
                <div className="py-10 text-center text-slate-400">Loading recommendations...</div>
              ) : recommended.length === 0 ? (
                <div className="py-10 text-center text-slate-400">No recommendations available.</div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {recommended.map((product) => (
                    <ProductCard key={product.id} product={product} onAdd={() => {}} />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}