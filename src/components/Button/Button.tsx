import React from 'react';

interface IButtonProps {
  disabled?: boolean;
  hasBorder?: boolean;
  name?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<IButtonProps> = ({
  children,
  disabled = false,
  hasBorder = false,
  className = '',
  name,
  onClick,
  type = 'button'
}) => (
  <button
    className={`${
      hasBorder ? 'ba' : 'bn'
    } bg-transparent pr2 dim f6 gray ba b--moon-gray pointer br2 ${className}`}
    disabled={disabled}
    name={name}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);

export default Button;
