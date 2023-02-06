import { useLocation } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import Image from 'next/image';

type IceBackgroundProps = PropsWithChildren;

export const IceBackground = ({ children }: IceBackgroundProps) => {
  return (
    <div className="w-full h-full ice-background absolute bottom-0 left-0 right-0 flex items-center content-center z-0">
      <Image
        fill={true}
        src="https://res.cloudinary.com/ddbcnnu7h/image/upload/v1675719677/field_dyjakw.png"
        alt="Hockey rink"
        sizes="1024px"
        style={{
          objectFit: 'cover',
          top: '125px',
        }}
      />
      {children || null}
    </div>
  );
};
