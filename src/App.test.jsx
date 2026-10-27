import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App.jsx';

describe('Little Lemon booking form', () => {
  it('renders a clearly labelled booking form', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /book your visit/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it('shows validation errors when the form is submitted empty', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /confirm reservation/i }));
    expect(screen.getByText('Please enter your name.')).toBeInTheDocument();
    expect(screen.getByText('Please enter your email address.')).toBeInTheDocument();
  });

  it('confirms a valid reservation', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText(/full name/i), 'Alex Morgan');
    await user.type(screen.getByLabelText(/email address/i), 'alex@example.com');
    await user.type(screen.getByLabelText(/date/i), '2027-05-10');
    await user.selectOptions(screen.getByLabelText(/available time/i), '19:00');
    await user.click(screen.getByRole('button', { name: /confirm reservation/i }));
    expect(screen.getByRole('status')).toHaveTextContent(/you're on our list, alex morgan/i);
  });
});