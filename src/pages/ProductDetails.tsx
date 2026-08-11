import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../stores/productStore';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useCompareStore } from '../stores/compareStore';
import { useNotificationStore } from '../stores/notificationStore';
import { Star, Heart, ShoppingCart, Share2, Shield, Truck, RefreshCw, GitCompare } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useProductStore(state => state.products.find(p => p.id === id));
  const products = useProductStore(state => state.products);
  
  const { addItem } = useCartStore();
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlistStore();
  const { addItem: addCompare, removeItem: removeCompare, isInCompare } = useCompareStore();
  const addNotification = useNotificationStore(state => state.addNotification);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('description');
  
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  // Recently Viewed using temporary in-memory state
  
  
  useEffect(() => {
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

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-8">The product you are looking for does not exist or has been removed.</p>
        <button onClick={() => navigate('/shop')} className="px-6 py-3 bg-black text-white rounded-xl font-medium">
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariations);
    addNotification(`Added ${quantity} ${product.name} to cart`, 'success');
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariations);
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeWishlist(product.id);
      addNotification(`Removed ${product.name} from wishlist`, 'info');
    } else {
      addWishlist(product);
      addNotification(`Added ${product.name} to wishlist`, 'success');
    }
  };

  const handleCompareToggle = () => {
    try {
      if (isInCompare(product.id)) {
        removeCompare(product.id);
        addNotification(`Removed ${product.name} from compare`, 'info');
      } else {
        addCompare(product);
        addNotification(`Added ${product.name} to compare`, 'success');
      }
    } catch (e: any) {
      addNotification(e.message, 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-8">
        <button onClick={() => navigate('/')} className="hover:text-black">Home</button>
        <span>/</span>
        <button onClick={() => navigate('/shop')} className="hover:text-black">Shop</button>
        <span>/</span>
        <button onClick={() => navigate(`/category/${product.category.toLowerCase()}`)} className="hover:text-black">{product.category}</button>
        <span>/</span>
        <span className="text-black font-medium">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-20">
        {/* Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 flex items-center justify-center h-[400px] sm:h-[500px] lg:h-[600px] relative overflow-hidden group">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110 cursor-zoom-in"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`flex-shrink-0 w-24 h-24 rounded-xl border-2 overflow-hidden bg-white ${selectedImage === idx ? 'border-black' : 'border-gray-100 opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-6">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{product.brand}</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => {
                  if (product.rating >= i + 1) return <Star key={i} size={18} fill="currentColor" />;
                  if (product.rating >= i + 0.5) return <Star key={i} size={18} fill="currentColor" opacity={0.5} />;
                  return <Star key={i} size={18} className="text-gray-200" />;
                })}
                <span className="ml-2 text-black font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-300">|</span>
              <button className="text-sm text-gray-500 hover:text-black underline underline-offset-4">
                {product.reviewCount} Reviews
              </button>
            </div>

            <div className="flex items-end gap-3">
              {product.salePrice ? (
                <>
                  <span className="text-4xl font-bold text-red-600">${product.salePrice}</span>
                  <span className="text-xl text-gray-400 line-through mb-1">${product.price}</span>
                  <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded">
                    Save ${product.price - product.salePrice}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold">${product.price}</span>
              )}
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="h-px bg-gray-100 w-full mb-8" />

          {/* Variations */}
          {product.variations?.map(variation => (
            <div key={variation.name} className="mb-8">
              <div className="text-sm font-bold uppercase tracking-wider mb-3">Select {variation.name}</div>
              <div className="flex flex-wrap gap-3">
                {variation.options.map(option => (
                  <button
                    key={option}
                    onClick={() => setSelectedVariations(prev => ({ ...prev, [variation.name]: option }))}
                    className={`px-6 py-3 border-2 rounded-xl text-sm font-semibold transition-all
                      ${selectedVariations[variation.name] === option 
                        ? 'border-black bg-black text-white shadow-lg' 
                        : 'border-gray-200 text-gray-600 hover:border-gray-900'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border-2 border-gray-200 rounded-xl w-full sm:w-36 h-14">
              <button 
                disabled={quantity <= 1}
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-4 h-full text-gray-500 hover:text-black hover:bg-gray-50 rounded-l-xl transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
              >-</button>
              <div className="flex-1 text-center font-bold text-lg">{quantity}</div>
              <button 
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                className="px-4 h-full text-gray-500 hover:text-black hover:bg-gray-50 rounded-r-xl transition-colors"
              >+</button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="w-full sm:flex-1 h-14 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-900 transition-all shadow-xl shadow-black/10 hover:-translate-y-0.5"
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
            
            <button 
              onClick={handleBuyNow}
              className="w-full sm:flex-1 h-14 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 hover:-translate-y-0.5"
            >
              Buy Now
            </button>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <button 
              onClick={handleWishlistToggle}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-500 hover:text-black'}`}
            >
              <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} /> 
              {isInWishlist(product.id) ? 'Saved' : 'Save to Wishlist'}
            </button>
            <button 
              onClick={handleCompareToggle}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${isInCompare(product.id) ? 'text-black' : 'text-gray-500 hover:text-black'}`}
            >
              <GitCompare size={20} /> Compare
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors">
              <Share2 size={20} /> Share
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-y border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-full text-gray-700"><Truck size={20} /></div>
              <div>
                <div className="font-semibold text-sm">Free Delivery</div>
                <div className="text-xs text-gray-500">Enter postal code for availability</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-full text-gray-700"><RefreshCw size={20} /></div>
              <div>
                <div className="font-semibold text-sm">Return Delivery</div>
                <div className="text-xs text-gray-500">Free 30 days delivery returns</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <div className="mb-2"><span className="font-semibold text-gray-900">SKU:</span> {product.sku}</div>
            <div className="mb-2"><span className="font-semibold text-gray-900">Categories:</span> {product.category}</div>
            <div><span className="font-semibold text-gray-900">Tags:</span> {product.tags.join(', ')}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-20">
        <div className="flex border-b border-gray-200 gap-8 mb-8">
          <button 
            onClick={() => setActiveTab('description')}
            className={`pb-4 border-b-2 font-bold text-lg transition-colors ${activeTab === 'description' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('specifications')}
            className={`pb-4 border-b-2 font-bold text-lg transition-colors ${activeTab === 'specifications' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
          >
            Specifications
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 border-b-2 font-bold text-lg transition-colors ${activeTab === 'reviews' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
          >
            Reviews ({product.reviewCount})
          </button>
        </div>
        <div className="prose max-w-none text-gray-600">
          {activeTab === 'description' && (
            <div>
              <p>{product.description}</p>
              <p className="mt-4">Enhance your daily routine with our meticulously crafted product. Built with premium materials to ensure longevity and maximum performance.</p>
            </div>
          )}
          {activeTab === 'specifications' && (
            <div className="bg-gray-50 p-6 rounded-xl">
              {product.specifications ? (
                <table className="w-full text-left">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="border-b border-gray-200 last:border-0">
                        <th className="py-3 font-semibold text-gray-900 w-1/3">{key}</th>
                        <td className="py-3">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No specifications available.</p>
              )}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
                <div className="text-5xl font-bold text-gray-900">{product.rating}</div>
                <div>
                  <div className="flex items-center text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => {
                      if (product.rating >= i + 1) return <Star key={i} size={16} fill="currentColor" />;
                      if (product.rating >= i + 0.5) return <Star key={i} size={16} fill="currentColor" opacity={0.5} />;
                      return <Star key={i} size={16} className="text-gray-200" />;
                    })}
                  </div>
                  <div className="text-sm">Based on {product.reviewCount} reviews</div>
                </div>
              </div>
              <p>Customer reviews would appear here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
