import { useMemo } from 'react';

export const LevelStickSvg = ({ num, denom, color, inverse }) => {
  const stickHeight = 210;
  const clipY = Math.max(stickHeight * (num / denom), 0);

  const guid = useMemo(() => Math.floor(Math.random() * 1000000), []);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="212.309"
      height="210.76"
      viewBox="0 0 212.309 210.76"
      style={inverse ? { transform: 'scaleX(-1)' } : {}}
    >
      <defs>
        <clipPath id={`clipPath-${guid}`}>
          <rect
            id="Rectangle_68"
            data-name="Rectangle 68"
            width="64"
            height={stickHeight}
            transform={`translate(70 -${clipY})`}
            style={{ transition: 'all 0.5s ease' }}
            fill="none"
            stroke="#707070"
            strokeWidth="1"
          />
        </clipPath>
      </defs>
      <g
        id={`Hockey_Visual-${guid}`}
        data-name="Hockey Visual"
        transform="translate(1.819 0.285) rotate(0.5)"
      >
        <g id="shape" transform="matrix(0.839, -0.545, 0.545, 0.839, 0, 84.41)">
          <g id="Group_46" data-name="Group 46">
            <g
              id="Layer_2"
              data-name="Layer 2"
              transform="translate(0 128.883)"
            >
              <g id="logos">
                <path
                  id="Path_4"
                  data-name="Path 4"
                  d="M62.835,328.986a2.367,2.367,0,0,0,1.4-.511c.046-.033.091-.069.18-.144.031-.026.062-.053.136-.121a3.954,3.954,0,0,0,1.01-3.518l-2.124-11.723c-.255-1.7-1.377-2.935-2.677-2.939H4.814c-1.275.046-2.383,1.261-2.655,2.939L.06,324.692c-.391,2.455,1.219,4.307,2.715,4.295H62.835"
                  transform="translate(0 -310.03)"
                  fill={color}
                  style={{ transition: 'fill 0.5s ease' }}
                  stroke="#000"
                  strokeWidth="2"
                />
              </g>
            </g>
            <path
              id="Path_5"
              data-name="Path 5"
              d="M141.425,125.044a7.747,7.747,0,0,0,3.384-.94,19.582,19.582,0,0,0,5.472-4.784l4.367-6.589,7.32-11.375,4.856-7.374,6.921-11.338,5.23-8.453,7.5-11.516,8.956-14.054,8.5-13.285,7.83-12.4,10.09-15.769,5.7-8.738s2.135-4.342,6.617-1.006c2.267,1.637,1.191,4.171.741,5.115-.765,1.558-9.177,14.988-9.177,14.988l-5.574,8.643-5.714,9.213-6.228,9.743-5.752,9.069-4.482,7.337-7.575,12.152L179.362,90.629l-6.165,9.763-5.718,9.094-7.826,12.26-5.718,8.928-5.76,8.446-1.193,1.647-1.525,2.105"
              transform="translate(-80.58 3.838)"
              fill={color}
              style={{ transition: 'fill 0.5s ease' }}
              stroke="#000"
              strokeWidth="2"
            />
          </g>
        </g>
        <g
          id="Mask_Group_9"
          data-name="Mask Group 9"
          clipPath={`url(#clipPath-${guid})`}
        >
          <g
            id="shape"
            transform="matrix(0.839, -0.545, 0.545, 0.839, 0, 84.41)"
          >
            <g id="Group_47" data-name="Group 47">
              <g
                id="Layer_2"
                data-name="Layer 2"
                transform="translate(0 128.883)"
              >
                <g id="logos">
                  <path
                    id="Path_4"
                    data-name="Path 4"
                    d="M62.835,328.986a2.367,2.367,0,0,0,1.4-.511c.046-.033.091-.069.18-.144.031-.026.062-.053.136-.121a3.954,3.954,0,0,0,1.01-3.518l-2.124-11.723c-.255-1.7-1.377-2.935-2.677-2.939H4.814c-1.275.046-2.383,1.261-2.655,2.939L.06,324.692c-.391,2.455,1.219,4.307,2.715,4.295H62.835"
                    transform="translate(0 -310.03)"
                    fill="#fff"
                    stroke="#000"
                    strokeWidth="2"
                  />
                </g>
              </g>
              <path
                id="Path_5"
                data-name="Path 5"
                d="M141.425,125.044a7.747,7.747,0,0,0,3.384-.94,19.582,19.582,0,0,0,5.472-4.784l4.367-6.589,7.32-11.375,4.856-7.374,6.921-11.338,5.23-8.453,7.5-11.516,8.956-14.054,8.5-13.285,7.83-12.4,10.09-15.769,5.7-8.738s2.135-4.342,6.617-1.006c2.267,1.637,1.191,4.171.741,5.115-.765,1.558-9.177,14.988-9.177,14.988l-5.574,8.643-5.714,9.213-6.228,9.743-5.752,9.069-4.482,7.337-7.575,12.152L179.362,90.629l-6.165,9.763-5.718,9.094-7.826,12.26-5.718,8.928-5.76,8.446-1.193,1.647-1.525,2.105"
                transform="translate(-80.58 3.838)"
                fill="#fff"
                stroke="#000"
                strokeWidth="2"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
