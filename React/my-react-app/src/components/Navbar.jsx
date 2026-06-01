import { Link } from "react-router-dom"

function Navbar() {

  return (
    <div>

      <Link to="/">Home</Link>

      <br /><br />

      <Link to="/about">About</Link>

      <br /><br />

      <Link to="/contact">Contact</Link>

    </div>
  )
}

export default Navbar