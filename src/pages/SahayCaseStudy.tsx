import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


/* ═══════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════ */

const useReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const handle = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress((window.pageYOffset / total) * 100)
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])
  return progress
}

/* ═══════════════════════════════════════════════════════════════
   SMALL COMPONENTS
═══════════════════════════════════════════════════════════════ */

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal(0.12)
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: '#9A8B7A' }}>{children}</p>
    </Reveal>
  )
}

function Callout({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'insight' | 'shift' }) {
  const styles = {
    insight: { background: 'rgba(201,120,85,0.06)', borderColor: '#C97855' },
    shift: { background: 'rgba(201,120,85,0.06)', borderColor: '#C97855' },
    default: { background: '#FEFDFB', borderColor: '#E8E2D8' },
  }
  const s = styles[variant]
  return (
    <Reveal>
      <div
        className="border-l-4 rounded-r-2xl p-6 my-10"
        style={{ backgroundColor: s.background, borderColor: s.borderColor }}
      >
        <p className="text-lg font-medium leading-relaxed" style={{ color: '#3D3228' }}>{children}</p>
      </div>
    </Reveal>
  )
}

function PullQuote({ children }: { children: React.ReactNode }) {
  const { ref, visible } = useReveal(0.2)
  return (
    <div ref={ref} className={`py-12 transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="border-l-4 pl-8" style={{ borderColor: '#C97855' }}>
        <blockquote
          className="font-medium"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', lineHeight: '1.3', maxWidth: '26ch', letterSpacing: '-0.02em', color: '#3D3228' }}
        >
          {children}
        </blockquote>
      </div>
    </div>
  )
}

function MetadataGrid() {
  return (
    <Reveal delay={200}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t" style={{ borderColor: '#E8E2D8' }}>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9A8B7A' }}>Role</div>
          <div className="text-sm" style={{ color: '#3D3228' }}>UX/UI Designer & Researcher</div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9A8B7A' }}>Duration</div>
          <div className="text-sm" style={{ color: '#3D3228' }}>2 Academic Quarters</div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9A8B7A' }}>Team</div>
          <div className="text-sm" style={{ color: '#3D3228' }}>3 People</div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9A8B7A' }}>Tools</div>
          <div className="text-sm" style={{ color: '#3D3228' }}>Figma, FigJam, Figma Make, Google Forms</div>
        </div>
      </div>
    </Reveal>
  )
}

function ContributionTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-xs font-medium px-3 py-1 rounded-full"
      style={{ backgroundColor: 'rgba(201,120,85,0.08)', color: '#C97855' }}
    >
      {children}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN CASE STUDY
═══════════════════════════════════════════════════════════════ */

const SahayCaseStudy = () => {
  const scrollProgress = useScrollProgress()
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const t = setTimeout(() => setHeroVisible(true), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F0' }}>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="h-full transition-all duration-150" style={{ width: `${scrollProgress}%`, backgroundColor: '#C97855' }} />
      </div>

      <Navbar />

      <main className="pt-32 pb-32">

        {/* ═══════════════════════════════════════════
            1. HERO
        ═══════════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <div className={`transition-all duration-700 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
            <Link to="/#work" className="inline-flex items-center mb-12 transition-colors group" style={{ color: '#9A8B7A' }}>
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to projects
            </Link>
          </div>

          <h1
            className={`font-bold leading-[1.08] mb-6 transition-all duration-1000 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', maxWidth: '20ch', color: '#3D3228' }}
          >
            Sahay: Confidence before contractors
          </h1>

          <div className={`transition-all duration-1000 delay-200 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="text-xl leading-relaxed max-w-[55ch] mb-8" style={{ color: '#9A8B7A' }}>
              An AI-powered home maintenance companion that helps homeowners understand problems before deciding what to do next.
            </p>
          </div>

          <MetadataGrid />
        </section>


        {/* ═══════════════════════════════════════════
            2. ORIGIN STORY
        ═══════════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto px-6 mb-32">
          <SectionLabel>Origin story</SectionLabel>

          <Reveal>
            <div className="space-y-6 text-lg leading-relaxed" style={{ maxWidth: '60ch', color: '#3D3228' }}>
              <p className="text-xl font-medium" style={{ color: '#3D3228' }}>
                This project started from my own lived experience as a homeowner.
              </p>
              <p style={{ color: '#9A8B7A' }}>
                Whenever something went wrong, a leak, an appliance failure, an unfamiliar noise, I found myself bouncing between Google searches, YouTube tutorials, Reddit threads, contractor websites, and advice from friends. The experience was fragmented, stressful, and filled with uncertainty.
              </p>
              <p style={{ color: '#9A8B7A' }}>I never knew:</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ul className="mt-6 mb-8 space-y-3 text-lg ml-1" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
              <li className="flex items-start gap-3"><span className="mt-1.5" style={{ color: '#B5A89A' }}>•</span> What was actually wrong</li>
              <li className="flex items-start gap-3"><span className="mt-1.5" style={{ color: '#B5A89A' }}>•</span> How serious the issue was</li>
              <li className="flex items-start gap-3"><span className="mt-1.5" style={{ color: '#B5A89A' }}>•</span> Whether I could fix it myself</li>
              <li className="flex items-start gap-3"><span className="mt-1.5" style={{ color: '#B5A89A' }}>•</span> Whether I needed a professional</li>
              <li className="flex items-start gap-3"><span className="mt-1.5" style={{ color: '#B5A89A' }}>•</span> Who I could trust</li>
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-lg leading-relaxed" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
              Instead of immediately building a solution, I partnered with two teammates and set out to understand whether this problem extended beyond my own experience.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-lg leading-relaxed mt-6" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
              As our understanding of the problem deepened, so did our thinking about identity. We chose the name <strong style={{ color: '#3D3228' }}>Sahay</strong> — inspired by an Indian word meaning help or support. Variations of it exist across several Indian languages, yet the core meaning stays the same: providing guidance when someone needs it. That resonated with us because it reflected exactly the role we wanted the product to play. Not a transactional service. Not a marketplace. A trusted companion that helps people understand what's happening and know what to do next.
            </p>
          </Reveal>

          <Callout variant="insight">
            My role: I initiated the project, identified the opportunity, partnered with the team, and drove research strategy from day one.
          </Callout>
        </section>


        {/* ═══════════════════════════════════════════
            3. THE PROBLEM
        ═══════════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto px-6 mb-32">
          <SectionLabel>The problem</SectionLabel>

          <Reveal>
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#3D3228' }}>
              Homeowners don't need another marketplace.<br/>
              They need confidence.
            </h2>
          </Reveal>

          <Reveal delay={50}>
            <p className="text-lg leading-relaxed mb-8" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
              Every existing platform assumes the user already knows what they need. They jump straight to "find a pro" without helping people understand what's wrong, how urgent it is, or whether professional help is even necessary.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <div className="rounded-2xl p-5 border" style={{ backgroundColor: '#FEFDFB', borderColor: '#E8E2D8' }}>
                <p className="text-sm font-semibold mb-1" style={{ color: '#C97855' }}>Fragmented</p>
                <p className="text-sm" style={{ color: '#9A8B7A' }}>5+ apps and platforms to diagnose a single issue</p>
              </div>
              <div className="rounded-2xl p-5 border" style={{ backgroundColor: '#FEFDFB', borderColor: '#E8E2D8' }}>
                <p className="text-sm font-semibold mb-1" style={{ color: '#C97855' }}>Uncertain</p>
                <p className="text-sm" style={{ color: '#9A8B7A' }}>No way to assess urgency or severity before spending money</p>
              </div>
              <div className="rounded-2xl p-5 border" style={{ backgroundColor: '#FEFDFB', borderColor: '#E8E2D8' }}>
                <p className="text-sm font-semibold mb-1" style={{ color: '#C97855' }}>Trust deficit</p>
                <p className="text-sm" style={{ color: '#9A8B7A' }}>Existing platforms prioritize booking over understanding</p>
              </div>
            </div>
          </Reveal>
        </section>


        {/* ═══════════════════════════════════════════
            4. RESEARCH PROCESS
        ═══════════════════════════════════════════ */}
        <section className="relative py-24 mb-32" style={{ backgroundColor: '#F5F0E8' }}>
          <div className="max-w-4xl mx-auto px-6">
            <SectionLabel>Research process</SectionLabel>

            <Reveal>
              <h2 className="text-3xl font-bold mb-10" style={{ color: '#3D3228' }}>
                We talked to homeowners, renters, and shared housing participants.
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <Reveal delay={50}>
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#3D3228' }}>Primary research</h3>
                  <ul className="space-y-3" style={{ color: '#9A8B7A' }}>
                    <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#8B9CAE' }}>•</span> Homeowner interviews</li>
                    <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#8B9CAE' }}>•</span> Renter interviews</li>
                    <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#8B9CAE' }}>•</span> Shared housing participants</li>
                    <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#8B9CAE' }}>•</span> Survey (Google Forms)</li>
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#3D3228' }}>Secondary research</h3>
                  <ul className="space-y-3" style={{ color: '#9A8B7A' }}>
                    <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#8B9CAE' }}>•</span> Competitive analysis of service platforms</li>
                    <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#8B9CAE' }}>•</span> DIY resource ecosystem mapping</li>
                    <li className="flex items-start gap-2"><span className="mt-0.5" style={{ color: '#8B9CAE' }}>•</span> Existing marketplace evaluation</li>
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <div className="rounded-2xl border p-8" style={{ backgroundColor: '#FEFDFB', borderColor: '#E8E2D8' }}>
                <h3 className="text-lg font-semibold mb-6" style={{ color: '#3D3228' }}>Key research findings</h3>
                <div className="space-y-4">
                  {[
                    'Users rarely start with service marketplaces. They start with Google, YouTube, Reddit, friends.',
                    'Users try solving issues themselves first before hiring anyone.',
                    'Trust matters more than convenience when choosing a professional.',
                    'Existing platforms focus on hiring, not understanding.',
                    'Users struggle to determine urgency without expert input.',
                    'Users want a combination of DIY support and professional help.',
                    'Users prefer understanding the problem before booking services.',
                  ].map((finding, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(139,156,174,0.15)' }}>
                        <span className="text-xs font-bold" style={{ color: '#8B9CAE' }}>{i + 1}</span>
                      </div>
                      <p style={{ color: '#9A8B7A' }}>{finding}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>


        {/* ═══════════════════════════════════════════
            5. THE TURNING POINT
        ═══════════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto px-6 mb-32">
          <SectionLabel>The turning point</SectionLabel>

          <Reveal>
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#3D3228' }}>
              Research changed the entire direction.
            </h2>
          </Reveal>

          <Reveal delay={50}>
            <div className="space-y-6 text-lg leading-relaxed" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
              <p>
                Initially, we believed the problem was: <em>"People need a better way to find service providers."</em>
              </p>
              <p>
                Research proved that assumption wrong. Across interviews, participants described the same pattern of anxiety and hesitation:
              </p>
            </div>
          </Reveal>

          <Reveal delay={75}>
            <div className="border-l-4 rounded-r-2xl p-6 my-8" style={{ backgroundColor: 'rgba(201,120,85,0.06)', borderColor: '#C97855' }}>
              <p className="text-lg italic leading-relaxed" style={{ color: '#3D3228' }}>
                "Not knowing whether to call a professional or try it myself. Not trusting people I don't know. Fear of getting overcharged by someone I found online."
              </p>
              <p className="text-sm mt-3" style={{ color: '#9A8B7A' }}>— Interview participant</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-6 text-lg leading-relaxed" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
              <p className="text-xl font-medium" style={{ color: '#3D3228' }}>
                The real problem: "People need confidence before deciding whether they need a service provider at all."
              </p>
              <p>
                This wasn't an edge case. It was the central emotional experience of home maintenance. This insight became the pivotal moment of the project and fundamentally changed what we were building.
              </p>
            </div>
          </Reveal>

          <PullQuote>
            People don't need a better way to find contractors. They need confidence before deciding whether they need one.
          </PullQuote>

          <Reveal delay={100}>
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="rounded-2xl p-6 border" style={{ backgroundColor: '#FEFDFB', borderColor: '#E8E2D8' }}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#9A8B7A' }}>What we assumed</p>
                <p className="text-lg font-semibold" style={{ color: '#3D3228' }}>Service Marketplace</p>
                <p className="text-sm mt-2" style={{ color: '#9A8B7A' }}>Help people find and book contractors faster</p>
              </div>
              <div className="rounded-2xl p-6 border" style={{ backgroundColor: 'rgba(143,160,136,0.06)', borderColor: '#8FA088' }}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#8FA088' }}>What research revealed</p>
                <p className="text-lg font-semibold" style={{ color: '#3D3228' }}>AI-Powered Home Companion</p>
                <p className="text-sm mt-2" style={{ color: '#9A8B7A' }}>Help people understand problems and make informed decisions</p>
              </div>
            </div>
          </Reveal>

          <Callout variant="shift">
            This shift, from transactional marketplace to intelligent companion, defined every product decision that followed.
          </Callout>
        </section>


        {/* ═══════════════════════════════════════════
            6. PRODUCT STRATEGY & AI DIRECTION
        ═══════════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto px-6 mb-32">
          <SectionLabel>Product strategy: AI direction</SectionLabel>

          <Reveal>
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#3D3228' }}>
              What if homeowners could describe a problem and immediately receive guidance?
            </h2>
          </Reveal>

          <Reveal delay={50}>
            <div className="space-y-6 text-lg leading-relaxed" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
              <p>
                As the project progressed, AI became increasingly central to how people solved problems in everyday life. Our team members were also working with AI in professional contexts, which informed our thinking about what was possible.
              </p>
              <p>
                We began exploring a conversational AI model where homeowners could describe their issue naturally and receive structured, actionable guidance.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {[
                { label: 'AI Diagnosis', desc: 'Identify likely issues from user descriptions' },
                { label: 'AI Explanations', desc: 'Plain-language breakdowns of what is happening' },
                { label: 'Urgency Assessment', desc: 'Help users understand severity and timing' },
                { label: 'AI Summaries', desc: 'Synthesize home data into actionable insights' },
                { label: 'DIY Guidance', desc: 'Step-by-step instructions when appropriate' },
                { label: 'Decision Support', desc: 'Help users choose between DIY and professional help' },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl p-5 border" style={{ backgroundColor: '#FEFDFB', borderColor: '#E8E2D8' }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#3D3228' }}>{item.label}</p>
                  <p className="text-sm" style={{ color: '#9A8B7A' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-base mt-8 italic" style={{ color: '#B5A89A' }}>
              We used Figma Make to rapidly prototype AI-driven interactions and test them with real users.
            </p>
          </Reveal>
        </section>


        {/* ═══════════════════════════════════════════
            7. INFORMATION ARCHITECTURE & USER FLOWS
        ═══════════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto px-6 mb-32">
          <SectionLabel>Information architecture & user flow validation</SectionLabel>

          <Reveal>
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#3D3228' }}>
              We validated flows before building screens.
            </h2>
          </Reveal>

          <Reveal delay={50}>
            <div className="space-y-6 text-lg leading-relaxed" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
              <p>
                Because we planned to prototype AI-driven experiences, validating the information architecture and user flows before building became essential. We created detailed end-to-end flows and tested them with participants.
              </p>
              <p>Participants strongly validated:</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ul className="mt-4 mb-8 space-y-3 text-lg ml-1" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
              <li className="flex items-start gap-3"><span className="mt-1" style={{ color: '#8FA088' }}>✓</span> Problem-first navigation: start with "what's wrong," not "find a pro"</li>
              <li className="flex items-start gap-3"><span className="mt-1" style={{ color: '#8FA088' }}>✓</span> Understanding before booking: diagnosis precedes action</li>
              <li className="flex items-start gap-3"><span className="mt-1" style={{ color: '#8FA088' }}>✓</span> Guided decision making: the system helps users decide, not just presents options</li>
            </ul>
          </Reveal>

          <Callout>
            Feedback from flow testing helped us refine the experience before any high-fidelity design work began. This saved significant design and development time.
          </Callout>

          {/* Visual: IA diagram */}
          <Reveal delay={150}>
            <div className="rounded-2xl overflow-hidden mt-8 border" style={{ borderColor: '#E8E2D8' }}>
              <img
                src={`${import.meta.env.BASE_URL}research-ia.png`}
                alt="Information architecture diagram and user flow"
                className="w-full h-auto"
              />
            </div>
          </Reveal>
        </section>


        {/* ═══════════════════════════════════════════
            8. DESIGN PRINCIPLES
        ═══════════════════════════════════════════ */}
        <section className="relative py-24 mb-32" style={{ backgroundColor: '#F5F0E8' }}>
          <div className="max-w-4xl mx-auto px-6">
            <SectionLabel>Design principles</SectionLabel>

            <Reveal>
              <h2 className="text-3xl font-bold mb-10" style={{ color: '#3D3228' }}>
                Every design decision was guided by three principles.
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              <Reveal delay={50}>
                <div className="rounded-2xl p-6 border h-full" style={{ backgroundColor: '#FEFDFB', borderColor: '#E8E2D8' }}>
                  <div className="text-2xl mb-3">🧭</div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#3D3228' }}>Confidence first</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#9A8B7A' }}>Every interaction should increase the user's understanding and reduce anxiety before asking them to take action or spend money.</p>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="rounded-2xl p-6 border h-full" style={{ backgroundColor: '#FEFDFB', borderColor: '#E8E2D8' }}>
                  <div className="text-2xl mb-3">🤝</div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#3D3228' }}>Companion, not tool</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#9A8B7A' }}>The product should feel like a knowledgeable friend, conversational, empathetic, and always oriented toward the user's best interest.</p>
                </div>
              </Reveal>
              <Reveal delay={150}>
                <div className="rounded-2xl p-6 border h-full" style={{ backgroundColor: '#FEFDFB', borderColor: '#E8E2D8' }}>
                  <div className="text-2xl mb-3">⚖️</div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#3D3228' }}>DIY + Pro, not either/or</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#9A8B7A' }}>Never force a user down one path. Present both options with clear guidance on when each makes sense.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════
            9. KEY DESIGN DECISIONS
        ═══════════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto px-6 mb-32">
          <SectionLabel>Interactive prototype</SectionLabel>

          <Reveal>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#3D3228' }}>
              Final Solution
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
              The interactive prototype demonstrates the full Sahay experience, from onboarding through AI diagnosis, DIY guidance, and professional booking.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="w-full rounded-2xl overflow-hidden border" style={{ borderColor: '#E8E2D8', paddingBottom: '56.25%', position: 'relative' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/O67w4i0cTFg"
                title="Sahay Interactive Prototype"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Reveal>
        </section>


        <section className="max-w-4xl mx-auto px-6 mb-32">
          <SectionLabel>Key design decisions</SectionLabel>

          {/* Decision 1: Onboarding */}
          <Reveal>
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#3D3228' }}>Decision 01: Rethinking onboarding</h3>
              <div className="space-y-4 text-lg leading-relaxed" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
                <p>
                  Originally, we wanted to collect extensive homeowner information upfront, including home age, systems, past repairs, and appliance inventory. Testing revealed this created too much friction. Users abandoned or rushed through it.
                </p>
                <p>
                  A teammate flagged the friction first, and the team collectively decided to rethink the onboarding strategy. My contribution was designing the experience that supported this new direction: a lightweight onboarding flow that feeds into a MyHome dashboard, where AI synthesizes user inputs into a personalized home summary — reducing manual effort while preserving personalization.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="rounded-2xl p-5 border" style={{ backgroundColor: '#FEFDFB', borderColor: '#E8E2D8' }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: '#9A8B7A' }}>Before</p>
                  <p className="text-sm" style={{ color: '#9A8B7A' }}>Long questionnaire upfront → high drop-off</p>
                </div>
                <div className="rounded-2xl p-5 border" style={{ backgroundColor: 'rgba(143,160,136,0.06)', borderColor: '#8FA088' }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: '#8FA088' }}>After</p>
                  <p className="text-sm" style={{ color: '#9A8B7A' }}>Minimal input → AI-generated home summary → progressive detail</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Decision 2: MyHome Dashboard */}
          <Reveal>
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#3D3228' }}>Decision 02: MyHome dashboard</h3>
              <div className="space-y-4 text-lg leading-relaxed" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
                <p>
                  I designed the MyHome experience as a central hub that felt useful immediately, not a static profile page, but a personalized home companion. The dashboard surfaces relevant maintenance reminders, AI-generated insights about the home, and quick access to diagnosis.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                <ContributionTag>Designed by me</ContributionTag>
                <ContributionTag>Personalization strategy</ContributionTag>
                <ContributionTag>AI summary integration</ContributionTag>
              </div>
            </div>
          </Reveal>

          {/* Decision 3: AI Home Summary */}
          <Reveal>
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#3D3228' }}>Decision 03: AI-generated home summary</h3>
              <div className="space-y-4 text-lg leading-relaxed" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
                <p>
                  One of my key design contributions was introducing AI-generated home summaries. Instead of asking users to manually document everything, the system synthesizes onboarding data, past interactions, and home details into an intelligent overview.
                </p>
                <p>
                  Users consistently responded positively. Many participants identified this as one of the most valuable parts of the entire experience — not because the technology impressed them, but because it reduced the effort of staying on top of their home.
                </p>
              </div>
              <Reveal delay={50}>
                <div className="border-l-4 rounded-r-2xl p-6 my-8" style={{ backgroundColor: 'rgba(201,120,85,0.06)', borderColor: '#C97855' }}>
                  <p className="text-lg italic leading-relaxed" style={{ color: '#3D3228' }}>
                    "If I could just take a photo and get the maintenance schedule pulled out for me, I would actually follow it."
                  </p>
                  <p className="text-sm mt-3" style={{ color: '#9A8B7A' }}>— Usability testing participant</p>
                </div>
              </Reveal>
              <Reveal delay={75}>
                <p className="text-lg leading-relaxed" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
                  This validated the core idea: users don't resist home maintenance because they don't care. They resist it because the effort of tracking and understanding feels overwhelming. AI summaries removed that barrier.
                </p>
              </Reveal>
            </div>
          </Reveal>

          {/* Decision 4: DIY Experience: The Story */}
          <Reveal>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#3D3228' }}>Decision 04: Advocating for DIY guidance</h3>
              <div className="space-y-4 text-lg leading-relaxed" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
                <p>
                  This became one of the most important stories in the project.
                </p>
                <p>
                  Some team members questioned whether DIY support should remain in the product. During early user flow testing, participants initially focused more on diagnosis and service booking. There was internal pressure to simplify by removing it.
                </p>
                <p>
                  However, I believed DIY guidance was critical because it directly aligned with our core research findings: users want to understand and attempt simple fixes before hiring professionals. This wasn't a nice-to-have, it was foundational to the product's value proposition.
                </p>
                <p className="font-medium" style={{ color: '#3D3228' }}>
                  I advocated for keeping the feature. I designed the DIY experience. And I was right.
                </p>
                <p>
                  Later usability testing validated the decision. Participants consistently highlighted DIY support as one of the strongest and most differentiated features in the product.
                </p>
              </div>

              <Reveal delay={50}>
                <div className="border-l-4 rounded-r-2xl p-6 my-8" style={{ backgroundColor: 'rgba(143,160,136,0.06)', borderColor: '#8FA088' }}>
                  <p className="text-lg italic leading-relaxed" style={{ color: '#3D3228' }}>
                    "It's good that both DIY and professional help across multiple problems are integrated in the app together."
                  </p>
                  <p className="text-sm mt-3" style={{ color: '#9A8B7A' }}>— Usability testing participant</p>
                </div>
              </Reveal>

              <Callout variant="shift">
                This is an example of product judgment and research-driven decision making, trusting the data even when internal opinion pushed in a different direction.
              </Callout>
            </div>
          </Reveal>
        </section>


        {/* ═══════════════════════════════════════════
            10. MY CONTRIBUTIONS
        ═══════════════════════════════════════════ */}
        <section className="relative py-24 mb-32" style={{ backgroundColor: '#F5F0E8' }}>
          <div className="max-w-4xl mx-auto px-6">
            <SectionLabel>My contributions</SectionLabel>

            <Reveal>
              <h2 className="text-3xl font-bold mb-10" style={{ color: '#3D3228' }}>
                What I personally owned and drove.
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              <Reveal delay={50}>
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold" style={{ color: '#3D3228' }}>Strategy & Research</h3>
                  <ul className="space-y-3" style={{ color: '#9A8B7A' }}>
                    <li className="flex items-start gap-2"><span style={{ color: '#C97855' }}>→</span> Initiated the project from personal insight</li>
                    <li className="flex items-start gap-2"><span style={{ color: '#C97855' }}>→</span> Partnered with and assembled the team</li>
                    <li className="flex items-start gap-2"><span style={{ color: '#C97855' }}>→</span> Defined the research strategy</li>
                    <li className="flex items-start gap-2"><span style={{ color: '#C97855' }}>→</span> Conducted interviews and synthesis</li>
                    <li className="flex items-start gap-2"><span style={{ color: '#C97855' }}>→</span> Participated in product strategy decisions</li>
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold" style={{ color: '#3D3228' }}>Design & Validation</h3>
                  <ul className="space-y-3" style={{ color: '#9A8B7A' }}>
                    <li className="flex items-start gap-2"><span style={{ color: '#C97855' }}>→</span> Designed the onboarding experience</li>
                    <li className="flex items-start gap-2"><span style={{ color: '#C97855' }}>→</span> Designed the MyHome dashboard</li>
                    <li className="flex items-start gap-2"><span style={{ color: '#C97855' }}>→</span> Designed the AI home summary experience</li>
                    <li className="flex items-start gap-2"><span style={{ color: '#C97855' }}>→</span> Designed the DIY guidance experience</li>
                    <li className="flex items-start gap-2"><span style={{ color: '#C97855' }}>→</span> Validated information architecture</li>
                    <li className="flex items-start gap-2"><span style={{ color: '#C97855' }}>→</span> Mapped and validated user flows</li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════
            11. USABILITY TESTING RESULTS
        ═══════════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto px-6 mb-32">
          <SectionLabel>Usability testing</SectionLabel>

          <Reveal>
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#3D3228' }}>
              Users didn't call it a maintenance app.<br/>
              They called it a home partner.
            </h2>
          </Reveal>

          <Reveal delay={50}>
            <div className="space-y-4 text-lg leading-relaxed mb-10" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
              <p>
                Across testing sessions, participants responded positively to AI document summaries, the home maintenance log, conversational AI, and the integrated DIY + professional support model.
              </p>
              <p>
                But the most telling signal was language. Users consistently described Sahay as <strong style={{ color: '#3D3228' }}>"a smart home partner"</strong> instead of "a home maintenance app." That shift in language indicated we'd succeeded in creating something that felt genuinely different from existing solutions.
              </p>
            </div>
          </Reveal>

          <Reveal delay={75}>
            <div className="border-l-4 rounded-r-2xl p-6 my-8" style={{ backgroundColor: 'rgba(143,160,136,0.06)', borderColor: '#8FA088' }}>
              <p className="text-lg italic leading-relaxed" style={{ color: '#3D3228' }}>
                "This is probably the feature I would use most consistently."
              </p>
              <p className="text-sm mt-3" style={{ color: '#9A8B7A' }}>— Usability testing participant, referring to the AI home companion experience</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-lg leading-relaxed mb-10" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
              This kind of response — describing sustained, long-term engagement rather than one-time utility — confirmed that our product direction was sound. Users weren't just impressed by a feature demo. They were imagining a relationship with the product.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'AI document summaries',
                'Home maintenance log',
                'Conversational AI diagnosis',
                'Integrated DIY + professional support',
                'AI-generated home summary',
                'Problem-first navigation',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl px-5 py-3 border" style={{ backgroundColor: 'rgba(143,160,136,0.06)', borderColor: 'rgba(143,160,136,0.3)' }}>
                  <span style={{ color: '#8FA088' }}>✓</span>
                  <span className="text-sm" style={{ color: '#3D3228' }}>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <PullQuote>
            Users weren't responding to what the AI could do. They were responding to what the product promised to be.
          </PullQuote>
        </section>


        {/* ═══════════════════════════════════════════
            12. REFLECTION
        ═══════════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto px-6 mb-32">
          <SectionLabel>Reflection</SectionLabel>

          <Reveal>
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#3D3228' }}>
              What I learned about AI product design.
            </h2>
          </Reveal>

          <Reveal delay={50}>
            <div className="space-y-6 text-lg leading-relaxed" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
              <p>
                One of the most surprising learnings was that users perceived Sahay as a home companion, not a maintenance platform. They were responding to the broader vision of the product rather than the actual AI capabilities.
              </p>
              <p>
                Since we were building a prototype, we couldn't create a fully functional AI model. As a result, the AI experience didn't fully deliver on the intelligence implied by the concept. This taught me something critical:
              </p>
            </div>
          </Reveal>

          <Callout variant="insight">
            AI products are evaluated based on the quality of the AI interaction itself, not just the surrounding interface. The promise must match the delivery.
          </Callout>

          <Reveal delay={100}>
            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-6" style={{ color: '#3D3228' }}>If I continued this project, I would:</h3>
              <ul className="space-y-3" style={{ maxWidth: '60ch', color: '#9A8B7A' }}>
                <li className="flex items-start gap-3"><span style={{ color: '#B5A89A' }}>01</span> Conduct deeper validation of AI trust patterns</li>
                <li className="flex items-start gap-3"><span style={{ color: '#B5A89A' }}>02</span> Test how users respond when AI is wrong vs. uncertain</li>
                <li className="flex items-start gap-3"><span style={{ color: '#B5A89A' }}>03</span> Build more realistic AI prototypes with LLM integration</li>
                <li className="flex items-start gap-3"><span style={{ color: '#B5A89A' }}>04</span> Explore trust calibration: when should AI express confidence vs. uncertainty?</li>
                <li className="flex items-start gap-3"><span style={{ color: '#B5A89A' }}>05</span> Continue refining the home companion vision with longitudinal testing</li>
              </ul>
            </div>
          </Reveal>
        </section>


        {/* ═══════════════════════════════════════════
            13. KEY TAKEAWAYS
        ═══════════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto px-6 mb-32">
          <Reveal>
            <div className="rounded-3xl p-10 md:p-14" style={{ backgroundColor: '#3D3228' }}>
              <h2 className="text-2xl font-bold text-white mb-8">Why this project matters</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold mb-2" style={{ color: '#C97855' }}>Product thinking</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#B5A89A' }}>Reframed the entire product direction based on research, from marketplace to companion. Didn't just execute, challenged the brief.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2" style={{ color: '#C97855' }}>Research-driven decisions</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#B5A89A' }}>Advocated for DIY guidance against internal pressure. Was later validated by usability testing. Trusted the data over opinions.</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold mb-2" style={{ color: '#C97855' }}>AI product design</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#B5A89A' }}>Explored conversational AI as a core interaction model. Learned that AI products are judged by the quality of the intelligence, not just the UI.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2" style={{ color: '#C97855' }}>Strategic initiative</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#B5A89A' }}>Identified the opportunity, partnered with the team, drove research, and designed key experiences. Ownership from concept to validation.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>


        {/* ═══════════════════════════════════════════
            NAVIGATION
        ═══════════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="border-t pt-12 flex justify-between items-center" style={{ borderColor: '#E8E2D8' }}>
              <Link to="/#work" className="group inline-flex items-center gap-2 transition-colors" style={{ color: '#9A8B7A' }}>
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                All projects
              </Link>
              <Link to="/about" className="group inline-flex items-center gap-2 transition-colors" style={{ color: '#9A8B7A' }}>
                About me
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default SahayCaseStudy
