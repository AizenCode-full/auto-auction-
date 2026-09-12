import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LotSuggestion {
  id: number;
  title: string;
  brand: string;
  model: string;
  min_bid_rub: number;
}

export const SearchLots: React.FC = () => {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [allLots, setAllLots] = useState<LotSuggestion[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<LotSuggestion[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    axios.get<any>('http://localhost:3000/lots')
      .then((res) => {
        setAllLots(res.data.data || []);
      })
      .catch((err) => {
        console.error('Ошибка загрузки подсказок для поиска:', err);
      });
  }, []);

  //  ФИЛЬТРАЦИЯ
  useEffect(() => {
    // Если строка пустая — выводим последние 5 лотов из базы данных
    if (searchQuery.trim() === '') {
      setFilteredSuggestions(allLots.slice(0, 5));
      return;
    }

    const query = searchQuery.toLowerCase();
    const matches = allLots.filter((lot) => 
      lot.title.toLowerCase().includes(query) ||
      lot.brand.toLowerCase().includes(query) ||
      lot.model.toLowerCase().includes(query)
    );

    setFilteredSuggestions(matches.slice(0, 5));
  }, [searchQuery, allLots]);

  // 3. ЗАКРЫТИЕ ПО КЛИКУ МИМО
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (lotId: number) => {
    setIsDropdownOpen(false);
    setSearchQuery(''); 
    navigate(`/lots/${lotId}`);
  };

  return (
    <>
      {/*  Затемнение и размытие  заднего фона при поиске */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 z-40 cursor-pointer"
          onClick={() => setIsDropdownOpen(false)} // Закрываем поиск при клике на темный фон
        />
      )}

    
      <div className={`relative w-[320px] font-sans ${isDropdownOpen ? 'z-50' : 'z-30'}`} ref={menuRef}>
        
        {/* Поисковая строка */}
        <div className="relative w-full h-[47px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            placeholder="Поиск лотов (Марка, модель, ID)..."
            className="w-full h-full bg-[#f5f8fc] border border-[#1c426d]/10 rounded-lg pl-10 pr-4 text-sm font-medium text-[#163C66] placeholder-gray-400 outline-none focus:border-[#163C66] focus:bg-white transition-all box-border shadow-xs"
          />
          
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/*ВЫПАДАЮЩИЙ СПИСОК */}
        {isDropdownOpen && filteredSuggestions.length > 0 && (
          <div className="absolute top-[54px] left-0 w-full bg-white border border-gray-100 rounded-xl shadow-2xl py-2 flex flex-col animate-fade-in max-h-[300px] overflow-y-auto">
            <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#a0a6b5] border-b border-gray-50 mb-1">
              {searchQuery.trim() === '' ? ' Свежие предложения на торгах' : 'Найдено на торгах PostgreSQL'}
            </div>
            
            {filteredSuggestions.map((lot) => (
              <button
                key={lot.id}
                type="button"
                onClick={() => handleSelectSuggestion(lot.id)}
                className="w-full text-left px-4 py-3 bg-transparent border-none hover:bg-gray-50 cursor-pointer flex justify-between items-center gap-2 group transition-colors"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-gray-900 group-hover:text-[#163C66] truncate transition-colors">
                    {lot.title}
                  </span>
                  <span className="text-[11px] text-gray-400 mt-0.5">
                    Лот № {lot.id}
                  </span>
                </div>
                
                <span className="text-xs font-extrabold text-[#163C66] bg-[#F2F8FF] px-2 py-1 rounded border border-[#163c66]/10 shrink-0">
                  {Number(lot.min_bid_rub).toLocaleString('ru-RU')} ₽
                </span>
              </button>
            ))}
          </div>
        )}

        {/* если совпадений нет */}
        {isDropdownOpen && searchQuery.trim() !== '' && filteredSuggestions.length === 0 && (
          <div className="absolute top-[54px] left-0 w-full bg-white border border-gray-100 rounded-xl shadow-2xl py-4 px-4 text-center text-xs text-gray-400 font-medium italic">
            Совпадений в базе данных не найдено
          </div>
        )}

      </div>
    </>
  );
};