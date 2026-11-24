export default function MatchCard({ match, onSelectMatch }) {
  const { matchNumber, teams, date, venue, prices } = match

  return (
    <article className="match-card">
      <div className="match-info">
        <span className="match-badge">{matchNumber}</span>
        <h3>{teams}</h3>
        <p>
          {date} &bull; {venue}
        </p>
        <p className="price-line">
          General: ₹{prices.General} | Premium: ₹{prices.Premium} | VIP: ₹{prices.VIP}
        </p>
      </div>
      <button
        type="button"
        className="btn-small"
        onClick={() => onSelectMatch(match)}
      >
        Book Ticket
      </button>
    </article>
  )
}
