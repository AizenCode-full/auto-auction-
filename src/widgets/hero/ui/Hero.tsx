import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LotCard } from '@/entities/lot'; 
import { Pagination } from 'antd'; // Импорт пагинации Ant Design

interface LotData {
  id: number;
  title: string;
  min_bid_rub: number;
  city: string;
  mileage_km: number;
  transmission: string;
  engine: string;
  auction_type: string;
  image_url?: string;
}

interface MetaData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ApiResponse {
  data: LotData[];
  meta: MetaData;
}

export const Hero: React.FC = () => {
  const [lots, setLots] = useState<LotData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  
  const pageSize = 6; // Сетка (6 машин на страницу)

  // Запрос к Nest.js при переключении страниц пагинации
  useEffect(() => {
    setLoading(true);
    axios.get<ApiResponse>(`http://localhost:3000/lots?page=${currentPage}&limit=${pageSize}`)
      .then((res) => {
        setLots(res.data.data);
        setTotalItems(res.data.meta.total);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка загрузки гостевого каталога:', err);
        setLoading(false);
      });
  }, [currentPage]);

  return (
    <div className="w-full flex flex-col gap-10">
      
      <section className="w-full bg-white py-10 box-border">
        <div className="max-w-[1440px] mx-auto px-5 text-center">
          <h1 className="text-[62px] font-bold text-[#181b1e] mb-[30px] leading-tight font-sans">
             AUTOMOTIVE PORTAL & AUCTION.      </h1>
            
          <div className="w-full h-[400px] bg-[#263342] rounded-lg overflow-hidden shadow-sm">
            <img 
              src="/hero-banner.png" 
              alt="SD-assist Banner" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto w-full px-5 pb-16 box-border font-sans">
        <div className="text-left mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-4xl font-bold text-[#181b1e] m-0">
            Активные лоты на торгах
          </h2>
          <p className="text-sm text-gray-400 mt-1 m-0">
            Актуальные предложения страховых и лизинговых компаний в реальном времени.
          </p>
        </div>

      
        {loading ? (
          <div className="text-center py-20 text-gray-400 font-medium text-lg">
            Синхронизация каталога с PostgreSQL...
          </div>
        ) : lots.length === 0 ? (
          <div className="text-center py-16 bg-white border border-gray-100 rounded-xl shadow-sm">
            <p className="text-lg text-gray-400 font-medium m-0">
              В настоящий момент нет активных лотов на торгах
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-10">
             <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 max-w-[1120px] mx-auto w-full">
          {lots.map((lot) => (
            <LotCard key={lot.id} data={lot} />
          ))}
        </div>
            {/* пагинация*/}
            <div className="mt-4 [&_.ant-pagination-item-active]:border-[#0b315e]! [&_.ant-pagination-item-active_a]:text-[#0b315e]!">
              <Pagination
                current={currentPage}
                onChange={(page) => setCurrentPage(page)}
                pageSize={pageSize}
                total={totalItems}
                showSizeChanger={false}
                className="font-medium"
              />
            </div>
          </div>
        )}
      </section>
      <section className="max-w-[1440px] mx-auto w-full px-5 pb-16 box-border font-sans mt-10">
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] text-left flex flex-col md:flex-row gap-8 items-center justify-between">
          
          {/* Левая текстовая колонка */}
          <div className="flex flex-col max-w-[450px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#a0a6b5]">Центральный пункт осмотра</span>
            <h3 className="text-2xl font-black text-gray-900 mt-1 mb-3 tracking-tight">Где проходят торги AsinaTech?</h3>
            <p className="text-sm text-gray-500 font-medium m-0 leading-relaxed mb-4">
              Все автомобили страховых и лизинговых компаний перед запуском на аукцион доставляются на наш специализированный терминал в Бишкеке для прохождения независимой экспертизы.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold mb-2">
              <svg className="w-4 h-4 text-[#163C66] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>г. Бишкек, ул. Михаила Фрунзе, 158</span>
            </div>
            <a href="tel:+996220005005" className="text-sm font-bold text-[#163C66] hover:underline">+996 (220) 00-50-05</a>
          </div>

          {/* Правая колонка: ПОЛНЫЙ ВАЛИДНЫЙ ОРИГИНАЛЬНЫЙ КОД ЯНДЕКСА */}
          <div className="w-full md:w-[640px] h-[320px] rounded-xl overflow-hidden border border-gray-100 shadow-inner shrink-0 relative bg-gray-50">
            <div className="relative overflow-hidden w-full h-full">
              {/* Обязательные ссылки для Яндекса скрыты через opacity-0, но присутствуют в DOM дереве */}
              <a href="https://yandex.com/maps/org/avto_salon/243454066499/?utm_medium=mapframe&utm_source=maps" className="absolute top-0 text-gray-300 text-xs opacity-0">Авто салон</a>
              <a href="https://yandex.com/maps/10309/bishkek/category/car_dealership/184105322/?utm_medium=mapframe&utm_source=maps" className="absolute top-3 text-gray-300 text-xs opacity-0">Автосалон в Бишкеке</a>
              <a href="https://yandex.com/maps/10309/bishkek/category/sale_of_used_cars/190246757599/?utm_medium=mapframe&utm_source=maps" className="absolute top-6 text-gray-300 text-xs opacity-0">Продажа автомобилей с пробегом в Бишкеке</a>
              
              {/* Фрейм с адаптивными классами w-full h-full */}
              <iframe 
                src="https://yandex.com/map-widget/v1/?ll=74.634441%2C42.879577&mode=search&oid=243454066499&ol=biz&z=16.63" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen={true}
                className="relative block border-none w-full h-full"
                title="Карта автосалона ASINA"
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};