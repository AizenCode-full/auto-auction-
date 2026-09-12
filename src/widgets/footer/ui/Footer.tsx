import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F2F8FF] p-0 box-border font-sans">
      <div className="max-w-[1473px] mx-auto flex flex-col bg-[#F2F8FF]">
       
        <div className="w-full bg-[#163C66] pt-20 px-5 sm:px-20 pb-[80px] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 box-border text-left">
          <h2 className="text-[#F2F8FF] text-2xl sm:text-4xl font-bold leading-[1.2] m-0 tracking-[-0.5px] font-sans">
  УНИКАЛЬНАЯ БАЗА<br />НАШИХ КЛИЕНТОВ
</h2>
          <div className="flex flex-col gap-4 w-full sm:w-auto">
            <button 
              type="button" 
              className="w-full sm:w-[379px] h-[62px] bg-transparent border border-white/40 text-white rounded-[10px] text-xl sm:text-[22px] font-medium cursor-pointer hover:bg-white/10 hover:border-white transition-all duration-200"
            >
              Стать продавцом
            </button>
            <button 
              type="button" 
              className="w-full sm:w-[379px] h-[62px] bg-transparent border border-white/40 text-white rounded-[10px] text-xl sm:text-[22px] font-medium cursor-pointer hover:bg-white/10 hover:border-white transition-all duration-200"
            >
              Стать покупателем
            </button>
          </div>
        </div>

        <div className="w-full bg-white rounded-t-[40px] rounded-b-0 -mt-10 pt-[50px] px-5 sm:px-20 pb-[50px] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 box-border text-left relative z-10">
          <div className="flex flex-col">
            <nav className="flex flex-col gap-3">
              <a href="#" className="no-underline text-gray-600 text-sm hover:text-[#163C66] transition-colors font-medium">О компании ASINA</a>
              <a href="#" className="no-underline text-gray-600 text-sm hover:text-[#163C66] transition-colors font-medium">Партнеры и СВХ</a>
              <a href="#" className="no-underline text-gray-600 text-sm hover:text-[#163C66] transition-colors font-medium">Новости авторынка КР</a>
              <a href="#" className="no-underline text-[#163C66] font-semibold text-sm hover:underline transition-all">Документация / Регламенты аукциона</a>
              <a href="#" className="no-underline text-gray-600 text-sm hover:text-[#163C66] transition-colors font-medium">Вход для дилеров</a>
              <a href="#" className="no-underline text-gray-600 text-sm hover:text-[#163C66] transition-colors font-medium">Регистрация партнера</a>
              <a href="#" className="no-underline text-gray-600 text-sm hover:text-[#163C66] transition-colors font-medium">Проверка Frame-номера (Япония)</a>
            </nav>
            
            <div className="flex gap-[15px] mt-10 items-center">
              <img 
                src="/logo-visa.svg" 
                alt="Visa" 
                className="h-5 opacity-70 hover:opacity-100 transition-opacity" 
                onError={(e) => (e.target as HTMLImageElement).style.display='none'} 
              />
              <img 
                src="/logo-mastercard.svg" 
                alt="MasterCard" 
                className="h-5 opacity-70 hover:opacity-100 transition-opacity" 
                onError={(e) => (e.target as HTMLImageElement).style.display='none'} 
              />
              <img 
                src="/logo-elcart.svg" 
                alt="ЭЛКАРТ" 
                className="h-5 opacity-70 hover:opacity-100 transition-opacity" 
                onError={(e) => (e.target as HTMLImageElement).style.display='none'} 
              />
            </div>
            <p className="mt-[30px] text-xs text-[#a0aec0] m-0 font-medium">2025 - 2026 © ASINA Automotive Portal. Все права защищены.</p>
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-start gap-1">
                <a href="tel:+996312705829" className="text-2xl sm:text-[32px] font-black text-[#163C66] no-underline hover:opacity-90 transition-opacity tracking-tight">
                  +996 (312) 705-82-93-93
                </a>
                <span className="text-xs text-[#a0aec0] font-medium">Колл-центр: звонок по Кыргызстану бесплатный</span>
              </div>
              
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                <a href="mailto:support@asina.kg" className="text-lg sm:text-xl text-gray-700 no-underline font-semibold hover:text-[#163C66] transition-colors">
                  support@asina.kg
                </a>
                <a href="mailto:auction@asina.kg" className="text-lg sm:text-xl text-gray-700 no-underline font-semibold hover:text-[#163C66] transition-colors">
                  auction@asina.kg
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-[35px]">
              <div className="flex gap-2.5">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src="/icon-instagram.svg" alt="Instagram" className="w-6 h-6" onError={(e) => (e.target as HTMLImageElement).style.display='none'} />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src="/icon-telegram.svg" alt="Telegram" className="w-6 h-6" onError={(e) => (e.target as HTMLImageElement).style.display='none'} />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};