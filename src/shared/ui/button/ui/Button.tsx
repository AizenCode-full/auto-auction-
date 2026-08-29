import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  
  const baseStyles = 'px-[18px] py-[8px] rounded-[4px] text-[14px] font-medium cursor-pointer transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-[#163C66] hover:bg-[#0f2b4c] text-white',
    secondary: 'bg-white border border-[#163C66] text-[#163C66] hover:bg-[#f0f4f8]',
    danger: 'bg-white border border-[#8c3232] text-[#8c3232] hover:bg-[#8c3232] hover:text-white',
  };

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
