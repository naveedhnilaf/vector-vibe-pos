'use client';

import React, { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';

export default function AddProductModal({ isOpen, onClose, onProductAdded }) {
  const [form, setForm] = useState({
    id: '', name: '', description: '', category: '', price: '', stock: '', imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          stock: parseInt(form.stock, 10)
        })
      });

      if (!res.ok) throw new Error('Failed to add product');

      const newProduct = await res.json();
      onProductAdded?.(newProduct);
      setForm({ id: '', name: '', description: '', category: '', price: '', stock: '', imageUrl: '' });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100">Add New Product</h2>
          <button onClick={onClose} className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition">
            <RiCloseLine size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="text-xs text-slate-400">Product ID</label>
            <input name="id" value={form.id} onChange={handleChange} required
              className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400" />
          </div>

          <div>
            <label className="text-xs text-slate-400">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required
              className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400" />
          </div>

          <div>
            <label className="text-xs text-slate-400">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={2}
              className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400">Category</label>
              <input name="category" value={form.category} onChange={handleChange} required
                className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400" />
            </div>
            <div>
              <label className="text-xs text-slate-400">Price</label>
              <input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} required
                className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400">Stock</label>
              <input type="number" name="stock" value={form.stock} onChange={handleChange} required
                className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400" />
            </div>
            <div>
              <label className="text-xs text-slate-400">Image URL</label>
              <input name="imageUrl" value={form.imageUrl} onChange={handleChange} required
                className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400" />
            </div>
          </div>

          {error && <div className="text-xs text-red-400">{error}</div>}

          <button type="submit" disabled={loading}
            className="mt-2 w-full rounded-xl bg-emerald-400 px-4 py-3 font-semibold text-slate-900 shadow hover:bg-emerald-300 transition disabled:opacity-50">
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}