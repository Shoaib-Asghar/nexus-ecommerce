import { Save } from 'lucide-react';

const Settings = () => {
  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Store Settings</h1>
          <p className="text-gray-500">Manage your store's configuration</p>
        </div>
        <button className="bg-black text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-900 transition-colors">
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex-1 flex flex-col md:flex-row">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 p-4 bg-gray-50/50">
          <nav className="space-y-1">
            <button className="w-full text-left px-4 py-2.5 bg-white border border-gray-200 rounded-lg font-medium text-black shadow-sm">
              General
            </button>
            <button className="w-full text-left px-4 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100 hover:text-black transition-colors">
              Payment Methods
            </button>
            <button className="w-full text-left px-4 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100 hover:text-black transition-colors">
              Shipping & Delivery
            </button>
            <button className="w-full text-left px-4 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100 hover:text-black transition-colors">
              Taxes
            </button>
            <button className="w-full text-left px-4 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100 hover:text-black transition-colors">
              Notifications
            </button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
          <div className="max-w-2xl space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">Store Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                  <input type="text" defaultValue="Premium Store" className="w-full bg-white border border-gray-300 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                  <input type="email" defaultValue="support@example.com" className="w-full bg-white border border-gray-300 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-white border border-gray-300 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
              </div>
            </section>

            <hr className="border-gray-200" />

            <section>
              <h2 className="text-xl font-bold mb-4">Currency & Formatting</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Currency</label>
                  <select className="w-full bg-white border border-gray-300 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                  <select className="w-full bg-white border border-gray-300 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black">
                    <option>(GMT-05:00) Eastern Time</option>
                    <option>(GMT-08:00) Pacific Time</option>
                  </select>
                </div>
              </div>
            </section>
            
            <hr className="border-gray-200" />

            <section>
              <h2 className="text-xl font-bold mb-4">Order ID Format</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prefix</label>
                  <input type="text" defaultValue="ORD-" className="w-full bg-white border border-gray-300 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
                <p className="text-sm text-gray-500">Your order IDs will look like: ORD-1001, ORD-1002, etc.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
