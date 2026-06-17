'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from '../../components/ProductCard';

const sampleProducts = []; // optional fallback

export default function ProductsPage() {
  const [products, setProducts] = useState(sampleProducts);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setLoading(true);
    // Put products.json in frontend/public/products.json
    fetch('/products.json')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setProducts(Array.isArray(data) ? data : sampleProducts))
      .catch(() => setProducts(sampleProducts))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!q) return products;
    const s = q.toLowerCase();
    return products.filter(
      (p) =>
        (p.name || '').toLowerCase().includes(s) ||
        (p.category || '').toLowerCase().includes(s) ||
        (p.description || '').toLowerCase().includes(s)
    );
  }, [products, q]);

  const addToCart = (product) => {
    setCart((c) => {
      const ex = c.find((i) => i.id === product.id);
      if (ex) return c.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...c, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Products</h1>
            <p className="text-sm text-slate-400">Browse and add products to your POS orders.</p>
          </div>

          <div className="flex flex-1 max-w-md items-center justify-end">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products or categories..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-200 outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        <div>
          {loading ? (
            <div className="py-20 text-center text-slate-400">Loading products...</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-slate-400">No products found.</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} onSelect={() => {}} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 rounded-lg border border-slate-800 p-4">
          <div className="text-sm text-slate-300">Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)</div>
        </div>
      </div>
    </div>
  );
}