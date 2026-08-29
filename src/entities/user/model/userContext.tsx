import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Описываем тип для данных, которые хранятся в контексте
interface UserContextType {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
}

// 2. Создаем контекст с изначальным значением null, но указываем его тип
const UserContext = createContext<UserContextType | null>(null);

// Типизируем пропсы для Провайдера (он принимает дочерние элементы children)
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const login = () => setIsAuth(true);
  const logout = () => setIsAuth(false);

  return (
    <UserContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Кастомный хук для безопасного использования контекста
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  
  // Если хук вызван вне провайдера, TypeScript сразу выдаст ошибку в рантайме
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};
