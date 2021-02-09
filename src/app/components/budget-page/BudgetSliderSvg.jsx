export const BudgetSliderSvg = ({ stops }) => {
  console.log('STOPS:::: ', stops);

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='792'
      height='236'
      viewBox='0 0 792 236'
    >
      <defs>
        <clipPath id='clipPath'>
          <rect
            id='Rectangle_158'
            data-name='Rectangle 158'
            width='792'
            height='236'
            transform='translate(128 264)'
            fill='none'
          />
        </clipPath>
        <linearGradient
          id='bottom-gradient'
          x1='0%'
          x2='100%'
          y1='0%'
          y2='100%'
        >
          <stop
            id='spentStart'
            className='spent-fill-start top budget-slider-stop'
            offset={stops.bottom.spentStart}
            style={{ stopColor: '#DC2D2D' }}
          />
          <stop
            id='spentStop'
            className='spent-fill-stop top budget-slider-stop'
            offset={stops.bottom.spentStop}
            style={{ stopColor: '#DC2D2D' }}
          />
          <stop
            id='spendingStart'
            className='spending-fill-start top budget-slider-stop'
            offset={stops.bottom.spendingStart}
            style={{ stopColor: '#002f6c' }}
          />
          <stop
            id='spendingStop'
            className='spending-fill-stop top budget-slider-stop'
            offset={stops.bottom.spendingStop}
            style={{ stopColor: '#002f6c' }}
          />
          <stop
            id='savingsStart'
            className='savings-fill-start top budget-slider-stop'
            offset={stops.bottom.savingsStart}
            style={{ stopColor: '#00788a' }}
          />
          <stop
            id='savingsStop'
            className='savings-fill-stop top budget-slider-stop'
            offset={stops.bottom.savingsStop}
            style={{ stopColor: '#00788a' }}
          />
        </linearGradient>
        <linearGradient id='top-gradient' x1='0%' x2='100%' y1='0%' y2='0%'>
          <stop
            id='spentStart'
            className='spent-fill-start top budget-slider-stop'
            offset={stops.top.spentStart}
            style={{ stopColor: '#DC2D2D' }}
          />
          <stop
            id='spentStop'
            className='spent-fill-stop top budget-slider-stop'
            offset={stops.top.spentStop}
            style={{ stopColor: '#DC2D2D' }}
          />
          <stop
            id='spendingStart'
            className='spending-fill-start top budget-slider-stop'
            offset={stops.top.spendingStart}
            style={{ stopColor: '#002f6c' }}
          />
          <stop
            id='spendingStop'
            className='spending-fill-stop top budget-slider-stop'
            offset={stops.top.spendingStop}
            style={{ stopColor: '#002f6c' }}
          />
          <stop
            id='savingsStart'
            className='savings-fill-start top budget-slider-stop'
            offset={stops.top.savingsStart}
            style={{ stopColor: '#00788a' }}
          />
          <stop
            id='savingsStop'
            className='savings-fill-stop top budget-slider-stop'
            offset={stops.top.savingsStop}
            style={{ stopColor: '#00788a' }}
          />
        </linearGradient>
      </defs>
      <g
        className='stick__savings stick__savings--path'
        data-name='Mask Group 25'
        transform='translate(-128 -264)'
        clipPath='url(#clipPath)'
      >
        <g
          id='shape'
          transform='matrix(0.545, -0.839, 0.839, 0.545, 133.376, 484.576)'
        >
          <g id='Group_76' data-name='Group 76' transform='translate(1.772)'>
            <g
              id='Layer_2'
              data-name='Layer 2'
              transform='translate(326.623 464.43)'
            >
              <g id='logos'>
                <path
                  id='Path_4'
                  data-name='Path 4'
                  d='M10.186,378.338a8.729,8.729,0,0,1-5.11-1.843c-.167-.12-.332-.247-.657-.517-.114-.094-.227-.191-.5-.437C1.324,373.2-.7,368.476.232,362.863L8,320.62c.932-6.137,5.031-10.576,9.783-10.59H222.263c4.659.164,8.712,4.543,9.705,10.59l7.671,42.242c1.429,8.848-4.457,15.521-9.923,15.476H10.186'
                  transform='translate(0 -310.03)'
                  stroke='#000'
                  fill='url(#top-gradient)'
                  strokeWidth='2'
                />
              </g>
            </g>
            <path
              id='Path_5'
              data-name='Path 5'
              d='M485.509,460.592a28.642,28.642,0,0,1-12.368-3.388c-5.024-2.675-11.433-7.654-19.466-17.107l-15.642-24.086L410.9,374.227l-16.437-25.31L368.32,308.661l-19.96-30.736L321.2,236.1l-32.759-50.444-31.225-48.082L228.165,92.842,191.514,36.4,170.7,4.329S162.9-11.318,146.517.7c-8.285,5.9-7.426,14.694-5.784,18.1,2.8,5.615,34.971,55.346,34.971,55.346l20.472,31.525,21.786,33.547,21.786,33.547,21.786,33.547,16.713,25.736,28.225,43.463,39.92,61.57,22.695,34.947,21.2,32.644,28.729,44.238,21.116,32.515s5.528,8.577,11.511,17.726c2.449,3.746,8.473,12.029,11,15.348,8.158,10.709,8.132,10.338,8.132,10.338 M10.186,378.338a8.729,8.729,0,0,1-5.11-1.843c-.167-.12-.332-.247-.657-.517-.114-.094-.227-.191-.5-.437C1.324,373.2-.7,368.476.232,362.863L8,320.62c.932-6.137,5.031-10.576,9.783-10.59H222.263c4.659.164,8.712,4.543,9.705,10.59l7.671,42.242c1.429,8.848-4.457,15.521-9.923,15.476H10.186'
              transform='translate(-141.425 3.838)'
              fill='url(#bottom-gradient)'
              stroke='#000'
              strokeWidth='2'
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
