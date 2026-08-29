import React from 'react';

interface LotProps {
  data: {
    id: number;
    title: string;
    min_bid_rub: number;
    city: string;
    mileage_km: number;
    transmission: string;
    engine: string;
    auction_type: 'Открытый' | 'Закрытый' | 'Архив' | string;
    image_url?: string;
  };
}

export const LotCard: React.FC<LotProps> = ({ data }) => {
  const {
    id,
    title,
    min_bid_rub,
    city,
    mileage_km,
    transmission,
    engine,
    auction_type,
    image_url
  } = data;

  const isOpen = auction_type === 'Открытый';

  return (
    <div className="w-[380px] h-[480px] bg-white rounded-xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col box-border text-left font-sans shrink-0">
      <div className="relative w-[348px] h-[200px] overflow-hidden rounded-lg bg-[#f7fafc]">
        <img 
          src={image_url ? image_url : "https://placehold.co"} 
          alt={title} 
          className="w-full h-full object-cover block"
        />
    
        <div className="absolute top-3 left-3 bg-[#163C66] text-white text-xl font-bold py-1.5 px-5 rounded-l-6px rounded-r-16px rounded-tl-[6px] rounded-bl-[6px] rounded-tr-[16px] rounded-br-[16px] z-10">
          {min_bid_rub.toLocaleString('ru-RU')} ₽
        </div>
      </div>
      <div className="mt-4 flex flex-col flex-grow">
        <h3 className="text-black! text-xl font-bold m-0 mb-4 font-sans">
          {title}
        </h3>
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between items-center w-full">
            <span className="text-[#718096]! text-sm font-normal">Лот:</span>
            <span className="text-black! text-sm font-bold text-right">
              {id}{' '}
              <span className={`font-normal text-[13px] ${isOpen ? 'text-[#2e7d32]!' : 'text-[#8c3232]!'}`}>
                ({auction_type})
              </span>
            </span>
          </div>
          
          <div className="flex justify-between items-center w-full">
            <span className="text-[#718096]! text-sm font-normal">Город:</span>
            <span className="text-black! text-sm font-bold text-right">{city}</span>
          </div>
          
          <div className="flex justify-between items-center w-full">
            <span className="text-[#718096]! text-sm font-normal">Пробег:</span>
            <span className="text-black! text-sm font-bold text-right">
              {mileage_km ? mileage_km.toLocaleString('ru-RU') : 0} км
            </span>
          </div>
          
          <div className="flex justify-between items-center w-full">
            <span className="text-[#718096]! text-sm font-normal">КПП:</span>
            <span className="text-black! text-sm font-bold text-right">{transmission}</span>
          </div>
          
          <div className="flex justify-between items-center w-full">
            <span className="text-[#718096]! text-sm font-normal">Двигатель:</span>
            <span className="text-black! text-sm font-bold text-right">{engine}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
