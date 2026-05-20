import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/constants'

/* ─── Animated background nodes ─── */
const NODE_COUNT = 18
const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  r: 2 + Math.random() * 3,
  delay: Math.random() * 4,
  dur: 6 + Math.random() * 6,
}))

const edges = nodes.flatMap((n, i) =>
  nodes.slice(i + 1, i + 3).map((m) => ({ from: n, to: m }))
)

function NetworkSVG() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full opacity-30"
      aria-hidden="true"
    >
      {edges.map((e, i) => (
        <line
          key={i}
          x1={e.from.x} y1={e.from.y}
          x2={e.to.x}   y2={e.to.y}
          stroke="#7ee8fa" strokeWidth="0.3" strokeOpacity="0.5"
        />
      ))}
      {nodes.map((n) => (
        <circle key={n.id} cx={n.x} cy={n.y} r={n.r} fill="#7ee8fa" opacity="0.7">
          <animate
            attributeName="opacity"
            values="0.3;0.9;0.3"
            dur={`${n.dur}s`}
            begin={`${n.delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            values={`${n.r};${n.r * 1.6};${n.r}`}
            dur={`${n.dur}s`}
            begin={`${n.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  )
}

/* ─── Input field ─── */
function AuthInput({ label, type = 'text', placeholder, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold tracking-widest uppercase text-slate-400">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="
          w-full px-4 py-3 rounded-xl text-sm
          bg-slate-800/60 border border-slate-700
          text-slate-100 placeholder-slate-500
          focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40
          transition-all duration-200
        "
      />
    </div>
  )
}

/* ─── Main component ─── */
const Login = () => {
  const [firstName, setFirstName]   = useState('')
  const [lastName,  setLastName]    = useState('')
  const [emailId,   setEmailId]     = useState('')
  const [password,  setPassword]    = useState('')
  const [error,     setError]       = useState('')
  const [isLogin,   setIsLogin]     = useState(true)
  const [loading,   setLoading]     = useState(false)
  const [mounted,   setMounted]     = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => { setMounted(true) }, [])

  const handleAuth = async () => {
    setError('')
    setLoading(true)
    try {
      if (isLogin) {
        const res = await axios.post(`${BASE_URL}login`, { emailId, password }, { withCredentials: true })
        dispatch(addUser(res.data))
        navigate('/feed')
      } else {
        const res = await axios.post(`${BASE_URL}signup`, { firstName, lastName, emailId, password }, { withCredentials: true })
        dispatch(addUser(res.data))
        navigate('/profile')
      }
    } catch {
      setError(isLogin ? 'Invalid email or password.' : 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleAuth() }

  return (
    <>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .auth-root { font-family: 'DM Sans', sans-serif; }
        .brand-font { font-family: 'Syne', sans-serif; }

        .glass-card {
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(99, 179, 237, 0.12);
          box-shadow: 0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03);
        }

        .slide-in {
          opacity: 0;
          transform: translateY(18px);
          animation: slideIn 0.55s cubic-bezier(.22,1,.36,1) forwards;
        }
        @keyframes slideIn {
          to { opacity: 1; transform: translateY(0); }
        }

        .tab-pill {
          position: relative;
          cursor: pointer;
          padding: 8px 28px;
          border-radius: 9999px;
          font-weight: 500;
          font-size: 0.875rem;
          transition: color 0.25s;
          color: #94a3b8;
          z-index: 1;
        }
        .tab-pill.active { color: #0f172a; }
        .tab-pill.active::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(135deg, #7ee8fa, #22d3ee);
          z-index: -1;
        }

        .auth-btn {
          background: linear-gradient(135deg, #06b6d4, #0ea5e9);
          box-shadow: 0 4px 24px rgba(6,182,212,0.35);
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
        }
        .auth-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(6,182,212,0.5);
        }
        .auth-btn:active:not(:disabled) { transform: translateY(0); }
        .auth-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .dot-loader span {
          display: inline-block;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: white;
          margin: 0 2px;
          animation: bounce 1s infinite;
        }
        .dot-loader span:nth-child(2) { animation-delay: 0.15s; }
        .dot-loader span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes bounce { 0%,80%,100%{transform:scale(0.7)} 40%{transform:scale(1.1)} }

        /* Responsive */
        @media (max-width: 767px) {
          .left-panel { display: none; }
          .right-panel { width: 100%; min-height: 100dvh; }
        }
      `}</style>

      <div className="auth-root flex min-h-screen w-full bg-slate-950">

        {/* ── LEFT PANEL ── */}
        <div
          className="left-panel relative flex flex-col justify-between overflow-hidden"
          style={{ width: '52%', minHeight: '100vh' }}
        >
          {/* deep gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #020617 0%, #0c1a2e 50%, #0a2540 100%)',
            }}
          />
          {/* animated blob */}
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15 blur-3xl"
            style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
          />

          <NetworkSVG />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between h-full p-12">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <span className="brand-font text-white text-xl tracking-tight">Nexus</span>
            </div>

            {/* Hero text */}
            <div>
              <h1
                className="brand-font text-white leading-none mb-6"
                style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)', letterSpacing: '-0.03em' }}
              >
                Where your<br />
                <span style={{ color: '#22d3ee' }}>connections</span><br />
                come alive.
              </h1>
              <p className="text-slate-400 text-base leading-relaxed max-w-xs" style={{ fontWeight: 300 }}>
                Real-time conversations, meaningful relationships, and a feed that actually matters to you.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex gap-10">
              {/* {[['12K+', 'Active users'], ['98%', 'Uptime'], ['4.9★', 'Rating']].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="brand-font text-white text-2xl">{val}</div>
                  <div className="text-slate-500 text-xs mt-0.5" style={{ letterSpacing: '0.05em' }}>{lbl}</div>
                </div>
              ))} */}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div
          className="right-panel relative flex items-center justify-center p-6"
          style={{
            width: '48%',
            background: 'linear-gradient(160deg, #0f172a 0%, #0c1a2e 100%)',
          }}
        >
          {/* subtle grid texture */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(rgba(99,179,237,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.4) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Card */}
          <div
            className={`glass-card relative z-10 w-full rounded-2xl p-8 ${mounted ? 'slide-in' : 'opacity-0'}`}
            style={{ maxWidth: '420px', animationDelay: '0.1s' }}
          >
            {/* Tab switcher */}
            <div className="flex bg-slate-800/60 rounded-full p-1 mb-8 w-fit mx-auto">
              <button className={`tab-pill ${isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(true); setError('') }}>
                Sign in
              </button>
              <button className={`tab-pill ${!isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(false); setError('') }}>
                Sign up
              </button>
            </div>

            {/* Heading */}
            <div className="mb-7">
              <h2 className="brand-font text-white text-2xl mb-1">
                {isLogin ? 'Welcome back' : 'Create account'}
              </h2>
              <p className="text-slate-500 text-sm">
                {isLogin
                  ? 'Sign in to pick up where you left off.'
                  : 'Join thousands of people already on Nexus.'}
              </p>
            </div>

            {/* Form fields */}
            <div className="flex flex-col gap-4" onKeyDown={handleKeyDown}>
              {!isLogin && (
                <div className="flex gap-3">
                  <AuthInput label="First name" placeholder="John" onChange={(e) => setFirstName(e.target.value)} />
                  <AuthInput label="Last name"  placeholder="Doe"  onChange={(e) => setLastName(e.target.value)}  />
                </div>
              )}
              <AuthInput label="Email address" type="email"    placeholder="you@example.com" onChange={(e) => setEmailId(e.target.value)}  />
              <AuthInput label="Password"      type="password" placeholder="••••••••"        onChange={(e) => setPassword(e.target.value)} />
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            {/* CTA */}
            <button
              className="auth-btn mt-6 w-full py-3.5 rounded-xl text-white font-medium text-sm tracking-wide"
              onClick={handleAuth}
              disabled={loading}
            >
              {loading ? (
                <span className="dot-loader"><span/><span/><span/></span>
              ) : (
                isLogin ? 'Sign in to Nexus' : 'Create my account'
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-700/60"/>
              <span className="text-slate-600 text-xs tracking-widest uppercase">or</span>
              <div className="flex-1 h-px bg-slate-700/60"/>
            </div>

            {/* Google OAuth placeholder */}
            <button className="
              w-full py-3 rounded-xl border border-slate-700 bg-slate-800/40
              text-slate-300 text-sm font-medium flex items-center justify-center gap-2.5
              hover:border-slate-500 hover:bg-slate-800/70 transition-all duration-200
            ">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
                <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/>
                <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/>
                <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
              </svg>
              Continue with Google
            </button>

            {/* Terms */}
            <p className="text-slate-600 text-xs text-center mt-6 leading-relaxed">
              By continuing, you agree to our{' '}
              <span className="text-cyan-500 cursor-pointer hover:underline">Terms of Service</span>{' '}
              and{' '}
              <span className="text-cyan-500 cursor-pointer hover:underline">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login