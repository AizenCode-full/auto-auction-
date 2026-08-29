import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="w-full bg-white py-10 box-border">
      <div className="max-w-[1440px] mx-auto px-5 text-center">
        <h1 className="text-[62px] font-bold text-[#181b1e] mb-[30px] leading-tight">
          Автомобильный аукцион SD-assist.ru
        </h1>
        <div className="w-full h-[400px] bg-[#0b315e] rounded-lg overflow-hidden">
          <img 
            src="/hero-banner.png" 
            alt="SD-assist Banner" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
