import React from 'react';
interface LotRowData {
  id: number;
  title: string;
  seller: string;
  year: number;
  transmission: string;
  mileage_km: number;
  engine: string;
  min_bid_rub: number;
  image_url: string;
}
interface LotRowCardProps {
  data: LotRowData;
  onCardClick: (id: number) => void;
}
export const LotRowCard: React.FC<LotRowCardProps> = ({ data, onCardClick }) => {
  const {
    id,
    title,
    seller,
    year,
    transmission,
    mileage_km,
    engine,
    min_bid_rub,
    image_url
  } = data;

  return (
   
    <div 
      className="flex border-b border-gray-200 py-4 w-full h-[170px] box-border gap-6 font-sans cursor-pointer transition-colors hover:bg-gray-50/50" 
      onClick={() => onCardClick && onCardClick(id)}
    >
      <div className="relative w-[200px] h-[135px] shrink-0">
        <div className="absolute top-1.5 left-1.5 bg-[#163C66] text-white text-[10px] font-medium py-0.5 px-1.5 rounded-[3px] z-10">
          Горячий лот 1 час
        </div>
        <img 
          src={image_url ? image_url : "https://placehold.co"} 
          alt={title} 
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="flex-grow flex flex-col justify-start min-w-0">
        {/* .row-card-title */}
        <h3 className="text-base font-bold text-black m-0 mb-1 truncate">
          {title} – Лот № {id}
        </h3>
        <p className="text-xs text-[#718096] m-0 mb-3">
          Продавец: <strong className="font-normal text-[#2d3748]">{seller}</strong>
        </p>
        <div className="grid grid-cols-2 gap-x-5 gap-y-1.5 text-xs text-[#a0aec0]">
          <div className="truncate">Год выпуска: <strong className="text-black font-bold ml-1">{year}</strong></div>
          <div className="truncate">КПП: <strong className="text-black font-bold ml-1">{transmission}</strong></div>
          <div className="truncate">Пробег: <strong className="text-black font-bold ml-1">{mileage_km.toLocaleString('ru-RU')} км</strong></div>
          <div className="truncate">Двигатель: <strong className="text-black font-bold ml-1">{engine}</strong></div>
        </div>
      </div>
      <div className="w-[180px] flex flex-col items-end justify-start gap-5 shrink-0">
        <div className="text-[11px] text-[#8c3232] bg-[#fdf2f2] border border-[#fde8e8] py-1 px-2.5 rounded-full font-medium">
          ⏱ До 5к 5мин
        </div>
        <div className="text-right w-full">
          <span className="block text-[11px] text-[#718096] mb-0.5">Текущая цена:</span>
          <span className="text-lg font-bold text-[#163C66]">
            {min_bid_rub.toLocaleString('ru-RU')} ₽
          </span>
        </div>
      </div>
    </div>
  );
};
