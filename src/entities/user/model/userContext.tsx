import React, { createContext, useContext, useState, ReactNode } from 'react';


interface UserContextType {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
}


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

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  
  
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};
