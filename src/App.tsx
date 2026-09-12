import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; 
import { RootState } from '@/app/store';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { AuthModal, RegisterModal } from '@/features/auth';
import './index.css';

type ModalType = 'auth' | 'register' | null;

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
 
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  

  const [modalType, setModalType] = useState<ModalType>(null);

 
  useEffect(() => {
    if (isAuth) {
      
      if (location.pathname === '/') {
        navigate('/dashboard');
      }
    } else {
      if (location.pathname.startsWith('/dashboard')) {
        navigate('/');
      }
    }
  }, [isAuth, location.pathname, navigate]);

  const handleAddLotAction = () => {
    if (isAuth) {
      navigate('/dashboard/create');
    } else {
      setModalType('auth');
    }
  };

  return (
    <div className="app-wrapper flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header 
        onOpenAuth={() => setModalType('auth')} 
        onAddLotClick={handleAddLotAction}
        onLogoClick={() => navigate(isAuth ? '/dashboard' : '/')}
      />
      
      <main className="flex-grow mt-0 mb-10">
        <Outlet />
      </main>

      <Footer />

      <AuthModal 
        isOpen={modalType === 'auth'} 
        onClose={() => setModalType(null)} 
        onSwitchToRegister={() => setModalType('register')} 
      />

      <RegisterModal 
        isOpen={modalType === 'register'} 
        onClose={() => setModalType(null)} 
        onSwitchToAuth={() => setModalType('auth')} 
      />
    </div>
  );
}

