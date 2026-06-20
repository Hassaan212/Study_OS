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

The hero section includes a production-ready Spline 3D scene integration component.

### Adding Your Spline Scene

1. **Create your 3D scene** at [Spline](https://spline.design/)
2. **Export and get the public URL** from Spline (format: `https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode`)
3. **Open** `app/page.tsx`
4. **Find** the `<HeroSpline />` component
5. **Add your scene URL**:

```tsx
<HeroSpline sceneUrl="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode" />
```

### Features

- ⚡ **Lazy loading** - Spline loads only when needed using Next.js dynamic imports
- 🎨 **Automatic placeholder** - Shows elegant loading state while scene loads
- 🛡️ **Error handling** - Falls back to placeholder if scene fails to load
- 🌊 **Smooth transitions** - 700ms fade-in when scene is ready
- 📱 **Fully responsive** - Adapts to all screen sizes
- 🎯 **Zero layout shift** - Maintains dimensions during loading
- 🔮 **Glassmorphism styling** - Matches the site's premium aesthetic

### Technical Details

- **Component**: `components/HeroSpline.tsx`
- **Package**: `@splinetool/react-spline` (already installed)
- **Loading**: Dynamic import with SSR disabled for optimal performance
- **States**: Loading → Loaded or Error → Fallback
- **No URL provided**: Automatically shows placeholder (safe default)

If no `sceneUrl` is provided, the component gracefully displays the placeholder visual with no errors.

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
