import React from 'react';
export const FilterLots: React.FC = () => {
  return (
    <aside className="w-[280px] bg-[#f4f7fc] rounded-xl p-5 px-4 box-border flex flex-col gap-4 font-sans shrink-0">

      <div className="flex flex-col gap-2.5">
        <select className="w-full h-[42px] bg-white border border-[#1c426d]/10 rounded-lg px-3 text-sm text-[#718096] outline-none box-border appearance-none">
          <option>Вид страхования</option>
        </select>
        
        <select className="w-full h-[42px] bg-white border border-[#1c426d]/10 rounded-lg px-3 text-sm text-[#718096] outline-none box-border appearance-none">
          <option>Выберите тип лота</option>
        </select>
        
        <input type="text" placeholder="Номер лота" className="w-full h-[42px] bg-white border border-[#1c426d]/10 rounded-lg px-3 text-sm text-[#718096] outline-none box-border placeholder:text-[#a0a0a0]" />
        <input type="text" placeholder="VIN/Frame" className="w-full h-[42px] bg-white border border-[#1c426d]/10 rounded-lg px-3 text-sm text-[#718096] outline-none box-border placeholder:text-[#a0a0a0]" />
        <input type="text" placeholder="№ Дела" className="w-full h-[42px] bg-white border border-[#1c426d]/10 rounded-lg px-3 text-sm text-[#718096] outline-none box-border placeholder:text-[#a0a0a0]" />
        
        <div className="flex items-center bg-white border border-[#1c426d]/10 rounded-lg h-[42px] px-3">
          <select className="border-none bg-transparent text-sm text-[#718096] outline-none w-[45%] appearance-none">
            <option>Год от</option>
          </select>
          <span className="text-[#cbd5e1] mx-2">|</span>
          <select className="border-none bg-transparent text-sm text-[#718096] outline-none w-[45%] appearance-none">
            <option>до</option>
          </select>
        </div>

        <input type="text" placeholder="Дата добавления" className="w-full h-[42px] bg-white border border-[#1c426d]/10 rounded-lg px-3 text-sm text-[#718096] outline-none box-border placeholder:text-[#a0a0a0]" />
        <input type="text" placeholder="Дата завершения" className="w-full h-[42px] bg-white border border-[#1c426d]/10 rounded-lg px-3 text-sm text-[#718096] outline-none box-border placeholder:text-[#a0a0a0]" />
        
        <select className="w-full h-[42px] bg-white border border-[#1c426d]/10 rounded-lg px-3 text-sm text-[#718096] outline-none box-border appearance-none">
          <option>Тип авто</option>
        </select>
        
        <select className="w-full h-[42px] bg-white border border-[#1c426d]/10 rounded-lg px-3 text-sm text-[#718096] outline-none box-border appearance-none">
          <option>Марка авто</option>
        </select>
        
        <select className="w-full h-[42px] bg-white border border-[#1c426d]/10 rounded-lg px-3 text-sm text-[#718096] outline-none box-border appearance-none">
          <option>Модель авто</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <button type="button" className="bg-transparent border-none text-[#718096] text-xs cursor-pointer mt-2 block w-full text-center underline hover:text-[#163C66] transition-colors">
          🔍 Найти / Сохранить поиск
        </button>
        <button type="button" className="w-full h-46px h-[46px] bg-transparent border border-[#163C66] text-[#163C66] rounded-lg text-sm font-medium cursor-pointer mt-3.5 hover:bg-[#163C66] hover:text-white transition-all duration-200">
          Показать 5 420 авто
        </button>
        <button type="button" className="bg-transparent border-none text-[#a0aec0] text-xs cursor-pointer mt-2 block w-full text-center hover:text-red-500 transition-colors">
          ✕ Сбросить фильтр
        </button>
      </div>
    </aside>
  );
};
