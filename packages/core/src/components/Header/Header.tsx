import { PropsWithChildren } from 'react';
import { ObjectivesBoard } from '../ObjectivesBoard';
import { StickButton } from '../StickButton';
import HomeStickR from '../svg/home-stick-right.svg';
import HomeStickL from '../svg/home-stick-left.svg';

type HeaderProps = PropsWithChildren<{
  inverse?: boolean;
  validateNavigation?: () => boolean;
}>;

export const Header = ({
  children,
  inverse = false,
  validateNavigation,
}: HeaderProps) => {
  return (
    <div className="h-header relative flex items-center justify-between">
      {inverse ? (
        <>
          <div className="pt-2 pl-14">
            <ObjectivesBoard
              visibleObjectives={1}
              size="small"
              filterComplete={true}
            />
          </div>
          {children}
          <div className="translate-x-3">
            <StickButton
              href={'/game/home'}
              inverse={true}
              validateNavigation={validateNavigation}
            >
              <HomeStickR />
            </StickButton>
          </div>
        </>
      ) : (
        <>
          <StickButton
            href={'/game/home'}
            validateNavigation={validateNavigation}
          >
            <HomeStickL />
          </StickButton>
          {children}
          <div className="pt-2 pr-14">
            <ObjectivesBoard
              visibleObjectives={1}
              size="small"
              filterComplete={true}
            />
          </div>
        </>
      )}
    </div>
  );
};
