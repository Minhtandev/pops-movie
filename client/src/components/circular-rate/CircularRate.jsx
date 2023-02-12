import React from 'react'
import "./circular-rate.scss"
const CircularRate = ({ strokeWidth = 8, rating }) => {
	const radius = (50 - strokeWidth / 2);
    const pathDescription = `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;

    const diameter = Math.PI * 2 * radius;
    const progressStyle = {
			stroke: 'rgb(234, 96, 22)',
  		strokeLinecap: 'round',
      strokeDasharray: `${diameter}px ${diameter}px`,
      strokeDashoffset: `${((100 - rating) / 100 * diameter)}px`,
    };

    return (
      <svg
        className={'circular-rate'}
        viewBox="0 0 100 100"
				width={100}
				height={100}
      >
        <path
          className="CircularProgressbar-trail"
          d={pathDescription}
          strokeWidth={strokeWidth}
          fillOpacity={0}
					style={{
						stroke: '#d6d6d6',
					}}
        />

        <path
          className="CircularProgressbar-path"
          d={pathDescription}
          strokeWidth={strokeWidth}
          fillOpacity={0}
          style={progressStyle}
        />

        <text
          className="CircularProgressbar-text"
          x={50}
          y={50}
					style={{
						fill: '#fff',
  					fontSize: '24px',
  					dominantBaseline: 'central',
  					textAnchor: 'middle',
					}}
        >
          {rating/10}
        </text>
      </svg>
    );
};

export default CircularRate