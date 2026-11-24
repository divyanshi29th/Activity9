import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MatchCard from './components/MatchCard'
import { matchesData } from './data/matches'

export default function App() {
  const [selectedTeam, setSelectedTeam] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const [selectedMatch, setSelectedMatch] = useState('')
  const [selectedStand, setSelectedStand] = useState('')
  const [tickets, setTickets] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [delivery, setDelivery] = useState('e-ticket')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const [bookings, setBookings] = useState([])
  const [toastMessage, setToastMessage] = useState('')
  const toastTimerRef = useRef(null)

  const showToast = (message) => {
    setToastMessage(message)
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current)
    }
    toastTimerRef.current = setTimeout(() => {
      setToastMessage('')
    }, 3000)
  }

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current)
      }
    }
  }, [])

  const filteredMatches =
    selectedTeam === 'all'
      ? matchesData
      : matchesData.filter((match) => match.teamCodes.includes(selectedTeam))

  const activeMatchObj = matchesData.find((m) => m.teams === selectedMatch)
  const unitPrice =
    activeMatchObj && selectedStand ? activeMatchObj.prices[selectedStand] || 0 : 0
  const quantity = Number.isNaN(Number(tickets)) || Number(tickets) < 1 ? 0 : Number(tickets)
  const totalAmount = unitPrice * quantity

  const handleSelectMatch = (match) => {
    setSelectedMatch(match.teams)
    const bookingEl = document.getElementById('booking')
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' })
    }
    showToast(`Selected ${match.teams}. Choose your stand and quantity!`)
  }

  const handleTeamFilterChange = (e) => {
    const team = e.target.value
    setSelectedTeam(team)
    showToast(
      team === 'all' ? 'Showing all IPL match cards.' : `Filtered matches for ${team}.`
    )
  }

  const handleFormReset = () => {
    setSelectedMatch('')
    setSelectedStand('')
    setTickets(1)
    setName('')
    setEmail('')
    setPhone('')
    setDelivery('e-ticket')
    setTermsAccepted(false)
    showToast('Booking form and summary reset.')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newBooking = {
      id: `IPL-${1001 + bookings.length}`,
      match: selectedMatch,
      stand: selectedStand,
      tickets: quantity,
      total: totalAmount,
    }
    setBookings((prev) => [...prev, newBooking])
    showToast(`Booking confirmed for ${name}! Total: ₹${totalAmount}`)
    handleFormReset()
  }

  return (
    <>
      <Navbar />

      <Hero
        title="Experience The Stadium Energy Live!"
        subtitle="Built with React components, JSX, props, and state for interactive IPL ticket booking."
      />

      <main className="container">
        <section id="matches" className="card">
          <h2>Match Schedule</h2>

          <div className="schedule-controls">
            <div className="filter-group">
              <label htmlFor="team-filter">Filter by Team:</label>
              <select
                id="team-filter"
                value={selectedTeam}
                onChange={handleTeamFilterChange}
              >
                <option value="all">All Teams</option>
                <option value="RCB">RCB</option>
                <option value="CSK">CSK</option>
                <option value="MI">MI</option>
                <option value="KKR">KKR</option>
                <option value="SRH">SRH</option>
              </select>
            </div>

            <div className="view-toggle" role="group" aria-label="Match view toggle">
              <button
                type="button"
                className={`btn-small view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => {
                  setViewMode('grid')
                  showToast('Switched to Grid View.')
                }}
              >
                Grid View
              </button>
              <button
                type="button"
                className={`btn-small view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => {
                  setViewMode('list')
                  showToast('Switched to List View.')
                }}
              >
                List View
              </button>
            </div>
          </div>

          <div className={`match-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
            {filteredMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onSelectMatch={handleSelectMatch}
              />
            ))}
          </div>
        </section>

        <div className="booking-layout">
          <section id="booking" className="card">
            <h2>Book Your Ticket</h2>

            <form onSubmit={handleSubmit} onReset={handleFormReset}>
              <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input
                  type="text"
                  id="name"
                  minLength={3}
                  maxLength={50}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  maxLength={100}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  minLength={10}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="match">Match Selection:</label>
                <select
                  id="match"
                  value={selectedMatch}
                  onChange={(e) => {
                    setSelectedMatch(e.target.value)
                    showToast('Match updated in Booking Summary.')
                  }}
                  required
                >
                  <option value="">-- Select a Match --</option>
                  {matchesData.map((m) => (
                    <option key={m.id} value={m.teams}>
                      {m.teams} ({m.venue})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="stand">Stand Category:</label>
                <select
                  id="stand"
                  value={selectedStand}
                  onChange={(e) => {
                    setSelectedStand(e.target.value)
                    showToast('Stand category updated in Booking Summary.')
                  }}
                  required
                >
                  <option value="">-- Select Stand Category --</option>
                  <option value="General">General</option>
                  <option value="Premium">Premium</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="tickets">Number of Tickets:</label>
                <input
                  type="number"
                  id="tickets"
                  min={1}
                  max={10}
                  value={tickets}
                  onChange={(e) => {
                    setTickets(e.target.value)
                    showToast('Ticket quantity updated in Booking Summary.')
                  }}
                  required
                />
              </div>

              <fieldset className="option-group">
                <legend>Ticket Delivery Method:</legend>
                <label className="option-item">
                  <input
                    type="radio"
                    name="delivery"
                    value="e-ticket"
                    checked={delivery === 'e-ticket'}
                    onChange={(e) => setDelivery(e.target.value)}
                    required
                  />
                  E-Ticket (Email &amp; QR Code)
                </label>
                <label className="option-item">
                  <input
                    type="radio"
                    name="delivery"
                    value="box-office"
                    checked={delivery === 'box-office'}
                    onChange={(e) => setDelivery(e.target.value)}
                  />
                  Stadium Box Office Pickup
                </label>
              </fieldset>

              <fieldset className="option-group">
                <legend>Preferences:</legend>
                <label className="option-item">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    required
                  />
                  I agree to the Stadium Guidelines &amp; Terms
                </label>
              </fieldset>

              <div className="form-actions">
                <button type="submit">Book Now</button>
                <button type="reset" className="btn-reset">
                  Reset
                </button>
              </div>
            </form>
          </section>

          <section id="booking-summary" className="card summary-card">
            <h2>Booking Summary</h2>
            <div className="summary-grid">
              <p>
                <strong>Match:</strong> {selectedMatch || 'Not selected'}
              </p>
              <p>
                <strong>Stand Category:</strong> {selectedStand || 'Not selected'}
              </p>
              <p>
                <strong>Ticket Price:</strong> ₹{unitPrice}
              </p>
              <p>
                <strong>Quantity:</strong> {quantity}
              </p>
              <p className="summary-total">
                <strong>Total Amount:</strong> ₹{totalAmount}
              </p>
            </div>
          </section>
        </div>

        <section id="mybookings" className="card">
          <h2>My Ticket Bookings</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Match</th>
                  <th>Stand</th>
                  <th>Tickets</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={5}>No bookings available.</td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.match}</td>
                      <td>{booking.stand}</td>
                      <td>{booking.tickets}</td>
                      <td>₹{booking.total}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section id="guidelines" className="card">
          <h2>Stadium Guidelines</h2>
          <div className="guidelines-grid">
            <article className="guideline-card">
              <h3>Ticket Verification</h3>
              <p>Carry your valid digital or printed match ticket for gate entry.</p>
            </article>
            <article className="guideline-card">
              <h3>ID Proof Requirement</h3>
              <p>Bring a government-issued photo ID matching your booking details.</p>
            </article>
            <article className="guideline-card">
              <h3>Prohibited Items</h3>
              <p>Weapons, sharp objects, and outside food or bottles are not allowed.</p>
            </article>
          </div>
        </section>
      </main>

      <footer>
        <p>Copyright &copy; 2026 IPL Ticket Booking. All Rights Reserved.</p>
      </footer>

      <div
        className={`toast ${toastMessage ? 'show' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toastMessage}
      </div>
    </>
  )
}
