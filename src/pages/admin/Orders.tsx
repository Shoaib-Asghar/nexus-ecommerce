import React, { useState } from 'react';
import { useOrderStore } from '../../stores/orderStore';
import { Search, Filter, Eye, MoreHorizontal } from 'lucide-react';

const Orders = () => {
  const orders = useOrderStore(s => s.orders); const updateOrderStatus = useOrderStore(s => s.updateOrderStatus);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    `${o.shippingAddress.firstName} ${o.shippingAddress.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-purple-100 text-purple-800';
      case 'Shipped': return 'bg-indigo-100 text-indigo-800';
      case 'Out for Delivery': return 'bg-orange-100 text-orange-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Orders</h1>
          <p className="text-gray-500">Manage and track customer orders</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 flex-1 flex flex-col overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by order ID or customer name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              <Filter size={16} /> Filter
            </button>
            <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black appearance-none">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-gray-50/80 sticky top-0 z-10 backdrop-blur-sm">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-sm text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-900">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</div>
                    <div className="text-xs text-gray-500">{order.items.length} items</div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border-none cursor-pointer appearance-none ${getStatusColor(order.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 font-bold text-sm">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-black bg-white border border-gray-200 hover:border-gray-900 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-black bg-white border border-gray-200 hover:border-gray-900 rounded-lg transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No orders found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-between text-sm text-gray-500">
          <div>Showing 1 to {Math.min(filteredOrders.length, 10)} of {filteredOrders.length} results</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-gray-200 rounded bg-black text-white">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
