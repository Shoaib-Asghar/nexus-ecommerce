import React, { useState } from 'react';
import { useCartStore } from '../stores/cartStore';
import { useNotificationStore } from '../stores/notificationStore';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, Tag, ChevronRight, X } from 'lucide-react';

const Cart = () => {
  const { items, subtotal, tax, discount, total, couponCode, removeItem, updateQuantity, applyCoupon, removeCoupon } = useCartStore();
  const addNotification = useNotificationStore(state => state.addNotification);
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    
    try {
      applyCoupon(couponInput.trim().toUpperCase());
      addNotification('Coupon applied successfully', 'success');
      setCouponInput('');
    } catch (e: any) {
      addNotification('Invalid or expired coupon', 'error');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Discover our premium collections and find something you'll love.
        </p>
        <Link to="/shop" className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart ({items.length} items)</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <div className="hidden sm:grid grid-cols-12 gap-4 text-sm font-semibold text-gray-500 uppercase tracking-wider pb-4 border-b border-gray-100">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Subtotal</div>
          </div>
          
          {items.map(item => (
            <div key={item.id} className="flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center py-6 border-b border-gray-100 last:border-0 relative">
              <div className="col-span-12 sm:col-span-6 flex items-center gap-6 w-full">
                <Link to={`/product/${item.product.id}`} className="w-24 h-24 bg-white border border-gray-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                  <img src={item.product.images[0]} alt={item.product.name} className="max-w-full max-h-full object-contain" />
                </Link>
                <div>
                  <Link to={`/product/${item.product.id}`} className="font-bold text-gray-900 hover:text-gray-600 line-clamp-1 mb-1">
                    {item.product.name}
                  </Link>
                  <div className="text-xs text-gray-500 mb-2">
                    {Object.entries(item.selectedVariations).map(([k, v]) => (
                      <span key={k} className="mr-3">{k}: <span className="font-medium text-gray-900">{v}</span></span>
                    ))}
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-sm font-medium text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
              
              <div className="col-span-12 sm:col-span-2 w-full flex justify-between sm:justify-center items-center">
                <span className="sm:hidden text-sm text-gray-500">Price:</span>
                <span className="font-semibold">${item.product.salePrice || item.product.price}</span>
              </div>
              
              <div className="col-span-12 sm:col-span-2 w-full flex justify-between sm:justify-center items-center">
                <span className="sm:hidden text-sm text-gray-500">Qty:</span>
                <div className="flex items-center border border-gray-200 rounded-xl w-28">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1.5 text-gray-500 hover:text-black hover:bg-gray-50 rounded-l-xl"
                  >-</button>
                  <div className="flex-1 text-center font-semibold text-sm">{item.quantity}</div>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1.5 text-gray-500 hover:text-black hover:bg-gray-50 rounded-r-xl"
                  >+</button>
                </div>
              </div>
              
              <div className="col-span-12 sm:col-span-2 w-full flex justify-between sm:justify-end items-center">
                <span className="sm:hidden text-sm text-gray-500">Subtotal:</span>
                <span className="font-bold text-lg">${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 rounded-3xl p-6 lg:p-8 sticky top-24">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            
            <div className="flex flex-col gap-4 mb-6 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-black">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span className="font-semibold text-black">${tax.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Discount</span>
                  <span className="font-semibold">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-sm">Calculated at checkout</span>
              </div>
            </div>

            <div className="h-px bg-gray-200 w-full mb-6" />
            
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold">Total</span>
              <span className="text-3xl font-bold">${total.toFixed(2)}</span>
            </div>

            {/* Coupon Code */}
            <div className="mb-8">
              {!couponCode ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon code"
                      className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <button type="submit" className="px-6 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-900 transition-colors">
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2 text-green-700">
                    <Tag size={16} />
                    <span className="font-medium text-sm">Coupon <span className="font-bold">{couponCode}</span> applied</span>
                  </div>
                  <button onClick={removeCoupon} className="text-green-700 hover:text-green-900 p-1">
                    <X size={16} />
                  </button>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">Try codes: WELCOME10, SAVE20, FREESHIP</p>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full h-14 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-900 transition-all hover:-translate-y-0.5 shadow-xl shadow-black/10"
            >
              Proceed to Checkout <ChevronRight size={20} />
            </button>
            
            <div className="mt-6 flex items-center justify-center gap-4 border-t border-gray-200 pt-6">
              {/* Dummy payment icons */}
              <div className="h-8 w-12 bg-white rounded border border-gray-200 flex items-center justify-center text-[10px] font-bold text-blue-900">VISA</div>
              <div className="h-8 w-12 bg-white rounded border border-gray-200 flex items-center justify-center text-[10px] font-bold text-red-500">MC</div>
              <div className="h-8 w-12 bg-white rounded border border-gray-200 flex items-center justify-center text-[10px] font-bold text-blue-500">AMEX</div>
              <div className="h-8 w-12 bg-white rounded border border-gray-200 flex items-center justify-center text-[10px] font-bold text-indigo-500">PAYPAL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
