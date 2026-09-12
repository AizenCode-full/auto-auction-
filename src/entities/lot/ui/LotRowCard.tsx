import React from 'react';
import { useNavigate } from 'react-router-dom';

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
  onCardClick?: (id: number) => void;
}

export const LotRowCard: React.FC<LotRowCardProps> = ({
  data,
  onCardClick,
}) => {
  const {
    id,
    title,
    seller,
    year,
    transmission,
    mileage_km,
    engine,
    min_bid_rub,
    image_url,
  } = data;

  const navigate = useNavigate();

  
  const allImages = image_url
    ? image_url.split(',').map((url) => url.trim()).filter(Boolean)
    : [];

  const displayImage = allImages[0] || 'https://placehold.co/600x400';

  const handleNavigation = () => {
    if (onCardClick) {
      onCardClick(id);
    } else {
      navigate(`/lots/${id}`);
    }
  };

  return (
    <div
      className="flex border-b border-gray-100 py-3.5 w-full h-[160px] box-border gap-6 font-sans cursor-pointer transition-all hover:bg-gray-50/60 items-center text-left"
      onClick={handleNavigation}
    >
  
      <div className="relative w-[180px] h-[120px] shrink-0 overflow-hidden rounded-lg bg-gray-50">
        <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-xs text-white text-[9px] font-semibold py-0.5 px-1.5 rounded tracking-wide z-10">
          Горячий лот
        </div>

        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover block"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/600x400';
          }}
        />
      </div>

      <div className="flex-grow flex flex-col justify-center min-w-0">
        <h3 className="text-gray-900 text-base font-semibold m-0 mb-1 truncate tracking-tight hover:text-[#163C66] transition-colors">
          {title} – Лот № {id}
        </h3>

        <p className="text-[11px] text-gray-400 m-0 mb-3">
          Организатор торгов: <span className="text-gray-600 font-medium">{seller}</span>
        </p>


        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-gray-400">
          <div className="truncate">Год выпуска: <strong className="text-gray-700 font-semibold ml-1">{year}</strong></div>
          <div className="truncate">Коробка КПП: <strong className="text-gray-700 font-semibold ml-1">{transmission}</strong></div>
          <div className="truncate">Пробег ТС: <strong className="text-gray-700 font-semibold ml-1">{Number(mileage_km).toLocaleString('ru-RU')} км</strong></div>
          <div className="truncate">Агрегат: <strong className="text-gray-700 font-semibold ml-1">{engine}</strong></div>
        </div>
      </div>

      {/* Таймер и  цена в сомах  */}
      <div className="w-[160px] flex flex-col items-end justify-center gap-3 shrink-0 pr-2">
        <div className="text-[10px] text-gray-500 bg-gray-50 border border-gray-100 py-0.5 px-2 rounded font-medium tracking-wide">
          ⏱ 5ч 5мин
        </div>

        <div className="text-right w-full">
          <span className="block text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Текущая ставка:</span>
          <span className="text-lg font-bold text-[#163C66] tracking-tight">
            {Number(min_bid_rub).toLocaleString('ru-RU')} KGS
          </span>
        </div>
      </div>

    </div>
  );
};