import { useState } from 'react'
import './App.css'

type MenuKind = 'barbecue' | 'plats' | 'accompagnements'

const menu: Record<MenuKind, { name: string; description: string; note?: string }[]> = {
  barbecue: [
    { name: 'Grillade de bœuf mariné', description: 'Viande marinée, préparée pour le barbecue coréen', note: 'À partager' },
    { name: 'Grillade de porc mariné', description: 'Une sélection généreuse de viande et de marinades maison' },
    { name: 'Grillade de poulet mariné', description: 'Marinade savoureuse et cuisson au grill, à table' },
    { name: 'Barbecue coréen', description: 'L’expérience conviviale autour de la grille' },
  ],
  plats: [
    { name: 'Bibimbap', description: 'Le grand classique coréen, servi dans son bol chaud', note: 'Incontournable' },
    { name: 'Nouilles coréennes', description: 'Nouilles généreuses et garniture du jour' },
    { name: 'Potage de kimchi', description: 'Un bouillon chaleureux aux saveurs relevées' },
    { name: 'Bibimbap végétarien', description: 'Une version végétale du plat emblématique' },
  ],
  accompagnements: [
    { name: 'Kimchi', description: 'Chou fermenté coréen, relevé et plein de caractère' },
    { name: 'Riz blanc', description: 'L’accompagnement essentiel pour le partage' },
    { name: 'Légumes du jour', description: 'Petites assiettes inspirées de la tradition coréenne' },
    { name: 'Sauces maison', description: 'Pour accompagner chaque bouchée selon vos envies' },
  ],
}

const categories: { id: MenuKind; label: string }[] = [
  { id: 'barbecue', label: 'Le barbecue' },
  { id: 'plats', label: 'Plats coréens' },
  { id: 'accompagnements', label: 'À partager' },
]

function Mark() {
  return <span className="mark" aria-hidden="true"><i /><i /><i /><i /></span>
}

function App() {
  const [active, setActive] = useState<MenuKind>('barbecue')
  const goToMenu = () => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav" aria-label="Navigation principale">
          <a className="brand" href="#top" aria-label="Accueil Barbecue Coréen Au Gourmand"><Mark /> <span>AU GOURMAND</span></a>
          <div className="nav-links"><a href="#menu">Carte</a><a href="#histoire">Le restaurant</a><a href="#visite">Nous trouver</a></div>
          <a className="book-link" href="https://www.thefork.fr/restaurant/barbecue-coreen-au-gourmand-r78528" target="_blank" rel="noreferrer">Réserver <span>↗</span></a>
        </nav>
        <div className="hero-content"><p className="eyebrow">Barbecue coréen · Lausanne</p><h1>Le goût du feu,<br /><em>à partager.</em></h1><p className="intro">Des grillades marinées, des plats coréens généreux et le plaisir de se retrouver autour de la table.</p><button className="round-button" onClick={goToMenu}><span>Découvrir la carte</span><b>↓</b></button></div>
        <div className="hero-footer"><span>Mar—Sam / 11:00—14:30 & 18:00—22:00</span><span className="scroll-note">Découvrir <i /></span><span>26 av. Louis-Ruchonnet<br />1003 Lausanne</span></div>
      </section>

      <section className="intro-section" id="histoire"><div className="vertical-label">Cuisine coréenne · Lausanne</div><div className="intro-copy"><p className="eyebrow rust">Notre table</p><h2>Le barbecue, au<br /><em>cœur du repas.</em></h2><p>À deux pas de la gare CFF, Au Gourmand vous invite à découvrir une cuisine coréenne conviviale : des viandes marinées à griller, des bibimbaps et des nouilles à savourer ensemble.</p><a className="text-link" href="#visite">Nous rendre visite <span>→</span></a></div><div className="stamp">맛<br />있<br />게</div></section>

      <section className="menu-section" id="menu"><header className="section-heading"><div><p className="eyebrow rust">La carte</p><h2>Des saveurs à placer<br /><em>au milieu de la table.</em></h2></div><p>Le barbecue coréen se vit ensemble. Choisissez votre grillade, ajoutez vos favoris et laissez la table faire le reste.</p></header><div className="menu-layout"><aside className="menu-aside"><span>01 — 03</span><div>{categories.map((category, i) => <button key={category.id} className={active === category.id ? 'active' : ''} onClick={() => setActive(category.id)}><b>0{i + 1}</b>{category.label}</button>)}</div><small>La sélection complète et les prix sont disponibles directement au restaurant.</small></aside><div className="menu-card" aria-live="polite"><div className="card-topline"><span>{categories.find(c => c.id === active)?.label}</span><span>À la carte</span></div>{menu[active].map((item) => <article className="dish" key={item.name}><div><h3>{item.name} {item.note && <small>{item.note}</small>}</h3><p>{item.description}</p></div><strong>—</strong></article>)}<p className="menu-footnote">Une envie particulière ? Demandez conseil à notre équipe.</p></div></div></section>

      <section className="visit-section" id="visite"><div><p className="eyebrow">Nous trouver</p><h2>À deux pas<br /><em>de la gare.</em></h2></div><div className="visit-details"><p>Du mardi au samedi<br />11:00 — 14:30 · 18:00 — 22:00</p><p>26 avenue Louis-Ruchonnet<br />1003 Lausanne, Suisse</p><a href="https://www.thefork.fr/restaurant/barbecue-coreen-au-gourmand-r78528" target="_blank" rel="noreferrer">Réserver sur TheFork <span>↗</span></a></div><div className="visit-mark"><Mark /></div></section>
      <footer><a className="brand" href="#top"><Mark /> <span>AU GOURMAND</span></a><span>Barbecue Coréen Au Gourmand · Lausanne</span><div><a href="https://www.thefork.fr/restaurant/barbecue-coreen-au-gourmand-r78528" target="_blank" rel="noreferrer">TheFork</a><a href="#visite">Adresse</a></div></footer>
    </main>
  )
}

export default App
