import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Mail } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

// Mock data since we only have one user in state
const mockCustomers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', orders: 12, spent: 1250.50, status: 'Active', joined: '2023-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', orders: 5, spent: 450.00, status: 'Active', joined: '2023-03-22' },
  { id: '3', name: 'Alice Johnson', email: 'alice@example.com', orders: 1, spent: 120.00, status: 'Inactive', joined: '2023-08-10' },
  { id: '4', name: 'Bob Williams', email: 'bob@example.com', orders: 24, spent: 3450.75, status: 'Active', joined: '2022-11-05' },
  { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', orders: 0, spent: 0, status: 'Active', joined: '2023-12-01' },
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const user = useAuthStore(state => state.user);
  
  // Mix real user with mock users
  const allCustomers = user ? [
    { 
      id: user.id, 
      name: `${user.firstName} ${user.lastName}`, 
      email: user.email, 
      orders: 3, 
      spent: 450.25, 
      status: 'Active', 
      joined: new Date().toISOString().split('T')[0] 
    },
    ...mockCustomers
  ] : mockCustomers;

  const filteredCustomers = allCustomers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Customers</h1>
          <p className="text-gray-500">View and manage your customers</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 flex-1 flex flex-col overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search customers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-gray-50/80 sticky top-0 z-10 backdrop-blur-sm">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Customer Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Orders</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Total Spent</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-sm text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                        {customer.name.charAt(0)}
                      </div>
                      {customer.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{customer.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{customer.orders}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-bold">${customer.spent.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-black bg-white border border-gray-200 hover:border-gray-900 rounded-lg transition-colors">
                        <Mail size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-black bg-white border border-gray-200 hover:border-gray-900 rounded-lg transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
