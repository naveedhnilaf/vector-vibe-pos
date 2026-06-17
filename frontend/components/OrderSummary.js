'use client';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export default function OrderSummary({
  cartItems = [],
  promoEnabled = true,
  isSubmitting = false,
  onTogglePromo,
  onResetOrder,
  onRemoveItem,
  onQuantityChange,
  onChangeMethod,
  onSubmitOrder,
  orderStatus,
}) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.12;
  const discount = promoEnabled ? subtotal * 0.1 : 0;
  const totalPayment = subtotal + tax - discount;

  const variantOptions = [
    { size: '42', color: 'Green' },
    { size: '42', color: 'Brown' },
    { size: '42', color: 'Black' },
  ];

  const handleSubmitOrder = async () => {
    const payload = {
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity
      })),
      subTotal: subtotal,
      tax: tax,
      discount: discount,
      totalPayment: totalPayment
    };

    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to submit transaction');
      }

      const data = await response.json();
      console.log('Transaction saved:', data);
      onSubmitOrder?.(data);
    } catch (error) {
      console.error('Transaction error:', error);
      onSubmitOrder?.(null, error);
    }
  };

  return (
    <aside className="w-full rounded-[32px] border border-slate-800 bg-slate-900/90 p-5 shadow-xl shadow-slate-950/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Detail Transaction</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-100">Order summary</h2>
        </div>

        <button
          type="button"
          onClick={onResetOrder}
          className="rounded-full border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-200 transition hover:border-red-400 hover:text-red-300"
        >
          Reset Order
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {cartItems.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-slate-700 bg-slate-950/60 p-6 text-center text-slate-500">
            Your cart is empty. Add products to begin.
          </div>
        ) : (
          cartItems.map((item, index) => {
            const variant = variantOptions[index % variantOptions.length];
            return (
              <div key={item.id} className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-16 w-16 rounded-3xl object-cover bg-slate-900"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-100">{item.name}</h3>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400">
                      <span className="rounded-full border border-slate-700 bg-slate-950 px-2 py-1">
                        Size {variant.size}
                      </span>
                      <span className="rounded-full border border-slate-700 bg-slate-950 px-2 py-1">
                        {variant.color}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveItem?.(item.id)}
                    className="rounded-full bg-red-600/10 px-3 py-2 text-red-300 transition hover:bg-red-600/20"
                  >
                    🗑
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950 px-2">
                    <button
                      type="button"
                      onClick={() => onQuantityChange?.(item.id, -1)}
                      className="rounded-full px-3 py-1 text-slate-200 transition hover:bg-slate-800"
                    >
                      -
                    </button>
                    <span className="min-w-[24px] text-center text-sm font-semibold text-slate-100">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onQuantityChange?.(item.id, 1)}
                      className="rounded-full px-3 py-1 text-slate-200 transition hover:bg-slate-800"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-slate-100">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-6 rounded-[28px] border border-slate-800 bg-slate-950/90 p-5">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-200">Promo New User (10%)</div>
          <button
            type="button"
            onClick={onTogglePromo}
            className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-emerald-400"
          >
            Change Promo
          </button>
        </div>

        <div className="mt-5 space-y-3 text-sm text-slate-300">
          <div className="flex items-center justify-between">
            <span>Sub-Total</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Tax (12%)</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex items-center justify-between text-emerald-300">
            <span>Discount</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4 text-base font-semibold text-slate-100">
          <span>Total Payment</span>
          <span>{formatCurrency(totalPayment)}</span>
        </div>
      </div>

      <div className="mt-6 rounded-[28px] border border-slate-800 bg-slate-950/90 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-200">Credit Card</span>
          <button
            type="button"
            onClick={onChangeMethod}
            className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-emerald-400"
          >
            Change Method
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900 px-4 py-4">
          <div className="h-10 w-10 rounded-3xl bg-gradient-to-br from-orange-500 to-red-500" />
          <div>
            <p className="text-sm font-semibold text-slate-100">Credit Card</p>
            <p className="text-xs text-slate-500">Visa ending in 1234</p>
          </div>
        </div>
      </div>

      {orderStatus ? (
        <div
          className={`mt-4 rounded-2xl px-4 py-3 text-sm ${
            orderStatus.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-300'
              : 'bg-red-500/10 text-red-300'
          }`}
        >
          {orderStatus.message}
        </div>
      ) : null}

      <button
        type="button"
        onClick={handleSubmitOrder}
        disabled={isSubmitting || cartItems.length === 0}
        className="mt-6 w-full rounded-[28px] bg-emerald-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Processing…' : 'Continue'}
      </button>
    </aside>
  );
}