import Navbar from '@/components/Navbar';
import HeroSpline from '@/components/HeroSpline';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050816] overflow-hidden">
      <Navbar />
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-cyan-400/10 rounded-full blur-[80px] animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-400/10 rounded-full blur-[80px] animate-float-delayed" />
      
      <main className="relative min-h-screen flex items-center overflow-hidden">
        {/* Robot Background - Positioned naturally on the right */}
        <HeroSpline />
        
        {/* Content Grid - Creates balanced layout */}
        <div className="container mx-auto px-6 lg:px-8 pt-32 md:pt-20 pb-20 lg:py-32 relative z-20 pointer-events-none">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content - Takes up 55% of space */}
            <div className="lg:col-span-7 space-y-8 md:space-y-10 animate-fade-in-up pointer-events-auto">
              {/* Badge */}
              <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 backdrop-blur-sm shadow-lg shadow-cyan-500/10">
                <span className="text-sm font-medium text-cyan-300 tracking-wide">
                  AI-Powered Academic Workspace
                </span>
              </div>
              
              {/* Heading */}
              <div className="space-y-5 md:space-y-6">
                <div className="relative inline-block">
                  {/* Glow behind heading */}
                  <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-cyan-400/30 to-purple-400/30 pointer-events-none" />
                  <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tighter drop-shadow-2xl">
                    StudyOS
                  </h1>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-purple-400 leading-tight">
                  Your AI-Powered Academic Workspace
                </h2>
              </div>
              
              {/* Description */}
              <p className="text-lg sm:text-xl md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-xl font-light">
                Organize semesters, generate notes, prepare for exams, and track academic progress in one intelligent workspace.
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-5 pt-2 md:pt-4">
                <button className="group relative px-8 sm:px-10 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">Get Started</span>
                </button>
                <button className="group px-8 sm:px-10 py-4 sm:py-5 rounded-xl border-2 border-cyan-400/40 text-cyan-300 font-bold text-base sm:text-lg backdrop-blur-sm transition-all duration-300 hover:bg-cyan-500/10 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105">
                  Watch Demo
                </button>
              </div>
            </div>
            
            {/* Right Space - Reserved for robot (45% of space) */}
            <div className="hidden lg:block lg:col-span-5 pointer-events-none"></div>
            
          </div>
        </div>
      </main>

      {/* Why StudyOS Section */}
      <section className="relative py-20 lg:py-32 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Why StudyOS?
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto">
              Built for students. Not just conversations.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative h-full bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl border border-cyan-400/20 backdrop-blur-md p-8 group-hover:border-cyan-400/40 transition-all duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff05_1px,transparent_1px),linear-gradient(to_bottom,#00ffff05_1px,transparent_1px)] bg-[size:32px_32px] rounded-3xl" />
                <div className="relative space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-400/30 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Structured Semester Workspace
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Organize subjects, units, notes, assignments, exams and resources in one place.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative h-full bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl border border-cyan-400/20 backdrop-blur-md p-8 group-hover:border-cyan-400/40 transition-all duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff05_1px,transparent_1px),linear-gradient(to_bottom,#00ffff05_1px,transparent_1px)] bg-[size:32px_32px] rounded-3xl" />
                <div className="relative space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-400/30 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    AI Study Assistant
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Ask questions like ChatGPT, but with awareness of your syllabus and study materials.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative h-full bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl border border-cyan-400/20 backdrop-blur-md p-8 group-hover:border-cyan-400/40 transition-all duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff05_1px,transparent_1px),linear-gradient(to_bottom,#00ffff05_1px,transparent_1px)] bg-[size:32px_32px] rounded-3xl" />
                <div className="relative space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-400/30 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Smart Exam Preparation
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Generate important questions, summaries, flashcards and revision plans instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative h-full bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl border border-cyan-400/20 backdrop-blur-md p-8 group-hover:border-cyan-400/40 transition-all duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff05_1px,transparent_1px),linear-gradient(to_bottom,#00ffff05_1px,transparent_1px)] bg-[size:32px_32px] rounded-3xl" />
                <div className="relative space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-400/30 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Academic Progress Tracking
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Track completion of units, assignments and exam readiness visually.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20 lg:py-32 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              How StudyOS Works
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto">
              From syllabus to exam preparation in minutes.
            </p>
          </div>

          {/* Steps Container */}
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/30 to-purple-500/0 animate-pulse" />
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                
                <div className="relative bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl border border-cyan-400/20 backdrop-blur-md p-8 group-hover:border-cyan-400/40 transition-all duration-500 h-full">
                  {/* Grid pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff05_1px,transparent_1px),linear-gradient(to_bottom,#00ffff05_1px,transparent_1px)] bg-[size:32px_32px] rounded-3xl" />
                  
                  <div className="relative space-y-6">
                    {/* Step number */}
                    <div className="flex items-start justify-between">
                      <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-400 opacity-30">
                        01
                      </span>
                      {/* Icon with glow */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-cyan-500/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-400/30 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-white">
                        Upload or Create Subjects
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        Create semesters, add subjects, and organize academic resources.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                
                <div className="relative bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl border border-cyan-400/20 backdrop-blur-md p-8 group-hover:border-cyan-400/40 transition-all duration-500 h-full">
                  {/* Grid pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff05_1px,transparent_1px),linear-gradient(to_bottom,#00ffff05_1px,transparent_1px)] bg-[size:32px_32px] rounded-3xl" />
                  
                  <div className="relative space-y-6">
                    {/* Step number */}
                    <div className="flex items-start justify-between">
                      <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-400 opacity-30">
                        02
                      </span>
                      {/* Icon with glow */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-purple-500/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-400/30 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-white">
                        AI Organizes Everything
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        StudyOS automatically structures units, notes, assignments and exam topics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                
                <div className="relative bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl border border-cyan-400/20 backdrop-blur-md p-8 group-hover:border-cyan-400/40 transition-all duration-500 h-full">
                  {/* Grid pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff05_1px,transparent_1px),linear-gradient(to_bottom,#00ffff05_1px,transparent_1px)] bg-[size:32px_32px] rounded-3xl" />
                  
                  <div className="relative space-y-6">
                    {/* Step number */}
                    <div className="flex items-start justify-between">
                      <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-400 opacity-30">
                        03
                      </span>
                      {/* Icon with glow */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-cyan-500/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-400/30 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-white">
                        Study Smarter
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        Generate summaries, flashcards, quizzes and important questions instantly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="relative py-20 lg:py-32 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              See StudyOS In Action
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto">
              Everything you need to manage your academic life in one intelligent workspace.
            </p>
          </div>

          {/* Dashboard Mockup */}
          <div className="relative animate-fade-in-up mb-12" style={{ animationDelay: '0.2s', opacity: 0 }}>
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
            
            {/* Dashboard Container */}
            <div className="relative bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl border border-cyan-400/30 backdrop-blur-xl overflow-hidden shadow-2xl">
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff05_1px,transparent_1px),linear-gradient(to_bottom,#00ffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
              
              {/* Dashboard Content */}
              <div className="relative flex flex-col lg:flex-row min-h-[600px]">
                
                {/* Left Sidebar */}
                <div className="lg:w-64 bg-gradient-to-b from-cyan-500/5 to-purple-500/5 border-r border-cyan-400/20 p-6 space-y-2">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white">StudyOS</h3>
                  </div>
                  
                  {['Dashboard', 'Subjects', 'Notes', 'Assignments', 'Exams', 'AI Assistant', 'Settings'].map((item, idx) => (
                    <div
                      key={item}
                      className={`group px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                        idx === 0
                          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30'
                          : 'hover:bg-cyan-500/10 border border-transparent hover:border-cyan-400/20'
                      }`}
                    >
                      <span className={`text-sm font-medium ${idx === 0 ? 'text-cyan-300' : 'text-gray-400 group-hover:text-cyan-300'}`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6 lg:p-8 space-y-6">
                  
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Subjects', value: '6', color: 'cyan' },
                      { label: 'Assignments', value: '14', color: 'purple' },
                      { label: 'Exam Readiness', value: '82%', color: 'cyan' },
                      { label: 'AI Generated Notes', value: '47', color: 'purple' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="group relative bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl border border-cyan-400/20 backdrop-blur-sm p-4 hover:border-cyan-400/40 transition-all duration-300"
                      >
                        <div className="space-y-2">
                          <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                          <p className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${
                            stat.color === 'cyan' ? 'from-cyan-300 to-cyan-400' : 'from-purple-300 to-purple-400'
                          }`}>
                            {stat.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid lg:grid-cols-3 gap-6">
                    
                    {/* Recent Subjects - Takes 2 columns */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl border border-cyan-400/20 backdrop-blur-sm p-6">
                      <h4 className="text-lg font-bold text-white mb-6">Recent Subjects</h4>
                      <div className="space-y-4">
                        {[
                          { name: 'Operating Systems', progress: 85, color: 'cyan' },
                          { name: 'Data Structures', progress: 70, color: 'purple' },
                          { name: 'Artificial Intelligence', progress: 90, color: 'cyan' },
                          { name: 'Database Systems', progress: 75, color: 'purple' },
                        ].map((subject) => (
                          <div
                            key={subject.name}
                            className="group p-4 rounded-xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border border-cyan-400/10 hover:border-cyan-400/30 transition-all duration-300"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
                                {subject.name}
                              </span>
                              <span className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${
                                subject.color === 'cyan' ? 'from-cyan-300 to-cyan-400' : 'from-purple-300 to-purple-400'
                              }`}>
                                {subject.progress}%
                              </span>
                            </div>
                            <div className="relative h-2 bg-gray-800/50 rounded-full overflow-hidden">
                              <div
                                className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
                                  subject.color === 'cyan'
                                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-400'
                                    : 'bg-gradient-to-r from-purple-500 to-purple-400'
                                }`}
                                style={{ width: `${subject.progress}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Upcoming Exams - Takes 1 column */}
                    <div className="bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl border border-cyan-400/20 backdrop-blur-sm p-6">
                      <h4 className="text-lg font-bold text-white mb-6">Upcoming Exams</h4>
                      <div className="space-y-3">
                        {[
                          { name: 'OS Midterm', date: 'Mar 15', color: 'cyan' },
                          { name: 'DBMS Quiz', date: 'Mar 18', color: 'purple' },
                          { name: 'AI Assignment', date: 'Mar 22', color: 'cyan' },
                        ].map((exam) => (
                          <div
                            key={exam.name}
                            className="group p-4 rounded-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-400/10 hover:border-cyan-400/30 transition-all duration-300 cursor-pointer"
                          >
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <p className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
                                  {exam.name}
                                </p>
                                <p className="text-xs text-gray-500">{exam.date}</p>
                              </div>
                              <div className={`w-2 h-2 rounded-full ${
                                exam.color === 'cyan' ? 'bg-cyan-400' : 'bg-purple-400'
                              } animate-pulse`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <button className="group relative px-10 py-5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">Start Your Free Trial</span>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 lg:py-32 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Loved by Students Everywhere
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto">
              Students are saving hours every week using StudyOS.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative h-full bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl border border-cyan-400/20 backdrop-blur-md p-8 group-hover:border-cyan-400/40 group-hover:-translate-y-2 transition-all duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff05_1px,transparent_1px),linear-gradient(to_bottom,#00ffff05_1px,transparent_1px)] bg-[size:32px_32px] rounded-3xl" />
                
                <div className="relative space-y-6">
                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-lg text-gray-300 leading-relaxed">
                    "StudyOS helped me organize an entire semester in less than an hour."
                  </p>

                  {/* Avatar and Info */}
                  <div className="flex items-center gap-4 pt-4">
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border-2 border-cyan-400/30 flex items-center justify-center overflow-hidden">
                      <span className="text-lg font-bold text-cyan-300">AK</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Ayaan Khan</p>
                      <p className="text-xs text-gray-400">Computer Science Student</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative h-full bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl border border-cyan-400/20 backdrop-blur-md p-8 group-hover:border-cyan-400/40 group-hover:-translate-y-2 transition-all duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff05_1px,transparent_1px),linear-gradient(to_bottom,#00ffff05_1px,transparent_1px)] bg-[size:32px_32px] rounded-3xl" />
                
                <div className="relative space-y-6">
                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-lg text-gray-300 leading-relaxed">
                    "The AI assistant generates better revision material than anything I created manually."
                  </p>

                  {/* Avatar and Info */}
                  <div className="flex items-center gap-4 pt-4">
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border-2 border-purple-400/30 flex items-center justify-center overflow-hidden">
                      <span className="text-lg font-bold text-purple-300">SA</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Sarah Ahmed</p>
                      <p className="text-xs text-gray-400">Engineering Student</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative h-full bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl border border-cyan-400/20 backdrop-blur-md p-8 group-hover:border-cyan-400/40 group-hover:-translate-y-2 transition-all duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff05_1px,transparent_1px),linear-gradient(to_bottom,#00ffff05_1px,transparent_1px)] bg-[size:32px_32px] rounded-3xl" />
                
                <div className="relative space-y-6">
                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-lg text-gray-300 leading-relaxed">
                    "Exam preparation became dramatically easier after switching to StudyOS."
                  </p>

                  {/* Avatar and Info */}
                  <div className="flex items-center gap-4 pt-4">
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border-2 border-cyan-400/30 flex items-center justify-center overflow-hidden">
                      <span className="text-lg font-bold text-cyan-300">ZM</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Zaid Mir</p>
                      <p className="text-xs text-gray-400">BTech AI Student</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-20 lg:py-32 px-6 lg:px-8">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Simple Pricing For Every Student
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto">
              Start free and upgrade when you need more AI-powered features.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch lg:items-center">
            
            {/* Free Plan */}
            <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative h-full bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl border border-cyan-400/20 backdrop-blur-md p-8 group-hover:border-cyan-400/30 transition-all duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff05_1px,transparent_1px),linear-gradient(to_bottom,#00ffff05_1px,transparent_1px)] bg-[size:32px_32px] rounded-3xl" />
                
                <div className="relative space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-white">₹0</span>
                      <span className="text-gray-400">/month</span>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {['3 Subjects', 'Basic Notes', 'Assignment Tracking', 'Limited AI Usage'].map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full px-6 py-4 rounded-xl border-2 border-cyan-400/30 text-cyan-300 font-semibold hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-300">
                    Get Started
                  </button>
                </div>
              </div>
            </div>

            {/* Student Pro Plan (Featured) */}
            <div className="group relative animate-fade-in-up lg:scale-105" style={{ animationDelay: '0.2s', opacity: 0 }}>
              {/* Most Popular Badge */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-md animate-pulse" />
                  <div className="relative px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold tracking-wider">
                    MOST POPULAR
                  </div>
                </div>
              </div>

              {/* Enhanced glow for featured card */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              
              <div className="relative h-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl border-2 border-cyan-400/40 backdrop-blur-md p-8 group-hover:border-cyan-400/60 transition-all duration-500 shadow-2xl shadow-cyan-500/20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff08_1px,transparent_1px),linear-gradient(to_bottom,#00ffff08_1px,transparent_1px)] bg-[size:32px_32px] rounded-3xl" />
                
                <div className="relative space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 mb-2">
                      Student Pro
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">₹199</span>
                      <span className="text-gray-300">/month</span>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {[
                      'Unlimited Subjects',
                      'Unlimited Notes',
                      'AI Study Assistant',
                      'Smart Exam Preparation',
                      'Progress Analytics',
                      'Priority Support'
                    ].map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-white font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="group/btn relative w-full px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <span className="relative">Start Pro Trial</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Institution Plan */}
            <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative h-full bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl border border-cyan-400/20 backdrop-blur-md p-8 group-hover:border-cyan-400/30 transition-all duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff05_1px,transparent_1px),linear-gradient(to_bottom,#00ffff05_1px,transparent_1px)] bg-[size:32px_32px] rounded-3xl" />
                
                <div className="relative space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Institution</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-white">Custom</span>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {[
                      'Multi-user Access',
                      'Teacher Dashboard',
                      'Analytics',
                      'Team Management',
                      'Dedicated Support'
                    ].map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full px-6 py-4 rounded-xl border-2 border-purple-400/30 text-purple-300 font-semibold hover:bg-purple-500/10 hover:border-purple-400/50 transition-all duration-300">
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Note */}
          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <p className="text-gray-400">
              All plans include basic features. No credit card required for free plan.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 lg:py-32 px-6 lg:px-8">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-[150px] animate-pulse" />
        
        <div className="container mx-auto max-w-5xl">
          <div className="relative animate-fade-in-up">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-[3rem] blur-2xl" />
            
            {/* CTA Container */}
            <div className="relative bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-[3rem] border border-cyan-400/30 backdrop-blur-xl p-12 lg:p-16 text-center overflow-hidden">
              {/* Grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff08_1px,transparent_1px),linear-gradient(to_bottom,#00ffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
              
              <div className="relative space-y-10">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Ready to Transform Your Academic Workflow?
                  </h2>
                  <p className="text-lg md:text-xl text-gray-300 font-light max-w-3xl mx-auto">
                    Join students using AI to organize subjects, generate notes, prepare for exams and stay ahead.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4">
                  <button className="group relative px-12 py-5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative">Start Free Today</span>
                  </button>
                  <button className="px-12 py-5 rounded-xl border-2 border-cyan-400/40 text-cyan-300 font-bold text-lg backdrop-blur-sm transition-all duration-300 hover:bg-cyan-500/10 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105">
                    Watch Demo
                  </button>
                </div>

                {/* Trust indicator */}
                <p className="text-sm text-gray-400 pt-4">
                  No credit card required • Free plan forever
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-cyan-400/10 bg-gradient-to-b from-transparent to-cyan-500/5">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-8 lg:mb-12">
            
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-2xl font-bold text-white mb-2">StudyOS</h3>
              <p className="text-sm text-gray-400 font-medium mb-3">
                AI-Powered Academic Workspace
              </p>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                Helping students study smarter with AI.
              </p>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4">Product</h4>
              <ul className="space-y-3">
                {['Features', 'Dashboard', 'AI Assistant', 'Pricing'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-cyan-300 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-3">
                {['Documentation', 'Support', 'Blog', 'FAQ'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-cyan-300 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4">Company</h4>
              <ul className="space-y-3">
                {['About', 'Contact', 'Privacy Policy', 'Terms'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-cyan-300 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 lg:pt-8 border-t border-cyan-400/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
              {/* Copyright */}
              <p className="text-sm text-gray-400">
                © 2026 StudyOS. All rights reserved.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {/* GitHub */}
                <a
                  href="#"
                  className="group w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 backdrop-blur-sm flex items-center justify-center hover:border-cyan-400/40 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-cyan-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>

                {/* Twitter/X */}
                <a
                  href="#"
                  className="group w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 backdrop-blur-sm flex items-center justify-center hover:border-cyan-400/40 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-cyan-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="#"
                  className="group w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 backdrop-blur-sm flex items-center justify-center hover:border-cyan-400/40 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-cyan-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
