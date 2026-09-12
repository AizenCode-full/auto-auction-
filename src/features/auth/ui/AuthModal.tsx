import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/entities/user'; 
import { AppDispatch, RootState } from '@/app/store'; 

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
 
  const dispatch = useDispatch<AppDispatch>();
  
  const { loading, error } = useSelector((state: RootState) => state.auth);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const login_contact = formData.get('login_contact') as string;
    const password = formData.get('password') as string;

    const resultAction = await dispatch(loginUser({ login_contact, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      onClose();
    }
  };

  return (

    <div className="fixed inset-0 w-screen h-screen bg-black/40 backdrop-blur-[4px] flex justify-center items-center z-50" onClick={onClose}>
      <div className="relative flex flex-col w-[546px] h-[485px] bg-white items-center rounded-2xl p-10 shadow-[0px_10px_30px_rgba(0,0,0,0.1)]" onClick={(e) => e.stopPropagation()}>
        
        <button type="button" className="absolute top-5 right-6 text-[#aaaaaa] text-[28px] leading-none hover:text-[#333]" onClick={onClose}>&times;</button>
        
        <h2 className="font-bold text-3xl text-black mt-2.5 mb-8 tracking-[-0.5px]">Авторизация</h2>
        
        <form className="flex flex-col items-center w-full gap-4" onSubmit={handleSubmit}>
          {error && <div className="text-xs text-red-600 font-medium w-[404px] text-center bg-red-50 p-2 rounded-md border border-red-100">{error}</div>}

          <div className="w-[404px]">
            <input 
              type="text" 
              placeholder="E-mail или телефон" 
              name="login_contact" 
              required 
              className="w-full h-[52px] border border-[#1c426d]/20 rounded-xl px-4 text-sm text-black outline-none focus:border-[#163C66] placeholder:text-[#a0a6b5]"
            />
          </div>

          <div className="w-[404px] flex flex-col gap-2 mb-6">
            <input 
              type="password" 
              name="password" 
              placeholder="Пароль" 
              required 
              className="w-full h-[52px] border border-[#1c426d]/20 rounded-xl px-4 text-sm text-black outline-none focus:border-[#163C66] placeholder:text-[#a0a6b5] [-webkit-text-security:asterisk]"
            />
            <div className="flex items-center gap-1.5 pl-1">
             <svg 
               className="w-5 h-5 text-current shrink-0 transition-transform duration-200 group-hover:scale-110" 
               fill="none" 
               stroke="currentColor" 
               viewBox="0 0 24 24"
               strokeWidth="2.4" 
               strokeLinecap="round" 
               strokeLinejoin="round"
>
 
              <rect x="5" y="11" width="14" height="10" rx="2" ry="2" />
              <path d="M12 3a4 4 0 00-4 4v4h8V7a4 4 0 00-4-4z" />
              </svg>


              <a href="#" className="text-sm text-[#8a94a6] hover:underline" onClick={(e) => e.preventDefault()}>Забыли пароль?</a>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="border-none rounded-xl w-[404px] h-[56px] bg-[#163C66] text-white font-medium text-base cursor-pointer hover:bg-[#0f2b4c] disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Вход в систему...' : 'Войти'}
          </button>
        </form>
        
        <a href="#" className="mt-auto text-sm text-[#163C66] underline font-medium hover:no-underline" onClick={(e) => { e.preventDefault(); if (onSwitchToRegister) onSwitchToRegister(); }}>
          Зарегистрироваться
        </a>
      </div>
    </div>
  );
};
