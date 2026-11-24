import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="brand">IPL Ticket Booking 2026</div>
      <button
        type="button"
        className="menu-toggle"
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        &#9776;
      </button>
      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <a href="#matches" onClick={handleLinkClick}>
          Matches
        </a>
        <a href="#booking" onClick={handleLinkClick}>
          Book Ticket
        </a>
        <a href="#booking-summary" onClick={handleLinkClick}>
          Summary
        </a>
        <a href="#mybookings" onClick={handleLinkClick}>
          My Bookings
        </a>
        <a href="#guidelines" onClick={handleLinkClick}>
          Guidelines
        </a>
      </nav>
    </header>
  )
}
