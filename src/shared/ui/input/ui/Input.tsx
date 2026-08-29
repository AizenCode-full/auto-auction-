import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({ placeholder, className = '', ...props }) => {
  return (
    <div className={`flex flex-row items-center w-[280px] h-[47px] bg-white border border-[#1c426d]/20 rounded-[10px] px-[16px] box-border focus-within:border-[#163C66] ${className}`}>
      <img 
        src="/icon-search.svg" 
        alt="Лупа" 
        className="w-[18px] h-[18px] mr-[12px] flex-shrink-0"
        onError={(e) => {
        
          (e.target as HTMLElement).style.display = 'none';
        }}
      />
      
      <input 
        type="text" 
        className="border-none bg-transparent outline-none w-full h-full text-[16px] font-normal text-black placeholder-[#8c9091]" 
        placeholder={placeholder} 
        {...props} 
      />
    </div>
  );
};
