import { useCompareStore } from '../stores/compareStore';
import { useCartStore } from '../stores/cartStore';
import { useNotificationStore } from '../stores/notificationStore';
import { Link } from 'react-router-dom';
import { GitCompare, Trash2, ShoppingCart, Check } from 'lucide-react';

const Compare = () => {
  const { items, removeItem, clearCompare } = useCompareStore();
  const { addItem } = useCartStore();
  const addNotification = useNotificationStore(state => state.addNotification);

  const handleAddToCart = (product: any) => {
    const defaultVariations: Record<string, string> = {};
    if (product.variations) {
      product.variations.forEach((v: any) => {
        defaultVariations[v.name] = v.options[0];
      });
    }
    addItem(product, 1, defaultVariations);
    addNotification(`Added ${product.name} to cart`, 'success');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <GitCompare size={40} className="text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold mb-4">No products to compare</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Add up to 4 products to the comparison list to see them side-by-side.
        </p>
        <Link to="/shop" className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition-colors">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 min-h-screen">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Compare Products</h1>
          <p className="text-gray-500">Compare up to 4 products side-by-side</p>
        </div>
        <div className="flex gap-4">
          {items.length < 4 && (
            <Link to="/shop" className="px-6 py-2.5 bg-gray-50 border border-gray-200 text-black rounded-xl font-medium hover:bg-gray-100 transition-colors">
              Add Product
            </Link>
          )}
          <button 
            onClick={clearCompare}
            className="px-6 py-2.5 border border-red-200 text-red-500 rounded-xl font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <Trash2 size={16} /> Clear All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <tbody>
            {/* Product Image & Info */}
            <tr>
              <td className="p-4 align-top w-48 border-r border-gray-100 bg-gray-50 rounded-tl-2xl">
                <div className="font-bold text-gray-400 uppercase tracking-wider text-sm h-full flex items-center">Product Info</div>
              </td>
              {items.map((item, idx) => (
                <td key={item.id} className={`p-4 align-top w-64 ${idx === items.length - 1 ? 'rounded-tr-2xl' : 'border-r border-gray-100'}`}>
                  <div className="relative group">
                    <button 
                      onClick={() => { removeItem(item.id); addNotification(`Removed ${item.name} from compare`, 'info'); }}
                      className="absolute top-2 right-2 p-1.5 bg-white shadow rounded-full text-red-500 hover:bg-red-50 z-10"
                    >
                      <Trash2 size={14} />
                    </button>
                    <Link to={`/product/${item.id}`} className="block h-48 bg-white border border-gray-100 rounded-xl mb-4 p-4 flex items-center justify-center">
                      <img src={item.images[0]} alt={item.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
                    </Link>
                    <div className="text-xs text-gray-500 mb-1">{item.brand}</div>
                    <Link to={`/product/${item.id}`} className="font-bold hover:text-gray-600 line-clamp-2 min-h-[3rem] mb-2">{item.name}</Link>
                    <div className="font-bold text-lg mb-4">${item.salePrice || item.price}</div>
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="w-full py-2.5 bg-black text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
                    >
                      <ShoppingCart size={16} /> Add to Cart
                    </button>
                  </div>
                </td>
              ))}
              {/* Fill empty columns if less than 4 */}
              {Array.from({ length: 4 - items.length }).map((_, i) => (
                <td key={i} className={`p-4 align-top w-64 ${i === 3 - items.length ? 'rounded-tr-2xl' : 'border-r border-gray-100'}`}>
                  <div className="h-full flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-300 mb-4 shadow-sm"><GitCompare size={20} /></div>
                    <span className="text-sm font-medium text-gray-400">Empty Slot</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Specifications rows */}
            {['Category', 'Brand', 'Rating', 'Stock', 'SKU'].map((specName, rowIdx) => (
              <tr key={specName} className="border-t border-gray-100">
                <td className="p-4 align-middle border-r border-gray-100 bg-gray-50 font-medium text-gray-600">
                  {specName}
                </td>
                {items.map(item => (
                  <td key={`${item.id}-${specName}`} className="p-4 align-middle border-r border-gray-100 font-medium">
                    {specName === 'Rating' ? `${item.rating} / 5.0` : 
                     specName === 'Stock' ? (item.stock > 0 ? <span className="text-green-600 flex items-center gap-1"><Check size={14}/> In Stock ({item.stock})</span> : <span className="text-red-500">Out of Stock</span>) :
                     // @ts-ignore
                     item[specName.toLowerCase()]}
                  </td>
                ))}
                {Array.from({ length: 4 - items.length }).map((_, i) => (
                  <td key={`empty-${rowIdx}-${i}`} className="p-4 align-middle border-r border-gray-100 text-gray-300">-</td>
                ))}
              </tr>
            ))}
            
            {/* Dynamic Specifications */}
            <tr className="border-t border-gray-100">
              <td className="p-4 align-middle border-r border-gray-100 bg-gray-50 font-medium text-gray-600">Material</td>
              {items.map(item => (
                <td key={`${item.id}-Material`} className="p-4 align-middle border-r border-gray-100 text-gray-600">
                  {item.specifications?.Material || '-'}
                </td>
              ))}
              {Array.from({ length: 4 - items.length }).map((_, i) => (
                <td key={`empty-mat-${i}`} className="p-4 align-middle border-r border-gray-100 text-gray-300">-</td>
              ))}
            </tr>
            <tr className="border-t border-gray-100">
              <td className="p-4 align-middle border-r border-gray-100 bg-gray-50 font-medium text-gray-600 rounded-bl-2xl">Warranty</td>
              {items.map((item, idx) => (
                <td key={`${item.id}-Warranty`} className={`p-4 align-middle text-gray-600 ${idx === items.length - 1 && items.length === 4 ? 'rounded-br-2xl' : 'border-r border-gray-100'}`}>
                  {item.specifications?.Warranty || '-'}
                </td>
              ))}
              {Array.from({ length: 4 - items.length }).map((_, i) => (
                <td key={`empty-war-${i}`} className={`p-4 align-middle text-gray-300 ${i === 3 - items.length ? 'rounded-br-2xl' : 'border-r border-gray-100'}`}>-</td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compare;
