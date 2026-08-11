import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart, ShoppingCart } from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';
import { useProductStore } from '../../stores/productStore';
import { useCartStore } from '../../stores/cartStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useNotificationStore } from '../../stores/notificationStore';
import { useNavigate } from 'react-router-dom';

const QuickViewModal = () => {
  const { quickViewProductId, closeQuickView } = useUIStore();
  const product = useProductStore(state => state.products.find(p => p.id === quickViewProductId));
  const { addItem } = useCartStore();
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlistStore();
  const addNotification = useNotificationStore(state => state.addNotification);
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});

  // Reset state when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setQuantity(1);
      const initialVariations: Record<string, string> = {};
      product.variations?.forEach(v => {
        initialVariations[v.name] = v.options[0];
      });
      setSelectedVariations(initialVariations);
    }
  }, [product]);

  if (!quickViewProductId) return null;

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity, selectedVariations);
      addNotification(`Added ${quantity} ${product.name} to cart`, 'success');
      closeQuickView();
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeWishlist(product.id);
        addNotification(`Removed ${product.name} from wishlist`, 'info');
      } else {
        addWishlist(product);
        addNotification(`Added ${product.name} to wishlist`, 'success');
      }
    }
  };

  const handleViewDetails = () => {
    if (product) {
      navigate(`/product/${product.id}`);
      closeQuickView();
    }
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
            className="fixed inset-0 bg-black/50 z-[110] backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row pointer-events-auto relative"
            >
              <button
                onClick={closeQuickView}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              {/* Image Gallery */}
              <div className="w-full md:w-1/2 bg-white flex flex-col p-6 h-64 md:h-auto">
                <div className="flex-grow flex items-center justify-center mb-4">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain drop-shadow-xl"
                  />
                </div>
                <div className="flex gap-2 justify-center">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded-xl border-2 overflow-hidden bg-white ${selectedImage === idx ? 'border-black' : 'border-gray-200 opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
                <div className="text-sm text-gray-500 font-medium mb-2">{product.brand}</div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h2>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <span className="ml-1 text-black font-medium text-sm">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
                </div>

                <div className="flex items-end gap-3 mb-6">
                  {product.salePrice ? (
                    <>
                      <span className="text-3xl font-bold text-red-600">${product.salePrice}</span>
                      <span className="text-lg text-gray-400 line-through mb-1">${product.price}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold">${product.price}</span>
                  )}
                </div>

                <div className="h-px bg-gray-100 w-full mb-6" />

                {/* Variations */}
                {product.variations?.map(variation => (
                  <div key={variation.name} className="mb-6">
                    <div className="text-sm font-medium mb-3">{variation.name}</div>
                    <div className="flex flex-wrap gap-2">
                      {variation.options.map(option => (
                        <button
                          key={option}
                          onClick={() => setSelectedVariations(prev => ({ ...prev, [variation.name]: option }))}
                          className={`px-4 py-2 border rounded-xl text-sm font-medium transition-all
                            ${selectedVariations[variation.name] === option 
                              ? 'border-black bg-black text-white' 
                              : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="mb-6">
                  <div className="text-sm font-medium mb-3">Quantity</div>
                  <div className="flex items-center border border-gray-200 rounded-xl w-32">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-4 py-2 text-gray-500 hover:text-black hover:bg-gray-50 rounded-l-xl"
                    >-</button>
                    <div className="flex-1 text-center font-medium">{quantity}</div>
                    <button 
                      onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                      className="px-4 py-2 text-gray-500 hover:text-black hover:bg-gray-50 rounded-r-xl"
                    >+</button>
                  </div>
                </div>

                <div className="mt-auto pt-6 flex flex-col gap-3">
                  <div className="flex gap-3">
                    <button 
                      onClick={handleAddToCart}
                      className="flex-1 bg-black text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-black/20"
                    >
                      <ShoppingCart size={20} /> Add to Cart
                    </button>
                    <button 
                      onClick={handleWishlistToggle}
                      className={`p-4 border rounded-xl flex items-center justify-center transition-colors
                        ${isInWishlist(product.id) ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
                    >
                      <Heart size={24} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <button 
                    onClick={handleViewDetails}
                    className="w-full py-4 bg-gray-50 text-black rounded-xl font-medium hover:bg-gray-100 transition-colors"
                  >
                    View Full Details
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
