import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import './agent-workflow.css'

export default function AgentWorkflow() {
  const host = useRef(null)
  const control = useRef({ paused: false, burst: 0, restart: false })
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const el = host.current
    let renderer
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }) } catch { queueMicrotask(() => setFailed(true)); return }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25
    el.appendChild(renderer.domElement)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(36, 1, .1, 80)
    const pmrem = new THREE.PMREMGenerator(renderer)
    const room = new RoomEnvironment()
    const environment = pmrem.fromScene(room, .04)
    scene.environment = environment.texture
    room.dispose()
    pmrem.dispose()
    scene.add(new THREE.HemisphereLight(0xe9d5ff, 0x24132e, 3))
    const light = new THREE.PointLight(0xbb7aff, 45, 18)
    light.position.set(0, 3, 1)
    scene.add(light)
    const world = new THREE.Group()
    scene.add(world)
    const mat = (color, metalness = .3, roughness = .25) => new THREE.MeshStandardMaterial({ color, metalness, roughness })
    const chrome = mat(0xb5a6c8, .85, .18)
    const dark = mat(0x100e1c, .45, .18)
    const glow = color => new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 2.5, roughness: .3 })
    function mesh(geometry, material, parent, x = 0, y = 0, z = 0) {
      const object = new THREE.Mesh(geometry, material)
      object.position.set(x, y, z)
      parent.add(object)
      return object
    }
    const base = mesh(new THREE.CylinderGeometry(5.1, 5.25, .22, 96), dark, world, 0, -.85)
    mesh(new THREE.TorusGeometry(5.08, .018, 8, 160), glow(0x8051bd), base).rotation.x = Math.PI / 2
    const core = new THREE.Group()
    world.add(core)
    core.position.y = .4
    mesh(new THREE.IcosahedronGeometry(.52, 1), new THREE.MeshPhysicalMaterial({ color: 0xc8a3ff, metalness: .55, roughness: .12, clearcoat: 1 }), core)
    const rings = [0, 1, 2].map(i => {
      const ring = mesh(new THREE.TorusGeometry(.83 + i * .13, .018, 12, 100), glow(0xaf79f5), core)
      ring.rotation.set(i * .8, i * .7, .5)
      return ring
    })
    const textures = []
    const taskMaterials = [['BOOKINGS', 'Room 204 reserved', '#c6a0ff'], ['FINANCE', 'Payment received', '#83e8cc'], ['VOICE RECEPTION', 'Call answered', '#f4bf85'], ['LEASING', 'Viewing scheduled', '#8ac7ff'], ['OPERATIONS', 'Maintenance assigned', '#f39fcb'], ['COMPLETE', 'Property in sync.', '#83e8cc']].map(([title, text, color]) => {
      const canvas = document.createElement('canvas'); canvas.width = 768; canvas.height = 384
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#191321'; ctx.fillRect(0,0,768,384)
      ctx.strokeStyle = color; ctx.lineWidth = 8; ctx.strokeRect(4,4,760,376)
      ctx.fillStyle = color; ctx.font = '32px sans-serif'; ctx.fillText(title,40,75)
      ctx.fillStyle = '#ffffff'; ctx.font = '48px sans-serif'; ctx.fillText(text,40,175)
      ctx.fillStyle = color; ctx.fillRect(40,235,670,8)
      ctx.font = '26px sans-serif'; ctx.fillText('MERI / PROPERTY OPERATIONS',40,320)
      const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; textures.push(texture)
      return new THREE.MeshBasicMaterial({map:texture, side:THREE.DoubleSide})
    })
    const ticket = mesh(new THREE.PlaneGeometry(2,1), taskMaterials[0], world)
    const colors = [0xc6a0ff, 0x83e8cc, 0xf4bf85, 0x8ac7ff, 0xf39fcb]
    const agents = colors.map((color, i) => {
      const group = new THREE.Group()
      world.add(group)
      const shell = new THREE.MeshPhysicalMaterial({ color, metalness: .45, roughness: .22, clearcoat: 1 })
      mesh(new RoundedBoxGeometry(.85, .72, .64, 5, .19), shell, group, 0, .65)
      mesh(new RoundedBoxGeometry(.68, .37, .12, 4, .12), dark, group, 0, .67, .32)
      const eyes = [-.15, .15].map(x => mesh(new THREE.CapsuleGeometry(.033, .09, 4, 8), glow(color), group, x, .69, .395))
      mesh(new RoundedBoxGeometry(.57, .5, .44, 4, .15), shell, group, 0, -.02)
      mesh(new THREE.SphereGeometry(.055, 16, 16), glow(color), group, 0, .02, .23)
      const arms = []
      ;[-1, 1].forEach(side => {
        const arm = mesh(new THREE.CapsuleGeometry(.085, .23, 4, 12), chrome, group, side * .43, .02)
        arm.rotation.z = side * .35
        arms.push(arm)
        mesh(new THREE.SphereGeometry(.11, 20, 20), shell, group, side * .47, -.16)
      })
      mesh(new THREE.CylinderGeometry(.018, .018, .17), chrome, group, 0, 1.09)
      mesh(new THREE.SphereGeometry(.055, 16, 16), glow(color), group, 0, 1.2)
      const waveform = []
      if (i === 2) {
        const band = mesh(new THREE.TorusGeometry(.48, .035, 10, 48, Math.PI), chrome, group, 0, .72)
        band.rotation.y = .12
        ;[-1, 1].forEach(side => mesh(new RoundedBoxGeometry(.14,.27,.25,3,.05), dark, group, side*.46,.68))
        const boom = mesh(new THREE.CylinderGeometry(.018,.018,.32,8),chrome,group,.36,.48,.31)
        boom.rotation.z = -.8
        mesh(new THREE.SphereGeometry(.05,12,12),glow(color),group,.23,.37,.33)
        for(let j=0;j<9;j++) {
          waveform.push(mesh(new RoundedBoxGeometry(.045,.25,.035,2,.015),glow(color),group,(j-4)*.075,1.5,.1))
        }
      }
      const halo = mesh(new THREE.TorusGeometry(.55, .012, 8, 80), glow(color), world)
      halo.rotation.x = Math.PI / 2
      const desk = new THREE.Group(); world.add(desk); desk.position.set((i-2)*1.9,-.25,.9)
      mesh(new RoundedBoxGeometry(1.6,.1,.8,3,.04),dark,desk)
      mesh(new THREE.CylinderGeometry(.06,.06,.65,12),chrome,desk,0,-.32)
      const screen = mesh(new THREE.PlaneGeometry(1.25,.625),taskMaterials[i],desk,0,.42,-.1); screen.rotation.x = -.25
      mesh(new RoundedBoxGeometry(.85,.025,.28,2,.02),chrome,desk,0,.07,.22)
      return { group, eyes, halo, arms, waveform, phase: i * Math.PI * 2 / 5 }
    })
    const packets = colors.flatMap((color, i) => Array.from({ length: 7 }, (_, j) => ({ object: mesh(new THREE.SphereGeometry(.028, 8, 8), glow(color), world), phase: i * Math.PI * 2 / 5, offset: j / 7 })))
    const points = new Float32Array(240 * 3)
    for (let i = 0; i < points.length; i += 3) { points[i] = (Math.random() - .5) * 16; points[i + 1] = Math.random() * 7 - 1; points[i + 2] = (Math.random() - .5) * 10 }
    const dustGeometry = new THREE.BufferGeometry()
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(points, 3))
    const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: 0xc7a3ed, size: .018, transparent: true, opacity: .5 }))
    scene.add(dust)
    const pointer = new THREE.Vector2()
    const move = event => { const r = el.getBoundingClientRect(); pointer.set((event.clientX - r.left) / r.width - .5, (event.clientY - r.top) / r.height - .5) }
    const leave = () => pointer.set(0, 0)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    const resize = () => { const { width, height } = el.getBoundingClientRect(); renderer.setSize(width, height); camera.aspect = width / height; camera.updateProjectionMatrix() }
    const observer = new ResizeObserver(resize)
    observer.observe(el)
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let visible = true, time = 0, last = 0
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    visibility.observe(el)
    renderer.setAnimationLoop(now => {
      const delta = Math.min((now - last) / 1000, .05); last = now
      if (!visible || document.hidden) return
      if (!control.current.paused && !reduced.matches) time += delta
      control.current.burst *= .96
      if(control.current.restart){time=0;control.current.restart=false}
      const t = time
      const step = (t % 24)/4, working = Math.min(4,Math.floor(step)), progress = step % 1
      ticket.material = taskMaterials[Math.floor(step)]
      const travel = THREE.MathUtils.smoothstep(progress,.6,1)
      ticket.position.set(step>=5 ? 0 : THREE.MathUtils.lerp((working-2)*1.9,working<4 ? (working-1)*1.9 : 0,travel),2.1+Math.sin(travel*Math.PI)*.4,.7)
      ticket.rotation.y = Math.sin(t)*.06
      ticket.scale.setScalar(step>=5 ? 1.1 : .85)
      world.rotation.y += ((pointer.x * .22) - world.rotation.y) * .035
      camera.position.set(pointer.x * .6, 4.5 - pointer.y * .6, Math.max(13.5, 10 / camera.aspect))
      camera.lookAt(0, .3, 0)
      core.rotation.set(t * .2, t * .35, 0)
      core.position.set(0,.3,-1.4); core.scale.setScalar(.55)
      rings.forEach((ring, i) => { ring.rotation.x = t * (.25 + i * .1) + i; ring.rotation.y = t * .3 + i })
      agents.forEach(({group,eyes,halo,arms,waveform,phase},i)=>{
        const busy = working===i && step<5
        group.position.set((i-2)*1.9,.25+Math.sin(t*2+phase)*.04,0)
        group.rotation.set(busy?.12:0,Math.sin(t*.7+phase)*.08,0)
        arms.forEach((arm,j)=>{arm.rotation.x=busy ? -.8+Math.sin(t*15+j*Math.PI)*.3 : -.15; arm.position.y=busy ? .08+Math.sin(t*15+j*Math.PI)*.035 : .02})
        waveform.forEach((bar,j)=>{bar.scale.y=busy ? .35+Math.abs(Math.sin(t*9+j*1.2))*1.9 : .18})
        if(i===2) arms.forEach((arm,j)=>{arm.rotation.x=busy && j===1 ? -1.7 : -.15; arm.rotation.z=busy && j===1 ? -.55 : (j===0 ? -.35 : .35)})
        halo.position.set(group.position.x,-.72,0);halo.scale.setScalar(busy?1.25:.9)
        eyes.forEach(eye=>{eye.scale.y=Math.sin(t*1.5+phase)>.995?.15:1})
      })
      packets.forEach(({ object, phase, offset }) => {
        const p = (t * .25 + offset + control.current.burst) % 1
        const angle = phase + t * .16
        object.position.set(Math.cos(angle) * 2.45 * (1 - p), .25 + Math.sin(p * Math.PI) * .5, Math.sin(angle) * 2.05 * (1 - p))
        object.scale.setScalar(Math.sin(p * Math.PI))
      })
      dust.rotation.y = t * .015
      renderer.render(scene, camera)
    })
    return () => {
      renderer.setAnimationLoop(null)
      observer.disconnect(); visibility.disconnect()
      el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave)
      const geometries = new Set(), materials = new Set()
      scene.traverse(object => { if (object.geometry) geometries.add(object.geometry); if (object.material) materials.add(object.material) })
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose())
      textures.forEach(t=>t.dispose()); taskMaterials.forEach(m=>m.dispose()); environment.dispose(); renderer.dispose(); renderer.domElement.remove()
    }
  }, [])
  return <section className="flow-section crew-section" id="agents-at-work">
    <div className="flow-kicker">YOUR AI CREW</div>
    <h2 className="flow-giant-title">FIVE AGENTS.<br /><em>ONE SMOOTH OPERATION.</em></h2>
    <div className="crew-universe">
      <div ref={host} className="crew-webgl" role="img" aria-label="Five 3D agents coordinate bookings, finance, voice reception, real estate leasing, and property operations">{failed && <div className="crew-fallback">✦<p>Bookings · Finance · Voice reception · Leasing · Operations</p></div>}</div>
      <div className="crew-orbit-labels"><span>Bookings</span><span>Finance</span><span>Voice reception</span><span>Leasing</span><span>Operations</span></div>
      <div className="crew-controls"><span><i /> Working together. For you.</span></div>
    </div>
  </section>
}



