import { describe, expect, it } from 'vitest';
import { getAvailableTimes, validateBooking } from './booking.js';

describe('getAvailableTimes', () => {
  it('returns no times before a date is selected', () => {
    expect(getAvailableTimes('')).toEqual([]);
  });
  it('returns standard evening times for a small group', () => {
    expect(getAvailableTimes('2027-05-10', 2)).toContain('19:00');
  });
  it('limits late options for groups of seven or more', () => {
    expect(getAvailableTimes('2027-05-10', 7).every((time) => time <= '19:30')).toBe(true);
  });
});

describe('validateBooking', () => {
  const validBooking = {
    name: 'Alex Morgan', email: 'alex@example.com', date: '2027-05-10',
    time: '19:00', guests: '2', occasion: 'none'
  };
  it('accepts valid booking details', () => {
    expect(validateBooking(validBooking)).toEqual({});
  });
  it('requires a name and email', () => {
    const errors = validateBooking({ ...validBooking, name: ' ', email: '' });
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
  });
  it('rejects malformed email addresses', () => {
    expect(validateBooking({ ...validBooking, email: 'not-an-email' }).email).toBeTruthy();
  });
  it('rejects dates in the past', () => {
    expect(validateBooking({ ...validBooking, date: '2000-01-01' }).date).toBeTruthy();
  });
  it('rejects more than ten guests', () => {
    expect(validateBooking({ ...validBooking, guests: '11' }).guests).toBeTruthy();
  });
});