import type { Product } from '../../types';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useUIStore } from '../../stores/uiStore';
import { useNotificationStore } from '../../stores/notificationStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlistStore();
  const { openQuickView } = useUIStore();
  const addNotification = useNotificationStore(state => state.addNotification);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const defaultVariations: Record<string, string> = {};
    if (product.variations) {
      product.variations.forEach(v => {
        defaultVariations[v.name] = v.options[0];
      });
    }
    
    addItem(product, 1, defaultVariations);
    addNotification(`Added ${product.name} to cart`, 'success');
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeWishlist(product.id);
      addNotification(`Removed ${product.name} from wishlist`, 'info');
    } else {
      addWishlist(product);
      addNotification(`Added ${product.name} to wishlist`, 'success');
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product.id);
  };

  const discountPercent = product.salePrice ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 relative">
      {discountPercent > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
          -{discountPercent}%
        </div>
      )}
      
      {product.isFeatured && discountPercent === 0 && (
        <div className="absolute top-3 left-3 z-10 bg-black text-white text-xs font-bold px-2 py-1 rounded-md">
          Featured
        </div>
      )}

      {/* Actions */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button 
          onClick={handleWishlistToggle}
          className={`p-2 rounded-full shadow-md transition-all duration-300 delay-75 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 ${isInWishlist(product.id) ? 'bg-red-50 text-red-500' : 'bg-white text-gray-600 hover:text-black hover:bg-gray-50'}`}
        >
          <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
        </button>
        <button 
          onClick={handleQuickView}
          className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:text-black hover:bg-gray-50 transition-all duration-300 delay-150 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
        >
          <Eye size={18} />
        </button>
      </div>

      <Link to={`/product/${product.id}`} className="relative h-64 overflow-hidden bg-white flex items-center justify-center p-6">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Quick Add overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-black/90 backdrop-blur-sm text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-black transition-colors"
          >
            <ShoppingCart size={18} /> Add to Cart
          </button>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 font-medium mb-1">{product.brand}</div>
        <Link to={`/product/${product.id}`} className="font-bold text-gray-900 mb-2 hover:text-gray-600 line-clamp-2">
          {product.name}
        </Link>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center text-yellow-400">
            <Star size={14} fill="currentColor" />
            <span className="ml-1 text-black font-medium text-xs">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-400">({product.reviewCount})</span>
        </div>

        <div className="mt-auto flex items-end gap-2">
          {product.salePrice ? (
            <>
              <span className="text-lg font-bold text-red-600">${product.salePrice}</span>
              <span className="text-sm text-gray-400 line-through mb-0.5">${product.price}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
