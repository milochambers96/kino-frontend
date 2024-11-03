# Kino Connect Frontend

## Overview

Kino Connect is a platform that connects independent cinemas with film enthusiasts, allowing venues to showcase their unique events and engage with their community. This frontend application, built with React and TypeScript, provides an interactive interface for cinema discovery, event management, and community engagement.

Built over the course of one week as a solo project, it serves as the frontend for the [Kino Connect Backend](https://github.com/milochambers96/kino-backend).

## Technologies Used

- TypeScript & React
- React Router for navigation
- Mapbox GL JS for location mapping
- Cloudinary for image management
- Bulma CSS framework
- Custom CSS for theming
- Axios for API communication
- JWT for authentication

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- NPM or Yarn
- Git

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd kino-frontend

# Install dependencies
npm install

# Set up environment variables
# Create a .env file in the root directory with:
VITE_APP_URL=your_backend_url
VITE_KINO_MAPBOX=your_mapbox_token
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Run the development server
npm run dev
```

## Component Documentation

### Authentication Components

#### Signup Component

The Signup component handles new user registration with role selection (Cinema/Film Fanatic). It includes form validation for password matching, email format, and unique username verification. The component uses controlled form inputs and provides immediate feedback for validation errors through the backend's validation system.

```typescript
function Signup() {
  const [signupFormData, setSignupFormData] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
    passwordConfirmation: "",
  });

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/signup`, signupFormData);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setFormErrorData(error.response.data.errors);
      }
    }
  }
}
```

#### Login Component

The Login component manages user authentication, handling JWT token storage and user role verification. It integrates with the backend authentication system and provides error feedback for invalid credentials.

```typescript
function Login({ fetchUser }: { fetchUser: Function }) {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/login`, formData);
      localStorage.setItem("token", response.data.token);
      fetchUser();
      navigate("/");
    } catch (error) {
      setFormErrorData(error.response.data.message);
    }
  }
}
```

### Cinema Management Components

#### CinemaMap Component

The CinemaMap component provides an interactive map interface using Mapbox GL JS. It features area-based filtering for London regions and dynamic marker creation for each cinema. The component uses useRef to prevent infinite re-rendering cycles while maintaining marker state, and implements geocoding for cinema addresses.

```typescript
function CinemaMap() {
  const [selectedArea, setSelectedArea] = useState<string>("All");
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const fetchAndMapCinemas = useCallback(async () => {
    if (!map) return;
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const response = await axios.get(`${baseUrl}/cinemas`);
    const cinemas = response.data;

    for (const cinema of cinemas) {
      if (selectedArea === "All" || cinema.area === selectedArea) {
        const { latitude, longitude } = await forwardGeocode(cinema.address);
        const marker = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .setPopup(
            new mapboxgl.Popup().setHTML(
              `<h3><a href="/cinemas/${cinema._id}">${cinema.name}</a></h3>`
            )
          )
          .addTo(map);
        markersRef.current.push(marker);
      }
    }
  }, [map, selectedArea]);
}
```

#### CinemaForm Component

A reusable form component handling both creation and updates for cinema profiles. Integrates with Cloudinary for image uploads and implements dynamic borough selection based on chosen area. The component adapts its behavior based on whether it's being used for creation or updating.

```typescript
function CinemaForm({ initialData, onSubmit, formErrorData }: FormProps) {
  const [formData, setFormData] = useState(initialData);
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const combinedAddress = combineAddress();
    const completeCinemaData = {
      ...formData,
      address: combinedAddress,
    };

    if (imageFile) {
      const imageUrl = await cloudinaryUpload(imageFile);
      completeCinemaData.image = imageUrl;
    }

    await onSubmit(completeCinemaData);
  }
}
```

### NoticeBoard Components

#### CinemaNoticeBoard Component

The CinemaNoticeBoard serves as a central hub for each cinema, displaying cinema details and associated events. It manages user permissions for editing/deleting content and handles the display of both cinema information and event threads. The component implements real-time updates for event listings and manages user authorization for content modification.

```typescript
function CinemaNoticeBoard({ user }: { user: null | IUser }) {
  const [cinema, setCinema] = useState<ICinema | null>(null);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cinemaId } = useParams();

  useEffect(() => {
    async function fetchCinema() {
      const resp = await fetch(`${baseUrl}/cinemas/${cinemaId}`);
      const cinemaData = await resp.json();
      setCinema(cinemaData);
    }
    async function fetchEvents() {
      const resp = await fetch(`${baseUrl}/cinemas/${cinemaId}/events`);
      const { cinemaEvents } = await resp.json();
      setEvents(cinemaEvents);
      setIsLoading(false);
    }
    fetchCinema();
    fetchEvents();
  }, [cinemaId]);

  return (
    <div className="kino-gradient">
      <section className="section">
        <div className="container mt-5">
          <div className="columns is-multiline is-centered">
            {isLoading ? (
              <FullPageLoader />
            ) : (
              <>
                {cinema && (
                  <CinemaDetails
                    {...cinema}
                    user={user?._id || null}
                    cinemaId={cinemaId || ""}
                  />
                )}
                <EventsThread events={events} cinema={cinema} user={user} />
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
```

#### EventNoticeBoard Component

The EventNoticeBoard component handles individual event displays and their associated comments. It manages user interactions, comment threading, and permission-based content modification. The component provides real-time comment updates and handles both recurring and specific date events differently.

```typescript
function EventNoticeBoard({ user }: { user: null | IUser }) {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const { eventId } = useParams();

  async function fetchComments() {
    try {
      const resp = await fetch(`${baseUrl}/events/${eventId}/comments`);
      const { eventComments } = await resp.json();
      setComments(eventComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  useEffect(() => {
    async function fetchEvent() {
      const resp = await fetch(`${baseUrl}/events/${eventId}`);
      const eventData = await resp.json();
      setEvent(eventData);
    }
    fetchEvent();
    fetchComments();
  }, [eventId]);

  return (
    <div className="kino-gradient">
      <section className="section">
        {event && (
          <>
            <EventDetails {...event} user={user?._id || null} />
            {user ? (
              <CommentBox
                eventId={eventId || ""}
                fetchComments={fetchComments}
              />
            ) : (
              <p>Please login to comment</p>
            )}
            <div className="comments-section">
              {comments.map((comment) => (
                <CommentsThread
                  key={comment._id}
                  {...comment}
                  user={user?._id || null}
                  fetchComments={fetchComments}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
```

### Event Management Components

#### EventForm Component

A sophisticated form component handling event creation and updates, featuring a dual date system for specific and recurring events. The component dynamically renders different input fields based on the selected date type and handles image uploads through Cloudinary.

```typescript
function EventForm() {
  const [eventDateType, setEventDateType] = useState("specific");
  const [formData, setFormData] = useState(initialData);

  return (
    <form>
      <div className="field">
        <label className="label">Select Date Type</label>
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="dateType"
              value="specific"
              checked={eventDateType === "specific"}
              onChange={handleDateTypeChange}
            />
            Specific Date
          </label>
          <label className="radio">
            <input
              type="radio"
              name="dateType"
              value="recurring"
              checked={eventDateType === "recurring"}
              onChange={handleDateTypeChange}
            />
            Recurring
          </label>
        </div>
      </div>

      {eventDateType === "specific" ? (
        <SpecificDateInputs formData={formData} handleChange={handleChange} />
      ) : (
        <RecurringDateInput formData={formData} handleChange={handleChange} />
      )}
    </form>
  );
}
```

## Homepage Evolution Documentation

## Initial Design

The original homepage featured a simple, static design with centered text overlay:

```typescript
// Initial Homepage Implementation
function Home() {
  return (
    <section className="kino-background">
      <div className="content-container is-flex is-justify-content-center is-align-items-center">
        <div className="kino-content has-text-centered kino-title">
          <p className="title has-text-white-ter">Kino Connect</p>
          <p className="subtitle has-text-white-ter mt-2">
            Independent Cinema, Together.
          </p>
        </div>
      </div>
    </section>
  );
}
```

[Screenshot: Original static homepage with centered text over background]

## Enhanced Animation Design

Post-sprint, the homepage was reimagined to better convey the app's purpose through an animated film reel design. This enhancement required several technical implementations:

### 1. Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  prefix: "tw-", // Prevents conflicts with existing Bulma classes
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        scroll: "scroll 40s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }, // Moves exactly one set width
        },
      },
    },
  },
  plugins: [],
};
```

### 2. Frame Component Architecture

```typescript
const Frame = ({ index }: { index: number }) => (
  <div className="tw-flex-none tw-mr-1">
    <div className="kino-grey tw-relative tw-w-72 tw-h-48 tw-border-2 tw-border-gray-800">
      {/* Authentic film reel sprocket holes */}
      <div className="tw-absolute -tw-top-3 tw-left-0 tw-w-full tw-flex tw-justify-between tw-px-2">
        {/* 4 sprocket holes per side matching 35mm film standard */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="tw-w-2 tw-h-2 tw-bg-gray-800 tw-rounded-full"
          />
        ))}
      </div>
      <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
        <p className="is-size-5 has-text-white-ter">
          {messages[index % messages.length]}
        </p>
      </div>
    </div>
  </div>
);
```

### 3. Infinite Scroll Implementation

The infinite scroll effect is achieved through several key technical components:

1. **Dual Frame Sets**: Two identical sets of frames are rendered to create the illusion of continuous movement:

```typescript
<div className="tw-animate-scroll tw-flex tw-flex-nowrap">
  {/* First set of frames */}
  {[...Array(12)].map((_, index) => (
    <Frame key={index} index={index} />
  ))}
  {/* Clone set - creates seamless transition */}
  {[...Array(12)].map((_, index) => (
    <Frame key={`clone-${index}`} index={index} />
  ))}
</div>
```

2. **CSS Animation**: Using transform and translate for smooth performance:

- The animation moves the entire container left by exactly one set width (-50%)
- When the first set moves off-screen, the second set is in the exact position where the first set started
- The animation resets to 0% instantly, but the viewer doesn't notice because the frames are identical

3. **Frame Spacing**: Precise calculations ensure seamless transitions:

- Each frame is exactly 288px wide (tw-w-72)
- A 4px margin (tw-mr-1) between frames
- Total width calculation includes all frames and margins

[Screenshot: New animated homepage showing film reel effect]

## Technical Challenges and Solutions

### 1. CSS Framework Integration

**Challenge**: Integrating Tailwind with existing Bulma CSS without conflicts
**Solution**:

- Used Tailwind's prefix option (`tw-`) to namespace all Tailwind classes
- Maintained Bulma classes for existing components
- Carefully managed overlapping styles through specific class ordering

### 2. Smooth Animation Performance

**Challenge**: Initial implementation using React state caused stuttering
**Solution**:

- Switched to pure CSS animation for better performance
- Used transform instead of left/margin properties
- Implemented GPU acceleration through transform3d

### 3. Frame Timing

**Challenge**: Creating truly seamless transitions between frame sets
**Solution**:

- Calculated exact pixel widths for frames and gaps
- Used precise timing in animation duration
- Ensured second set positioning matched first set exactly

### 4. Mobile Responsiveness

**Challenge**: Maintaining animation smoothness on different screen sizes
**Solution**:

- Used viewport-relative measurements where appropriate
- Adjusted frame sizes and counts based on screen width
- Maintained aspect ratios across different devices

[Screenshot: Mobile view of animated homepage]

This enhancement serves multiple purposes:

1. Technical showcase of advanced CSS animations
2. Creative solution to conveying site purpose
3. Engagement through dynamic content
4. Thematic consistency with cinema subject matter

The implementation demonstrates both technical proficiency in animation techniques and thoughtful UX design, creating an engaging introduction to the application's purpose.

## Utility Functions

### Image Upload

Handles image upload to Cloudinary with error handling and type safety:

```typescript
export const cloudinaryUpload = async (file: File) => {
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${kinoCloud}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(cloudinaryUrl, formData);
    return response.data.secure_url;
  } catch (error) {
    throw new Error("Image upload failed");
  }
};
```

### Geocoding

Converts addresses to coordinates for map markers:

```typescript
export const forwardGeocode = async (address: string) => {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json`,
    {
      params: { access_token: mapboxToken },
    }
  );

  return {
    latitude: response.data.features[0].geometry.coordinates[1],
    longitude: response.data.features[0].geometry.coordinates[0],
  };
};
```

## Challenges and Solutions

### Reusable Form Components

The challenge of creating form components that could handle both POST and PUT operations required careful consideration of component architecture and state management.

**Challenge:**

- Forms needed to work for both creation and updates
- Initial data handling differed between operations
- Validation requirements varied between operations

**Solution:**

```typescript
interface FormProps {
  initialData: CinemaFormData;
  onSubmit: (formData: CinemaFormData) => Promise<void>;
  formErrorData: Partial<Record<keyof CinemaFormData, string>>;
}

function CinemaForm({ initialData, onSubmit, formErrorData }: FormProps) {
  const [formData, setFormData] = useState(initialData);
  // Component logic handles both creation and updates
  // based on initialData and onSubmit implementation
}
```

### Borough Selector Optimization

The borough selector needed to update its options based on the selected area while maintaining performance and preventing unnecessary re-renders.

**Challenge:**

- Borough options needed to update based on area selection
- Initial render timing issues
- Performance concerns with frequent updates

**Solution:**

```typescript
function BoroughSelector({
  boroughData,
  area,
  updateBoroughData,
}: BoroughSelectorProps) {
  const [boroughOptions, setBoroughOptions] = useState<string[]>([]);

  useEffect(() => {
    setBoroughOptions(boroughs[area as keyof typeof boroughs] || []);
  }, [area]);
}
```

### Map Re-rendering Control

The map component initially suffered from infinite re-rendering due to marker updates.

**Challenge:**

- Markers needed to update with area changes
- Each update triggered component re-render
- Performance issues with marker management

**Solution:**

```typescript
function CinemaMap() {
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const fetchAndMapCinemas = useCallback(async () => {
    // Clear existing markers without triggering re-render
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    // Store references without state updates
  }, [map, selectedArea]);
}
```

## Future Features

### Enhanced Comment System

- Threaded comments with nested replies
- Comment likes and reactions
- Comment sorting and filtering
- User mentions and notifications
- Rich text formatting
- Comment reply notifications
- Comment threads/subthreads

### Advanced Event Discovery

- Tag-based event search
- Category filtering
- Date range filtering
- Geographic radius search
- Price range filters
- Event search by tags
- Event categories and themes

### Notification System

- Real-time updates for:
  - Comment replies
  - Event changes
  - New events at favorite cinemas
  - Thread responses
  - Mention notifications
- Email notifications
- Custom notification preferences
- Weekly digest emails
- Push notifications

## Deployment

The application is deployed at [Kino Connect](https://kino-connect.netlify.app/cinemas)
