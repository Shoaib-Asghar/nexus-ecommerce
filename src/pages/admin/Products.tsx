import React, { useState } from 'react';
import { useProductStore } from '../../stores/productStore';
import { Plus, Search, Edit2, Trash2, Filter } from 'lucide-react';
import type { Product } from '../../types';

const Products = () => {
  const products = useProductStore(s => s.products); const deleteProduct = useProductStore(s => s.deleteProduct);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Products</h1>
          <p className="text-gray-500">Manage your store's products</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-900 transition-colors">
          <Plus size={20} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 flex-1 flex flex-col overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
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
              <option>Sort by: Newest</option>
              <option>Sort by: Price</option>
              <option>Sort by: Stock</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-gray-50/80 sticky top-0 z-10 backdrop-blur-sm">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">SKU</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center p-1 shrink-0">
                        <img src={product.images[0]} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-900 line-clamp-1">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{product.sku}</td>
                  <td className="px-6 py-4">
                    {product.salePrice ? (
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">${product.salePrice}</span>
                        <span className="text-xs text-gray-400 line-through">${product.price}</span>
                      </div>
                    ) : (
                      <span className="text-sm font-bold">${product.price}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      product.stock > 10 ? 'bg-green-100 text-green-800' : 
                      product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 capitalize">{product.category}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 bg-white border border-gray-200 hover:border-blue-200 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-gray-400 hover:text-red-600 bg-white border border-gray-200 hover:border-red-200 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-between text-sm text-gray-500">
          <div>Showing 1 to {Math.min(filteredProducts.length, 10)} of {filteredProducts.length} results</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-gray-200 rounded bg-black text-white">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
