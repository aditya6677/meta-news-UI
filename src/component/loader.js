import React from 'react';

export default ({ className, color, height='64px', width='64px' }) => {
    console.log('in loader')
    return(
    <div className={className} style={{ height, width }}>
        <svg style={{fill: color}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <circle transform="translate(8 0)" cx="0" cy="16" r="1.79782">
                <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0" keyTimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline"></animate>
            </circle>
            <circle transform="translate(16 0)" cx="0" cy="16" r="0">
                <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0.3" keyTimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline"></animate>
            </circle>
            <circle transform="translate(24 0)" cx="0" cy="16" r="0.418451">
                <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0.6" keyTimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline"></animate>
            </circle>
        </svg>
    </div>
)}