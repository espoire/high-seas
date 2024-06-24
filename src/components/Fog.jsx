export default function Fog({ overcast }) {
  return (
    <div className="fog" style={{ opacity: 0.5 * overcast }} />
  )
}