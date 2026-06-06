import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(250,247,240,0.85)', borderColor: '#E8E2D8' }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold tracking-tight" style={{ color: '#3D3228' }}>
          Sahay
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm transition-colors" style={{ color: '#9A8B7A' }}>
            Work
          </Link>
          <Link to="/about" className="text-sm transition-colors" style={{ color: '#9A8B7A' }}>
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
