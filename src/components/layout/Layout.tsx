import Header from './Header';
import Footer from './Footer';
import ToastContainer from '../ui/Toast';
import QuickViewModal from '../product/QuickViewModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <main className="flex-grow pt-[72px]">
        {children}
      </main>
      <Footer />
      <ToastContainer />
      <QuickViewModal />
    </div>
  );
};

export default Layout;
