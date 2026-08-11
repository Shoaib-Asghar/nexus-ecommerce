import { useAuthStore } from '../../stores/authStore';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', path: '/admin/products', icon: <Package size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingCart size={20} /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link to="/" className="text-xl font-black tracking-tighter">NEXUS<span className="text-gray-400">ADMIN</span></Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {navItems.map(item => {
              const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/admin');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors
                    ${isActive ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-black'}`}
                >
                  {item.icon} {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
              {user.firstName[0]}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-bold truncate">{user.firstName} {user.lastName}</div>
              <div className="text-xs text-gray-500 truncate">{user.email}</div>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors w-full text-left"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:hidden">
          <Link to="/" className="text-xl font-black tracking-tighter">NEXUS<span className="text-gray-400">ADMIN</span></Link>
          <button className="p-2 text-gray-600 bg-gray-100 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
