import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Mail, MessageCircle, Link2 } from 'lucide-react';
import { useNotificationStore } from '../../stores/notificationStore';

const Footer = () => {
  const [email, setEmail] = useState('');
  const addNotification = useNotificationStore(state => state.addNotification);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      addNotification("You're successfully subscribed.", 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-2xl font-bold tracking-tighter mb-4 block">NEXUS</Link>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Elevate your everyday with our premium collection of modern essentials. Designed for life.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/category/new" className="hover:text-black transition-colors">New Arrivals</Link></li>
              <li><Link to="/category/electronics" className="hover:text-black transition-colors">Electronics</Link></li>
              <li><Link to="/category/fashion" className="hover:text-black transition-colors">Fashion</Link></li>
              <li><Link to="/category/home" className="hover:text-black transition-colors">Home & Living</Link></li>
              <li><Link to="/shop" className="hover:text-black transition-colors">All Products</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-black transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-black transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/track-order" className="hover:text-black transition-colors">Track Order</Link></li>
              <li><Link to="/warranty" className="hover:text-black transition-colors">Warranty</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/about" className="hover:text-black transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-black transition-colors">Careers</Link></li>
              <li><Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-black transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200 gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Nexus. All rights reserved. (Demo Project)
          </p>
          <div className="flex items-center gap-4 text-gray-400">
            <a href="#" className="hover:text-black transition-colors"><Globe size={20} /></a>
            <a href="#" className="hover:text-black transition-colors"><Mail size={20} /></a>
            <a href="#" className="hover:text-black transition-colors"><MessageCircle size={20} /></a>
            <a href="#" className="hover:text-black transition-colors"><Link2 size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
