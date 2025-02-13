import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

Button.displayName = "Button";
