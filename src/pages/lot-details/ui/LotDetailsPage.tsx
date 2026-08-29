
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
interface LotDetailsPageProps {
  lotId: number | null;
  onBack: () => void;
}

type TabType = 'description' | 'tech' | 'comments' | 'docs' | 'trades';

export const LotDetailsPage: React.FC<LotDetailsPageProps> = ({ lotId, onBack }) => {
  const [lot, setLot] = useState<LotData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabType>('description');

  useEffect(() => {
    if (!lotId) return;
    setLoading(true);
    axios.get<LotData>(`http://localhost:5000/lots/${lotId}`)
      .then((res) => {
        setLot(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [lotId]);

  if (loading) {
    return <div className="text-center py-[100px] text-lg text-[#718096]">Загрузка информации о лоте...</div>;
  }
  
  if (!lot) {
    return (
      <div className="text-center py-[100px] text-lg text-[#718096]">
        Лот не найден.{' '}
        <button onClick={onBack} className="text-[#163C66] underline font-bold cursor-pointer ml-1">
          Назад
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto p-5 font-sans box-border text-gray-800">
      
      <div className="mb-6">
        <span className="text-xs text-[#a0a0a0] cursor-pointer" onClick={onBack}>
          Главная / Кабинет партнера / Активные лоты / <strong className="text-[#333] font-bold">Лот № {lot.id}</strong>
        </span>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black m-0">Лот № {lot.id}</h1>
        <div className="flex items-center gap-4">
          <button 
            type="button" 
            className="bg-white border border-[#cbd5e0] py-2 px-4 rounded-md cursor-pointer text-xs hover:bg-gray-50 transition-colors" 
            onClick={onBack}
          >
            ← Вернуться к списку
          </button>
          <span className="bg-[#f7fafc] border border-[#edf2f7] py-2 px-3.5 rounded-md font-bold text-sm">
            14:59:15
          </span>
        </div>
      </div>
      <div className="flex bg-white border border-[#e2e8f0] rounded-xl p-6 gap-8 mb-10">
        <div className="w-[460px] flex flex-col gap-3 shrink-0">
          <div className="relative w-full h-[290px] rounded-lg overflow-hidden">
            <img src={lot.image_url} alt={lot.title} className="w-full h-full object-cover" />
            <span className="absolute top-3 right-3 bg-white/95 text-xs font-semibold text-[#333] py-1.5 px-3 rounded-full shadow-sm">
              ⏱ Од 5ч 5мин
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(7)].map((_, index) => (
              <img 
                key={index} 
                src={lot.image_url} 
                alt="thumb" 
                className={`w-full h-[60px] object-cover rounded cursor-pointer opacity-70 border-box transition-all ${
                  index === 0 ? 'opacity-100 border-2 border-[#163C66]' : 'hover:opacity-100 hover:border-2 hover:border-[#163C66]'
                }`} 
              />
            ))}
            <div className="bg-[#f4f7fc] rounded flex items-center justify-center text-[11px] text-[#718096] font-semibold cursor-pointer text-center leading-tight">
              еще 10 фото
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="mb-1.5">
            <h2 className="text-2xl font-bold text-black m-0 mb-1.5">{lot.title}</h2>
            <p className="text-xs text-[#718096] m-0 mb-5">Продавец: <strong className="text-gray-800 font-bold">{lot.seller}</strong></p>
          </div>
          <div className="text-sm text-[#4a5568] flex gap-4 mb-5">
            <span>📅 Дата и время окончания: <strong className="text-gray-900 font-bold">25.04.2023</strong></span>
            <span className="text-[#163C66]">⏰ <strong className="font-bold">15:00</strong></span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#718096] border-b border-[#edf2f7] pb-5 mb-5">
            <div>Год выпуска: <strong className="text-black font-bold">{lot.year}</strong></div>
            <div>КПП: <strong className="text-black font-bold">{lot.transmission}</strong></div>
            <div>Пробег: <strong className="text-black font-bold">{lot.mileage_km?.toLocaleString('ru-RU')} км</strong></div>
            <div>Двигатель: <strong className="text-black font-bold">{lot.engine}</strong></div>
          </div>
          <div className="bg-[#f8fafc] rounded-lg p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-[#718096]">Текущая цена:</span>
              <div>
                <span className="text-2xl font-bold text-[#163C66]">{lot.min_bid_rub?.toLocaleString('ru-RU')} ₽</span>
                <span className="text-sm text-[#a0aec0] line-through ml-3">785 000.00 ₽</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <p className="text-xs font-bold text-black m-0 mb-1">Последние ставки:</p>

              <div className="flex justify-between text-xs text-[#4a5568]">
                <span>Участник 8</span><span>18.12.2021 15:44</span><strong className="text-gray-900 font-bold">1 405 000.00 ₽</strong>
              </div>
              <div className="flex justify-between text-xs text-[#4a5568]">
                <span>Участник 7</span><span>18.12.2021 15:44</span><strong className="text-gray-900 font-bold">1 285 000.00 ₽</strong>
              </div>
              <div className="flex justify-between text-xs text-[#4a5568]">
                <span>Участник 6</span><span>18.12.2021 15:44</span><strong className="text-gray-900 font-bold">885 000.00 ₽</strong>
              </div>
            </div>
            <button 
              type="button" 
              className="w-full bg-white border border-[#cbd5e0] h-[38px] rounded-md text-xs text-[#163C66] font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
            >
              Посмотреть все ставки
            </button>
          </div>
        </div>
      </div>
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
              className={`bg-none border-none py-3 text-sm font-medium cursor-pointer relative transition-colors ${
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
      {activeTab === 'description' && (
        <div className="flex gap-16">
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
              <span className="font-semibold text-black">{lot.start_date || '16 янв. 2023 | 15:30'}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm border-b border-dashed border-[#e2e8f0]">
              <span className="text-[#a0aec0]">Окончание торгов:</span>
              <span className="font-semibold text-black">{lot.auction_end_date || '16 янв. 2023 | 15:30'}</span>
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
              <span className="font-semibold text-black">{lot.end_date}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm border-b border-dashed border-[#e2e8f0]">
              <span className="text-[#a0aec0]">Срок обязывающего предложения:</span>
              <span className="font-semibold text-black">45</span>
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

