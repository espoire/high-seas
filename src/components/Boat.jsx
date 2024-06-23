import { interpolate } from "../util/interpolate.js";
import { fancyToFixed } from "../util/util.js";

export default function Boat({ seaLayers }) {
  const layerAt = Math.floor(2 * seaLayers / 3) + 1;
  const height = interpolate(layerAt, 1, seaLayers, 50, 0, (x) => x * x);
  const top = fancyToFixed(100 - height, 2) + '%';

  return (
    <svg className="boat" style={{ top }} viewBox="0 0 100 100">
      <defs>
        <linearGradient id="boatHullGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="blue" />
          <stop offset="75%" stopColor="#00f0" />
        </linearGradient>
      </defs>
      <path d="M 0 65 H 100 A 50, 35 0, 0, 1, 0, 65 Z" fill="url(#boatHullGradient)" />
      <path
        d="
          M 55 0
          L 75 0
          L 70 2.5
          L 75 5
          L 55 5
          Z"
        fill="red" />
      <line x1="55" y1="65" x2="55" y2="2" stroke="black" strokeWidth="4" strokeLinecap="round" />
      <line x1="2" y1="65" x2="98" y2="65" stroke="red" strokeWidth="4" strokeLinecap="round" />
      <path
        d="
          M 57 4
          Q 90,25 98,63
          Q 80,58 59,61
          Q 62,45 57,4
          Z"
        fill="#e4dece" />
      <path
        d="
          M 53 5
          L 4 61
          Q 25,58 51,61
          Q 50,30 53,5
          Z"
        fill="#e4dece" />
    </svg>
  );
}