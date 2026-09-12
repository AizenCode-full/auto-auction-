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
          <h2 className="text-2xl font-bold text-[#181b1e] m-0">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full">
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

    </div>
  );
};