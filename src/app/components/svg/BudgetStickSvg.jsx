export const BudgetStickSvg = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='825.482'
      height='820.904'
      viewBox='0 0 825.482 820.904'
    >
      <defs>
        <filter
          id='shadow'
          x='0'
          y='670.904'
          width='356'
          height='132'
          filterUnits='userSpaceOnUse'
        >
          <feOffset dx='6' dy='12' input='SourceAlpha' />
          <feGaussianBlur stdDeviation='6' result='blur' />
          <feFlood floodOpacity='0.329' />
          <feComposite operator='in' in2='blur' />
          <feComposite in='SourceGraphic' />
        </filter>
      </defs>
      <g
        id='Budget_Button_-_Main'
        data-name='Budget Button - Main'
        transform='translate(1.261 1.065)'
      >
        <g transform='matrix(1, 0, 0, 1, -1.26, -1.07)' filter='url(#shadow)'>
          <path
            id='shadow-2'
            data-name='shadow'
            d='M10,0H310a10,10,0,0,1,10,10V86a10,10,0,0,1-10,10H10A10,10,0,0,1,0,86V10A10,10,0,0,1,10,0Z'
            transform='translate(12 676.9)'
            fill='#fff'
          />
        </g>
        <g id='shape'>
          <g id='Group_46' data-name='Group 46' transform='translate(0 3.839)'>
            <g
              id='Layer_2'
              data-name='Layer 2'
              transform='translate(0 671.021)'
            >
              <g id='logos'>
                <path
                  id='Path_4'
                  data-name='Path 4'
                  d='M333.733,409.289a12.685,12.685,0,0,0,7.425-2.678c.243-.175.482-.359.955-.752.166-.136.33-.277.72-.635,3.777-3.407,6.723-10.266,5.363-18.423l-11.282-61.382c-1.354-8.917-7.311-15.367-14.216-15.389H25.566c-6.77.238-12.659,6.6-14.1,15.389L.316,386.8c-2.076,12.856,6.476,22.553,14.419,22.488h319'
                  transform='translate(0 -310.03)'
                  fill='#002f6c'
                  stroke='#000'
                  strokeWidth='2'
                />
              </g>
            </g>
            <path
              id='Path_5'
              data-name='Path 5'
              d='M141.425,671.022A41.62,41.62,0,0,0,159.4,666.1c7.3-3.887,17.39-11.316,29.063-25.053l23.2-34.5,38.88-59.564,25.791-38.612L313.086,449l27.777-44.262,39.849-60.3,47.566-73.589,45.13-69.563L515,136.356l53.592-82.571L598.869,8.03s11.34-22.736,35.144-5.27c12.039,8.573,6.323,21.842,3.938,26.784-4.062,8.16-48.74,78.481-48.74,78.481l-29.6,45.257-30.35,48.244-33.08,51.015-30.553,47.487-23.806,38.418-40.233,63.633-58.669,88.74L310.175,541.94,279.8,589.556l-41.564,64.2L207.866,700.5l-30.593,44.223-6.337,8.623-8.1,11.024'
              transform='translate(181.737 0)'
              fill='#002f6c'
              stroke='#000'
              strokeWidth='2'
            />
          </g>
        </g>
        <text
          id='Icon_'
          data-name='Icon '
          transform='translate(228 683.839)'
          fill='#00788a'
          stroke='#000'
          strokeWidth='2'
          fontSize='68.58'
          fontWeight='700'
        >
          <tspan x='-4.234' y='66'>
            $
          </tspan>
        </text>
        <text
          id='Text'
          transform='translate(12.477 691.839)'
          fill='#fff'
          stroke='#000'
          strokeWidth='2'
          fontSize='48'
          fontWeight='700'
        >
          <tspan x='23.224' y='47'>
            Budget
          </tspan>
        </text>
      </g>
    </svg>
  );
};
