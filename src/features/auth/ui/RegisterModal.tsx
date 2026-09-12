import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/entities/user'; 
import { AppDispatch, RootState } from '@/app/store';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToAuth?: () => void;
}

type TabType = 'fiz' | 'yur';
type RoleType = 'seller' | 'buyer';

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToAuth }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [activeTab, setActiveTab] = useState<TabType>('fiz');
  const [role, setRole] = useState<RoleType>('seller');

  if (!isOpen) return null;

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
    
  //   const formData = new FormData(e.currentTarget);
    
  //   const dataToSend = {
  //     type: activeTab,
  //     role: role,
  //     phone: formData.get('phone') as string,
  //     email: formData.get('email') as string,
  //     inn: (activeTab === 'fiz' ? formData.get('inn_fiz') : formData.get('inn_yur')) as string
  //   };

  
  //   const resultAction = await dispatch(registerUser(dataToSend));

   
  //   if (registerUser.fulfilled.match(resultAction)) {
  //     onClose();
  //   }
  // };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const dataToSend = {
      type: activeTab,
      role: role,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      inn: (activeTab === 'fiz' ? formData.get('inn_fiz') : formData.get('inn_yur')) as string
    };

    const resultAction = await dispatch(registerUser(dataToSend));

    if (registerUser.fulfilled.match(resultAction)) {
      
      const password = resultAction.payload.generatedPassword;
      
      
      alert(`Регистрация успешна!\nВаш пароль для входа в систему: ${password}\nПожалуйста, сохраните его.`);
      
      onClose();
    }
  };

  return (

    <div 
      className="fixed inset-0 w-screen h-screen bg-black/40 backdrop-blur-[4px] flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="relative flex flex-col w-[546px] h-[725px] bg-white rounded-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] py-10 px-12 box-border font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        
        <button 
          type="button" 
          className="absolute top-6 right-6 bg-none border-none text-[24px] text-[#a0a0a0] cursor-pointer leading-none hover:text-[#333] transition-colors" 
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex justify-center gap-6 mb-[35px]">
          <button 
            type="button" 
            className={`bg-none border-none text-xl font-bold pb-2 border-b-3 cursor-pointer transition-all duration-200 ${
              activeTab === 'fiz' ? 'text-[#163C66] border-b-[#163C66]' : 'text-[#a0a0a0] border-b-transparent hover:text-gray-600'
            }`}
            onClick={() => setActiveTab('fiz')}
          >
            Физическое лицо
          </button>
          <button 
            type="button" 
            className={`bg-none border-none text-xl font-bold pb-2 border-b-3 cursor-pointer transition-all duration-200 ${
              activeTab === 'yur' ? 'text-[#163C66] border-b-[#163C66]' : 'text-[#a0a0a0] border-b-transparent hover:text-gray-600'
            }`}
            onClick={() => setActiveTab('yur')}
          >
            Юридическое лицо
          </button>
        </div>

        <form className="flex-grow flex flex-col justify-between" onSubmit={handleSubmit}>
          
          <div className="flex flex-col gap-6">
            
            {error && (
              <div className="text-xs text-red-600 font-medium w-full text-center bg-red-50 p-2.5 rounded-md border border-red-100">
                {error}
              </div>
            )}

            {activeTab === 'fiz' && (
              <div className="w-full">
                <input 
                  type="text" 
                  name="inn_fiz"
                  placeholder="ИНН" 
                  title="ИНН должен состоять из 12 цифр" 
                  inputMode="numeric" 
                  pattern="^\d{12}$" 
                  className="w-full h-14 border border-[#dcdcdc] rounded-[10px] px-[18px] text-sm text-[#333] box-border outline-none placeholder:text-[#a0a0a0] focus:border-[#163C66] transition-colors"
                  required 
                />
              </div>
            )}

            {activeTab === 'yur' && (
              <div className="w-full flex flex-col">
                <input 
                  type="text" 
                  name="inn_yur"
                  placeholder="ИНН" 
                  title="ИНН должен состоять из 10 цифр" 
                  inputMode="numeric" 
                  pattern="^\d{10}$" 
                  className="w-full h-14 border border-[#dcdcdc] rounded-[10px] px-[18px] text-sm text-[#333] box-border outline-none placeholder:text-[#a0a0a0] focus:border-[#163C66] transition-colors"
                  required
                />
                <span className="block text-[11px] text-[#a0a0a0] mt-1.5 ml-1">
                  Данные организации будут заполнены автоматически
                </span>
                <a href="#" className="inline-block text-xs text-[#163C66] underline mt-1 ml-1 hover:no-underline" onClick={(e) => e.preventDefault()}>
                  Ввести данные вручную?
                </a>
              </div>
            )}

            <div className="w-full">
              <input 
                type="tel" 
                name="phone" 
                placeholder="Введите ваш номер телефона*" 
                className="w-full h-14 border border-[#dcdcdc] rounded-[10px] px-[18px] text-sm text-[#333] box-border outline-none placeholder:text-[#a0a0a0] focus:border-[#163C66] transition-colors"
                required 
              />
            </div>
            
            <div className="w-full">
              <input 
                type="email" 
                name="email" 
                placeholder="Введите ваш E-mail" 
                className="w-full h-14 border border-[#dcdcdc] rounded-[10px] px-[18px] text-sm text-[#333] box-border outline-none placeholder:text-[#a0a0a0] focus:border-[#163C66] transition-colors"
              />
            </div>

            <div className="w-full flex flex-col">
              <span className="block text-sm font-bold text-black mb-3">Моя роль в аукционе:</span>
              <div className="flex border border-[#dcdcdc] rounded-[10px] overflow-hidden w-full">
                <input 
                  type="radio" 
                  id="seller" 
                  name="role" 
                  value="seller" 
                  checked={role === 'seller'} 
                  onChange={() => setRole('seller')}
                  className="hidden"
                />
                <label 
                  htmlFor="seller"
                  className={`flex-1 py-4 text-sm font-medium cursor-pointer select-none text-center transition-all duration-200 ${
                    role === 'seller' ? 'bg-[#6e8e6c] text-white' : 'bg-white text-[#a0a0a0] border-r border-[#dcdcdc]'
                  }`}
                >
                  Продавец имущества
                </label>
                
                <input 
                  type="radio" 
                  id="buyer" 
                  name="role" 
                  value="buyer" 
                  checked={role === 'buyer'} 
                  onChange={() => setRole('buyer')}
                  className="hidden"
                />
                <label 
                  htmlFor="buyer"
                  className={`flex-1 py-4 text-sm font-medium cursor-pointer select-none text-center transition-all duration-200 ${
                    role === 'buyer' ? 'bg-[#6e8e6c] text-white' : 'bg-white text-[#a0a0a0]'
                  }`}
                >
                  Покупатель имущества
                </label>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-500 select-none mt-1">
              <input type="checkbox" required defaultChecked className="accent-[#163C66] w-4 h-4 cursor-pointer" />
              <span>Я согласен на обработку персональных данных</span>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="border-none rounded-[10px] w-full h-14 bg-[#163C66] text-white font-semibold text-base cursor-pointer mx-auto block hover:bg-[#0f2b4b] disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Регистрация профиля...' : 'Зарегистрироваться'}
          </button>
        </form>

        {onSwitchToAuth && (
          <a 
            href="#" 
            className="mt-auto text-sm text-[#163C66] underline font-medium text-center block hover:no-underline" 
            onClick={(e) => {
              e.preventDefault();
              onSwitchToAuth();
            }}
          >
            Уже есть аккаунт? Войти
          </a>
        )}
      </div>
    </div>
  );
};
