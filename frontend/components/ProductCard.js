'use client';

import React from 'react';

export default function ProductCard({ product, onAdd, onSelect }) {
  const { id, name, description, price, stock, imageUrl, category } = product || {};

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-sm">
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect?.(product)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onSelect?.(product);
        }}
        className="relative flex w-full flex-col items-stretch gap-0 text-left cursor-pointer"
      >
        <div className="relative flex h-44 items-center justify-center bg-slate-900/60 p-4 transition-transform group-hover:scale-[1.02]">
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="max-h-full max-w-full object-contain"
          />
          <div className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-2 py-1 text-xs font-semibold text-slate-200">
            {stock} Stock
          </div>
          <div className="absolute right-3 top-3 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-300">
            {category}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold text-slate-100">{name}</h3>
          <p className="mt-2 text-xs leading-5 text-slate-400 line-clamp-3">{description}</p>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-emerald-300">${Number(price).toFixed(2)}</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd?.(product);
                }}
                className="rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 text-sm text-slate-200 hover:border-emerald-400 hover:text-emerald-300"
              >
                + Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}