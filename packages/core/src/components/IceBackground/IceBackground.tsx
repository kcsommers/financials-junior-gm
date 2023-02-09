import Image from 'next/image';
import { PropsWithChildren } from 'react';

type IceBackgroundProps = PropsWithChildren;

export const IceBackground = ({ children }: IceBackgroundProps) => {
  return (
    <div className="w-full h-full ice-background absolute top-20 bottom-0 left-0 right-0 flex items-center justify-center z-0">
      <Image
        priority={true}
        fill={true}
        src="https://res.cloudinary.com/ddbcnnu7h/image/upload/v1675973301/hockey_rink_eiq5nm.png"
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
