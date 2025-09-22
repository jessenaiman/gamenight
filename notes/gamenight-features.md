# Game Night Central - Core Features

## Overview
Game Night Central is a web application for managing game night events, registrations, and community engagement.

## Core Features

### 1. Event Calendar (`src/components/event-calendar.tsx`)
- Interactive calendar displaying game night events
- Event highlighting with key details
- Navigation between months
- Event click-through to detail pages

### 2. Event Details (`src/app/events/[slug]/page.tsx`)
- Dedicated pages for each game night event
- Event rules and gameplay mechanics
- Pricing information
- Game categories with descriptions
- Registration links

### 3. Signup & Registration (`src/app/signup/page.tsx`, `src/components/signup-form.tsx`)
- User-friendly registration form
- Automatic pricing calculation based on user selections
- Registration types: men, women, couples
- Experience level selection
- Dietary restrictions (optional)
- Game type preferences (optional)

### 4. Admin Management (`src/app/admin/page.tsx`)
- Admin dashboard for registration review
- Registration approval/denial functionality
- Event roster management
- Attendee list export capabilities

### 5. Volunteer Recruitment (`src/app/volunteers/page.tsx`)
- Dedicated volunteer recruitment page
- Role descriptions and benefits
- Volunteer signup form
- Availability and experience tracking

### 6. User Suggestions & Polls (`src/app/ideas/page.tsx`, `src/components/poll.tsx`)
- Interactive page for game idea submissions
- Community polls for engagement
- Idea approval workflow
- Poll result tracking

### 7. Rules & Guidelines (`src/app/rules/page.tsx`)
- Community rules and guidelines
- Event-specific rules
- Code of conduct

## Related Files
- `src/app/page.tsx` - Home page with event calendar
- `src/app/events/[slug]/page.tsx` - Event detail pages
- `src/app/signup/page.tsx` - Registration page
- `src/app/admin/page.tsx` - Admin dashboard
- `src/app/volunteers/page.tsx` - Volunteer recruitment
- `src/app/ideas/page.tsx` - Ideas and polls
- `src/app/rules/page.tsx` - Rules and guidelines
- `src/components/event-calendar.tsx` - Calendar component
- `src/components/signup-form.tsx` - Registration form
- `src/components/poll.tsx` - Poll component

## Database Requirements
See `docs/data-structures.md` for detailed database schema requirements.
