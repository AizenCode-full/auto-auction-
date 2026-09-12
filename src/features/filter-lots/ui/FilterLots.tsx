import React, { useState } from 'react';

interface FilterLotsProps {
  onFilterChange?: (filters: any) => void;
  onReset?: () => void;
  totalLotsCount?: number;
}

export const FilterLots: React.FC<FilterLotsProps> = ({ 
  onFilterChange, 
  onReset,
  totalLotsCount = 0 
}) => {
  
  const [insuranceType, setInsuranceType] = useState('');
  const [auctionType, setAuctionType] = useState('');
  const [lotId, setLotId] = useState('');
  const [vinFrame, setVinFrame] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [brand, setBrand] = useState('');
  const [region, setRegion] = useState(''); 

 
  const regionsKR = [
    'Бишкек', 'Ош', 'Чуйская область', 'Иссык-Кульская область', 
    'Джалал-Абадская область', 'Ошская область', 'Баткенская область', 
    'Нарынская область', 'Таласская область'
  ];

  const brandsKR = ['Toyota', 'Hyundai', 'Honda', 'Kia', 'Lexus', 'BMW', 'Mercedes-Benz', 'Chevrolet'];
  const vehicleTypesKR = ['Легковой', 'Внедорожник', 'Минивэн', 'Коммерческий', 'Электромобиль'];
  const insuranceTypesKR = ['ОСАГО (Кыргызстан)', 'КАСКО (Добровольное)', 'Зеленая карта'];

  // Генерация годов для селекта текущего 2026 вниз
  const currentYear = 2026;
  const years = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => currentYear - i);

  const handleApplyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        insuranceType,
        auctionType,
        lotId,
        vinFrame,
        yearFrom,
        yearTo,
        vehicleType,
        brand,
        region
      });
    }
  };

  const handleResetFilters = () => {
    setInsuranceType('');
    setAuctionType('');
    setLotId('');
    setVinFrame('');
    setYearFrom('');
    setYearTo('');
    setVehicleType('');
    setBrand('');
    setRegion('');
    if (onReset) onReset();
  };

  return (
    <aside className="w-[280px] bg-[#f4f7fc] rounded-xl p-5 px-4 box-border flex flex-col gap-4 font-sans shrink-0 border border-gray-100 shadow-xs text-left">
      
      <div className="flex flex-col gap-2.5">
        
        {/* Вид страхования */}
        <select 
          value={insuranceType} 
          onChange={(e) => setInsuranceType(e.target.value)}
          className="w-full h-[42px] bg-white border border-[#1c426d]/10 rounded-lg px-3 text-sm text-gray-700 outline-none box-border cursor-pointer"
        >
          <option value="">Вид страхования (КР)</option>
          {insuranceTypesKR.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        
        {/* Тип лота / Аукциона */}
        <select 
          value={auctionType} 
          onChange={(e) => setAuctionType(e.target.value)}
          className="w-full h-[42px] bg-white border border-[#1c426d]/10 rounded-lg px-3 text-sm text-gray-700 outline-none box-border cursor-pointer"
        >
          <option value="">Выберите тип лота</option>
          <option value="Открытый">Открытый аукцион</option>
          <option value="Закрытый">Закрытый аукцион</option>
        </select>
        
      
        <input 
          type="text" 
          value={lotId}
          onChange={(e) => setLotId(e.target.value)}
          placeholder="Номер лота" 
          className="w-full h-[42px] bg-white border border-[#1c426d]/10 rounded-lg px-3 text-sm text-gray-700 outline-none box-border placeholder:text-[#a0a0a0]" 
        />
        
        <input 
          type="text" 
          value={vinFrame}
          onChange={(e) => setVinFrame(e.target.value)}
          placeholder="VIN / Японский Frame" 
          className="w-full h-[42px] bg-white border border-[#1c426d]/10 rounded-lg px-3 text-sm text-gray-700 outline-none box-border placeholder:text-[#a0a0a0]" 
        />
        
        {/* год выпуска */}
        <div className="flex items-center bg-white border border-[#1c426d]/10 rounded-lg h-[42px] px-3 justify-between">
          <select 
            value={yearFrom} 
            onChange={(e) => setYearFrom(e.target.value)}
            className="border-none bg-transparent text-sm text-gray-700 outline-none w-[45%] cursor-pointer"
          >
            <option value="">Год от</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <span className="text-[#cbd5e1]">|</span>
          <select 
            value={yearTo} 
            onChange={(e) => setYearTo(e.target.value)}
            className="border-none bg-transparent text-sm text-gray-700 outline-none w-[45%] cursor-pointer"
          >
            <option value="">до</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        
        {/* Тип авто */}
        <select 
          value={vehicleType} 
          onChange={(e) => setVehicleType(e.target.value)}
          className="w-full h-[42px] bg-white border border-[#1c426d]/10 rounded-lg px-3 text-sm text-gray-700 outline-none box-border cursor-pointer"
        >
          <option value="">Тип кузова</option>
          {vehicleTypesKR.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
        
        {/* Марка авто */}
        <select 
          value={brand} 
          onChange={(e) => setBrand(e.target.value)}
          className="w-full h-[42px] bg-white border border-[#1c426d]/10 rounded-lg px-3 text-sm text-gray-700 outline-none box-border cursor-pointer"
        >
          <option value="">Марка авто</option>
          {brandsKR.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        
        {/* Регион/Город Кыргызстана */}
        <select 
          value={region} 
          onChange={(e) => setRegion(e.target.value)}
          className="w-full h-[42px] bg-white border border-[#1c426d]/10 rounded-lg px-3 text-sm text-gray-700 outline-none box-border appearance-none cursor-pointer"
        >
          <option value="">Регион КР (Локация)</option>
          {regionsKR.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <button 
          type="button" 
          onClick={handleApplyFilters}
          className="w-full h-[46px] bg-[#163C66] text-white border-none rounded-lg text-sm font-semibold cursor-pointer hover:bg-[#0f2b4c] transition-all duration-200 shadow-sm"
        >
          Применить фильтр
        </button>
        
        <button 
          type="button" 
          onClick={handleResetFilters}
          className="bg-transparent border-none text-[#a0aec0] text-xs font-medium cursor-pointer py-1 block w-full text-center hover:text-red-500 transition-colors underline"
        >
          ✕ Сбросить все фильтры
        </button>
      </div>

    </aside>
  );
};