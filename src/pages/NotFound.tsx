import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-32 flex flex-col items-center text-center">
      <h1 className="text-9xl font-bold tracking-tighter text-gray-200 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="flex gap-4">
        <Link to="/" className="px-8 py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-900 transition-colors">
          Go Home
        </Link>
        <Link to="/shop" className="px-8 py-4 bg-white text-black border-2 border-gray-200 rounded-xl font-bold hover:border-black transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
