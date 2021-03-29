import { GamePhases } from '@data/season/season';

export const GameButtonSvg = ({ phase, currentScenario, cheerLevel }) => {
  const getFill = () => {
    if (currentScenario) {
      return '#ffd782';
    }

    if (phase !== GamePhases.GAME_ON) {
      return '#070707';
    }

    if (cheerLevel <= 5) {
      return '#00788A';
    }

    if (cheerLevel <= 10) {
      return '#EA7200';
    }

    return '#FE3400';
  };

  const pausedView = (
    <svg
      id='Play'
      xmlns='http://www.w3.org/2000/svg'
      width='120'
      height='120'
      viewBox='0 0 120 120'
    >
      <defs>
        <radialGradient
          id='radial-gradient'
          cx='0.5'
          cy='0.5'
          r='1.006'
          gradientTransform='matrix(0.992, 0.126, -0.126, 0.992, 0.067, -0.059)'
          gradientUnits='objectBoundingBox'
        >
          <stop offset='0' stopColor='#ea7200' />
          <stop offset='1' stopColor='#595959' />
        </radialGradient>
      </defs>
      <g id='Help'>
        <g
          id='Ellipse_2'
          data-name='Ellipse 2'
          fill='#ea7200'
          stroke='#707070'
          strokeWidth='1'
        >
          <circle cx='60' cy='60' r='60' stroke='none' />
          <circle cx='60' cy='60' r='59.5' fill='none' />
        </g>
        <g
          id='Ellipse_3'
          data-name='Ellipse 3'
          transform='translate(12 12)'
          stroke='#fff'
          strokeWidth='1'
          fill='url(#radial-gradient)'
        >
          <circle cx='48' cy='48' r='48' stroke='none' />
          <circle cx='48' cy='48' r='47.5' fill='none' />
        </g>
      </g>
      <path
        id='Polygon_1'
        data-name='Polygon 1'
        d='M36.25,0,72.5,35H0Z'
        transform='translate(83.977 23) rotate(90)'
        fill='#00788a'
      />
    </svg>
  );

  const activeView = (
    <svg
      id='Play'
      xmlns='http://www.w3.org/2000/svg'
      width='120'
      height='120'
      viewBox='0 0 120 120'
      className={`${phase === GamePhases.GAME_ON ? 'game-button-game-on' : ''}${
        phase === GamePhases.WARMING_UP ? 'game-button-warming-up' : ''
      }`}
    >
      <defs>
        <radialGradient
          id='radial-gradient'
          cx='0.5'
          cy='0.5'
          r='1.006'
          gradientTransform='matrix(0.992, 0.126, -0.126, 0.992, 0.067, -0.059)'
          gradientUnits='objectBoundingBox'
        >
          <stop offset='0' stopColor='#fff' />
          <stop offset='1' stopColor='#595959' />
        </radialGradient>
      </defs>
      <g
        id='Group_467'
        data-name='Group 467'
        transform='translate(-452 -551.429)'
      >
        <g
          id='Group_464'
          data-name='Group 464'
          transform='translate(1 230.429)'
        >
          <g
            id='active-boder-layer-1'
            data-name='active-border-layer-1'
            transform='translate(451 321)'
            fill='#070707'
            stroke='#070707'
            strokeWidth='1'
          >
            <circle cx='60' cy='60' r='60' stroke='none' />
            <circle cx='60' cy='60' r='59.5' fill='none' />
          </g>
          <g
            id='active-border-layer-2'
            data-name='active-border-layer-2'
            transform='translate(451 321)'
            fill={getFill()}
            stroke={getFill()}
            strokeWidth='1'
            style={{ transition: 'fill 0.5s ease' }}
            className='active-puck-border'
          >
            <circle cx='60' cy='60' r='60' stroke='none' />
            <circle cx='60' cy='60' r='59.5' fill='none' />
          </g>
          <g
            id='Ellipse_25'
            data-name='Ellipse 25'
            transform='translate(463 333)'
            stroke='#fff'
            strokeWidth='1'
            fill='url(#radial-gradient)'
          >
            <circle cx='48' cy='48' r='48' stroke='none' />
            <circle cx='48' cy='48' r='47.5' fill='none' />
          </g>
        </g>
        <g
          id='Group_465'
          data-name='Group 465'
          transform='translate(-905.324 -428.572)'
        >
          <g
            id='Layer_2'
            data-name='Layer 2'
            transform='translate(1401.636 1054)'
          >
            <g id='logos'>
              <path
                id='Path_3'
                data-name='Path 3'
                d='M30.866,10c.745,0,1.534-.971,1.337-2.265L31.167,1.549C31.042.651,30.493,0,29.853,0H2.367C1.736.024,1.2.664,1.064,1.549L.033,7.735C-.158,9.029.631,10.006,1.365,10h29.5'
                transform='translate(-0.004)'
                fill='#231f20'
              />
            </g>
          </g>
          <g
            id='Layer_2-2'
            data-name='Layer 2'
            transform='translate(1394.293 1000)'
          >
            <g id='Layer_1' data-name='Layer 1' transform='translate(0 0)'>
              <g id='Group_1' data-name='Group 1'>
                <g
                  id='Layer_2-3'
                  data-name='Layer 2'
                  transform='translate(33.021 46.851)'
                >
                  <g id='logos-2' data-name='logos'>
                    <path
                      id='Path_4'
                      data-name='Path 4'
                      d='M1.033,316.96a1.259,1.259,0,0,1-1.01-1.57L.811,311.1A1.135,1.135,0,0,1,1.8,310.03H22.55a1.165,1.165,0,0,1,.985,1.074l.778,4.286a1.262,1.262,0,0,1-1.007,1.57H1.033'
                      transform='translate(0 -310.03)'
                      fill='#006b77'
                    />
                  </g>
                </g>
                <path
                  id='Path_5'
                  data-name='Path 5'
                  d='M179.208,46.846s-1.26.029-3.06-2.088l-1.62-2.409-2.715-4.159-1.8-2.7-2.566-4.145-1.939-3.09-2.782-4.21L159.4,18.911l-3.151-4.857-2.9-4.533-3.742-5.765L147.494.561s.08-.407-.945-.518a1.229,1.229,0,0,0-1.067.207l-.717.725a1.247,1.247,0,0,0,0,1.088c.284.57,3.4,5.479,3.4,5.479l2.067,3.16,2.119,3.368,2.31,3.562,2.133,3.315,1.662,2.682,2.809,4.443,4.1,6.2,2.286,3.569,2.121,3.325,2.9,4.482,2.121,3.264,2.08,3.16L178,53.429'
                  transform='translate(-144.64 0)'
                  fill='#006b77'
                />
              </g>
            </g>
          </g>
          <g
            id='Layer_2-4'
            data-name='Layer 2'
            transform='translate(1383 1000)'
          >
            <g id='Layer_1-2' data-name='Layer 1' transform='translate(0 0)'>
              <g id='Group_1-2' data-name='Group 1'>
                <g
                  id='Layer_2-5'
                  data-name='Layer 2'
                  transform='translate(0 46.851)'
                >
                  <g id='logos-3' data-name='logos'>
                    <path
                      id='Path_4-2'
                      data-name='Path 4'
                      d='M23.3,316.96a1.259,1.259,0,0,0,1.01-1.57l-.788-4.286a1.135,1.135,0,0,0-.993-1.075H1.785A1.165,1.165,0,0,0,.8,311.1L.022,315.39a1.262,1.262,0,0,0,1.007,1.57H23.3'
                      transform='translate(0 -310.03)'
                      fill='#006b77'
                    />
                  </g>
                </g>
                <path
                  id='Path_5-2'
                  data-name='Path 5'
                  d='M144.64,46.846s1.26.029,3.06-2.088l1.62-2.409,2.715-4.159,1.8-2.7,2.566-4.145,1.939-3.09,2.782-4.21,3.321-5.138,3.151-4.857,2.9-4.533,3.742-5.765L176.354.561s-.08-.407.945-.518a1.229,1.229,0,0,1,1.067.207l.717.725a1.247,1.247,0,0,1,0,1.088c-.284.57-3.4,5.479-3.4,5.479l-2.067,3.16-2.119,3.368-2.31,3.562-2.133,3.315-1.662,2.682-2.809,4.443-4.1,6.2L156.2,37.838l-2.121,3.325-2.9,4.482-2.121,3.264-2.08,3.16-1.125,1.36'
                  transform='translate(-121.852 0)'
                  fill='#006b77'
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );

  return phase === GamePhases.READY && !currentScenario
    ? pausedView
    : activeView;
};
