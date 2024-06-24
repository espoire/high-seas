export default function Overcast({ intensity }) {


  return (
    <div className="overcast" style={{ opacity: 0.2 * intensity }} />
  )
}