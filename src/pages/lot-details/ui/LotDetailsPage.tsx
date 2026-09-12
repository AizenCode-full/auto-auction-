import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

interface LotData {
  id: number;
  title: string;
  seller: string;
  year: number;
  transmission: string;
  mileage_km: number;
  engine: string;
  image_url: string;
  min_bid_rub: number;
  vin: string;
  vehicle_type: string;
  brand: string;
  model: string;
  region: string;
  city: string;
  auction_type: 'Открытый' | 'Закрытый' | 'Архив';
  insurance_type?: string;
  start_date?: string;
  auction_end_date?: string;
  end_date?: string;
  generation?: string;
}

type TabType = 'description' | 'tech' | 'comments' | 'docs' | 'trades';

export const LotDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [lot, setLot] = useState<LotData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabType>('description');
  const [activeThumb, setActiveThumb] = useState<number>(0);

  // Стейты живых WebSocket торгов
  const [livePrice, setLivePrice] = useState<number>(0);
  const [liveBids, setLiveBids] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios.get<LotData>(`http://localhost:3000/lots/${id}`)
      .then((res) => {
        setLot(res.data);
        setLivePrice(res.data.min_bid_rub);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка загрузки деталей лота:', err);
        setLoading(false);
      });
  }, [id]);


  useEffect(() => {
    if (!id) return;
    const socket = io('http://localhost:3000');

    socket.emit('join_lot', { lotId: Number(id) });

    socket.on('bid_updated', (data: any) => {
      setLivePrice(data.newPrice);
      setLiveBids(prev => [data.lastBid, ...prev].slice(0, 3));
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  const handlePlaceBidAction = () => {
    const socket = io('http://localhost:3000');
    socket.emit('place_bid', {
      lotId: Number(id),
      userEmail: localStorage.getItem('userEmail') || 'Партнер №' + Math.floor(Math.random() * 100),
      bidAmount: 15000
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="text-center py-[100px] text-lg text-[#718096] font-medium">Загрузка информации о лоте из PostgreSQL...</div>;
  }
  
  if (!lot) {
    return (
      <div className="text-center py-[100px] text-lg text-[#718096] font-medium">
        Лот не найден.{' '}
        <button onClick={handleBack} className="text-[#163C66] underline font-bold cursor-pointer ml-1">
          Назад
        </button>
      </div>
    );
  }

  const allImages = lot.image_url ? lot.image_url.split(',') : [];
  const rawImageFile = allImages[activeThumb];
  const cleanImageFile = typeof rawImageFile === 'string' ? rawImageFile.trim() : '';

  let mainDisplayImage = "https://unsplash.com";
  if (cleanImageFile) {
    mainDisplayImage = cleanImageFile.startsWith('/') 
      ? `http://localhost:3000${cleanImageFile}` 
      : `http://localhost:3000/${cleanImageFile}`;
  }

  return (
    <div className="max-w-[1200px] mx-auto p-5 font-sans box-border text-gray-800 text-left">
      
      <div className="mb-6">
        <span className="text-xs text-[#a0a0a0] cursor-pointer" onClick={handleBack}>
          Главная / Кабинет партнера / Активные лоты / <strong className="text-[#333] font-bold">Лот № {lot.id}</strong>
        </span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black m-0">Лот № {lot.id}</h1>
        <div className="flex items-center gap-4">
          <button 
            type="button" 
            className="bg-white border border-[#cbd5e0] py-2 px-4 rounded-md cursor-pointer text-xs font-medium hover:bg-gray-50 transition-colors" 
            onClick={handleBack}
          >
            ← Вернуться к списку
          </button>
          
          <div className="flex items-center gap-1.5 bg-[#f7fafc] border border-[#edf2f7] py-2 px-3.5 rounded-md font-bold text-sm text-[#163C66]">
            <svg className="w-4 h-4 shrink-0 text-[#163C66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3" />
            </svg>
            <span>14:59:15</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row bg-white border border-[#e2e8f0] rounded-xl p-6 gap-8 mb-10 shadow-sm">
        
        <div className="w-full lg:w-[460px] flex flex-col gap-3 shrink-0">
          <div className="relative w-full h-[290px] rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
            <img src={mainDisplayImage} alt={lot.title} className="w-full h-full object-cover" />
            <span className="absolute top-3 right-3 bg-white/95 text-xs font-semibold text-[#333] py-1.5 px-3 rounded-full shadow-sm flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-[#163C66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
              </svg>
              <span>Од 5ч 5мин</span>
            </span>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {allImages.slice(0, 7).map((imgFile: string, index: number) => {
              const thumbUrl = `http://localhost:3000${imgFile.trim()}`;
              return (
                <img 
                  key={index} 
                  src={thumbUrl} 
                  alt={`thumb ${index + 1}`} 
                  onClick={() => setActiveThumb(index)}
                  className={`w-full h-[60px] object-cover rounded cursor-pointer border-box transition-all ${
                    index === activeThumb ? 'opacity-100 ring-2 ring-[#163C66]' : 'opacity-60 hover:opacity-100'
                  }`} 
                />
              );
            })}
            {allImages.length > 7 && (
              <div className="bg-[#f4f7fc] rounded flex items-center justify-center text-[11px] text-[#718096] font-semibold cursor-pointer text-center leading-tight">
                еще {allImages.length - 7} фото
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="mb-1.5">
              <h2 className="text-2xl font-bold text-black m-0 mb-1.5">{lot.title}</h2>
              <p className="text-xs text-[#718096] m-0 mb-5">Продавец: <strong className="text-gray-800 font-bold">{lot.seller}</strong></p>
            </div>
            
            <div className="text-sm text-[#4a5568] flex flex-wrap gap-4 mb-5 font-medium items-center">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Дата окончания: <strong className="text-gray-900 font-bold">25.04.2023</strong></span>
              </span>
              <span className="text-[#163C66] flex items-center gap-1">
                <svg className="w-4 h-4 text-[#163C66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3" />
                </svg>
                <strong className="font-bold">15:00</strong>
              </span>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#718096] border-b border-[#edf2f7] pb-5 mb-5">
              <div>Год выпуска: <strong className="text-black font-bold">{lot.year}</strong></div>
              <div>КПП: <strong className="text-black font-bold">{lot.transmission}</strong></div>
              <div>Пробег: <strong className="text-black font-bold">{Number(lot.mileage_km || 0).toLocaleString('ru-RU')} км</strong></div>
              <div>Двигатель: <strong className="text-black font-bold">{lot.engine}</strong></div>
            </div>
          </div>

          <div className="bg-[#f8fafc] rounded-lg p-4 flex flex-col border border-gray-100 shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-[#718096] font-medium">Текущая цена:</span>
              <div>
                <span className="text-2xl font-bold text-[#163C66]">{Number(livePrice || lot.min_bid_rub).toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
             <button 
              type="button"
              onClick={handlePlaceBidAction}
              className="w-full h-12 bg-[#163C66] text-white border-none rounded-lg text-sm font-bold cursor-pointer hover:bg-[#0f2b4c] transition-all font-sans mb-4 flex items-center justify-center gap-2 shadow-sm"
            >
           
              <svg className="w-4 h-4 text-white shrink-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Сделать ставку +15 000 ₽</span>
            </button>
            
            <div className="flex flex-col gap-2 mb-2 border-t border-gray-200/50 pt-3">
              <p className="text-xs font-bold text-black m-0 mb-1">Последние ставки (в реальном времени):</p>
              
              {liveBids.length === 0 ? (
                <div className="text-xs text-gray-400 py-2 text-center italic">Пока нет живых ставок. Будьте первым!</div>
              ) : (
                liveBids.map((bid: any, i: number) => (
                  <div key={i} className="flex justify-between text-xs text-[#4a5568] bg-white p-2 rounded border border-gray-100 shadow-sm">
                    <span className="font-medium text-[#163C66]">{bid.user}</span>
                    <span className="text-gray-400">{bid.time}</span>
                    <strong className="text-gray-900 font-bold">{Number(bid.amount).toLocaleString('ru-RU')} ₽</strong>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Навигационное меню  */}
      <nav className="flex gap-8 border-b-2 border-[#edf2f7] mb-6">
        {(['description', 'tech', 'comments', 'docs', 'trades'] as const).map((tab) => {
          const labels: Record<TabType, string> = {
            description: 'Описание',
            tech: 'Техническое состояние',
            comments: 'Комментарий',
            docs: 'Документы',
            trades: 'Дополнительные торги'
          };
          return (
            <button
              key={tab}
              className={`bg-none border-none py-3 text-sm font-medium cursor-pointer relative transition-colors outline-none ${
                activeTab === tab 
                  ? 'text-[#163C66] font-bold after:content-[""] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[3px] after:bg-[#163C66]' 
                  : 'text-[#718096] hover:text-[#163C66]'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {labels[tab]}
            </button>
          );
        })}
      </nav>

      {/* Вывод спецификаций  */}
      {activeTab === 'description' && (
        <div className="flex flex-col md:flex-row gap-16 bg-white border border-[#e2e8f0] p-6 rounded-xl shadow-sm">
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between py-2.5 text-sm border-b border-dashed border-[#e2e8f0]">
              <span className="text-[#a0aec0]">Вид страхования:</span>
              <span className="font-semibold text-black">{lot.insurance_type || 'КАСКО'}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm border-b border-dashed border-[#e2e8f0]">
              <span className="text-[#a0aec0]">Тип аукциона:</span>
              <span className="font-semibold text-black">{lot.auction_type}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm border-b border-dashed border-[#e2e8f0]">
              <span className="text-[#a0aec0]">Начало торгов:</span>
              <span className="font-semibold text-black">{lot.start_date || '16 янв. 2026 | 15:30'}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm border-b border-dashed border-[#e2e8f0]">
              <span className="text-[#a0aec0]">Окончание торгов:</span>
              <span className="font-semibold text-black">{lot.auction_end_date || '22 янв. 2026 | 15:00'}</span>
            </div>
            <div className="h-6"></div>
            
            <div className="flex justify-between py-2.5 text-sm border-b border-dashed border-[#e2e8f0]">
              <span className="text-[#a0aec0]">VIN номер:</span>
              <span className="font-semibold text-black flex gap-2 items-center font-mono">
                {lot.vin}{' '}
                <span className="text-[11px] text-[#718096] underline cursor-pointer normal-case font-sans font-normal hover:text-blue-600">
                  Сайт ГИБДД
                </span>
              </span>
            </div>
            <div className="flex justify-between py-2.5 text-sm border-b border-dashed border-[#e2e8f0]">
              <span className="text-[#a0aec0]">Тип авто:</span>
              <span className="font-semibold text-black">{lot.vehicle_type}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm border-b border-dashed border-[#e2e8f0]">
              <span className="text-[#a0aec0]">Марка:</span>
              <span className="font-semibold text-black">{lot.brand}</span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between py-2.5 text-sm border-b border-dashed border-[#e2e8f0]">
              <span className="text-[#a0aec0]">Окончание торгов:</span>
              <span className="font-semibold text-black">{lot.end_date || '22 янв. 2026'}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm border-b border-dashed border-[#e2e8f0]">
              <span className="text-[#a0aec0]">Срок обязывающего предложения:</span>
              <span className="font-semibold text-black">45 дней</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm border-b border-dashed border-[#e2e8f0]">
              <span className="text-[#a0aec0]">Регион:</span>
              <span className="font-semibold text-black">{lot.region}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm border-b border-dashed border-[#e2e8f0]">
              <span className="text-[#a0aec0]">Город:</span>
              <span className="font-semibold text-black">{lot.city}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm border-b border-dashed border-[#e2e8f0]">
              <span className="text-[#a0aec0]">Модель:</span>
              <span className="font-semibold text-black">{lot.model}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm border-b border-dashed border-[#e2e8f0]">
              <span className="text-[#a0aec0]">Поколение:</span>
              <span className="font-semibold text-black">{lot.generation || '—'}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm border-b border-dashed border-[#e2e8f0]">
              <span className="text-[#a0aec0]">Год выпуска:</span>
              <span className="font-semibold text-black">{lot.year}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};