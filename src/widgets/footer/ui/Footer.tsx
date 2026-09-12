import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F2F8FF]! p-0 box-border font-sans">
      <div className="max-w-[1473px] mx-auto flex flex-col bg-[#F2F8FF]">
        <div className="w-full bg-[#163C66] pt-20 px-5 sm:px-20 pb-[100px] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 box-border text-left">
          <h2 className="text-[#F2F8FF]! text-4xl sm:text-[62px] font-bold leading-[1.1] m-0 tracking-[-0.5px] font-sans">
            УНИКАЛЬНАЯ БАЗА<br />НАШИХ КЛИЕНТОВ
          </h2>
          <div className="flex flex-col gap-4 w-full sm:w-auto">
            <button 
              type="button" 
              className="w-full sm:w-[379px] h-[62px] bg-transparent border border-white/40 text-white rounded-[10px] text-xl sm:text-[22px] font-normal cursor-pointer hover:bg-white/10 hover:border-white transition-all duration-200"
            >
              Стать продавцом
            </button>
            <button 
              type="button" 
              className="w-full sm:w-[379px] h-[62px] bg-transparent border border-white/40 text-white rounded-[10px] text-xl sm:text-[22px] font-normal cursor-pointer hover:bg-white/10 hover:border-white transition-all duration-200"
            >
              Стать покупателем
            </button>
          </div>
        </div>
        <div className="w-full bg-white rounded-t-[40px] rounded-b-0 -mt-10 pt-[60px] px-5 sm:px-20 pb-[60px] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 box-border text-left relative z-10">
          <div className="flex flex-col">
            <nav className="flex flex-col gap-3">
              <a href="#" className="no-underline text-gray-600 text-sm hover:text-[#163C66] transition-colors">О компании</a>
              <a href="#" className="no-underline text-gray-600 text-sm hover:text-[#163C66] transition-colors">Партнеры</a>
              <a href="#" className="no-underline text-gray-600 text-sm hover:text-[#163C66] transition-colors">Новости</a>
              <a href="#" className="no-underline text-[#1a4273] font-semibold text-sm hover:underline transition-all">Документация / Регламенты</a>
              <a href="#" className="no-underline text-gray-600 text-sm hover:text-[#163C66] transition-colors">Вход</a>
              <a href="#" className="no-underline text-gray-600 text-sm hover:text-[#163C66] transition-colors">Регистрация</a>
              <a href="#" className="no-underline text-gray-600 text-sm hover:text-[#163C66] transition-colors">Проверка транспортного средства</a>
            </nav>
            <div className="flex gap-[15px] mt-10">
              <img 
                src="/logo-visa.svg" 
                alt="Visa" 
                className="h-6" 
                onError={(e) => (e.target as HTMLImageElement).style.display='none'} 
              />
              <img 
                src="/logo-mastercard.svg" 
                alt="MasterCard" 
                className="h-6" 
                onError={(e) => (e.target as HTMLImageElement).style.display='none'} 
              />
              <img 
                src="/logo-mir.svg" 
                alt="МИР" 
                className="h-6" 
                onError={(e) => (e.target as HTMLImageElement).style.display='none'} 
              />
            </div>
            <p className="mt-[30px] text-xs text-[#a0aec0] m-0">2025 - 2026 © Все права защищены.</p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-3.5">
              <div className="flex flex-wrap items-baseline gap-3">
                <a href="tel:312705829393" className="text-2xl sm:text-[32px] font-bold text-[#0b315e] no-underline hover:opacity-90 transition-opacity">
                  (312) 705 82 93 93
                </a>
                <span className="text-xs text-[#a0aec0]">Звонок по КР бесплатный</span>
              </div>
              <a href="mailto:assist@sd-assist.ru" className="text-xl sm:text-2xl text-[#1a4273] no-underline font-medium hover:opacity-90 transition-opacity">
                assist@sd-assist.ru
              </a>
              <a href="mailto:auction@sd-assist.ru" className="text-xl sm:text-2xl text-[#1a4273] no-underline font-medium hover:opacity-90 transition-opacity">
                auction@sd-assist.ru
              </a>
            </div>
            <div className="flex items-center gap-3 mt-[35px]">
              <div className="flex gap-2.5">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src="/icon-vk.svg" alt="ВКонтакте" className="w-6 h-6" onError={(e) => (e.target as HTMLImageElement).style.display='none'} />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src="/icon-fb.svg" alt="Facebook" className="w-6 h-6" onError={(e) => (e.target as HTMLImageElement).style.display='none'} />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src="/icon-inst.svg" alt="Instagram" className="w-6 h-6" onError={(e) => (e.target as HTMLImageElement).style.display='none'} />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src="/icon-yt.svg" alt="YouTube" className="w-6 h-6" onError={(e) => (e.target as HTMLImageElement).style.display='none'} />
                </a>
              </div>
              <span className="text-sm text-[#718096]">Мы в соцсетях</span>
            </div>

            <p className="mt-[35px] text-xs leading-relaxed text-[#718096] m-0">
              Свидетельство о регистрации электронного СМИ ЭЛ № ФС 77 - 76018 выдано Федеральной службой по надзору в сфере связи, информационных технологий и массовых коммуникаций 24.06.2026 года
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};
