
import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserProvider, useUser } from './entities/user';
import { Header } from './widgets/header';
import { Hero } from './widgets/hero';
import { LotCard } from './entities/lot';
import { DashboardPage } from './pages/dashboard/ui/DashboardPage'; 
import { LotDetailsPage } from './pages/lot-details/ui/LotDetailsPage';
import { Footer } from './widgets/footer';
import { AuthModal, RegisterModal } from './features/auth';
import { CreateLotForm } from './features/create-lot';
import './index.css';


interface Lot {
  id: number;
  title: string;
  min_bid_rub: number;
  city: string;
  mileage_km: number;
  transmission: string;
  engine: string;
  auction_type: string;
  image_url?: string;
  seller?: string; 
  year?: number;   
}


type ViewType = 'catalog' | 'dashboard' | 'create-lot' | 'lot-details';
type ModalType = 'auth' | 'register' | null;

function MainLayout() {
  const { isAuth } = useUser();
  
 
  const [modalType, setModalType] = useState<ModalType>(null);
  const [activeView, setActiveView] = useState<ViewType>('catalog');

  const [selectedLotId, setSelectedLotId] = useState<number | null>(null);

  
  const [lots, setLots] = useState<Lot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6; 


  useEffect(() => {
    if (isAuth) {
      if (activeView !== 'create-lot' && activeView !== 'lot-details') {
        setActiveView('dashboard');
      }
    } else {
      setActiveView('catalog');
    }
  }, [isAuth, activeView]);


  useEffect(() => {
    if (activeView === 'catalog') {
      setLoading(true);
      axios.get<Lot[]>('http://localhost:5000/lots')
        .then((res) => {
          setLots(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Ошибка загрузки данных:', err);
          setLoading(false);
        });
    }
  }, [activeView]);

  
  const handleLotSelect = (id: number) => {
    setSelectedLotId(id);
    setActiveView('lot-details');
  };


  const handleAddLotAction = () => {
    if (isAuth) {
      setActiveView('create-lot');
    } else {
      setModalType('auth');
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPageLots = lots.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(lots.length / itemsPerPage);
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="app-wrapper flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Header 
        onOpenAuth={() => setModalType('auth')} 
        onAddLotClick={handleAddLotAction}
        onLogoClick={() => setActiveView(isAuth ? 'dashboard' : 'catalog')}
      />
      
      <main className="flex-grow mt-0 mb-10">
        
      
        {isAuth && activeView === 'create-lot' && (
          <div className="py-[60px] px-5 bg-white min-h-[600px]">
            <CreateLotForm 
              onSuccess={() => setActiveView('dashboard')} 
              onCancel={() => setActiveView('dashboard')} 
            />
          </div>
        )}

       
        {isAuth && activeView === 'dashboard' && (
          <DashboardPage onLotClick={handleLotSelect} />
        )} 

    
        {isAuth && activeView === 'lot-details' && (
          <LotDetailsPage 
            lotId={selectedLotId} 
            onBack={() => setActiveView('dashboard')} 
          />
        )}
        {!isAuth && activeView === 'catalog' && (
          <>
            <Hero />
            <section className="max-w-[1200px] mx-auto py-[60px] px-5 box-border">
              <h2 className="text-[28px] font-bold mb-8 text-[#163C66] text-left font-sans">
                Недавно размещенные лоты
              </h2>

              {loading ? (
                <p className="text-center text-gray-500 py-10">Загрузка автомобилей из базы данных...</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] justify-center mx-auto">
                    {currentPageLots.map(lot => (
                      <LotCard key={lot.id} data={lot} />
                    ))}
                  </div>

                  {pageNumbers.length > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-[50px]">
                      <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="py-2 px-3.5 bg-white border border-gray-300 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                      >
                        « Назад
                      </button>

                      {pageNumbers.map(number => (
                        <button
                          key={number}
                          onClick={() => setCurrentPage(number)}
                          className={`py-2 px-3.5 rounded cursor-pointer border transition-colors ${
                            currentPage === number 
                              ? 'border-[#163C66] bg-[#163C66] text-white font-bold' 
                              : 'border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100'
                          }`}
                        >
                          {number}
                        </button>
                      ))}

                      <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="py-2 px-3.5 bg-white border border-gray-300 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                      >
                        Вперед »
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          </>
        )}
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

export default function App() {
  return (
    <UserProvider>
      <MainLayout />
    </UserProvider>
  );
}
