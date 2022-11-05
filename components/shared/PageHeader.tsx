import React from 'react';

export default function PageHeader({
  title,
  extra,
  children,
}: {
  children: any;
  title?: string;
  extra?: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <h1>{title}</h1>
        <div>{extra}</div>
      </div>
      {children}
    </div>
  );
}
