export default function Sky({ overcast }) {
  const gray = 0.8 * overcast;
  const bright = 1 - 0.5 * overcast;

  return (
    <div
      className="sky"
      style={{ filter: `grayscale(${gray}) brightness(${bright})` }} />
  )
}