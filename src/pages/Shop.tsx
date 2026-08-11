import React, { useState, useMemo } from 'react';
import { useProductStore } from '../stores/productStore';
import ProductCard from '../components/product/ProductCard';
import { Filter, ChevronDown } from 'lucide-react';
import { useParams, useLocation } from 'react-router-dom';

const Shop = () => {
  const { slug } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isSale = searchParams.get('sale') === 'true';

  const products = useProductStore(state => state.products);
  
  const [selectedCategory, setSelectedCategory] = useState<string>(
    slug ? (slug === 'new' ? '' : slug.replace('-', ' ').toLowerCase()) : ''
  );
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    { value: 'featured', label: 'Sort by: Featured' },
    { value: 'newest', label: 'Sort by: Newest' },
    { value: 'price-asc', label: 'Sort by: Price (Low to High)' },
    { value: 'price-desc', label: 'Sort by: Price (High to Low)' },
    { value: 'rating', label: 'Sort by: Top Rated' },
  ];

  React.useEffect(() => {
    if (slug) {
      setSelectedCategory(slug === 'new' ? '' : slug.replace('-', ' ').toLowerCase());
    } else {
      setSelectedCategory('');
    }
  }, [slug]);

  const categories = Array.from(new Set(products.map(p => p.category)));
  const brands = Array.from(new Set(products.map(p => p.brand)));

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    if (selectedCategory) {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory);
    }
    
    if (selectedBrand) {
      result = result.filter(p => p.brand === selectedBrand);
    }
    
    if (isSale) {
      result = result.filter(p => !!p.salePrice);
    }
    
    if (slug === 'new') {
      // Just sort by date or mock newness
      result = result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [products, selectedCategory, selectedBrand, sortOption, isSale, slug]);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 capitalize">
            {slug === 'new' ? 'New Arrivals' : isSale ? 'Sale' : slug ? slug.replace('-', ' ') : 'All Products'}
          </h1>
          <p className="text-gray-500">Showing {filteredProducts.length} results</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl font-medium"
          >
            <Filter size={18} /> Filters
          </button>
          
          <div className="relative" onMouseLeave={() => setIsSortOpen(false)}>
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center justify-between w-[240px] bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black font-medium"
            >
              <span className="truncate">{sortOptions.find(o => o.value === sortOption)?.label}</span>
              <ChevronDown size={18} className={`transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            {isSortOpen && (
              <div className="absolute right-0 top-full mt-2 w-[240px] bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                {sortOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => { setSortOption(option.value); setIsSortOpen(false); }}
                    className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${sortOption === option.value ? 'bg-gray-50 font-bold' : ''}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`w-full md:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-24 space-y-8">
            
            {/* Category Filter */}
            <div>
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedCategory('')}
                  className={`block w-full text-left py-1 text-sm ${!selectedCategory ? 'font-bold text-black' : 'text-gray-500 hover:text-black'}`}
                >
                  All Categories
                </button>
                {categories.map(category => (
                  <button 
                    key={category}
                    onClick={() => setSelectedCategory(category.toLowerCase())}
                    className={`block w-full text-left py-1 text-sm ${selectedCategory === category.toLowerCase() ? 'font-bold text-black' : 'text-gray-500 hover:text-black'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full" />

            {/* Brand Filter */}
            <div>
              <h3 className="font-bold text-lg mb-4">Brands</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                <button 
                  onClick={() => setSelectedBrand('')}
                  className={`block w-full text-left py-1 text-sm ${!selectedBrand ? 'font-bold text-black' : 'text-gray-500 hover:text-black'}`}
                >
                  All Brands
                </button>
                {brands.map(brand => (
                  <button 
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`block w-full text-left py-1 text-sm ${selectedBrand === brand ? 'font-bold text-black' : 'text-gray-500 hover:text-black'}`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
            
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Filter size={32} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No products found</h3>
              <p className="text-gray-500 mb-8 max-w-md">
                We couldn't find anything matching your current filters. Try removing some filters to see more results.
              </p>
              <button 
                onClick={() => { setSelectedCategory(''); setSelectedBrand(''); }}
                className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
