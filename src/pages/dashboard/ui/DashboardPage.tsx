import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LotRowCard } from '../../../entities/lot';
import { FilterLots } from '../../../features/filter-lots';
import { useUser } from '../../../entities/user';

interface Lot {
  id: number;
  title: string;
  seller: string;
  year: number;
  transmission: string;
  mileage_km: number;
  engine: string;
  min_bid_rub: number;
  image_url: string;
  auction_type: 'Открытый' | 'Закрытый' | 'Архив'; 
}

type TabId = 'active' | 'completed' | 'archive';

interface TabItem {
  id: TabId;
  label: string;
  filter: Lot['auction_type'];
}

interface DashboardPageProps {
  onLotClick: (id: number) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onLotClick }) => {
  const { logout } = useUser();
  const [activeTab, setActiveTab] = useState<TabId>('active');
  const [lots, setLots] = useState<Lot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; 

  const tabs: TabItem[] = [
    { id: 'active', label: 'Мои активные', filter: 'Открытый' },
    { id: 'completed', label: 'Мои завершенные', filter: 'Закрытый' },
    { id: 'archive', label: 'Архив', filter: 'Архив' },
  ];

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  useEffect(() => {
    setLoading(true);
    axios.get<Lot[]>('http://localhost:5000/lots')
      .then((res) => {
        setLots(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const currentFilter = tabs.find(t => t.id === activeTab)?.filter;
  const filteredLots = lots.filter(lot => lot.auction_type === currentFilter);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPageLots = filteredLots.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(filteredLots.length / itemsPerPage);

  return (
    <div className="max-w-[1200px] mx-auto py-6 px-4 font-sans box-border">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-black m-0">Активные лоты</h2>
        <button 
          onClick={logout} 
          className="bg-white border border-gray-300 py-2 px-4 rounded-md text-xs text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          Выйти из системы
        </button>
      </div>
      <nav className="mb-6 border-b border-gray-200">
        <ul className="list-none p-0 m-0 flex gap-8">
          {tabs.map((tab) => (
            <li key={tab.id} className="relative">
              
              <button
                className={`bg-none border-none py-3 text-sm cursor-pointer transition-all relative ${
                  activeTab === tab.id 
                    ? 'text-[#163C66] font-bold after:content-[""] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:height after:h-[2px] after:bg-[#163C66]' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-col md:flex-row gap-8 items-start w-full">
        <div className="w-full md:w-[260px] md:min-w-[260px] shrink-0">
          <FilterLots />
        </div>
        <div className="flex-1 min-w-0 flex flex-col w-full">
          {loading ? (
            <p className="text-gray-500">Загрузка лотов...</p>
          ) : (
            <>
              <div className="flex flex-col gap-4 w-full">
                {currentPageLots.length > 0 ? (
                  currentPageLots.map(lot => (
                    <LotRowCard 
                      key={lot.id} 
                      data={lot} 
                      onCardClick={onLotClick} 
                    />
                  ))
                ) : (
                  <p className="text-gray-500 py-4">В данном разделе нет автомобилей.</p>
                )}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-8">
                  {/* .page-nav-btn */}
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-none border-none text-[#163C66] text-sm cursor-pointer disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    Назад
                  </button>
                  <button 
                    onClick={() => setCurrentPage(1)} 
                    className={`bg-none border-none w-8 h-8 flex items-center justify-center text-sm cursor-pointer rounded transition-colors ${
                      currentPage === 1 ? 'bg-[#163C66] text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    1
                  </button>

                  {totalPages >= 2 && (
                    <>
                      <span className="text-gray-300 text-sm">|</span>
                      <button 
                        onClick={() => setCurrentPage(2)} 
                        className={`bg-none border-none w-8 h-8 flex items-center justify-center text-sm cursor-pointer rounded transition-colors ${
                          currentPage === 2 ? 'bg-[#163C66] text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        2
                      </button>
                    </>
                  )}

                  {totalPages >= 3 && (
                    <>
                      <span className="text-gray-300 text-sm">|</span>
                      <button 
                        onClick={() => setCurrentPage(3)} 
                        className={`bg-none border-none w-8 h-8 flex items-center justify-center text-sm cursor-pointer rounded transition-colors ${
                          currentPage === 3 ? 'bg-[#163C66] text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        3
                      </button>
                    </>
                  )}

                  {totalPages > 3 && (
                    <>
                      <span className="text-gray-300 text-sm">|  ...  |</span>
                      <button 
                        onClick={() => setCurrentPage(totalPages)} 
                        className={`bg-none border-none w-8 h-8 flex items-center justify-center text-sm cursor-pointer rounded transition-colors ${
                          currentPage === totalPages ? 'bg-[#163C66] text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-none border-none text-[#163C66] text-sm cursor-pointer disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    Вперед →
                  </button>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};

