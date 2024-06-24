import { useEffect, useState } from "react";
import { interpolate } from "../util/interpolate.js";
import { fancyToFixed, squared } from "../util/util.js";
import Boat from "./Boat.jsx";

/**
 * @param {{ layers: number, wind: number }} param0
 */
export default function Sea({ layers, wind }) {
  const content = [];
  for (let i = 0; i < layers; i++) {
    content.push(<SeaLayer key={i} depth={i} maxDepth={layers} wind={wind} />);
    if (i === Math.floor(2 * layers / 3)) {
      content.push(<Boat key="boat" seaLayers={layers} />)
    }
  }

  return (
    <>{content}</>
  )
}

/**
 * @param {{ depth: number, maxDepth: number, wind: number }} param0
 */
function SeaLayer({ depth, maxDepth, wind }) {
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
    interpolate(depth, 0, maxDepth, 2.5, 0.5) / (wind * 0.98 + 0.02),
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
  const spikiness = fancyToFixed(rippleSize / 2 * (wind * 0.95 + 0.05), 2);
  rippleSize = fancyToFixed(rippleSize, 2);

  let ripplePaths = [];
  if (depth === 0) {
    ripplePaths.push('H 100');
  } else {
    for (let i = 0; i <= ripples; i++) {
      ripplePaths.push(`c ${halfSize} ${spikiness}, ${halfSize} ${spikiness}, ${rippleSize} 0`);
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