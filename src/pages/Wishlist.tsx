import { useWishlistStore } from '../stores/wishlistStore';
import { useCartStore } from '../stores/cartStore';
import { useNotificationStore } from '../stores/notificationStore';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';

const Wishlist = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const addNotification = useNotificationStore(state => state.addNotification);

  const handleMoveToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const defaultVariations: Record<string, string> = {};
    if (product.variations) {
      product.variations.forEach((v: any) => {
        defaultVariations[v.name] = v.options[0];
      });
    }
    
    addItem(product, 1, defaultVariations);
    removeItem(product.id);
    addNotification(`Moved ${product.name} to cart`, 'success');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <Heart size={40} className="text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Save items you love here and purchase them later.
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
        <h1 className="text-3xl font-bold tracking-tight">My Wishlist ({items.length})</h1>
        <button 
          onClick={clearWishlist}
          className="text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2"
        >
          <Trash2 size={16} /> Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(product => (
          <div key={product.id} className="relative group">
            <ProductCard product={product} />
            <div className="absolute top-3 left-3 right-3 flex justify-between z-20 pointer-events-none">
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeItem(product.id); addNotification(`Removed ${product.name} from wishlist`, 'info'); }}
                className="w-8 h-8 bg-white text-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-50 pointer-events-auto"
              >
                <Trash2 size={16} />
              </button>
            </div>
            {/* Override Add to cart with move to cart to remove from wishlist */}
            <div className="absolute bottom-[88px] left-3 right-3 z-20 pointer-events-none">
              <button 
                onClick={(e) => handleMoveToCart(product, e)}
                className="w-full py-3 bg-black text-white rounded-xl font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto flex items-center justify-center gap-2 hover:bg-gray-900 shadow-lg"
              >
                <ShoppingCart size={18} /> Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
