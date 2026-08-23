import { useState } from 'react'
import './App.css'

type MenuKind = 'bbq' | 'signature' | 'sides'

const menu: Record<MenuKind, { name: string; description: string; price: string; note?: string }[]> = {
  bbq: [
    { name: 'Prime Galbi', description: 'USDA prime short rib, house pear marinade', price: '36', note: 'Our classic' },
    { name: 'Deungshim', description: 'Dry-aged ribeye, smoked sea salt', price: '34' },
    { name: 'Samgyeopsal', description: 'Heritage pork belly, sesame oil & salt', price: '22' },
    { name: 'Dak Galbi', description: 'Gochujang chicken thigh, sweet potato', price: '20' },
  ],
  signature: [
    { name: 'Hanar Bibimbap', description: 'Seasonal vegetables, egg yolk, crispy rice', price: '19', note: 'Vegetarian' },
    { name: 'Kimchi Jjigae', description: 'Aged kimchi stew, tofu, pork belly', price: '18' },
    { name: 'Yukhoe', description: 'Hand-cut beef tartare, nashi pear, pine nut', price: '21' },
    { name: 'Mul Naengmyeon', description: 'Cold buckwheat noodles, brisket broth', price: '17' },
  ],
  sides: [
    { name: 'Daily Banchan', description: 'A changing collection of small plates', price: '9' },
    { name: 'Scallion Pancake', description: 'Crisp savoury pancake, soy dip', price: '12' },
    { name: 'Korean Fried Chicken', description: 'Twice-fried, soy garlic glaze', price: '15' },
    { name: 'Sweet Rice Cream', description: 'Toasted barley, caramel, sesame', price: '10' },
  ],
}

const categories: { id: MenuKind; label: string }[] = [
  { id: 'bbq', label: 'From the grill' },
  { id: 'signature', label: 'Signatures' },
  { id: 'sides', label: 'To share' },
]

function Mark() {
  return <span className="mark" aria-hidden="true"><i /><i /><i /><i /></span>
}

function App() {
  const [active, setActive] = useState<MenuKind>('bbq')
  const [isBooked, setIsBooked] = useState(false)
  const goToMenu = () => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Hanar home"><Mark /> <span>HANAR</span></a>
          <div className="nav-links"><a href="#menu">Menu</a><a href="#story">Our story</a><a href="#visit">Visit</a></div>
          <button className="book-link" onClick={() => setIsBooked(true)}>Book a table <span>↗</span></button>
        </nav>
        <div className="hero-content"><p className="eyebrow">Korean barbecue · Zurich</p><h1>Fire, <em>reimagined.</em></h1><p className="intro">Modern Korean dining rooted in the ritual of cooking together.</p><button className="round-button" onClick={goToMenu}><span>Explore the menu</span><b>↓</b></button></div>
        <div className="hero-footer"><span>Tue—Sun / 18:00—23:30</span><span className="scroll-note">Scroll to discover <i /></span><span>Hanar Restaurant<br />Limmatquai 42, 8001 Zürich</span></div>
      </section>

      <section className="intro-section" id="story"><div className="vertical-label">Seoul · Zürich · Since 2024</div><div className="intro-copy"><p className="eyebrow rust">The Hanar way</p><h2>A table is where<br /><em>everything begins.</em></h2><p>At Hanar, the grill sits at the centre. Ingredients are chosen with a quiet obsession, then brought to life over glowing charcoal — one shared bite at a time.</p><a className="text-link" href="#visit">More about our table <span>→</span></a></div><div className="stamp">한<br />나<br />르</div></section>

      <section className="menu-section" id="menu"><header className="section-heading"><div><p className="eyebrow rust">Our menu</p><h2>Made for the <em>middle</em><br />of the table.</h2></div><p>Every order is designed to move around the table. Choose your grill, then let the sides do their thing.</p></header><div className="menu-layout"><aside className="menu-aside"><span>01 — 03</span><div>{categories.map((category, i) => <button key={category.id} className={active === category.id ? 'active' : ''} onClick={() => setActive(category.id)}><b>0{i + 1}</b>{category.label}</button>)}</div><small>All barbecue orders come with lettuce wraps, ssamjang & daily banchan.</small></aside><div className="menu-card" aria-live="polite"><div className="card-topline"><span>{categories.find(c => c.id === active)?.label}</span><span>CHF</span></div>{menu[active].map((item) => <article className="dish" key={item.name}><div><h3>{item.name} {item.note && <small>{item.note}</small>}</h3><p>{item.description}</p></div><strong>{item.price}</strong></article>)}<p className="menu-footnote">Ask our team about today’s off-menu cuts.</p></div></div></section>

      <section className="visit-section" id="visit"><div><p className="eyebrow">Find your seat</p><h2>Dinner is<br /><em>waiting.</em></h2></div><div className="visit-details"><p>Tuesday — Sunday<br />18:00 — 23:30</p><p>Limmatquai 42<br />8001 Zürich, Switzerland</p><button onClick={() => setIsBooked(true)}>Reserve a table <span>↗</span></button></div><div className="visit-mark"><Mark /></div></section>
      <footer><a className="brand" href="#top"><Mark /> <span>HANAR</span></a><span>© 2024 Hanar Restaurant</span><div><a href="#top">Instagram</a><a href="mailto:hello@hanar.restaurant">Email</a></div></footer>
      {isBooked && <div className="modal-backdrop" role="presentation" onClick={() => setIsBooked(false)}><section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="book-title" onClick={(e) => e.stopPropagation()}><button className="close" aria-label="Close" onClick={() => setIsBooked(false)}>×</button><p className="eyebrow rust">Reservations</p><h2 id="book-title">Your table<br /><em>awaits.</em></h2><p>For this demo, please call +41 44 123 45 67 or email hello@hanar.restaurant.</p><button onClick={() => setIsBooked(false)}>Got it</button></section></div>}
    </main>
  )
}

export default App
