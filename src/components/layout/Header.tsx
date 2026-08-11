import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User as UserIcon, Menu, X, LogOut } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import { useProductStore } from '../../stores/productStore';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useCartStore(state => state.items);
  const wishlistItems = useWishlistStore(state => state.items);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const products = useProductStore(state => state.products);
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-100',
      isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm py-3' : 'bg-white py-5'
    )}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Mobile Menu Toggle & Search */}
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={toggleMobileMenu} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Menu size={24} />
            </button>
            <button onClick={() => navigate('/search')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search size={20} />
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tighter">
            NEXUS
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            <Link to="/shop" className="relative text-sm font-medium text-gray-600 hover:text-black after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full">Shop All</Link>
            {categories.map(cat => (
              <Link key={cat} to={`/category/${cat.toLowerCase().replace(' & ', '-')}`} className="relative text-sm font-medium text-gray-600 hover:text-black after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full">{cat}</Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={() => navigate('/search')} className="hidden lg:flex p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search size={20} />
            </button>
            
            <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative hidden sm:block" onMouseLeave={() => setIsDropdownOpen(false)}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="p-2 flex hover:bg-gray-100 rounded-full transition-colors">
                  <UserIcon size={20} />
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full pt-2 w-48 z-50"
                    >
                      <div className="bg-white border border-gray-100 rounded-xl shadow-lg py-2">
                        <div className="px-4 py-2 border-b border-gray-50 mb-2">
                          <p className="text-sm font-semibold truncate">{user?.firstName} {user?.lastName}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                        <Link to={user?.role === 'admin' ? '/admin' : '/account'} onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-50">Dashboard</Link>
                        <Link to="/account/orders" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-50">Orders</Link>
                        <button onClick={() => { logout(); setIsDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-900 transition-colors">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 p-6 flex flex-col shadow-2xl lg:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-bold tracking-tighter">NEXUS</span>
                <button onClick={toggleMobileMenu} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-4 flex-grow overflow-y-auto py-2 custom-scrollbar">
                <Link onClick={toggleMobileMenu} to="/shop" className="text-lg font-medium">Shop All</Link>
                {categories.map(cat => (
                  <Link key={cat} onClick={toggleMobileMenu} to={`/category/${cat.toLowerCase().replace(' & ', '-')}`} className="text-lg font-medium text-gray-600">{cat}</Link>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 flex flex-col gap-4">
                {isAuthenticated ? (
                  <>
                    <Link onClick={toggleMobileMenu} to={user?.role === 'admin' ? '/admin' : '/account'} className="flex items-center gap-3 font-medium">
                      <UserIcon size={20} /> My Account
                    </Link>
                    <button onClick={() => { logout(); toggleMobileMenu(); }} className="flex items-center gap-3 font-medium text-red-600">
                      <LogOut size={20} /> Logout
                    </button>
                  </>
                ) : (
                  <Link onClick={toggleMobileMenu} to="/login" className="flex items-center justify-center gap-2 py-3 bg-black text-white rounded-xl font-medium">
                    Login / Register
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
