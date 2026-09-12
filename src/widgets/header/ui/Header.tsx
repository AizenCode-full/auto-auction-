import React from 'react';
import { SearchLots } from '@/features/search-lots';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { logoutSuccess } from '@/entities/user';


interface HeaderProps {
  onOpenAuth: () => void;
  onAddLotClick: () => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenAuth, 
  onAddLotClick, 
  onLogoClick 
}) => {


const dispatch = useDispatch();
const isAuth = useSelector((state: RootState) => state.auth.isAuth);
const logout = () => dispatch(logoutSuccess());


  return (
    <header className="w-full h-[108px] bg-white border-b border-[#1c426d]/10 flex justify-center items-center box-sizing-border">
      <div className="w-[1440px] h-full flex items-center px-10 box-sizing-border">
        <div className="flex items-center flex-grow">
          <button 
            type="button" 
            className="flex flex-col justify-between w-6 h-[18px] bg-none border-none cursor-pointer p-0 mr-8" 
            aria-label="Открыть меню" >
            <span className="w-full h-0.5 bg-[#1c426d] rounded-sm"></span>
            <span className="w-full h-0.5 bg-[#1c426d] rounded-sm"></span>
            <span className="w-full h-0.5 bg-[#1c426d] rounded-sm"></span>
          </button>
          
          <div className="flex items-center mr-12">
            <div onClick={onLogoClick} className="flex items-center cursor-pointer decoration-none">
              <img 
                src="/logo.svg" 
                alt="SDAssistance"
                className="h-12 w-auto block object-contain" 
              />
            </div>
          </div>
          <div className="text-sm color-[#a0a6b5] font-sans">
            Проведено торгов: <strong className="text-[#1c426d] font-bold">12 345</strong>
          </div>
        </div>
        <div className="flex items-center pr-[130px]">
          <div className="mr-5">
            <SearchLots />
          </div>

          {isAuth ? (
            <div className="flex items-center gap-4">
              <button 
                type="button" 
                className="h-[47px] px-6 bg-[#163C66] text-white border-none rounded-geo-8 text-base font-medium cursor-pointer transition-colors duration-200 flex justify-center items-center whitespace-nowrap hover:bg-[#0f2b4c]"
                onClick={onAddLotClick}
              >
                + Добавить лот
              </button>
              <button 
                type="button" 
                className="w-[47px] h-[47px] rounded-full bg-white border border-[#1c426d]/15 flex justify-center items-center cursor-pointer p-0 transition-colors duration-200 hover:bg-[#f5f8fc]" 
                aria-label="Личный кабинет"
              >
                <img src="/icon-user.svg" alt="Профиль" className="w-5 h-5 object-contain" />
              </button>
            </div>
          ) : (
            <button 
              type="button" 
              className="w-[180px] h-[47px] bg-[#163C66] text-white/100 border-none rounded-lg text-base font-normal cursor-pointer transition-colors duration-200 flex justify-center items-center hover:bg-[#0f2b4c]" 
              onClick={onOpenAuth}
            >
              Личный кабинет
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
