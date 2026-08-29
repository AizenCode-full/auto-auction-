
import React from 'react';
import { useUser } from '@/entities/user';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
  if (!isOpen) return null;

  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 w-screen h-screen bg-black/40 backdrop-blur-[4px] flex justify-center items-center z-[1000]"
      onClick={onClose}
    >
      <div 
        className="relative display flex flex-col w-[546px] h-[485px] bg-white items-center rounded-2xl p-10 box-shadow shadow-[0px_10px_30px_rgba(0,0,0,0.1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          type="button" 
          className="absolute top-5 right-6 bg-none border-none text-[#aaaaaa] text-[28px] cursor-pointer w-auto h-auto line-none leading-none hover:text-[#333] transition-colors" 
          onClick={onClose}
        >
          &times;
        </button>
        
        <h2 className="font-bold text-3xl text-black! mt-2.5 mb-8 tracking-[-0.5px]">
          Авторизация
        </h2>
        <form className="flex flex-col items-center w-full gap-4" onSubmit={handleSubmit}>
          
          <div className="w-[404px]">
            <input 
              type="text" 
              placeholder="E-mail или телефон" 
              name="login_contact" 
              pattern="^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(\+?[0-9]{10,15})$" 
              title="Введите корректный email или номер телефона" 
              className="w-full h-[52px] border border-[#1c426d]/20 rounded-xl px-4 text-sm text-black outline-none focus:border-[#163C66] transition-colors placeholder:text-[#a0a6b5]"
              required 
            />
          </div>

          <div className="w-[404px] flex flex-col gap-2 mb-6">
            <div className="w-full">
              <input 
                type="password" 
                name="password" 
                placeholder="Пароль" 
                required 
                pattern="^(?=.*[0-9])(?=.*[A-ZА-Я])[^/*+\-=\s]{8,}$" 
                title="Пароль должен быть не менее 8 символов, содержать цифру и заглавную букву" 
                className="w-full h-[52px] border border-[#1c426d]/20 rounded-xl px-4 text-sm text-black outline-none focus:border-[#163C66] transition-colors placeholder:text-[#a0a6b5] [text-security:asterisk] [-webkit-text-security:asterisk]"
              />
            </div>
            <div className="flex items-center gap-1.5 pl-1">
              <span className="text-sm text-[#8a94a6]">🔒</span>
              <a 
                href="#" 
                className="text-sm text-[#8a94a6] no-underline hover:underline" 
                onClick={(e) => e.preventDefault()}
              >
                Забыли пароль?
              </a>
            </div>
          </div>
          <button 
            type="submit" 
            className="border-none rounded-xl w-[404px] h-[56px] bg-[#163C66] text-white font-medium text-base cursor-pointer hover:bg-[#0f2b4c] transition-colors"
          >
            Войти
          </button>
        </form>
        <a 
          href="#" 
          className="mt-auto text-sm text-[#163C66] underline font-medium hover:no-underline" 
          onClick={(e) => {
            e.preventDefault();
            if (onSwitchToRegister) onSwitchToRegister();
          }}
        >
          Зарегистрироваться
        </a>
      </div>
    </div>
  );
};
