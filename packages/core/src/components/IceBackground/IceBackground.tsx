import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PropsWithChildren, ReactElement } from 'react';
import { isGamePage } from '../../game/game-page';

type IceBackgroundProps = PropsWithChildren<{
  logo: ReactElement;
}>;

export const IceBackground = ({ children, logo }: IceBackgroundProps) => {
  const router = useRouter();

  return (
    <div
      className={classNames(
        'w-full h-full ice-background absolute bottom-0 left-0 right-0 flex items-center justify-center z-0',
        { ' translate-y-20': router.pathname === '/game/home' }
      )}
    >
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
      {isGamePage(router.pathname) ? (
        <span className="absolute left-1/2 -translate-x-1/2 top-1/2 translate-y-1/3">
          {logo}
        </span>
      ) : (
        <span className="absolute bottom-2 right-2 flex items-center">
          <span className="text-sm opacity-50 relative left-2 top-2">
            designed by
          </span>
          <Image
            src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/statrookie-logo.png"
            alt="Stat Rookie Logo"
            width={100}
            height={61}
          />
        </span>
      )}

      {children || null}
    </div>
  );
};
