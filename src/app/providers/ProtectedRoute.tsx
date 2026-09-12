import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '@/app/store';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);


  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};
