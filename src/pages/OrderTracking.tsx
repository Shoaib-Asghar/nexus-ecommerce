import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useOrderStore } from '../stores/orderStore';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const statuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = useOrderStore(state => state.orders.find(o => o.id === id));

  useEffect(() => {
    if (!order) {
      // For demo, if order not found, maybe show empty state instead of navigating away immediately,
      // but if the user has no order it's better to tell them.
    }
  }, [order]);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
          <Package size={40} />
        </div>
        <h2 className="text-3xl font-bold mb-4">Order Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          We couldn't find an order with the ID you provided. Please check the ID or contact support.
        </p>
        <Link to="/account/orders" className="px-6 py-3 bg-black text-white rounded-xl font-medium">
          View My Orders
        </Link>
      </div>
    );
  }

  const currentStatusIndex = statuses.indexOf(order.status) > -1 ? statuses.indexOf(order.status) : 0;

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Track Order</h1>
          <p className="text-gray-500">Order ID: <span className="font-semibold text-black">{order.id}</span></p>
        </div>
        <Link to="/account/orders" className="text-sm font-semibold text-gray-500 hover:text-black">
          Back to Orders
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-xl shadow-gray-100/50 mb-12">
        <div className="relative">
          {/* Progress Bar Background */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 rounded-full hidden sm:block z-0" />
          
          {/* Progress Bar Fill */}
          <div 
            className="absolute top-1/2 left-0 h-1 bg-black -translate-y-1/2 rounded-full hidden sm:block z-0 transition-all duration-1000 ease-out"
            style={{ width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}
          />

          <div className="flex flex-col sm:flex-row justify-between relative z-10 gap-8 sm:gap-0">
            {statuses.map((status, idx) => {
              const isCompleted = idx <= currentStatusIndex;
              const isCurrent = idx === currentStatusIndex;
              
              let Icon = Clock;
              if (status === 'Delivered') Icon = CheckCircle;
              else if (status === 'Shipped' || status === 'Out for Delivery') Icon = Truck;
              else if (status === 'Processing') Icon = Package;

              return (
                <div key={status} className="flex sm:flex-col items-center gap-4 sm:gap-3 group">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 shadow-lg 
                    ${isCompleted ? 'bg-black text-white shadow-black/20' : 'bg-white text-gray-300 border-2 border-gray-100 shadow-none'}`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="sm:text-center">
                    <div className={`font-bold ${isCurrent ? 'text-black' : isCompleted ? 'text-gray-700' : 'text-gray-400'}`}>
                      {status}
                    </div>
                    {isCurrent && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-gray-500 font-medium mt-1"
                      >
                        {new Date().toLocaleDateString()}
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-6">Order Details</h3>
      <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 space-y-6">
        {order.items.map(item => (
          <div key={item.id} className="flex gap-4 border-b border-gray-200 pb-6 last:border-0 last:pb-0">
            <div className="w-20 h-20 bg-white rounded-xl border border-gray-100 flex-shrink-0 flex items-center justify-center p-2">
              <img src={item.product.images[0]} alt={item.product.name} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex-1">
              <div className="font-bold mb-1">{item.product.name}</div>
              <div className="text-sm text-gray-500 mb-2">{Object.values(item.selectedVariations).join(' / ')}</div>
              <div className="text-sm font-medium">Qty: {item.quantity}</div>
            </div>
            <div className="font-bold">
              ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}

        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="flex justify-between text-gray-600 mb-3">
            <span>Subtotal</span>
            <span className="font-semibold text-black">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-3">
            <span>Shipping</span>
            <span className="font-semibold text-black">${order.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-3">
            <span>Tax</span>
            <span className="font-semibold text-black">${order.tax.toFixed(2)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-red-600 mb-3">
              <span>Discount</span>
              <span className="font-semibold">-${order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-bold">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
