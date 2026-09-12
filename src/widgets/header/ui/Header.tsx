import React, { useState } from 'react';
import { SearchLots } from '@/features/search-lots';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { logoutSuccess } from '@/entities/user';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onOpenAuth: () => void;
  onAddLotClick: () => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenAuth, 
  onAddLotClick, 
  onLogoClick 
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  
  // Состояния для открытия центрального мега-меню и выпадающего меню профиля
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);

  const logout = () => {
    dispatch(logoutSuccess());
    setIsProfileMenuOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <>
       <header className="w-full h-[108px] bg-white border-b border-[#1c426d]/10 flex justify-center items-center box-border relative z-40">
        <div className="w-[1440px] h-full flex items-center px-10 box-border justify-between">
          
          
          <div className="flex items-center flex-grow">
            
            {/*Гамбургер menu*/}
            <button 
              type="button" 
              className="flex flex-col justify-between w-6 h-[18px] bg-transparent border-none cursor-pointer p-0 mr-8 focus:outline-none group" 
              aria-label="Открыть меню"
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="w-full h-0.5 bg-[#1c426d] rounded-sm transition-all group-hover:bg-[#163C66]"></span>
              <span className="w-full h-0.5 bg-[#1c426d] rounded-sm transition-all group-hover:bg-[#163C66]"></span>
              <span className="w-full h-0.5 bg-[#1c426d] rounded-sm transition-all group-hover:bg-[#163C66]"></span>
            </button>
            
            <div className="flex items-center mr-12">
              <div onClick={onLogoClick} className="flex items-center cursor-pointer no-underline">
                <img 
                  src="/asina.jpg" 
                  alt="ASINA"
                  className="h-27 w-auto block object-contain" 
                />
              </div>
            </div>
            
            <div className="text-sm text-[#a0a6b5] font-sans hidden sm:block text-left">
              Проведено торгов: <strong className="text-[#1c426d] font-bold">12 345</strong>
            </div>
          </div>

    
          <div className="flex items-center pr-0 lg:pr-[130px] relative">
            <div className="mr-5 hidden md:block">
              <SearchLots />
            </div>

            {isAuth ? (
              <div className="flex items-center gap-4 relative">
                <button 
                  type="button" 
                  className="h-[47px] px-6 bg-[#163C66] text-white border-none rounded-lg text-base font-medium cursor-pointer transition-colors duration-200 flex justify-center items-center whitespace-nowrap hover:bg-[#0f2b4c]"
                  onClick={onAddLotClick}
                >
                  + Добавить лот
                </button>
                
                <button 
                  type="button" 
                  className={`w-[47px] h-[47px] rounded-full bg-white border flex justify-center items-center cursor-pointer p-0 transition-all duration-200 ${isProfileMenuOpen ? 'border-[#163C66] bg-gray-50' : 'border-[#1c426d]/15 hover:bg-[#f5f8fc]'}`} 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <img src="/icon-user.svg" alt="Профиль" className="w-25 h-25 object-contain" />
                </button>

                {/*  выпадающее меню  */}
                {isProfileMenuOpen && (
                  <div className="absolute top-[60px] right-0 bg-white border border-gray-100 rounded-xl shadow-xl w-[200px] py-2 flex flex-col z-50 animate-fade-in">
                    <button 
                      onClick={() => { navigate('/dashboard'); setIsProfileMenuOpen(false); }} 
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 bg-transparent border-none hover:bg-gray-50 cursor-pointer"
                    >
                      Мой дашборд
                    </button>
                    <div className="w-full h-[1px] bg-gray-100 my-1"></div>
                    <button 
                      onClick={logout} 
                      className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-600 bg-transparent border-none hover:bg-red-50 cursor-pointer"
                    >
                      Выйти из системы
                    </button>
                  </div>
                )}
              </div>
            ) : (
              
              <button 
                type="button" 
                className="group w-[190px] h-[47px] bg-[#163C66] text-white border-none rounded-lg text-sm font-semibold cursor-pointer transition-colors duration-200 flex justify-center items-center gap-3 hover:bg-[#0f2b4c]" 
                onClick={onOpenAuth}
              >
                <svg 
                  className="w-5 h-5 text-white/95 shrink-0 transition-transform duration-200 group-hover:scale-110" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth="2.4"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="5" y="11" width="14" height="10" rx="2" ry="2" />
                  <path d="M12 3a4 4 0 00-4 4v4h8V7a4 4 0 00-4-4z" />
                </svg>
                <span>Личный кабинет</span>
              </button>
            )}
          </div>

        </div>
      </header>

      <div className={`fixed inset-0 z-50 transition-all duration-300 flex items-center justify-center ${isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        
        <div 
          className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />

        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-8 right-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex justify-center items-center text-white text-2xl hover:bg-white/20 cursor-pointer transition-all z-50 focus:outline-none"
        >
          &times;
        </button>
        <div className={`relative w-full max-w-[800px] px-6 text-center transition-all duration-300 transform ${isMenuOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-5'}`}>
          
   
          <nav className="flex flex-col gap-6 items-center">
            
            {/* Главный каталог */}
            <button 
              onClick={() => { navigate('/'); setIsMenuOpen(false); }} 
              className="bg-transparent border-none text-white text-4xl font-extrabold cursor-pointer hover:text-[#90cdf4] hover:scale-105 transition-all flex items-center gap-4 font-sans tracking-wide outline-none"
            >
              <svg className="w-8 h-8 text-current shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Главный каталог лотов</span>
            </button>

            {/* личный кабинет  */}
            <button 
              onClick={() => { if (isAuth) navigate('/dashboard'); else onOpenAuth(); setIsMenuOpen(false); }} 
              className="bg-transparent border-none text-white text-4xl font-extrabold cursor-pointer hover:text-[#90cdf4] hover:scale-105 transition-all flex items-center gap-4 font-sans tracking-wide outline-none"
            >
              <svg className="w-8 h-8 text-current shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Личный кабинет партнера</span>
            </button>
             {/* Разместить автомобиль */}
            <button 
              onClick={() => { if (isAuth) navigate('/dashboard/create'); else onOpenAuth(); setIsMenuOpen(false); }} 
              className="bg-transparent border-none text-white text-4xl font-extrabold cursor-pointer hover:text-[#90cdf4] hover:scale-105 transition-all flex items-center gap-4 font-sans tracking-wide outline-none"
            >
              <svg className="w-8 h-8 text-current shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Разместить автомобиль</span>
            </button>

            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="bg-transparent border-none text-white/60 text-2xl font-semibold cursor-pointer hover:text-white transition-colors font-sans outline-none mt-4"
            >
              Правила торгов и FAQ
            </button>

            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="bg-transparent border-none text-white/60 text-2xl font-semibold cursor-pointer hover:text-white transition-colors font-sans outline-none"
            >
              Контакты и поддержка
            </button>
          </nav>
<div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in w-full">
            <div className="text-left max-w-[280px] shrink-0">
              <span className="block text-xs uppercase tracking-widest text-gray-400 font-bold">Главный офис ASINA</span>
              <span className="block text-sm text-white/90 mt-1 font-medium font-sans">г. Бишкек, ул. Михаила Фрунзе, 158</span>
              <a href="tel:+996220005005" className="text-lg font-black text-white no-underline hover:text-[#90cdf4] transition-colors block mt-2">+996 (705) 82 93 93</a>
            </div>

            {/* карты Яндекс */}
            <div className="w-full md:w-[420px] h-[160px] rounded-xl overflow-hidden border border-white/10 shadow-2xl shrink-0 opacity-90 hover:opacity-100 transition-opacity duration-300 bg-gray-900 relative">
              <div className="relative overflow-hidden w-full h-full">
                
                <a href="https://yandex.com/maps/org/avto_salon/243454066499/?utm_medium=mapframe&utm_source=maps" className="absolute opacity-0 pointer-events-none text-[1px]">Авто салон</a>
                <a href="https://yandex.com/maps/10309/bishkek/category/car_dealership/184105322/?utm_medium=mapframe&utm_source=maps" className="absolute opacity-0 pointer-events-none text-[1px]">Автосалон в Бишкеке</a>
                <a href="https://yandex.com/maps/10309/bishkek/category/sale_of_used_cars/190246757599/?utm_medium=mapframe&utm_source=maps" className="absolute opacity-0 pointer-events-none text-[1px]">Продажа автомобилей с пробегом в Бишкеке</a>
                
                <iframe 
                  src="https://yandex.com/map-widget/v1/?ll=74.634441%2C42.879577&mode=search&oid=243454066499&ol=biz&z=16.63" 
                  width="100%" 
                  height="100%" 
                  frameBorder="1" 
                  allowFullScreen={true}
                  title="Офис ASINA в Бишкеке"
                  className="block relative w-full h-full border-none"
                  style={{ position: 'relative' }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};