import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Printer } from 'lucide-react';
import type { Order } from '../types';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order;

  useEffect(() => {
    if (!order) {
      navigate('/shop');
    }
  }, [order, navigate]);

  if (!order) return null;

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24 max-w-4xl min-h-screen">
      <div className="bg-white rounded-3xl p-8 lg:p-16 text-center border border-gray-100 shadow-xl shadow-gray-100/50 print:shadow-none print:border-none">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500">
          <CheckCircle size={48} />
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Order Confirmed!</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-lg mx-auto">
          Thank you for your purchase. We've received your order and are getting it ready to be shipped.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-12 max-w-2xl mx-auto flex flex-col sm:flex-row justify-around gap-6">
          <div className="text-left flex-1">
            <div className="text-sm text-gray-500 mb-1 font-semibold uppercase tracking-wider">Order ID</div>
            <div className="font-bold text-xl">{order.id}</div>
          </div>
          <div className="w-px bg-gray-200 hidden sm:block" />
          <div className="text-left flex-1">
            <div className="text-sm text-gray-500 mb-1 font-semibold uppercase tracking-wider">Estimated Delivery</div>
            <div className="font-bold text-xl">{estimatedDelivery.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
          </div>
          <div className="w-px bg-gray-200 hidden sm:block" />
          <div className="text-left flex-1">
            <div className="text-sm text-gray-500 mb-1 font-semibold uppercase tracking-wider">Total Amount</div>
            <div className="font-bold text-xl">${order.total.toFixed(2)}</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 print:hidden">
          <Link to={`/orders/${order.id}`} className="px-8 py-4 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-900 transition-all shadow-lg shadow-black/10">
            <Package size={20} /> Track Order
          </Link>
          <Link to="/shop" className="px-8 py-4 bg-white border-2 border-gray-200 text-black rounded-xl font-bold flex items-center justify-center gap-2 hover:border-gray-900 transition-all">
            Continue Shopping <ArrowRight size={20} />
          </Link>
        </div>

        <button 
          onClick={() => window.print()}
          className="mt-8 text-sm font-semibold text-gray-500 hover:text-black flex items-center justify-center gap-2 mx-auto print:hidden"
        >
          <Printer size={16} /> Print Receipt
        </button>
        
        {/* Invoice details for printing */}
        <div className="hidden print:block text-left mt-16 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Order Details</h2>
          <div className="mb-4">
            <strong>Order ID:</strong> {order.id}<br/>
            <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}<br/>
            <strong>Payment Method:</strong> {order.paymentMethod}<br/>
            <strong>Shipping to:</strong> {order.shippingAddress.firstName} {order.shippingAddress.lastName}, {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.province}, {order.shippingAddress.country}
          </div>
          <table className="w-full text-left mb-4">
            <thead>
              <tr className="border-b">
                <th className="py-2">Item</th>
                <th className="py-2">Qty</th>
                <th className="py-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map(item => (
                <tr key={item.id} className="border-b">
                  <td className="py-2">{item.product.name}</td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2 text-right">${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right">
            <div>Subtotal: ${order.subtotal.toFixed(2)}</div>
            <div>Shipping: ${order.shipping.toFixed(2)}</div>
            <div>Tax: ${order.tax.toFixed(2)}</div>
            {order.discount > 0 && <div>Discount: -${order.discount.toFixed(2)}</div>}
            <div className="font-bold text-xl mt-2 border-t pt-2 border-black inline-block">Total: ${order.total.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
