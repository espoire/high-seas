import "./Scene.css";

export default function Scene() {
  return (
    <>
      <div className="sky"></div>
      <Sea />
    </>
  );
}

function Sea() {
  return (
    <>
      <SeaLayer distance="rear"/>
      <SeaLayer distance="mid-rear"/>
      <SeaLayer distance="mid-fore"/>
      <SeaLayer distance="fore"/>
    </>
  )
}

const rippleConfigs = {
  rear: 45,
  'mid-rear': 25,
  'mid-fore': 15,
  fore: 10,
}

const heightConfigs = {
  rear: 40,
  'mid-rear': 38.5,
  'mid-fore': 36,
  fore: 31,
}

/**
 * @param {{ distance: 'rear' | 'mid-rear' | 'mid-fore' | 'fore'}} param0
 */
function SeaLayer({ distance }) {
  const height = heightConfigs[distance];
  const ripples = rippleConfigs[distance];
  const rippleSize = 100 / ripples;

  let ripplePaths = [];
  for (let i = 0; i < ripples; i++) {
    ripplePaths.push(`c ${rippleSize/2} ${rippleSize/3}, ${rippleSize/2} ${rippleSize/3}, ${rippleSize} 0`);
  }

  const clipPath = `M 0 0 ${ripplePaths.join(' ')} M 100 0 V 100 H 0 V 0 Z`;
  // const clipPath = "M 0 0 L 50 50 L 100 0 Z";

  console.log(clipPath);

  return (
    <svg
      className={`sea ${distance}`}
      viewBox={`0 0 100 ${height}`} /* TODO: Needs to match aspect of actual area, based on non-square browser window */
    >
      <path d={clipPath} />
    </svg>
  )
}