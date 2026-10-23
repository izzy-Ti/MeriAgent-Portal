import { useRef } from 'react'
import './agent-workflow.css'

function Robot({ x, y, color, kind = 'tie', delay = '0s' }) {
  return <g transform={`translate(${x} ${y})`} className="crew-robot" data-eye-x={x} data-eye-y={y + 12} style={{ '--crew-color': color, '--crew-delay': delay }}>
    <ellipse cx="0" cy="135" rx="54" ry="9" fill="#000" opacity=".25" />
    <g className="crew-body">
      <path d="M-21 107 L-25 130 M21 107 L25 130" stroke="#81758f" strokeWidth="13" strokeLinecap="round" />
      <path d="M-36 132h24 M12 132h24" stroke="#c8bcd7" strokeWidth="10" strokeLinecap="round" />
      <rect x="-41" y="48" width="82" height="65" rx="25" fill="#dcd5e9" />
      <path d="M-29 56L0 91 29 56" fill="#595065" />
      <path d="M-6 60h12l-3 9 6 22-9 8-9-8 6-22z" fill={color} />
      <path d="M-38 65Q-65 70-65 94" stroke="#b6abc8" strokeWidth="13" fill="none" strokeLinecap="round" />
      <g className="crew-working-arm"><path d="M38 64Q62 51 75 31" stroke="#dcd5e9" strokeWidth="13" fill="none" strokeLinecap="round" /><circle cx="75" cy="31" r="9" fill={color} /></g>
      <path d="M0-22v-12" stroke="#c6bbd7" strokeWidth="4" /><circle cx="0" cy="-38" r="5" fill={color} className="crew-antenna" />
      <rect x="-48" y="-18" width="96" height="70" rx="25" fill="#e9e4f1" />
      <rect x="-39" y="-7" width="78" height="45" rx="17" fill="#191520" />
      <g className="crew-eye-look"><g className="crew-eyes" fill={color}><rect x="-23" y="5" width="11" height="14" rx="5.5" /><rect x="12" y="5" width="11" height="14" rx="5.5" /></g></g>
      <path d="M-9 26q9 7 18 0" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {kind === 'headset' && <><path d="M-49 15v-8a49 37 0 0 1 98 0v13" fill="none" stroke={color} strokeWidth="7" /><rect x="-55" y="7" width="10" height="22" rx="5" fill={color} /><path d="M50 18v16l-18 7" fill="none" stroke={color} strokeWidth="4" /></>}
      {kind === 'glasses' && <g fill="none" stroke="#e3d8ed" strokeWidth="2"><rect x="-29" y="0" width="25" height="25" rx="8" /><rect x="4" y="0" width="25" height="25" rx="8" /><path d="M-4 9h8" /></g>}
    </g>
  </g>
}

export default function AgentWorkflow() {
  const sceneRef = useRef(null)
  const followCursor = (event) => {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const scene = sceneRef.current
    const bounds = scene.querySelector('svg').getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width * 1000
    const y = (event.clientY - bounds.top) / bounds.height * 510
    scene.style.setProperty('--cursor-x', `${x}px`)
    scene.style.setProperty('--cursor-y', `${y}px`)
    scene.dataset.tracking = 'true'
    scene.querySelectorAll('.crew-robot').forEach(robot => {
      const dx = x - Number(robot.dataset.eyeX)
      const dy = y - Number(robot.dataset.eyeY)
      const distance = Math.max(1, Math.hypot(dx, dy))
      const reach = Math.min(1, distance / 90)
      robot.style.setProperty('--look-x', `${dx / distance * 4 * reach}px`)
      robot.style.setProperty('--look-y', `${dy / distance * 3 * reach}px`)
    })
  }
  const resetCursor = () => {
    const scene = sceneRef.current
    scene.dataset.tracking = 'false'
    scene.querySelectorAll('.crew-robot').forEach(robot => {
      robot.style.setProperty('--look-x', '0px')
      robot.style.setProperty('--look-y', '0px')
    })
  }
  return <section className="flow-section crew-section" id="agents-at-work">
    <div className="flow-kicker">MEET YOUR NEW CREW</div>
    <h2 className="flow-giant-title">THEY HANDLE THE WORK.<br /><em>YOU ENJOY THE RESULTS.</em></h2>
    <p className="crew-intro">Bookings, payments, guest requests. Your AI team gets cooking—together.</p>
    <div className="crew-scene" ref={sceneRef} onPointerMove={followCursor} onPointerLeave={resetCursor} role="img" aria-label="Animated AI managers in ties and headsets work together around a cooking pot, turning bookings, payments, and guest requests into a smoothly running stay for a relaxed hotel owner.">
      <svg viewBox="0 0 1000 510" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <radialGradient id="crew-halo"><stop stopColor="#9c65d2" stopOpacity=".22" /><stop offset="1" stopColor="#9c65d2" stopOpacity="0" /></radialGradient>
          <linearGradient id="crew-pot" x1="370" y1="300" x2="550" y2="390" gradientUnits="userSpaceOnUse"><stop stopColor="#c8a2ec" /><stop offset=".5" stopColor="#8b58ae" /><stop offset="1" stopColor="#58376f" /></linearGradient>
          <linearGradient id="crew-table" x1="200" y1="340" x2="770" y2="390" gradientUnits="userSpaceOnUse"><stop stopColor="#473553" /><stop offset="1" stopColor="#211b2c" /></linearGradient>
        </defs>
        <ellipse cx="460" cy="275" rx="410" ry="255" fill="url(#crew-halo)" />
        <ellipse className="crew-cursor-light" cx="0" cy="0" rx="185" ry="155" fill="url(#crew-halo)" />
        <ellipse cx="500" cy="438" rx="395" ry="28" fill="#15101e" />
        <g className="crew-sparkles" stroke="#b28bd1" strokeWidth="2"><path d="M154 160v12m-6-6h12M650 100v12m-6-6h12M755 219v10m-5-5h10M285 85v10m-5-5h10" /></g>
        <g className="crew-note crew-note-booking"><rect width="55" height="62" rx="10" fill="#e2c6fa" /><path d="M13 20h29M13 31h20M13 42h25" stroke="#785197" strokeWidth="3" strokeLinecap="round" /><path d="m34 49 4 4 8-9" stroke="#785197" strokeWidth="3" /></g>
        <g className="crew-note crew-note-payment"><rect width="52" height="41" rx="9" fill="#b6ebd7" /><path d="M0 12h52" stroke="#4d907a" strokeWidth="5" /><path d="m27 28 5 5 10-11" stroke="#438470" strokeWidth="3" /></g>
        <g className="crew-note crew-note-guest"><path d="M0 9a9 9 0 0 1 9-9h39a9 9 0 0 1 9 9v24a9 9 0 0 1-9 9H20L8 51v-9a9 9 0 0 1-8-9z" fill="#f0d3a5" /><path d="M16 17h26M16 26h18" stroke="#a97e45" strokeWidth="3" strokeLinecap="round" /></g>
        <Robot x={228} y={242} color="#d4a5ff" role="Bookings" kind="headset" />
        <Robot x={427} y={150} color="#a8e5ce" role="Finance" kind="glasses" delay="-.8s" />
        <Robot x={640} y={242} color="#f1cb96" role="Guest care" kind="headset" delay="-1.6s" />
        <path d="M266 362v70m338-70v70" stroke="#392b47" strokeWidth="12" strokeLinecap="round" />
        <rect x="240" y="341" width="391" height="25" rx="12" fill="url(#crew-table)" />
        <path d="M348 303q-24-5-23 14t28 14m182-28q24-5 23 14t-28 14" stroke="#8b65a9" strokeWidth="8" />
        <path d="M346 296h191l-14 50q-5 18-30 18h-104q-25 0-30-18z" fill="url(#crew-pot)" />
        <ellipse cx="441" cy="296" rx="96" ry="15" fill="#d9b7f3" /><ellipse cx="441" cy="296" rx="84" ry="10" fill="#6e4588" />
        <g className="crew-stir"><path d="M461 301l50-90" stroke="#e8d1b1" strokeWidth="8" strokeLinecap="round" /><ellipse cx="462" cy="300" rx="9" ry="4" fill="#d5b5ed" /></g>
        <g className="crew-steam" stroke="#d8b0f3" strokeWidth="3" strokeLinecap="round"><path d="M408 272q-13-16 0-31t0-28" /><path d="M438 263q-13-16 0-31t0-28" /><path d="M469 270q-13-16 0-31t0-28" /></g>
        <g className="crew-finished"><path d="M650 366h109" stroke="#bba2d0" strokeWidth="5" strokeLinecap="round" /><path d="M661 361a43 35 0 0 1 86 0z" fill="#d7cce2" /><circle cx="704" cy="322" r="5" fill="#e8ddf3" /><path d="m689 350 10 9 20-21" stroke="#7a5d8d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></g>
        <g transform="translate(840 267)">
          <path d="M-38 84q-12 50 8 70m69-68-5 66" stroke="#645275" strokeWidth="9" strokeLinecap="round" />
          <path d="M-40 66q-11 43 17 43h44q30 0 30-43" fill="#382841" stroke="#5b426e" strokeWidth="5" />
          <path d="M-7 88 29 126 47 119M14 90 3 135 24 141" stroke="#b7a7c5" strokeWidth="13" strokeLinecap="round" />
          <path d="M-31 26q24-13 47 0l12 60h-62z" fill="#d6bbec" />
          <path d="M-25 38-52 60-75 54m91-15 29 18 18-25" stroke="#d6bbec" strokeWidth="11" strokeLinecap="round" />
          <circle cx="-7" cy="-2" r="24" fill="#c99576" /><path d="M-30-4q-4-35 26-29 27 3 21 25l-13-11-20 5z" fill="#44313b" />
          <path d="M-18-3h4m13 0h4" stroke="#704838" strokeWidth="2.5" strokeLinecap="round" /><path d="M-13 7q8 8 16 0" stroke="#704838" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M-75 44h18v18h-18z" fill="#efe6f7" /><path d="M-57 48q12 0 8 9h-8" stroke="#efe6f7" strokeWidth="3" />
        </g>
        <g className="crew-result"><rect x="746" y="166" width="187" height="43" rx="21" fill="#bce9d4" /><path d="m763 187 5 5 9-11" stroke="#315f4d" strokeWidth="2.5" strokeLinecap="round" /><text x="786" y="192" fill="#244c3c" fontSize="14" fontFamily="Outfit, sans-serif">All taken care of.</text></g>
        <g className="crew-labels" textAnchor="middle">
          <text x="228" y="475" className="crew-role crew-role-major">Bookings</text>
          <text x="427" y="84" className="crew-role crew-role-major">Finance</text>
          <text x="640" y="475" className="crew-role crew-role-major">Guest care</text>
          <text x="195" y="105" className="crew-role crew-role-major">Revenue &amp; pricing</text>
          <text x="660" y="85" className="crew-role crew-role-major">Operations</text>
          <text x="112" y="183" className="crew-role crew-role-support">Booking channels</text>
          <text x="100" y="330" className="crew-role crew-role-support">Payment checks</text>
          <text x="105" y="390" className="crew-role crew-role-support">Maintenance</text>
          <text x="853" y="105" className="crew-role crew-role-support">Owner reports</text>
          <text x="853" y="144" className="crew-role crew-role-support">Purchasing &amp; stock</text>
          <text x="840" y="225" className="crew-role crew-role-support">Guest retention</text>
          <text x="840" y="475" className="crew-role crew-human-label">You. In control.</text>
        </g>
      </svg>
    </div>
    <p className="crew-caption">Less chasing. Fewer routine roles. <strong>More room to be the owner.</strong></p>
  </section>
}
