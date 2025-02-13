import React from 'react';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ headers, children }) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <td key={header}>{header}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  );
};