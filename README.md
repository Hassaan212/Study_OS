# StudyOS

An AI-powered academic workspace for students.

## Features

- 📚 Study Materials Management
- 🎯 Task & Assignment Tracking
- 🤖 AI-Powered Study Assistant
- 📊 Progress Analytics
- 🎨 Modern, Responsive Design
- ✨ Interactive 3D Spline Integration

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Spline 3D Integration

The hero section includes a Spline 3D scene integration. To add your own scene:

1. Create or export your scene from [Spline](https://spline.design/)
2. Get the public scene URL from Spline (e.g., `https://prod.spline.design/YOUR_SCENE_ID`)
3. Open `app/page.tsx`
4. Replace the `sceneUrl` prop in the `<HeroSpline>` component:

```tsx
<HeroSpline sceneUrl="https://prod.spline.design/YOUR_SCENE_URL_HERE" />
```

### Features:
- ⚡ Lazy loading for optimal performance
- 🎨 Elegant loading state with animated indicators
- 🛡️ Error handling with graceful fallback
- 🌊 Smooth fade-in transitions
- 📱 Fully responsive design
- 🎯 Maintains layout integrity

If no scene URL is provided, the component will show a placeholder state.

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **3D Graphics:** Spline (@splinetool/react-spline)
- **Linting:** ESLint

## Project Structure

```
studyos/
├── app/              # Next.js app directory (routes, layouts)
├── components/       # Reusable React components
│   ├── Navbar.tsx    # Premium glassmorphism navigation
│   ├── HeroSpline.tsx # Spline 3D scene component
│   ├── Button.tsx    # Button component
│   └── Card.tsx      # Card component
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and helpers
├── public/           # Static assets
├── types/            # TypeScript type definitions
└── ...config files
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT
