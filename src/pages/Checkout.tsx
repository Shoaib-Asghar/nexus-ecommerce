import React, { useState, useEffect } from 'react';
import { useCartStore } from '../stores/cartStore';
import { useOrderStore } from '../stores/orderStore';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, Shield, CreditCard, Banknote, Building } from 'lucide-react';
import type { Address, Order } from '../types';

const steps = ['Information', 'Shipping', 'Payment', 'Review'];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, tax, discount, total, shipping, setShipping, clearCart, couponCode } = useCartStore();
  const addOrder = useOrderStore(state => state.addOrder);
  const user = useAuthStore(state => state.user);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [contact, setContact] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || ''
  });

  const [address, setAddress] = useState<Partial<Address>>({
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'United States'
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    if (items.length === 0 && !isProcessing) {
      navigate('/cart');
    }
  }, [items, navigate, isProcessing]);

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Initialize shipping cost when moving to the shipping step
    if (currentStep === 0 && shipping === 0) {
      setShipping(couponCode === 'FREESHIP' ? 0 : 15);
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1);
      window.scrollTo(0, 0);
    } else {
      handlePlaceOrder();
    }
  };

  const handleShippingSelect = (method: string, cost: number) => {
    setShippingMethod(method);
    setShipping(cost);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(Math.random() * 90000) + 10000}`;
      
      const newOrder: Order = {
        id: orderId,
        userId: user?.id || 'guest',
        items: [...items],
        subtotal,
        tax,
        shipping,
        discount,
        total,
        status: 'Pending',
        paymentMethod,
        shippingAddress: {
          id: Math.random().toString(),
          firstName: contact.firstName,
          lastName: contact.lastName,
          address: address.address!,
          city: address.city!,
          province: address.province!,
          postalCode: address.postalCode!,
          country: address.country!,
          isDefault: false
        },
        date: new Date().toISOString()
      };

      addOrder(newOrder);
      clearCart();
      navigate('/order-success', { state: { order: newOrder } });
    }, 2000);
  };

  if (items.length === 0 && !isProcessing) return null;

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="w-full lg:w-3/5">
          {/* Breadcrumb Steps */}
          <div className="flex items-center gap-2 text-sm mb-10 overflow-x-auto pb-2 custom-scrollbar">
            {steps.map((step, idx) => (
              <React.Fragment key={step}>
                <button 
                  onClick={() => idx < currentStep && setCurrentStep(idx)}
                  disabled={idx > currentStep}
                  className={`flex items-center gap-2 font-medium whitespace-nowrap transition-colors
                    ${idx === currentStep ? 'text-black' : idx < currentStep ? 'text-green-600 hover:text-green-700' : 'text-gray-300'}`}
                >
                  {idx < currentStep ? <Check size={16} /> : <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${idx === currentStep ? 'border-black bg-black text-white' : 'border-gray-300'}`}>{idx + 1}</span>}
                  {step}
                </button>
                {idx < steps.length - 1 && <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleNextStep}>
            
            {/* STEP 0: Information */}
            {currentStep === 0 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                      <input 
                        type="email" required
                        value={contact.email} onChange={e => setContact({...contact, email: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                      <input 
                        type="tel" required
                        value={contact.phone} onChange={e => setContact({...contact, phone: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                      <input 
                        type="text" required
                        value={contact.firstName} onChange={e => setContact({...contact, firstName: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                      <input 
                        type="text" required
                        value={contact.lastName} onChange={e => setContact({...contact, lastName: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input 
                        type="text" required
                        value={address.address} onChange={e => setAddress({...address, address: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input 
                        type="text" required
                        value={address.city} onChange={e => setAddress({...address, city: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
                      <input 
                        type="text" required
                        value={address.province} onChange={e => setAddress({...address, province: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Postal code</label>
                      <input 
                        type="text" required
                        value={address.postalCode} onChange={e => setAddress({...address, postalCode: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <select 
                        required
                        value={address.country} onChange={e => setAddress({...address, country: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black appearance-none"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full md:w-auto px-8 py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-900 transition-all flex items-center justify-center gap-2">
                  Continue to Shipping <ChevronRight size={20} />
                </button>
              </div>
            )}

            {/* STEP 1: Shipping */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6">Shipping Method</h2>
                
                <div className="space-y-4">
                  <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="shipping" 
                        checked={shippingMethod === 'standard'}
                        onChange={() => handleShippingSelect('standard', couponCode === 'FREESHIP' ? 0 : 15)}
                        className="w-5 h-5 accent-black"
                      />
                      <div>
                        <div className="font-semibold">Standard Shipping</div>
                        <div className="text-sm text-gray-500">3-5 business days</div>
                      </div>
                    </div>
                    <div className="font-bold">{couponCode === 'FREESHIP' ? 'Free' : '$15.00'}</div>
                  </label>
                  
                  <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="shipping" 
                        checked={shippingMethod === 'express'}
                        onChange={() => handleShippingSelect('express', couponCode === 'FREESHIP' ? 0 : 30)}
                        className="w-5 h-5 accent-black"
                      />
                      <div>
                        <div className="font-semibold">Express Shipping</div>
                        <div className="text-sm text-gray-500">1-2 business days</div>
                      </div>
                    </div>
                    <div className="font-bold">{couponCode === 'FREESHIP' ? 'Free' : '$30.00'}</div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <button type="button" onClick={() => setCurrentStep(0)} className="text-gray-500 hover:text-black font-medium transition-colors">
                    Return to Information
                  </button>
                  <button type="submit" className="px-8 py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-900 transition-all flex items-center justify-center gap-2">
                    Continue to Payment <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Payment */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-2">Payment</h2>
                <p className="text-sm text-gray-500 mb-6 flex items-center gap-2"><Shield size={16} className="text-green-500"/> All transactions are secure and encrypted.</p>
                
                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                  {/* Credit Card */}
                  <label className={`flex flex-col border-b border-gray-200 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}`}>
                    <div className="p-4 flex items-center gap-3">
                      <input 
                        type="radio" name="payment" 
                        checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')}
                        className="w-5 h-5 accent-black"
                      />
                      <CreditCard size={24} className={paymentMethod === 'card' ? 'text-black' : 'text-gray-400'} />
                      <span className="font-semibold">Credit / Debit Card</span>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="p-4 pt-0 px-12 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="col-span-2">
                          <input type="text" placeholder="Card number" required className="w-full bg-white border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black" />
                        </div>
                        <div className="col-span-2">
                          <input type="text" placeholder="Name on card" required className="w-full bg-white border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black" />
                        </div>
                        <div>
                          <input type="text" placeholder="Expiration date (MM/YY)" required className="w-full bg-white border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black" />
                        </div>
                        <div>
                          <input type="text" placeholder="Security code (CVV)" required className="w-full bg-white border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black" />
                        </div>
                      </div>
                    )}
                  </label>
                  
                  {/* Bank Transfer */}
                  <label className={`flex items-center p-4 border-b border-gray-200 cursor-pointer transition-colors ${paymentMethod === 'bank' ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" name="payment" 
                        checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')}
                        className="w-5 h-5 accent-black"
                      />
                      <Building size={24} className={paymentMethod === 'bank' ? 'text-black' : 'text-gray-400'} />
                      <span className="font-semibold">Bank Transfer</span>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label className={`flex items-center p-4 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" name="payment" 
                        checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')}
                        className="w-5 h-5 accent-black"
                      />
                      <Banknote size={24} className={paymentMethod === 'cod' ? 'text-black' : 'text-gray-400'} />
                      <span className="font-semibold">Cash on Delivery (COD)</span>
                    </div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <button type="button" onClick={() => setCurrentStep(1)} className="text-gray-500 hover:text-black font-medium transition-colors">
                    Return to Shipping
                  </button>
                  <button type="submit" className="px-8 py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-900 transition-all flex items-center justify-center gap-2">
                    Review Order <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Review */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6">Review your order</h2>
                
                <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                  <div className="flex justify-between items-start pb-6 border-b border-gray-200">
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Contact</h4>
                      <p className="font-medium">{contact.email}</p>
                      <p className="text-gray-600">{contact.phone}</p>
                    </div>
                    <button type="button" onClick={() => setCurrentStep(0)} className="text-sm font-semibold text-blue-600 hover:underline">Edit</button>
                  </div>
                  
                  <div className="flex justify-between items-start pb-6 border-b border-gray-200">
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Ship to</h4>
                      <p className="font-medium">{contact.firstName} {contact.lastName}</p>
                      <p className="text-gray-600">{address.address}, {address.city}, {address.province} {address.postalCode}, {address.country}</p>
                    </div>
                    <button type="button" onClick={() => setCurrentStep(0)} className="text-sm font-semibold text-blue-600 hover:underline">Edit</button>
                  </div>
                  
                  <div className="flex justify-between items-start pb-6 border-b border-gray-200">
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Method</h4>
                      <p className="font-medium">{shippingMethod === 'standard' ? 'Standard Shipping' : 'Express Shipping'}</p>
                    </div>
                    <button type="button" onClick={() => setCurrentStep(1)} className="text-sm font-semibold text-blue-600 hover:underline">Edit</button>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Payment</h4>
                      <p className="font-medium capitalize">{paymentMethod.replace('-', ' ')}</p>
                    </div>
                    <button type="button" onClick={() => setCurrentStep(2)} className="text-sm font-semibold text-blue-600 hover:underline">Edit</button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <button type="button" onClick={() => setCurrentStep(2)} className="text-gray-500 hover:text-black font-medium transition-colors" disabled={isProcessing}>
                    Return to Payment
                  </button>
                  <button 
                    type="submit" 
                    disabled={isProcessing}
                    className={`px-10 py-4 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-black/20 ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-900 transition-all hover:-translate-y-0.5'}`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : 'Place Order'}
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-2/5">
          <div className="bg-gray-50 rounded-3xl p-6 lg:p-8 sticky top-24 border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 bg-white rounded-lg border border-gray-200 flex-shrink-0 flex items-center justify-center p-1">
                    <img src={item.product.images[0]} alt={item.product.name} className="max-w-full max-h-full object-contain" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="font-bold text-sm line-clamp-1">{item.product.name}</span>
                    <span className="text-xs text-gray-500">{Object.values(item.selectedVariations).join(' / ')}</span>
                  </div>
                  <div className="font-semibold text-sm flex items-center justify-end">
                    ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-gray-200 w-full mb-6" />

            <div className="flex flex-col gap-4 mb-6 text-gray-600 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-black">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-black">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-semibold text-black">${tax.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Discount</span>
                  <span className="font-semibold">-${discount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="h-px bg-gray-200 w-full mb-6" />
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <span className="text-3xl font-bold">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
