import { useEffect, useState } from "react";
import { interpolate } from "../util/interpolate.js";
import { fancyToFixed, squared } from "../util/util.js";
import Boat from "./Boat.jsx";

/**
 * @param {{ layers: number }} param0
 */
export default function Sea({ layers }) {
  const content = [];
  for (let i = 0; i < layers; i++) {
    content.push(<SeaLayer depth={i} maxDepth={layers} key={i} />);
    if (i === Math.floor(2 * layers / 3)) {
      content.push(<Boat seaLayers={layers} key="boat" />)
    }
  }

  return (
    <>{content}</>
  )
}

/**
 * @param {{ depth: number, maxDepth: number }} param0
 */
function SeaLayer({ depth, maxDepth }) {
  const [aspect, setAspect] = useState(
    window.innerWidth / window.innerHeight
  )
  useEffect(() => {
    function handleResize() {
      setAspect(
        window.innerWidth / window.innerHeight
      )
    }
    window.addEventListener('resize', handleResize)
  })

  const height = interpolate(depth, 0, maxDepth, 50, 0, squared);
  const ripples = Math.ceil(50 / depth);
  const animateDuration = fancyToFixed(
    interpolate(depth, 0, maxDepth, 20, 4),
    2
  ) + 's';
  
  let opacity = 0.3;
  if (depth > 0) {
    const step = (0.9 - 0.3) / (maxDepth);
    const previous = 0.3 + step * (depth - 1);
    opacity = (step / (1 - previous));
  }

  const strokeOpacity = interpolate(depth, 0, maxDepth, 0, 0.2);

  let rippleSize = 100 / ripples;

  const halfSize = fancyToFixed(rippleSize / 2, 2);
  const thirdSize = fancyToFixed(rippleSize / 3, 2);
  rippleSize = fancyToFixed(rippleSize, 2);

  let ripplePaths = [];
  if (depth === 0) {
    ripplePaths.push('H 100');
  } else {
    for (let i = 0; i <= ripples; i++) {
      ripplePaths.push(`c ${halfSize} ${thirdSize}, ${halfSize} ${thirdSize}, ${rippleSize} 0`);
    }
  }

  const clipPath = `M 0 0 ${ripplePaths.join(' ')} V 100 H 0 V 0 Z`;

  return (
    <svg viewBox={`0 0 100 ${height / aspect}`} className={`sea`} style={{ height: `${ height.toFixed(2)}%`, fillOpacity: opacity }}>
      <animate
          attributeName="viewBox"
          begin="0s"
          dur={animateDuration}
          from={`0 0 100 ${height / aspect}`}
          to={`${rippleSize} 0 100 ${height / aspect}`}
          repeatCount="indefinite" />
      <path d={clipPath} />
      <path d={clipPath} fill="none" stroke="#2b65ec" strokeWidth="0.3" strokeOpacity={strokeOpacity} />
    </svg>
  )
}