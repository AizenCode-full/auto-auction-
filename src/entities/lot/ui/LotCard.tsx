import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

interface LotProps {
  data: {
    id: number;
    title: string;
    min_bid_rub: number; // Стоимость  в сомах
    city: string;
    mileage_km: number;
    transmission: string;
    engine: string;
    auction_type: 'Открытый' | 'Закрытый' | 'Архив' | string;
    image_url?: string;
  };
  onOpenAuth?: () => void; 
}

export const LotCard: React.FC<LotProps> = ({ data, onOpenAuth }) => {
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

  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);


  const allImages = image_url ? image_url.split(',') : [];
  const firstImage = allImages.length > 0 ? allImages[0].trim() : '';

  const displayImage = firstImage.startsWith('http') 
    ? firstImage 
    : "https://unsplash.com";

  const isOpen = auction_type === 'Открытый';


  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuth) {
      if (onOpenAuth) onOpenAuth();
      return;
    }

    navigate(`/lots/${id}`);
  };

  return (
    <div 
      onClick={handleCardClick}

      className="group w-[340px] h-[440px] bg-white rounded-xl p-4 flex flex-col box-border text-left font-sans shrink-0 cursor-pointer border border-gray-100 hover:shadow-[0_12px_35px_rgba(0,0,0,0.03)] hover:border-gray-200 transition-all duration-300 relative overflow-hidden"
    >

      <div className="relative w-full h-[180px] overflow-hidden rounded-lg bg-gray-50 shrink-0">
        <img 
          src={displayImage} 
          alt={title} 
          className="w-full h-full object-cover block transition-transform duration-700 ease-out group-hover:scale-102" 
        />
    
        <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider py-1 px-2.5 rounded backdrop-blur-md bg-white/90 border border-gray-200/30 flex items-center gap-1.5 shadow-xs z-20">
          <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          <span className="text-gray-700">{auction_type}</span>
        </span>

        <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-xs text-white text-[10px] font-medium py-0.5 px-2 rounded z-20">
          ID: {id}
        </div>
      </div>

      <div className="mt-3.5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-gray-900 text-base font-bold m-0 mb-3 font-sans line-clamp-1 group-hover:text-[#163C66] transition-colors duration-200 tracking-tight">
            {title}
          </h3>
          
          <div className="flex flex-col gap-2.5 border-b border-gray-100/70 pb-3">
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-400 text-xs font-medium flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Локация:
              </span>
              <span className="text-gray-500 text-xs font-semibold">{city}</span>
            </div>
            
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-400 text-xs font-medium flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                Пробег:
              </span>
              <span className="text-gray-600 text-xs font-semibold">{Number(mileage_km || 0).toLocaleString('ru-RU')} км</span>
            </div>
            
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-400 text-xs font-medium flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                КПП:
              </span>
              <span className="text-gray-600 text-xs font-medium">{transmission}</span>
            </div>
            
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-400 text-xs font-medium flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                Двигатель:
              </span>
              <span className="text-gray-600 text-xs font-medium truncate max-w-[160px]">{engine}</span>
            </div>
          </div>
        </div>

        <div className="mt-2.5 relative h-10 overflow-hidden w-full">

          <div className="absolute inset-0 flex items-center justify-between transition-all duration-300 transform group-hover:opacity-0 group-hover:translate-y-2">
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Текущая ставка</span>
              <span className="text-base font-bold text-[#163C66] tracking-tight mt-0.5">
                {Number(min_bid_rub).toLocaleString('ru-RU')} KGS
              </span>
            </div>
            <span className="text-[10px] text-gray-500 bg-gray-50 border border-gray-100 py-0.5 px-2 rounded font-medium flex items-center gap-1">
              5ч 5мин
            </span>
          </div>

          <div className="absolute inset-0 transform translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 flex items-center">
            <div className="w-full h-9 bg-transparent border border-[#163C66] text-[#163C66] rounded-lg text-xs font-semibold flex items-center justify-center gap-2 group-hover:bg-[#163C66] group-hover:text-white transition-all duration-300">
              <svg className="w-3.5 h-3.5 text-current shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <rect x="5" y="11" width="14" height="10" rx="1.5" ry="1.5" />
                <path d="M12 3a4 4 0 00-4 4v4h8V7a4 4 0 00-4-4z" />
              </svg>
              <span>Подать обязывающую ставку</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
