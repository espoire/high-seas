import { useEffect, useRef, useState } from "react";
import { interpolate } from "../util/interpolate.js";
import { fancyToFixed, squared } from "../util/util.js";
import { randomHigh, randomRange, roundRandom } from "../util/random.js";

export default function Wind({ wind }) {
  const [
    /** @type {WindParticle[]} */
    particles,
    updateParticles
  ] = useState([]);
  const particlesPerSecond = useRef(0);
  const particlesIssued = useRef(0);
  const timeout = useRef(null);

  particlesPerSecond.current = interpolate(wind, 0, 1, 0, 10, squared);

  useEffect(() => {
    if (!timeout.current) timeout.current = setInterval(
      generateWindParticles, 1000
    )
  });

  function generateWindParticles() {
    const now = performance.now();
    const particlesAdded = [];

    const addParticlesCount = roundRandom(particlesPerSecond.current);
    for (let i = 0; i < addParticlesCount; i++) {
      const p = new WindParticle(particlesIssued.current++, now, wind);
      particlesAdded.push(p);
    }

    updateParticles(particles => [
      ...particles.filter(p => p.expiry > now),
      ...particlesAdded,
    ]);
  }

  return particles.map(p => p.jsx);
}

class WindParticle {
  /** @type {number} The timestamp in millis after which this WindParticle is expected to be fully off-screen. */
  expiry;
  /** @type {React.JSX.Element} */
  jsx;

  /**
   * @param {number} id
   * @param {number} now
   * @param {number} intensity
   */
  constructor(id, now, intensity) {
    const distance = randomHigh();
    const delay = Math.random();
    const duration = interpolate(distance, 0, 1, 0.5, 15) / intensity;
    
    const until = (delay + duration) * 1000;

    this.expiry = now + until;

    const width = interpolate(distance, 0, 1, 8, 1, Math.sqrt);
    const tailLength = interpolate(intensity, 0, 1, 4, 100, squared);
    const top = fancyToFixed(randomRange(0, 100 - 50 * distance), 2) + '%';

    this.jsx = (
      <svg
        key={id}
        className="windParticle"
        width={width + tailLength}
        height={width}
        viewBox={`${(-width/2).toFixed(2)} ${(-width/2).toFixed(2)} ${(width + tailLength).toFixed(2)} ${width.toFixed(2)}`}
        style={{
          top: top,
          animation: `windBlow ${duration.toFixed(2)}s linear ${delay.toFixed(2)}s both`,
        }}
      >
        <line
          strokeWidth={width}
          x1="0" y1="0" x2={tailLength} y2="0"
        />
      </svg>
    )
  }
}