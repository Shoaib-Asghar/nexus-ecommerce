import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useNotificationStore } from '../stores/notificationStore';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export const Login = () => {
  const { login } = useAuthStore();
  const addNotification = useNotificationStore(state => state.addNotification);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      addNotification('Successfully logged in', 'success');
      navigate('/account');
    } catch (error: any) {
      addNotification(error.message || 'Login failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center min-h-[80vh] items-center">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl shadow-gray-100/50 border border-gray-100">
        <h2 className="text-3xl font-bold mb-2 text-center">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-8">Please enter your details to sign in.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" required
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
            />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline font-medium">Forgot Password?</Link>
            </div>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} required
                value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" disabled={isLoading}
            className="w-full py-4 bg-black text-white rounded-xl font-bold mt-4 hover:bg-gray-900 transition-all flex justify-center items-center gap-2 shadow-lg shadow-black/10 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Don't have an account? <Link to="/register" className="text-black font-bold hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export const Register = () => {
  const { register } = useAuthStore();
  const addNotification = useNotificationStore(state => state.addNotification);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      addNotification("Passwords don't match", 'error');
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      addNotification('Account created successfully', 'success');
      navigate('/account');
    } catch (error: any) {
      addNotification('Registration failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center min-h-[80vh] items-center">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-xl shadow-gray-100/50 border border-gray-100">
        <h2 className="text-3xl font-bold mb-2 text-center">Create an Account</h2>
        <p className="text-gray-500 text-center mb-8">Join us to experience premium shopping.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input 
                type="text" required
                value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input 
                type="text" required
                value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" required
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
            <input 
              type="tel"
              value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} required
                value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
              />
              <button 
                type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input 
              type={showPassword ? 'text' : 'password'} required
              value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
            />
          </div>
          
          <button 
            type="submit" disabled={isLoading}
            className="w-full py-4 bg-black text-white rounded-xl font-bold mt-4 hover:bg-gray-900 transition-all flex justify-center items-center gap-2 shadow-lg shadow-black/10 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-black font-bold hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export const ForgotPassword = () => {
  const addNotification = useNotificationStore(state => state.addNotification);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    addNotification('Reset link sent', 'success');
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center min-h-[80vh] items-center">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl shadow-gray-100/50 border border-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-2">Reset Password</h2>
        
        {isSubmitted ? (
          <div className="py-8 animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <p className="text-gray-600 mb-6 font-medium">If this email exists, a reset link has been sent to {email}.</p>
            <Link to="/login" className="text-black font-bold hover:underline">Return to Login</Link>
          </div>
        ) : (
          <>
            <p className="text-gray-500 mb-8">Enter your email address and we'll send you a link to reset your password.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input 
                  type="email" required placeholder="Enter your email"
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-left"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-black text-white rounded-xl font-bold mt-4 hover:bg-gray-900 transition-all shadow-lg shadow-black/10"
              >
                Send Reset Link
              </button>
            </form>
            <div className="mt-8 text-sm text-gray-500">
              <Link to="/login" className="text-black font-bold hover:underline">Return to Login</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
