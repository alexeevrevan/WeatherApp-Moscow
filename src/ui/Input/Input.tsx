import React, { forwardRef } from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input type="text" ref={ref} {...props} />;
});

Input.displayName = 'Input';