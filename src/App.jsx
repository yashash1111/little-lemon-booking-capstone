import { useMemo, useState } from 'react';
import { getAvailableTimes, validateBooking } from './booking.js';

const initialForm = {
  name: '', email: '', date: '', time: '', guests: '2', occasion: 'none', requests: ''
};

function Logo() {
  return <a className="brand" href="#home" aria-label="Little Lemon home">
    <span className="brand-mark" aria-hidden="true">LL</span>
    <span><strong>Little Lemon</strong><small>MEDITERRANEAN KITCHEN</small></span>
  </a>;
}

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const availableTimes = useMemo(
    () => getAvailableTimes(form.date, form.guests, form.occasion),
    [form.date, form.guests, form.occasion]
  );

  function update(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value, ...(name === 'date' ? { time: '' } : {}) }));
    setErrors((previous) => ({ ...previous, [name]: '' }));
    setConfirmed(false);
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = validateBooking(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    setConfirmed(true);
  }

  return <div id="home" className="page-shell">
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav aria-label="Main navigation">
          <a href="#home">Home</a><a href="#menu">Menu</a><a href="#about">About</a>
          <a className="nav-cta" href="#booking">Book a table</a>
        </nav>
      </div>
    </header>

    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">A LITTLE TASTE OF THE MEDITERRANEAN</p>
            <h1 id="hero-title">Your table is<br /><em>waiting.</em></h1>
            <p>Fresh ingredients, sunny flavours, and good company. Make your next meal one to remember.</p>
            <a className="primary-link" href="#booking">Reserve your table <span aria-hidden="true">→</span></a>
          </div>
          <div className="hero-art" role="img" aria-label="Illustration of a Mediterranean meal with lemon, olives, and fresh herbs">
            <div className="sun-shape"></div><div className="plate"><div className="food food-one"></div><div className="food food-two"></div><div className="food food-three"></div><div className="lemon"></div></div>
            <span className="art-label">MADE WITH<br />A LITTLE LOVE</span>
          </div>
        </div>
      </section>

      <section className="booking-section" id="booking" aria-labelledby="booking-title">
        <div className="section-intro">
          <p className="eyebrow">JOIN US AT THE TABLE</p>
          <h2 id="booking-title">Book your visit</h2>
          <p>Choose the details below and we’ll get your table ready.</p>
        </div>

        {confirmed ? <div className="confirmation" role="status" aria-live="polite">
          <div className="confirmation-icon" aria-hidden="true">✓</div>
          <h3>You're on our list, {form.name.trim()}!</h3>
          <p>Your table request is confirmed for <strong>{form.date}</strong> at <strong>{form.time}</strong> for <strong>{form.guests} {Number(form.guests) === 1 ? 'guest' : 'guests'}</strong>.</p>
          <p className="muted">A confirmation summary has been prepared on this page. This demo does not send an email or save bookings to a server.</p>
          <button className="secondary-button" type="button" onClick={() => { setForm(initialForm); setErrors({}); setConfirmed(false); }}>Make another booking</button>
        </div> : <form className="booking-form" onSubmit={submit} noValidate>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="name">Full name <span aria-hidden="true">*</span></label>
              <input id="name" name="name" autoComplete="name" value={form.name} onChange={update} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} placeholder="e.g. Alex Morgan" />
              {errors.name && <p className="error" id="name-error">{errors.name}</p>}
            </div>
            <div className="field">
              <label htmlFor="email">Email address <span aria-hidden="true">*</span></label>
              <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={update} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="alex@example.com" />
              {errors.email && <p className="error" id="email-error">{errors.email}</p>}
            </div>
            <div className="field">
              <label htmlFor="date">Date <span aria-hidden="true">*</span></label>
              <input id="date" name="date" type="date" min={new Date().toLocaleDateString('en-CA')} value={form.date} onChange={update} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? 'date-error' : undefined} />
              {errors.date && <p className="error" id="date-error">{errors.date}</p>}
            </div>
            <div className="field">
              <label htmlFor="time">Available time <span aria-hidden="true">*</span></label>
              <select id="time" name="time" value={form.time} onChange={update} disabled={!form.date} aria-invalid={Boolean(errors.time)} aria-describedby={errors.time ? 'time-error' : undefined}>
                <option value="">{form.date ? 'Select a time' : 'Choose a date first'}</option>
                {availableTimes.map((time) => <option key={time} value={time}>{time}</option>)}
              </select>
              {errors.time && <p className="error" id="time-error">{errors.time}</p>}
            </div>
            <div className="field">
              <label htmlFor="guests">Number of guests <span aria-hidden="true">*</span></label>
              <select id="guests" name="guests" value={form.guests} onChange={update} aria-invalid={Boolean(errors.guests)} aria-describedby={errors.guests ? 'guests-error' : undefined}>
                {Array.from({ length: 10 }, (_, index) => index + 1).map((count) => <option key={count} value={count}>{count} {count === 1 ? 'guest' : 'guests'}</option>)}
              </select>
              {errors.guests && <p className="error" id="guests-error">{errors.guests}</p>}
            </div>
            <div className="field">
              <label htmlFor="occasion">Occasion</label>
              <select id="occasion" name="occasion" value={form.occasion} onChange={update}>
                <option value="none">Just a meal</option><option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option><option value="other">Other celebration</option>
              </select>
            </div>
            <div className="field field-wide">
              <label htmlFor="requests">Special requests <span className="optional">(optional)</span></label>
              <textarea id="requests" name="requests" rows="3" maxLength="300" value={form.requests} onChange={update} placeholder="Allergies, accessibility needs, or anything we should know…" />
              <span className="character-count">{form.requests.length}/300</span>
            </div>
          </div>
          <p className="required-note"><span aria-hidden="true">*</span> Required fields</p>
          <button className="submit-button" type="submit">Confirm reservation <span aria-hidden="true">→</span></button>
        </form>}
      </section>

      <section className="bottom-note" id="about">
        <div><span className="mini-lemon" aria-hidden="true">✳</span><p><strong>Good food. Good people.</strong><br />Your neighbourhood Mediterranean table.</p></div>
        <p id="menu" className="hours">TUES–SUN <strong>5:00 PM – 10:00 PM</strong></p>
      </section>
    </main>
    <footer><Logo /><p>© {new Date().getFullYear()} Little Lemon. Made for sharing.</p></footer>
  </div>;
}