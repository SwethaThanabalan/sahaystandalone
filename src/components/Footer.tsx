const Footer = () => {
  return (
    <footer className="border-t py-12" style={{ borderColor: '#E8E2D8' }}>
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm" style={{ color: '#B5A89A' }}>
          © {new Date().getFullYear()} Sahay Case Study
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm transition-colors" style={{ color: '#9A8B7A' }}>
            LinkedIn
          </a>
          <a href="#" className="text-sm transition-colors" style={{ color: '#9A8B7A' }}>
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
