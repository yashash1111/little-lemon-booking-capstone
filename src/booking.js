// Keep the available booking times in one place so the form and tests share the same rules.
export const TIMES = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];

export function getAvailableTimes(date, guests = 2, occasion = 'none') {
  if (!date) return [];
  const selectedDate = new Date(`${date}T12:00:00`);
  if (Number.isNaN(selectedDate.getTime())) return [];
  // A small example rule: larger parties have fewer late-evening options.
  if (Number(guests) >= 7) return TIMES.filter((time) => time <= '19:30');
  if (occasion === 'birthday') return TIMES.filter((time) => time !== '17:00');
  return [...TIMES];
}

export function validateBooking({ name, email, date, time, guests, occasion }) {
  const errors = {};
  if (!name?.trim()) errors.name = 'Please enter your name.';
  if (!email?.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
  if (!date) errors.date = 'Choose a booking date.';
  else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosen = new Date(`${date}T00:00:00`);
    if (chosen < today) errors.date = 'The booking date cannot be in the past.';
  }
  if (!time) errors.time = 'Choose an available time.';
  const guestCount = Number(guests);
  if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 10) {
    errors.guests = 'Choose between 1 and 10 guests.';
  }
  if (!['none', 'birthday', 'anniversary', 'other'].includes(occasion)) {
    errors.occasion = 'Choose a valid occasion.';
  }
  return errors;
}