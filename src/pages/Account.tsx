import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useOrderStore } from '../stores/orderStore';
import { useNotificationStore } from '../stores/notificationStore';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { User, Package, MapPin, Heart, Bell, Settings, LogOut, Edit2, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const AccountSidebar = () => {
  const { logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/account', icon: <User size={18} /> },
    { name: 'Orders', path: '/account/orders', icon: <Package size={18} /> },
    { name: 'Addresses', path: '/account/addresses', icon: <MapPin size={18} /> },
    { name: 'Reviews', path: '/account/reviews', icon: <Star size={18} /> },
    { name: 'Notifications', path: '/account/notifications', icon: <Bell size={18} /> },
    { name: 'Settings', path: '/account/settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-gray-50 rounded-2xl p-4 sticky top-24 border border-gray-100">
        <nav className="flex flex-col gap-2">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors
                  ${isActive ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-black'}`}
              >
                {item.icon} {item.name}
              </Link>
            );
          })}
          <div className="h-px bg-gray-200 my-2" />
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-colors w-full text-left"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const user = useAuthStore(state => state.user);
  const orders = useOrderStore(state => state.orders.filter(o => o.userId === user?.id));
  
  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold mb-6">Hello, {user?.firstName}!</h2>
      <p className="text-gray-500 mb-8">From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 mb-4 shadow-sm"><Package size={20} /></div>
          <div className="text-2xl font-bold mb-1">{orders.length}</div>
          <div className="text-sm text-gray-500 font-medium">Total Orders</div>
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 mb-4 shadow-sm"><Package size={20} /></div>
          <div className="text-2xl font-bold mb-1">{orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length}</div>
          <div className="text-sm text-gray-500 font-medium">Pending Orders</div>
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 mb-4 shadow-sm"><Heart size={20} /></div>
          <div className="text-2xl font-bold mb-1">3</div>
          <div className="text-sm text-gray-500 font-medium">Wishlist Items</div>
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-yellow-500 mb-4 shadow-sm"><Star size={20} /></div>
          <div className="text-2xl font-bold mb-1">0</div>
          <div className="text-sm text-gray-500 font-medium">Reviews</div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="font-bold mb-1">Personal Profile</h3>
          <p className="text-sm text-gray-500">{user?.firstName} {user?.lastName}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <button className="p-2 bg-white rounded-full text-gray-600 shadow hover:text-black">
          <Edit2 size={18} />
        </button>
      </div>
    </div>
  );
};

const Orders = () => {
  const user = useAuthStore(state => state.user);
  const orders = useOrderStore(state => state.orders.filter(o => o.userId === user?.id));
  
  if (orders.length === 0) {
    return (
      <div className="text-center py-12 animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <Package size={24} />
        </div>
        <h3 className="text-xl font-bold mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
        <Link to="/shop" className="px-6 py-3 bg-black text-white rounded-xl font-medium">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold">{order.id}</span>
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-md">
                  {order.status}
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-2">
                {new Date(order.date).toLocaleDateString()} • {order.items.length} items
              </div>
              <div className="font-bold">${order.total.toFixed(2)}</div>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Link to={`/orders/${order.id}`} className="flex-1 sm:flex-none px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 text-center transition-colors">
                Track Order
              </Link>
              <Link to={`/orders/${order.id}`} className="flex-1 sm:flex-none px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900 text-center transition-colors">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Addresses = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Addresses</h2>
        <button className="px-4 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-900 transition-colors">
          Add New Address
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-2xl p-6 relative">
          <span className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">Default</span>
          <h4 className="font-bold mb-2">Home</h4>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            123 Main Street<br/>
            New York, NY 10001<br/>
            United States
          </p>
          <div className="flex gap-3">
            <button className="text-sm text-blue-600 font-medium hover:underline">Edit</button>
            <button className="text-sm text-red-500 font-medium hover:underline">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsComp = () => {
  const { user, updateProfile } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || ''
  });
  const addNotification = useNotificationStore(state => state.addNotification);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    addNotification('Profile updated successfully', 'success');
  };

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={user?.email || ''} disabled className="w-full bg-gray-100 text-gray-500 border border-gray-200 rounded-xl py-2 px-3 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
          <button type="submit" className="px-6 py-3 bg-black text-white rounded-xl font-medium mt-4 hover:bg-gray-900 transition-colors">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="text-center py-12 animate-in fade-in duration-500">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-500 mb-6">This section is currently empty or under development.</p>
  </div>
);

const Account = () => {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 min-h-screen max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        <AccountSidebar />
        <div className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="reviews" element={<PlaceholderPage title="My Reviews" />} />
            <Route path="notifications" element={<PlaceholderPage title="Notifications" />} />
            <Route path="settings" element={<SettingsComp />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Account;
