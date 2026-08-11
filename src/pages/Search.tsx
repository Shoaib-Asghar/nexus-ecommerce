import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, X, Clock } from 'lucide-react';
import { useProductStore } from '../stores/productStore';
import ProductCard from '../components/product/ProductCard';
import { useLocation, useNavigate } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const products = useProductStore(state => state.products);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      if (!recentSearches.includes(q)) {
        setRecentSearches(prev => [q, ...prev].slice(0, 5));
      }
    }
  }, [location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const clearRecent = () => setRecentSearches([]);

  const searchResults = query ? products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.brand.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  ) : [];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 min-h-screen">
      <div className="max-w-3xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, categories, brands..."
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-14 pr-4 text-lg font-medium focus:outline-none focus:border-black transition-colors"
            autoFocus
          />
          <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          {query && (
            <button 
              type="button" 
              onClick={() => { setQuery(''); navigate('/search'); }}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            >
              <X size={24} />
            </button>
          )}
        </form>

        {!query && recentSearches.length > 0 && (
          <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold flex items-center gap-2"><Clock size={18} /> Recent Searches</h3>
              <button onClick={clearRecent} className="text-sm text-gray-500 hover:text-black">Clear</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((s, idx) => (
                <button 
                  key={idx} 
                  onClick={() => { setQuery(s); navigate(`/search?q=${encodeURIComponent(s)}`); }}
                  className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {query && (
        <div>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Search results for "{query}"</h2>
            <span className="text-gray-500">{searchResults.length} items found</span>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {searchResults.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                <SearchIcon size={32} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No results found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find any products matching your search. Please try a different spelling or keyword.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
