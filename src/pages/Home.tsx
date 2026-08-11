import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../stores/productStore';
import ProductCard from '../components/product/ProductCard';
import { ArrowRight, Clock, Shield, Truck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const products = useProductStore(state => state.products);
  
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  const flashSaleProducts = products.filter(p => p.salePrice).slice(0, 4);
  
  const [timeLeft, setTimeLeft] = useState(15659);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "Sale Ended";
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };
  

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative h-[80vh] min-h-[600px] flex items-center bg-gray-50 overflow-hidden"
      >
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
              Curated for the<br/> Modern You
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-lg">
              Discover products designed for your modern lifestyle. Uncompromising quality meets timeless minimal design.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2">
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link to="/category/new" className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="py-12 border-b border-gray-100 bg-white"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-black">
                <Truck size={24} />
              </div>
              <h4 className="font-semibold mb-1">Free Shipping</h4>
              <p className="text-sm text-gray-500">On orders over $150</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-black">
                <Shield size={24} />
              </div>
              <h4 className="font-semibold mb-1">Secure Payment</h4>
              <p className="text-sm text-gray-500">100% secure checkout</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-black">
                <RefreshCw size={24} />
              </div>
              <h4 className="font-semibold mb-1">Easy Returns</h4>
              <p className="text-sm text-gray-500">30 days return policy</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-black">
                <Clock size={24} />
              </div>
              <h4 className="font-semibold mb-1">24/7 Support</h4>
              <p className="text-sm text-gray-500">Dedicated assistance</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Shop by Category</h2>
              <p className="text-gray-500">Explore our wide range of premium collections.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/category/electronics" className="group relative h-[400px] rounded-2xl overflow-hidden bg-gray-200">
              <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80" alt="Electronics" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Electronics</h3>
                <span className="inline-flex items-center gap-1 text-sm font-medium hover:underline">
                  Shop Now <ArrowRight size={16} />
                </span>
              </div>
            </Link>
            
            <Link to="/category/fashion" className="group relative h-[400px] rounded-2xl overflow-hidden bg-gray-200">
              <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80" alt="Fashion" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Fashion</h3>
                <span className="inline-flex items-center gap-1 text-sm font-medium hover:underline">
                  Shop Now <ArrowRight size={16} />
                </span>
              </div>
            </Link>

            <div className="grid grid-rows-2 gap-6 h-[400px]">
              <Link to="/category/home-living" className="group relative h-full rounded-2xl overflow-hidden bg-gray-200">
                <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80" alt="Home & Living" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-1">Home & Living</h3>
                  <span className="text-sm font-medium hover:underline">Explore</span>
                </div>
              </Link>
              <Link to="/category/beauty" className="group relative h-full rounded-2xl overflow-hidden bg-gray-200">
                <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80" alt="Beauty" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-1">Beauty</h3>
                  <span className="text-sm font-medium hover:underline">Explore</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Products</h2>
              <p className="text-gray-500">Handpicked selections for you.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 font-medium hover:text-gray-600 transition-colors">
              View All <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center gap-2 font-medium bg-gray-50 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors">
              View All Products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Promotional Banner */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=1600&q=80" alt="Promo Background" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Up to 40% Off Selected Products</h2>
            <p className="text-lg text-gray-300 mb-10">
              Upgrade your setup with our limited time offers. Available while stock lasts.
            </p>
            <Link to="/shop?sale=true" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors">
              Shop Sale <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trending / Flash Sale */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold tracking-tight">Flash Sale</h2>
                <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                  <Clock size={16} /> {formatTime(timeLeft)}
                </div>
              </div>
              <p className="text-gray-500">Hurry up! Offers end soon.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSaleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
