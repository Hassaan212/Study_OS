import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-[#050816] overflow-hidden flex items-center justify-center">
      {/* Background layers - matching landing page */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#0a0e27] to-[#0d1028] pointer-events-none" />
      
      {/* Radial depth layers */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(6, 182, 212, 0.08) 0%, rgba(168, 85, 247, 0.06) 35%, transparent 70%)'
        }}
      />
      
      {/* Grid pattern background */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[130px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[130px] animate-pulse pointer-events-none" />
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-md px-6 py-8">
        {/* Logo/Brand */}
        <div className="text-center mb-8 animate-fade-in-up">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2 hover:text-cyan-300 transition-colors">
              StudyOS
            </h1>
          </Link>
          <p className="text-gray-400 text-sm">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div 
          className="relative animate-fade-in-up"
          style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}
        >
          {/* Card glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl pointer-events-none" />
          
          {/* Card */}
          <div className="relative bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl border border-cyan-400/30 backdrop-blur-xl p-8 shadow-2xl">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff05_1px,transparent_1px),linear-gradient(to_bottom,#00ffff05_1px,transparent_1px)] bg-[size:32px_32px] rounded-3xl pointer-events-none" />
            
            <div className="relative space-y-6">
              <h2 className="text-2xl font-bold text-white text-center mb-6">
                Welcome Back
              </h2>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#050816]/50 border border-cyan-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-[#050816]/50 border border-cyan-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                />
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button className="group relative w-full px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-base overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-500/40">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    width: '50%',
                  }}
                />
                <span className="relative">Sign In</span>
              </button>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-cyan-400/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gradient-to-r from-transparent via-[#050816] to-transparent text-gray-400">
                    or
                  </span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div 
          className="text-center mt-6 animate-fade-in-up"
          style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
        >
          <Link href="/" className="text-sm text-gray-400 hover:text-cyan-300 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
