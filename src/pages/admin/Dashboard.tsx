import { useOrderStore } from '../../stores/orderStore';
import { useProductStore } from '../../stores/productStore';
import { useAuthStore } from '../../stores/authStore';
import { DollarSign, ShoppingBag, Users, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', total: 1200 },
  { name: 'Tue', total: 2100 },
  { name: 'Wed', total: 1800 },
  { name: 'Thu', total: 2400 },
  { name: 'Fri', total: 2800 },
  { name: 'Sat', total: 3200 },
  { name: 'Sun', total: 2900 },
];

const AdminDashboard = () => {
  const orders = useOrderStore(state => state.orders);
  const products = useProductStore(state => state.products);
  // Mocking users since we don't have a real users store for admin
  const totalUsers = 1248;

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0) + 45230; // Adding mock baseline
  const totalOrders = orders.length + 342; // Adding mock baseline

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
          <p className="text-gray-500">Welcome back to your admin dashboard.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This Year</option>
          </select>
          <button className="bg-black text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-gray-900 transition-colors">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <DollarSign size={24} />
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded-md">
              <ArrowUpRight size={16} /> 12.5%
            </div>
          </div>
          <div className="text-gray-500 text-sm font-semibold mb-1 uppercase tracking-wider">Total Revenue</div>
          <div className="text-3xl font-bold">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <ShoppingBag size={24} />
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded-md">
              <ArrowUpRight size={16} /> 8.2%
            </div>
          </div>
          <div className="text-gray-500 text-sm font-semibold mb-1 uppercase tracking-wider">Orders</div>
          <div className="text-3xl font-bold">{totalOrders.toLocaleString()}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
              <Users size={24} />
            </div>
            <div className="flex items-center gap-1 text-red-500 text-sm font-bold bg-red-50 px-2 py-1 rounded-md">
              <ArrowDownRight size={16} /> 2.1%
            </div>
          </div>
          <div className="text-gray-500 text-sm font-semibold mb-1 uppercase tracking-wider">Customers</div>
          <div className="text-3xl font-bold">{totalUsers.toLocaleString()}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
              <Activity size={24} />
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded-md">
              <ArrowUpRight size={16} /> 5.4%
            </div>
          </div>
          <div className="text-gray-500 text-sm font-semibold mb-1 uppercase tracking-wider">Products Active</div>
          <div className="text-3xl font-bold">{products.length}</div>
        </div>
      </div>

      {/* Chart & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold mb-6">Revenue Overview</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dx={-10} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#000', fontWeight: 'bold' }}
                  formatter={(value: any) => [`$${value}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="total" stroke="#000" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Recent Orders</h2>
            <button className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center font-bold text-xs">
                    {order.id.split('-')[1]}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</div>
                    <div className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">${order.total.toFixed(2)}</div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mt-1
                    ${order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' : 
                      order.status === 'Processing' ? 'bg-blue-50 text-blue-600' : 
                      order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No recent orders found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
