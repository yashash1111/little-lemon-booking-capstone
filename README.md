# Little Lemon — Table Booking Capstone

A responsive React single-page experience for booking a table at Little Lemon. Built with React, Vite, CSS, and Vitest/React Testing Library.

## Features

- Responsive restaurant landing page and booking form
- Accessible labels, semantic landmarks, keyboard focus styles, and error descriptions
- Validation for required fields, email format, booking date, time, and party size
- Date-dependent available time options and simple party-size/occasion rules
- Booking confirmation state with a reset option
- Unit and component tests
- Reduced-motion support and mobile layout

## Requirements

- Node.js 20 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Run tests

```bash
npm test
```

## Create a production build

```bash
npm run build
npm run preview
```

## Publish to GitHub

Create an empty repository on GitHub, then run these commands from this project folder (replace the URL with your repository URL):

```bash
git init
git add .
git commit -m "Build Little Lemon table booking capstone"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/little-lemon-booking-capstone.git
git push -u origin main
```

## Important scope note

This is a front-end capstone demo. Reservations are validated in the browser and shown in a confirmation state; this version does not send email, connect to a booking API, or persist reservations to a database. The available-time rules are illustrative rather than connected to a restaurant's live availability.

## Suggested peer-review checklist

- [ ] UX/UI follows the restaurant booking brief
- [ ] Accessibility labels and semantic HTML are present
- [ ] Tests run successfully with `npm test`
- [ ] Form validation and confirmation work
- [ ] Layout adapts to mobile and desktop
- [ ] Project is committed to GitHub
- [ ] Components and validation helpers are readable
- [ ] Edge cases show meaningful errors
- [ ] README includes setup and test instructions
