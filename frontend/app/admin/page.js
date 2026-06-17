'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import ProductCard from '../../components/ProductCard';
import OrderSummary from '../../components/OrderSummary';
import AddProductModal from '../../components/AddProductModel';

const sampleProducts = [
  {
    id: 'prod_001',
    name: 'Nike Waffle Debut',
    description:
      'Retro gets modernized in the Nike Waffle Debut. Remember that smooth nylon and suede combination...',
    category: 'Shoes',
    price: 80.0,
    stock: 218,
    imageUrl:
      'https://app.kicksonfire.com/kofapp/upload/events_master_images/nike-waffle-debut-light-stone-rattan.png',
  },
  {
    id: 'prod_002',
    name: 'Nike Tech',
    description:
      'Crafted with stretchy, breathable material, the Nike Tech Woven Jacket offers a supportive fit and feel.',
    category: 'Clothing',
    price: 130.83,
    stock: 196,
    imageUrl:
      'https://cms.brnstc.de/product_images/1122x1536_retina/cpne/media/images/product/26/4/100322831116000_0_1776902400000.jpg',
  },
  {
    id: 'prod_003',
    name: 'Nike V2K Run New',
    description:
      'The Nike Elite Crew Basketball Socks offer a supportive fit and feel with targeted cushioning.',
    category: 'Others Product',
    price: 16.5,
    stock: 123,
    imageUrl:
      'https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2de39bdc-8bb5-4906-8710-b49f3ba8d320/U+NK+ELITE+CREW+132.png',
  },
  {
    id: 'prod_004',
    name: 'Nike P-6000',
    description:
      'The Nike P-6000 draws on the 2006 Nike Air Pegasus, bringing a mashup of Pegasus history to life.',
    category: 'Shoes',
    price: 115.28,
    stock: 121,
    imageUrl:
      'https://static.nike.com/a/images/t_default/6c916724-b326-476d-87a5-2b57d667a0f3/NIKE+P-6000.png',
  },
  {
    id: 'prod_005',
    name: 'Nike Zoom Vomero Roam',
    description:
      'Designed for city conditions, this winterized version equips you with water-repellent materials.',
    category: 'Shoes',
    price: 187.43,
    stock: 119,
    imageUrl:
      'https://www.nike.com.kw/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dw69394305/nk/a8a/e/6/6/e/9/a8ae66e9_92bf_41bc_ab98_b33828503caa.jpg?sw=700&sh=700&sm=fit&q=100&strip=false',
  },
  {
    id: 'prod_006',
    name: "Men's Fleece Cargo Pants",
    description:
      'Clean meets casual with these brushed fleece cargo pants, offering lightweight warmth and storage.',
    category: 'Clothing',
    price: 65.42,
    stock: 192,
    imageUrl:
      'https://www.nike.qa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dw2b477cd9/nk/d99/f/b/1/1/2/d99fb112_8324_40d6_a7d6_fdf95fb424b2.jpg?sw=700&sh=700&sm=fit&q=100&strip=false',
  },
];

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState(sampleProducts);
  const [cartItems, setCartItems] = useState([]);
  const [promoEnabled, setPromoEnabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.replace('/login');
      return;
    }

    const parsed = JSON.parse(userData);
    if (parsed.role !== 'admin') {
      router.replace('/login');
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
        setProducts(sampleProducts);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    if (!query) return products;
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
    );
  }, [products, query]);

  const addToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeCartItem = (id) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  const changeQuantity = (id, delta) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const resetOrder = () => {
    setCartItems([]);
    setOrderStatus(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.replace('/login');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.12;
  const discount = promoEnabled ? subtotal * 0.1 : 0;
  const totalPayment = subtotal + tax - discount;

  const handleSubmitOrder = async () => {
    if (cartItems.length === 0) return;
    setIsSubmitting(true);
    setOrderStatus(null);

    const orderPayload = {
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      subTotal: subtotal,
      tax,
      discount,
      totalPayment,
    };

    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit order');
      }

      await response.json();
      setOrderStatus({ type: 'success', message: 'Order submitted successfully!' });
      setCartItems([]);
    } catch (error) {
      setOrderStatus({ type: 'error', message: error.message || 'Order submission failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts((current) => [...current, newProduct]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar onSearch={setQuery} onMenuClick={() => setSidebarOpen((open) => !open)} cartCount={cartCount} />
      <div className="mx-auto max-w-[1400px] px-4 py-6">
        <div className="flex gap-6">
          <Sidebar isOpen={sidebarOpen} role={user?.role} onLogout={handleLogout} />
          <main className="flex-1">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
                <p className="text-sm text-slate-400">Monitor inventory, create sales, and manage orders.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-200">
                  Cart: {cartCount}
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="rounded-2xl border border-slate-800 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 hover:bg-emerald-500/20 transition"
                >
                  + Add Product
                </button>
              </div>
            </div>

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} />
              ))}
            </section>
          </main>

          <div className="hidden w-96 flex-none md:block">
            <OrderSummary
              cartItems={cartItems}
              promoEnabled={promoEnabled}
              isSubmitting={isSubmitting}
              onTogglePromo={() => setPromoEnabled((value) => !value)}
              onResetOrder={resetOrder}
              onRemoveItem={removeCartItem}
              onQuantityChange={changeQuantity}
              onChangeMethod={() => {}}
              onSubmitOrder={handleSubmitOrder}
              orderStatus={orderStatus}
            />
          </div>
        </div>
      </div>

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onProductAdded={handleProductAdded}
      />
    </div>
  );
}