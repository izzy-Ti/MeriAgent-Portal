import { useEffect, useState, useRef } from 'react'
import { motion } from 'motion/react'
import emailjs from '@emailjs/browser'
import HeroScene from './HeroScene'
import AgentWorkflow from './AgentWorkflow'
import './erp.css'

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY || 'Y1gPLMfpYuU9kXcoi'
const EMAILJS_SERVICE_ID = import.meta.env.VITE_SERVICE_ID || 'service_atiyidj'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID || 'template_mcyr4m8'

/* ── User SquishyCard component (exact as provided) ── */
export const SquishyCard = () => {
  return (
    <section className="bg-neutral-900 px-4 py-12">
      <div className="mx-auto w-fit">
        <Card />
      </div>
    </section>
  );
};

export const Card = ({
  tag = 'Pro',
  title = (
    <>
      $299/
      <br />
      Month
    </>
  ),
  desc = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, rem.',
  cta = 'Request Demo',
  onAction,
}) => {
  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 1,
        ease: 'backInOut',
      }}
      variants={{
        hover: {
          scale: 1.03,
        },
      }}
      className="benefit-card relative overflow-hidden rounded-lg bg-[#161224] border border-purple-900/30 p-6"
    >
      <div className="benefit-card-copy relative z-10 text-white">
        <span className="mb-3 block w-fit rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-purple-200 border border-purple-400/20">
          {tag}
        </span>
        <motion.span
          initial={{ scale: 0.85 }}
          variants={{
            hover: {
              scale: 1,
            },
          }}
          transition={{
            duration: 1,
            ease: 'backInOut',
          }}
          className="benefit-card-title my-2 block origin-top-left font-mono font-black"
        >
          {title}
        </motion.span>
        <p className="text-sm text-neutral-300 leading-relaxed">
          {desc}
        </p>
      </div>
      <button
        type="button"
        onClick={onAction}
        className="benefit-card-cta relative z-20 rounded-md border border-white bg-white py-2.5 text-center font-mono text-xs font-bold uppercase text-neutral-950 transition-colors hover:bg-neutral-100 cursor-pointer shadow-sm"
      >
        {cta}
      </button>
      <Background />
    </motion.div>
  );
};

export const Background = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: 'backInOut',
      }}
    >
      <motion.circle
        variants={{
          hover: {
            scaleY: 0.5,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: 'backInOut',
          delay: 0.2,
        }}
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill="#262626"
      />
      <motion.ellipse
        variants={{
          hover: {
            scaleY: 2.25,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: 'backInOut',
          delay: 0.2,
        }}
        cx="160.5"
        cy="265.5"
        rx="101.5"
        ry="43.5"
        fill="#262626"
      />
    </motion.svg>
  );
};




const SLIDES = [
  { word: 'FEWER MANAGERS.', wordAm: 'ያነሱ አስተዳዳሪዎች።', sub: 'AI AGENTS TAKE ON THE MANAGEMENT WORK.', subAm: 'የAI ወኪሎች የአስተዳደር ስራን ይወስዳሉ።', tag: '01 / 04 · LEANER MANAGEMENT' },
  { word: 'YOUR ERP. WITH AI.', wordAm: 'የእርስዎ ERP ከAI ጋር።', sub: 'ODOO AT THE CORE. MERIAGENT IN COMMAND.', subAm: 'በእያንዳንዱ ቆይታ የገቢ እድሎችን ያግኙ', tag: '02 / 04 · ONE CONNECTED BUSINESS' },
  { word: 'AI RUNS THE ROUTINE.', wordAm: 'AI መደበኛ ስራዎችን ያከናውናል።', sub: 'REPLACE REPETITIVE ADMIN ROLES WITH AI AGENTS.', subAm: 'ለቡድንዎ ግልጽ የስራ ቀን ይስጡ', tag: '03 / 04 · LOWER STAFFING OVERHEAD' },
  { word: 'HOTELS. REAL ESTATE.', wordAm: 'ሆቴሎች። ሪል እስቴት።', sub: 'ONE ERP. AN AI MANAGEMENT TEAM.', subAm: 'ዝግጁ ክፍሎች። ፈጣን ምላሽ። ደስተኛ እንግዶች።', tag: '04 / 04 · HOSPITALITY + REAL ESTATE' },
]

const PILLARS = [
  {
    num: '01',
    en: {
      tag: '01 · Odoo ERP',
      title: <>One ERP.<br />All operations.</>,
      desc: 'Connect hotels, resorts, and real estate on Odoo: reservations, leasing, rent collection, finance, purchasing, HR, and maintenance.',
    },
    am: {
      tag: 'መሪ · 01',
      title: <>የቀኑን<br />ሁኔታ ይወቁ</>,
      desc: 'ቦታ ማስያዝ፣ ክፍሎች እና ትኩረት የሚፈልጉ ስራዎችን በግልጽ ይመልከቱ። መረጃ ከመሰብሰብ ይልቅ ለአመራር ጊዜ ይስጡ።',
    },
  },
  {
    num: '02',
    en: {
      tag: '02 · Your AI team',
      title: <>Add AI.<br />Cut busywork.</>,
      desc: 'Let AI agents handle bookings, property inquiries, tenant requests, payment checks, voice reception, and everyday follow-up.',
    },
    am: {
      tag: 'መሪ · 02',
      title: <>ጊዜ<br />ይቆጥቡ</>,
      desc: 'በግልጽ ቅድሚያ ጽዳትና ጥገናን ያቀናጁ። ቡድንዎ መረጃ ከመፈለግ ይልቅ ለእንግዶች አገልግሎት ጊዜ ይስጥ።',
    },
  },
  {
    num: '03',
    en: {
      tag: '03 · Leaner management',
      title: <>Fewer roles.<br />More control.</>,
      desc: 'Replace routine management roles with AI. Define agent responsibilities, retain owner oversight, and approve sensitive actions.',
    },
    am: {
      tag: 'መሪ · 03',
      title: <>ቁጥጥር<br />ይያዙ</>,
      desc: 'ምክሮችን ወደ ውሳኔ ይቀይሩ፤ አስፈላጊ ለውጦች በእርስዎ እጅ ይቆዩ። ቡድንዎ አቅጣጫ ያገኛል፣ የመጨረሻው ውሳኔ የእርስዎ ነው።',
    },
  },
]

const SPECIALISTS = [
  {
    "idx": "01",
    "en": {
      "name": "Bookings, leasing & experience",
      "impact": "Every stay. Every lease.",
      "tags": [
        "Manage reservations, listings, and property inquiries",
        "Follow through on guest and tenant requests",
        "Schedule viewings and follow up on lease renewals"
      ]
    },
    "am": {
      "name": "Bookings, leasing & experience",
      "impact": "Every stay. Every lease.",
      "tags": [
        "Manage reservations, listings, and property inquiries",
        "Follow through on guest and tenant requests",
        "Schedule viewings and follow up on lease renewals"
      ]
    }
  },
  {
    "idx": "02",
    "en": {
      "name": "Revenue & business growth",
      "impact": "More opportunities",
      "tags": [
        "Review pricing and demand",
        "Support corporate sales and website content",
        "Follow up on property leads and leasing opportunities"
      ]
    },
    "am": {
      "name": "Revenue & business growth",
      "impact": "More opportunities",
      "tags": [
        "Review pricing and demand",
        "Support corporate sales and website content",
        "Follow up on property leads and leasing opportunities"
      ]
    }
  },
  {
    "idx": "03",
    "en": {
      "name": "Payments & financial control",
      "impact": "Clearer finances",
      "tags": [
        "Reconcile booking payments, rent, and deposits",
        "Track costs and financial exceptions",
        "Prepare executive reports"
      ]
    },
    "am": {
      "name": "Payments & financial control",
      "impact": "Clearer finances",
      "tags": [
        "Reconcile booking payments, rent, and deposits",
        "Track costs and financial exceptions",
        "Prepare executive reports"
      ]
    }
  },
  {
    "idx": "04",
    "en": {
      "name": "Property operations & supplies",
      "impact": "Smoother days",
      "tags": [
        "Coordinate housekeeping, repairs, and tenant maintenance",
        "Track purchasing and inventory",
        "Follow up across departments"
      ]
    },
    "am": {
      "name": "Property operations & supplies",
      "impact": "Smoother days",
      "tags": [
        "Coordinate housekeeping, repairs, and tenant maintenance",
        "Track purchasing and inventory",
        "Follow up across departments"
      ]
    }
  },
  { idx: '05', en: { name: 'Voice reception', impact: 'Every call answered', tags: ['Answer guest and tenant calls', 'Handle availability and property inquiries', 'Route requests to the right team'] }, am: { name: 'Voice reception', impact: 'Every call answered', tags: ['Answer guest and tenant calls', 'Handle availability and property inquiries', 'Route requests to the right team'] } }
]

const BRIEF_CARDS = [
  {
    id: 'occupancy',
    accent: false,
    en: {
      title: '91.3% Occupancy',
      desc: '84 of 92 suites reserved tonight. 8 open rooms held for peak walk-in yield capture before late check-in.',
    },
    am: {
      title: '91.3% የክፍል ሙሌት',
      desc: 'ከ92 ክፍሎች 84ቱ ዛሬ ማታ ተይዘዋል። የቀሩት 8 ክፍሎች ከፍተኛ ዋጋ ላላቸው እንግዶች ተመድበዋል።',
    },
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--purple-glow)]">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    id: 'yield',
    accent: true,
    isAction: true,
    en: {
      title: 'A Better Weekend Rate',
      desc: 'A busy weekend creates a pricing opportunity. Review a suggested +4,500 ETB rate change before deciding whether to approve it.',
    },
    am: {
      title: '+4,500 ብር ተለዋዋጭ ዋጋ',
      desc: 'ብዙ እንግዶች በሚመጡበት የሳምንቱ መጨረሻ የዋጋ እድል አለ። የ+4,500 ብር የዋጋ ለውጥ ምክር ከማጽደቅዎ በፊት ይገምግሙ።',
    },
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    ),
  },
  {
    id: 'engineering',
    accent: false,
    en: {
      title: 'A Room Ready Again',
      desc: 'A reported AC issue is assigned to maintenance and marked resolved before check-in. The front desk can see the update without another call.',
    },
    am: {
      title: 'የ3ኛ ወለል ኤሲ ተስተካክሏል',
      desc: 'የተዘገበው የኤሲ ችግር ለጥገና ቡድኑ ተመድቦ እንግዳው ከመግባቱ በፊት ተፈትቷል። የፊት ዴስክ ቡድኑ ያለ ተጨማሪ ጥሪ ለውጡን ያያል።',
    },
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--purple-glow)]">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    id: 'housekeeping',
    accent: false,
    en: {
      title: '22 Min / Room Turn',
      desc: 'Housekeeping sequence synchronized to early 02:00 PM VIP arrivals. All 84 reserved suites on track.',
    },
    am: {
      title: '22 ደቂቃ በክፍል',
      desc: 'ለቀኑ የክፍል ጽዳት ቅድሚያ የሚሰጣቸው ክፍሎች ከቀኑ 8፡00 ሰዓት VIP እንግዶች መምጫ ጋር ተስተካክለዋል።',
    },
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--purple-glow)]">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: 'synthesis',
    accent: false,
    en: {
      title: 'One Mind On Desk',
      desc: 'Front desk, housekeeping, and engineering synthesized into one plain-language brief on your desk every morning.',
    },
    am: {
      title: 'አንድ ጠቅላይ ማጠቃለያ',
      desc: 'በየዕለቱ የሆቴሉን ሙሉ ሁኔታ የሚያጠቃልል አንድ ድምፅ። አምስት የተለያዩ ሲስተሞችን መፈተሽ ቀረ።',
    },
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--purple-glow)]">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
]

export default function App() {
  const [lang, setLang] = useState(() => new URLSearchParams(window.location.search).get('lang') === 'am' ? 'am' : 'en')
  const [activeSlide, setActiveSlide] = useState(0)
  const [slidesPaused, setSlidesPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [approved, setApproved] = useState(false)
  const [clock, setClock] = useState('')
  const [pageLoaded, setPageLoaded] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', hotel: '', note: '' })
  const [openSpec, setOpenSpec] = useState('01')
  const containerRef = useRef(null)
  const briefTrackRef = useRef(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDemoSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = new FormData(e.currentTarget)
    const name = form.get('name') || ''
    const phone = form.get('phone') || ''
    const hotel = form.get('hotel') || ''
    const email = form.get('email') || ''
    const note = form.get('note') || ''

    setFormData({ name, phone, hotel, email, note })

    // Exact variable names matching the EmailJS template: {{name}}, {{phone}}, {{Property}}, {{email}}, {{message}}
    const templateParams = {
      name: name,
      phone: phone,
      Property: hotel,
      property: hotel,
      hotel: hotel,
      email: email || 'israelashenafi29@gmail.com',
      message: note ? note : `Client requested a demo for ${hotel}`,
      user_name: name,
      user_phone: phone,
      note: note,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    }

    try {
      const res = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )
      console.log('EmailJS response:', res)
    } catch (err) {
      console.error('EmailJS error:', err)
    } finally {
      setIsSubmitting(false)
      setFormSubmitted(true)
    }
  }

  const scrollBrief = (dir) => {
    const el = briefTrackRef.current
    if (!el) return
    const cardEl = el.querySelector('.brief-card-item')
    const step = cardEl ? cardEl.offsetWidth + 24 : 384
    if (dir === 'left') {
      if (el.scrollLeft <= 15) {
        el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: -step, behavior: 'smooth' })
      }
    } else {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 25) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' })
      }
    }
  }

  // Page load animation trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true)
    }, 60)
    return () => clearTimeout(timer)
  }, [])

  // Clock in Addis Ababa
  useEffect(() => {
    const update = () => {
      try {
        const time = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Addis_Ababa',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date())
        setClock(time)
      } catch {
        setClock('07:00')
      }
    }
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [])

  // Scroll reveal observer for under-page flow
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.01 }
    )

    const sections = document.querySelectorAll('.flow-section')
    sections.forEach((sec) => observer.observe(sec))

    return () => observer.disconnect()
  }, [])

  // Show scroll-to-top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function prevSlide() {
    setActiveSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))
  }

  function nextSlide() {
    setActiveSlide((prev) => (prev + 1) % SLIDES.length)
  }

  // Consistent, regular automatic slideshow (8.2s cadence)
  useEffect(() => {
    if (slidesPaused) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length)
    }, 8200)
    return () => clearInterval(timer)
  }, [activeSlide, slidesPaused])

  const slide = SLIDES[activeSlide]

  return (
    <div ref={containerRef} className={`site-wrapper ${pageLoaded ? 'loaded' : 'pre-load'}`}>
      {/* ——— CINEMATIC HERO STAGE WITH AUTO-SLIDESHOW & LOAD ANIMATIONS ——— */}
      <section className="cinematic-hero" id="top">
        <HeroScene activeSlide={activeSlide} />
        <div className="sculpture-vignette" />

        {/* Minimalist Top Navigation */}
        <header className="cinematic-nav nav-anim-target">
          <a href="#top" className="brand-logo-link" title="መሪAgent — Hospitality & Real Estate ERP + AI">
            <img src="/logo.png" alt="መሪAgent Hospitality & Real Estate ERP + AI Logo" className="brand-header-logo" width="140" height="38" />
          </a>

          <nav className="nav-center-links" aria-label="Main navigation">
            <a href="#philosophy" className="nav-link-cinematic">
              {lang === 'am' ? 'ጥቅሞች' : 'Benefits'}
            </a>
            <a href="#briefing" className="nav-link-cinematic">
              {lang === 'am' ? 'ማጠቃለያ' : 'Briefing'}
            </a>
            <a href="#specialists" className="nav-link-cinematic">
              {lang === 'am' ? 'ለሆቴልዎ' : 'AI agents'}
            </a>
            <a href="#shift" className="nav-link-cinematic">
              {lang === 'am' ? 'ለውጥ' : 'The Shift'}
            </a>
            <a href="#contact" className="nav-link-cinematic">
              {lang === 'am' ? 'ዴሞ ይጠይቁ' : 'Request Demo'}
            </a>
          </nav>

          <div className="nav-right-actions">
            <a href={`/docs/${lang === 'am' ? '?lang=am' : ''}`} className="nav-link-cinematic docs-nav-link">Docs</a>


            <button
              type="button"
              className="lang-toggle-btn"
              onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
            >
              {lang === 'en' ? 'አማርኛ' : 'EN'}
            </button>

            <span className="text-[11px] font-mono text-[var(--text-dim)] hidden sm:inline">
              {clock} EAT
            </span>
          </div>
        </header>

        {/* Circular Edge Navigation Buttons */}
        <button
          type="button"
          className="arrow-nav-btn left nav-anim-target"
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          ‹
        </button>

        <button
          type="button"
          className="arrow-nav-btn right nav-anim-target"
          onClick={nextSlide}
          aria-label="Next Slide"
        >
          ›
        </button>

        {/* Centerpiece Headline with Flow Animations on Load and Change */}
        <div className="cinematic-center">
          <div key={activeSlide} className="slide-content-anim">
            <p className="hero-eyebrow">{lang === 'am' ? 'መሪAgent · የሆቴልና ሪዞርት ERP · Odoo + AI' : 'Hotels, resorts & real estate · One ERP. One AI team.'}</p>
            <h1 className="hero-giant-word">
              {lang === 'am' ? slide.wordAm : slide.word}
            </h1>

            <div className="hero-fine-rule" />

            <p className="hero-sub-tracked">
              {lang === 'am' ? slide.subAm : slide.sub}
            </p>

            <p className="hero-description">{lang === 'am' ? 'በOdoo ላይ የተመሠረተ የሆቴልና ሪዞርት ስርዓት፣ ቦታ ማስያዝ፣ የእንግዳ አገልግሎት፣ ፋይናንስና ዕለታዊ ስራዎችን ከሚያከናውኑ የAI ወኪሎች ጋር። መደበኛ የአስተዳደርና የሰራተኛ ሚናዎችን በAI በመተካት ወጪን ይቀንሱ።' : 'Run your hotel, resort, or real estate business with AI agents across bookings, leasing, voice reception, finance, and property operations. Keep guests, tenants, and teams connected in one ERP.'}</p>
            <button
              type="button"
              className="hero-pill-btn cursor-pointer"
              onClick={scrollToContact}
            >
              <span>{lang === 'am' ? 'ዴሞ ይጠይቁ' : 'Request Demo'}</span>
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>

        {/* Bottom Pagination & Scroll Cue */}
        <div className="cinematic-footer-bar nav-anim-target">
          <div className="slide-tag-mono">{slide.tag}</div>

          <div className="dots-pagination">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`dot-btn ${i === activeSlide ? 'active' : ''}`}
                onClick={() => setActiveSlide(i)}
                aria-label={`Slide ${i + 1}`}
                aria-pressed={i === activeSlide}
              />
            ))}
            <button type="button" className="slideshow-pause" onClick={() => setSlidesPaused(!slidesPaused)} aria-label={slidesPaused ? 'Play hero slideshow' : 'Pause hero slideshow'}>
              {slidesPaused ? '▶' : 'Ⅱ'}
            </button>
          </div>

          <a href="#philosophy" className="scroll-cue">
            <span>{lang === 'am' ? 'ወደ ታች' : 'EXPLORE'}</span>
            <span>↓</span>
          </a>
        </div>
      </section>

      {/* ——— CHAPTER 01: THE EXECUTIVE LAYER (FLOWS WITH HERO) ——— */}
      <section className="flow-section" id="philosophy">
        <div className="flow-kicker">01 / WHY MERIAGENT</div>

        <h2 className="flow-giant-title">
          {lang === 'am' ? (
            <>
              አንድ ድምፅ። <br />
              <em>ሙሉ ቁጥጥር።</em>
            </>
          ) : (
            <>
              AN ERP FOUNDATION. <br />
              <em>AN AI MANAGEMENT TEAM.</em>
            </>
          )}
        </h2>

        <div className="flow-fine-rule" />

        <p className="flow-lead">
          {lang === 'am'
            ? 'አምስት የተለያዩ ሲስተሞችን ከመፈተሽ ይልቅ በየዕለቱ የሆቴሉን ሙሉ ሁኔታ የሚያጠቃልል አንድ ድምፅ።'
            : 'Bring your whole property together, from bookings and property inquiries to leases and payments. Built on Odoo, MeriAgent gives you a connected business system and a team of AI agents that handle everyday work across departments.'}
        </p>

        {/* Squishy animated pillar cards */}
        <div className="pillars-flow-grid">
          {PILLARS.map((p) => (
            <Card
              key={p.num}
              tag={p[lang].tag || 'Pro'}
              title={p[lang].title}
              desc={p[lang].desc}
              cta={lang === 'am' ? 'ዴሞ ይጠይቁ' : 'Request Demo'}
              onAction={scrollToContact}
            />
          ))}
        </div>

        <div className="erp-architecture" aria-label="Odoo and AI architecture">
<div className="erp-foundation"><span className="erp-label">01 / YOUR CONNECTED BUSINESS</span><h3>Odoo ERP</h3><p>Reservations, leases, rent, finances, supplies, and maintenance in one place.</p></div>
<div className="erp-connector" aria-hidden="true">↑</div>
<div className="erp-agents"><span className="erp-label">02 / YOUR AI TEAM</span><h3>Specialist agents. Working together.</h3><p>From filling rooms and scheduling viewings to answering calls, following up on rent, and coordinating repairs, AI agents work across your properties.</p></div>
<div className="erp-outcome"><span className="erp-label">THE BUSINESS CASE</span><strong>Replace routine employee roles with AI. Reduce management headcount and payroll overhead.</strong><p>Automate defined responsibilities while the owner retains control over sensitive decisions.</p></div>
</div>
      </section>

      <AgentWorkflow />

      {/* ——— CHAPTER 02: THE 07:00 AM BRIEF (COMPONENT FROM IMAGE IN BLACK & PURPLE) ——— */}
      <section className="flow-section" id="briefing">
        <div className="brief-header-row">
          <div>
            <div className="flow-kicker">02 / A DAY WITH MERIAGENT</div>
            <h2 className="brief-title-headline">
              {lang === 'am' ? (
                <>
                  ከጠዋቱ 1፡00 ሰዓት። <span className="muted">የሆቴሉ እይታ።</span>
                </>
              ) : (
                <>
                  THE 07:00 AM BRIEF. <span className="muted">ON YOUR DESK.</span>
                </>
              )}
            </h2>
          </div>

          <div className="brief-nav-btns">
            <button
              type="button"
              onClick={() => scrollBrief('left')}
              className="brief-nav-btn"
              aria-label="Previous brief card"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollBrief('right')}
              className="brief-nav-btn"
              aria-label="Next brief card"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        <p className="brief-example-note">{lang === 'am' ? 'የምሳሌ ማጠቃለያ · ቁጥሮቹ እና እርምጃዎቹ ማሳያ ብቻ ናቸው።' : 'Illustrative product walkthrough · Sample figures and actions, showing what a clearer day could look like.'}</p>
        {/* Horizontal Cards Carousel Track */}
        <div className="brief-cards-track" ref={briefTrackRef}>
          {BRIEF_CARDS.map((card) => (
            <div
              key={card.id}
              className={`brief-card-item ${card.accent ? 'accent' : 'dark'}`}
            >
              <div className="brief-card-top">
                <h3 className="brief-card-heading">
                  {card[lang].title}
                </h3>
                <div className="brief-card-icon-box">
                  {card.icon}
                </div>
              </div>

              <div className="brief-card-bottom">
                <p className="brief-card-desc">
                  {card[lang].desc}
                </p>

                {card.isAction && (
                  <div className="brief-action-slot">
                    <button
                      type="button"
                      onClick={() => setApproved(!approved)}
                      className={`brief-interactive-btn ${approved ? 'approved' : ''}`}
                    >
                      {approved
                        ? (lang === 'am' ? 'ጸድቋል ✓' : 'Demo approved ✓')
                        : (lang === 'am' ? '+4,500 ብር አጽድቅ' : 'Authorize +4,500 ETB')}
                    </button>
                    <span className="brief-clock-tag">
                      07:00 EAT · Demo
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ——— CHAPTER 03: AGENTS ACROSS YOUR PROPERTY (STREAMLINED FLOW) ——— */}
      <section className="flow-section" id="specialists">
        <div className="flow-kicker">03 / YOUR AI MANAGEMENT TEAM</div>

        <h2 className="flow-giant-title">
          {lang === 'am' ? (
            <>እያንዳንዱ ቡድን። <em>የተሻለ ቀን።</em></>
          ) : (
            <>REAL ROLES. <em>AI AGENTS.</em></>
          )}
        </h2>

        <div className="flow-fine-rule" />

        <p className="flow-lead">
          {lang === 'am'
            ? 'ከመጀመሪያው ቦታ ማስያዝ እስከ መጨረሻው ክፍያ ድረስ ለእያንዳንዱ ክፍል ግልጽ የስራ መንገድ ይስጡ።'
            : 'A connected team of AI agents works across your business, handling recurring responsibilities that otherwise need extra staff. From reservations and lease renewals to rent follow-up, maintenance, and owner reports, choose the support your hotel or real estate portfolio needs.'}
        </p>

        {/* 7 Clean High-Impact Specialists Accordion */}
        <div className="spec-accordion-list">
          {SPECIALISTS.map((s) => {
            const isOpen = openSpec === s.idx
            return (
              <div
                key={s.idx}
                className={`spec-accordion-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="spec-accordion-header"
                  onClick={() => setOpenSpec(isOpen ? null : s.idx)}
                  aria-expanded={isOpen}
                >
                  <div className="spec-header-left">
                    <span className="spec-item-num">{s.idx}</span>
                    <h3 className="spec-item-title">{s[lang].name}</h3>
                  </div>

                  <div className="spec-header-right">
                    <span className="spec-impact-pill">{s[lang].impact}</span>
                    <span className={`spec-toggle-box ${isOpen ? 'open' : ''}`}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="spec-toggle-icon"
                      >
                        <path
                          d="M7 1V13M1 7H13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="spec-accordion-body"
                  >
                    <div className="spec-tags-track">
                      {s[lang].tags?.map((tag, tIdx) => (
                        <span key={tIdx} className="spec-tag-chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ——— CHAPTER 04: THE OPERATIONAL SHIFT (CONTRAST & CLARITY) ——— */}
      <section className="flow-section" id="shift">
        <div className="flow-kicker">04 / THE SHIFT</div>

        <h2 className="flow-giant-title">
          {lang === 'am' ? (
            <>የቀድሞው አሰራር vs <em>መሪAgent።</em></>
          ) : (
            <>LESS OVERHEAD. <em>MORE AI.</em></>
          )}
        </h2>

        <div className="flow-fine-rule" />

        <div className="shift-flow-grid">
          <div className="shift-flow-panel old">
            <div className="shift-badge-mono">
              {lang === 'am' ? 'የቀድሞው አሰራር' : 'THE OLD WAY'}
            </div>
            <h3 className="shift-heading">
              {lang === 'am' ? 'የተበታተነ እና የዘገየ' : 'More systems. More management overhead.'}
            </h3>
            <ul className="shift-clean-list">
              {(lang === 'am'
                ? [
                  'በPMS፣ POS እና የሽያጭ ሲስተሞች 5 የተከፋፈሉ አካውንቶች',
                  'በዋትስአፕ እና ስልክ ሱፐርቫይዘሮችን ማሳደድ',
                  'የጥገና ብልሽቶች የሚታወቁት እንግዶች ሲያማርሩ ብቻ',
                  'ያልተስተካከሉ የሳምንቱ መጨረሻ ዋጋዎች የገቢ ኪሳራ ያስከትላሉ',
                ]
                : [
                  'Disconnected systems and duplicate data entry',
                  'Management time spent collecting updates and chasing staff',
                  'Separate employees preparing recurring reports and schedules',
                  'More administrative headcount as the property grows',
                ]
              ).map((text, idx) => (
                <li key={idx} className="shift-list-item">
                  <span className="shift-bullet">—</span>
                  <span className="shift-text">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="shift-flow-panel new">
            <div className="shift-badge-mono active">
              {lang === 'am' ? 'ከመሪAGENT ጋር' : 'WITH መሪAGENT'}
            </div>
            <h3 className="shift-heading">
              {lang === 'am' ? 'አንድ የስራ አመራር ዴስክ' : 'One ERP. Fewer management roles.'}
            </h3>
            <ul className="shift-clean-list">
              {(lang === 'am'
                ? [
                  'የጠዋት 1፡00 ሰዓት ግልጽና አጭር ማጠቃለያ በዴስክዎ ላይ',
                  'የክፍል ጽዳት እንደ እንግዶች መግቢያ ሰዓት በራስ-ሰር ቅድሚያ ይሰጠዋል',
                  'የጥገና ስራዎች ከምደባ እስከ መፍትሄ ይከታተላሉ',
                  'የዋጋ ምክሮች በአስተዳዳሪው ቁጥጥር ይገመገማሉ',
                ]
                : [
                  'Odoo connects operational and financial records',
                  'AI agents turn bookings, leases, rent, and property activity into clear owner reports',
                  'Specialist agents coordinate guest and tenant requests, maintenance, purchasing, and follow-up',
                  'Replace routine employee roles with AI to reduce payroll overhead',
                ]
              ).map((text, idx) => (
                <li key={idx} className="shift-list-item">
                  <span className="shift-bullet">✓</span>
                  <span className="shift-text">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ——— CHAPTER 05: FOUNDER ACCESS (BOLD & DIRECT) ——— */}
      <section className="flow-section" id="contact">
        <div className="flow-kicker">05 / DIRECT ACCESS</div>

        <h2 className="flow-giant-title">
          {lang === 'am' ? (
            <>ሆቴልዎ <em>ምን ሊያገኝ እንደሚችል ይዩ።</em></>
          ) : (
            <>BUILD YOUR LEANER <em>AI-RUN OPERATION.</em></>
          )}
        </h2>

        <div className="flow-fine-rule" />

        <p className="flow-lead">
          {lang === 'am'
            ? 'ስለ ሆቴልዎ ይንገሩን። MeriAgent ጊዜ ለመቆጠብ፣ አገልግሎትን ለማሻሻል እና የገቢ እድሎችን ለመለየት እንዴት እንደሚረዳ እናሳይዎታለን።'
            : 'Tell us about your hotel, resort, or real estate business and the work taking up your team’s day. We will show you how a connected system and AI agents can handle recurring responsibilities, reduce staffing costs, and support the services you sell.'}
        </p>

        <div className="contact-flow-grid">
          <div className="contact-main-card">
            {formSubmitted ? (
              <div className="contact-success-state">
                <div className="contact-success-badge">
                  <span>✓</span>
                  <span>{lang === 'am' ? 'ጥያቄዎ ደርሶናል' : 'Demo Request Received'}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-['Outfit']">
                  {lang === 'am' ? 'እናመሰግናለን! በቅርቡ እንደውላለን።' : 'We will call you shortly.'}
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                  {lang === 'am' ? (
                    <>
                      ስለ <span className="text-white font-semibold">{formData.hotel || 'ሆቴልዎ'}</span> አሰራር ለመነጋገር በ{' '}
                      <span className="text-[var(--purple-glow)] font-mono font-bold">{formData.phone}</span> እንደውልልዎታለን።
                    </>
                  ) : (
                    <>
                      Our team will call you directly at{' '}
                      <span className="text-[var(--purple-glow)] font-mono font-bold">{formData.phone}</span> to discuss how መሪAgent manages{' '}
                      <span className="text-white font-semibold">{formData.hotel || 'your property'}</span>.
                    </>
                  )}
                </p>

                <div className="flex flex-wrap gap-3 mt-2">
                  <a
                    href="tel:+251992013392"
                    className="hero-pill-btn !py-2.5 !px-5 !text-xs"
                  >
                    <span>{lang === 'am' ? 'አሁኑኑ በቀጥታ ይደውሉ' : 'Call Founders Directly'}</span>
                    <span className="ml-1.5">↗</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs text-zinc-400 hover:text-white underline underline-offset-4 px-2 cursor-pointer"
                  >
                    {lang === 'am' ? 'ሌላ ጥያቄ ያስገቡ' : 'Submit another request'}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-[11px] font-mono font-bold tracking-widest text-[var(--purple-accent)] uppercase mb-2">
                  {lang === 'am' ? 'ቀጥተኛ የዴሞ ጥያቄ' : 'DIRECT DEMO REQUEST'}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-['Outfit']">
                  {lang === 'am' ? 'ዴሞ ይጠይቁ' : 'Request a Demo'}
                </h3>
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                  {lang === 'am'
                    ? 'ስልክ ቁጥርዎን እና የሆቴልዎን ስም ይተዉልን። በቀጥታ ደውለን መሪAgent በንብረትዎ ላይ እንዴት እንደሚሰራ እናነጋግርዎታለን።'
                    : 'Send your phone number and property or company name. We will call you directly and talk through your operations.'}
                </p>

                <form onSubmit={handleDemoSubmit} className="contact-form">
                  <div className="contact-form-grid">
                    <div className="contact-form-field">
                      <label className="contact-form-label">
                        {lang === 'am' ? 'ሙሉ ስም *' : 'Your Name *'}
                      </label>
                      <input
                        name="name"
                        required
                        className="contact-form-input"
                        placeholder={lang === 'am' ? 'ስምዎ' : 'e.g. Israel Ashenafi'}
                      />
                    </div>

                    <div className="contact-form-field">
                      <label className="contact-form-label">
                        {lang === 'am' ? 'ስልክ ቁጥር * (እንድንደውልልዎት)' : 'Phone Number * (We will call you)'}
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        required
                        className="contact-form-input highlight-focus"
                        placeholder="+251 9... or 09..."
                      />
                    </div>
                  </div>

                  <div className="contact-form-grid">
                    <div className="contact-form-field">
                      <label className="contact-form-label">
                        {lang === 'am' ? 'የሆቴሉ ስም *' : 'Hotel, Resort or Real Estate Company *'}
                      </label>
                      <input
                        name="hotel"
                        required
                        className="contact-form-input"
                        placeholder={lang === 'am' ? 'ምሳሌ፡ ስካይላይት ሆቴል' : 'e.g. Skylight Hotel or your real estate company'}
                      />
                    </div>

                    <div className="contact-form-field">
                      <label className="contact-form-label">
                        {lang === 'am' ? 'ኢሜይል (አማራጭ)' : 'Email Address (Optional)'}
                      </label>
                      <input
                        name="email"
                        type="email"
                        className="contact-form-input"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="contact-form-field">
                    <label className="contact-form-label">
                      {lang === 'am' ? 'የክፍል ብዛት ወይም ማስታወሻ (አማራጭ)' : 'Current ERP, roles to automate, or message (optional)'}
                    </label>
                    <input
                      name="note"
                      className="contact-form-input"
                      placeholder={lang === 'am' ? 'ምሳሌ፡ 85 ክፍሎች፣ ኦፔራ...' : 'e.g. 85 rooms, Opera, dynamic pricing...'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="contact-submit-btn cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>
                      {isSubmitting
                        ? (lang === 'am' ? 'በመላክ ላይ...' : 'Sending Request...')
                        : (lang === 'am' ? 'ዴሞ ይጠይቁ' : 'Request Demo')}
                    </span>
                    <span>{isSubmitting ? '⏳' : '→'}</span>
                  </button>

                  <div className="text-[12px] text-zinc-500 mt-2 text-center">
                    {lang === 'am'
                      ? '🔒 ቀጥተኛ መስመር፡ በቅርቡ በስልክ ቁጥርዎ ደውለን እናነጋግርዎታለን።'
                      : '🔒 Direct founder line: We will call your phone number to discuss your property.'}
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="contact-founder-card">
            <div className="text-[11px] font-mono font-bold tracking-widest text-[var(--purple-accent)] uppercase mb-2">
              Founders & Direct Lines
            </div>
            <div className="font-bold text-white text-base mb-1">
              Israel Ashenafi & Tinsae Befekadu
            </div>
            <div className="text-xs text-zinc-400 mb-4">Addis Ababa, Ethiopia</div>

            <div className="contact-line">
              <span className="text-[var(--text-muted)] font-mono text-xs">Phone</span>
              <a href="tel:+251992013392" className="font-mono text-sm text-white hover:text-[var(--purple-glow)]">
                +251 992 013 392
              </a>
            </div>

            <div className="contact-line">
              <span className="text-[var(--text-muted)] font-mono text-xs">Email</span>
              <a href="mailto:israelashenafi29@gmail.com" className="font-mono text-xs text-white hover:text-[var(--purple-glow)]">
                israelashenafi29@gmail.com
              </a>
            </div>

            <div className="contact-line">
              <span className="text-[var(--text-muted)] font-mono text-xs">Developer</span>
              <a
                href="https://israelashenafi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--purple-glow)] hover:text-white transition-colors flex items-center gap-1"
              >
                <span>israelashenafi.com</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flow-footer">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="መሪAgent — Hospitality & Real Estate ERP + AI Addis Ababa" className="h-10 w-auto object-contain" width="120" height="40" />
          <span className="font-bold text-white text-sm">
            <span className="font-['Noto_Serif_Ethiopic']">መሪ</span>Agent — Hospitality & Real Estate ERP + AI
          </span>
        </div>

        <a href={`/docs/${lang === 'am' ? '?lang=am' : ''}`} className="nav-link-cinematic">Docs ↗</a>

        <button
          type="button"
          onClick={scrollToContact}
          className="hero-pill-btn !py-2 !px-5 !text-xs cursor-pointer"
        >
          <span>{lang === 'am' ? 'ዴሞ ይጠይቁ' : 'Request Demo'}</span>
          <span className="ml-1.5">↑</span>
        </button>

        <div className="flex flex-col items-center md:items-end gap-1.5 text-[12px] font-mono text-[var(--text-muted)]">
          <div>© {new Date().getFullYear()} መሪAgent. Addis Ababa, Ethiopia.</div>
          <a
            href="https://israelashenafi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group"
          >
            <span>Developed by <span className="text-zinc-200 group-hover:text-[var(--purple-glow)] underline underline-offset-4">Israel Ashenafi</span></span>
            <span>↗</span>
          </a>
        </div>
      </footer>

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="scroll-to-top-btn"
          aria-label="Back to top"
          title={lang === 'am' ? 'ወደ መጀመሪያው ተመለስ' : 'Back to top'}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}
    </div>
  )
}
