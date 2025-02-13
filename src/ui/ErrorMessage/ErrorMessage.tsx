import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <p style={{ color: "red" }}>{message}</p>;
};

ErrorMessage.displayName = 'ErrorMessage';