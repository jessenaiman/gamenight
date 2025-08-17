# Game Night Central - Data Structures Analysis

## Current Pages and Data Structures

### 1. Home Page (`src/app/page.tsx`)
**Current Data:**
- Static event information (hardcoded)
- Calendar display with single event

**Proposed Database Structure:**
```typescript
// Events table
interface Event {
  id: string;
  title: string;
  slug: string;
  date: Date;
  duration: string;
  description: string;
  image_url?: string;
  pricing: {
    men: number;
    women: number;
    couples: number;
  };
  max_participants?: number;
  status: 'draft' | 'published' | 'cancelled';
  created_at: Date;
  updated_at: Date;
}
```

### 2. Event Details Page (`src/app/events/[slug]/page.tsx`)
**Current Data:**
- Static event details
- Game categories (hardcoded)
- Pricing structure

**Additional Database Structures Needed:**
```typescript
// Game Categories table
interface GameCategory {
  id: string;
  event_id: string;
  name: string;
  description: string;
  icon: string;
  image_url?: string;
  order: number;
}
```

### 3. Signup Page (`src/app/signup/page.tsx`)
**Current Data:**
- Form data (not persisted)
- Registration types and pricing

**Database Structure:**
```typescript
// Registrations table
interface Registration {
  id: string;
  event_id: string;
  name: string;
  email: string;
  status: 'man' | 'woman' | 'couple';
  preferred_start?: string;
  experience: string;
  dietary?: string;
  game_types?: string;
  price: number;
  registration_status: 'pending' | 'approved' | 'denied';
  submitted_at: Date;
  reviewed_at?: Date;
  reviewed_by?: string;
}
```

### 4. Admin Page (`src/app/admin/page.tsx`)
**Current Data:**
- Mock registration data
- Approval/denial actions

**Uses:** Registration table above

### 5. Ideas & Polls Page (`src/app/ideas/page.tsx`)
**Current Data:**
- Static approved ideas
- Poll data (component state)

**Database Structures:**
```typescript
// Ideas table
interface Idea {
  id: string;
  title: string;
  description: string;
  submitted_by?: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: Date;
  reviewed_at?: Date;
}

// Polls table
interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: number[];
  active: boolean;
  created_at: Date;
  expires_at?: Date;
}

// Poll Votes table (to track individual votes)
interface PollVote {
  id: string;
  poll_id: string;
  option_index: number;
  voter_ip?: string;
  voted_at: Date;
}
```

### 6. Volunteers Page (`src/app/volunteers/page.tsx`)
**Current Data:**
- Static volunteer roles
- Static benefits
- Form data (not persisted)

**Database Structure:**
```typescript
// Volunteer Applications table
interface VolunteerApplication {
  id: string;
  name: string;
  contact: string;
  availability: string;
  experience?: string;
  roles_interested: string[]; // Array of role IDs or names
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: Date;
  reviewed_at?: Date;
  notes?: string;
}

// Volunteer Roles table
interface VolunteerRole {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirements?: string;
  benefits?: string;
  active: boolean;
}
```

### 7. Rules Page (`src/app/rules/page.tsx`)
**Current Data:**
- Static rules content

**Database Structure (Optional):**
```typescript
// Rules table (for dynamic content management)
interface Rule {
  id: string;
  category: string;
  title: string;
  points: string[];
  icon: string;
  order: number;
  active: boolean;
  updated_at: Date;
}
```

## Next Steps
1. Review each page's data structure requirements
2. Create Supabase tables for the confirmed structures
3. Implement data persistence for each page
4. Add authentication for admin functions