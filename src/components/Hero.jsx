export default function Hero({ title, subtitle }) {
  return (
    <section className="hero">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <div className="hero-actions">
        <a href="#matches" className="btn">
          View Schedule
        </a>
        <a href="#booking" className="btn btn-outline">
          Book Ticket
        </a>
      </div>
    </section>
  )
}
