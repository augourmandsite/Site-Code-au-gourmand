import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { createContext, useContext, useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

type MenuKind = 'entrees' | 'sushi' | 'barbecue' | 'bibimbap' | 'plats' | 'nouilles' | 'boissons' | 'vins' | 'desserts'
type MenuItem = { name: string; price: string; description?: string; note?: string }

const price = (value: string) => `CHF ${value}`
const menu: Record<MenuKind, MenuItem[]> = {
  entrees: [
    { name: 'Edamame', price: price('6.–') }, { name: 'Salade wakame', price: price('6.–') },
    { name: 'Salade shiitake et légumes assaisonnés', price: price('6.–') }, { name: 'Soupe miso', price: price('6.–') },
    { name: 'Potage de kimchi', price: price('7.–') }, { name: 'Raviolis grillés aux légumes (5 pièces)', price: price('9.–') },
    { name: 'Raviolis grillés au poulet (5 pièces)', price: price('9.–') }, { name: 'Raviolis grillés au porc (4 pièces)', price: price('9.–') },
    { name: 'Tempura, beignets de crevettes (4 pièces)', price: price('10.–') }, { name: 'Tempura crevettes et légumes', price: price('13.–') },
    { name: 'Rouleaux de printemps (2 pièces)', price: price('8.–') }, { name: 'Brochettes de poulet teriyaki (3 pièces)', price: price('9.–') },
    { name: 'Crêpe aux légumes', price: price('13.–') }, { name: 'Crêpe aux fruits de mer et légumes', price: price('15.–') },
    { name: 'Poulet pané à la sauce piquante', price: price('15.–'), note: 'Épicé' }, { name: 'Poulet pané sauce piquante avec fromage', price: price('19.–'), note: 'Épicé' },
    { name: 'Vermicelles sautés aux légumes et bœuf', price: price('16.–') }, { name: 'Gâteau de riz sauté à la sauce piquante', price: price('15.–'), note: 'Épicé' },
    { name: 'Gâteau de riz sauce piquante avec fromage', price: price('19.–'), note: 'Épicé' },
  ],
  sushi: [
    { name: 'Sashimi saumon (3 pièces)', price: price('9.–') }, { name: 'Sashimi hokkigai / palourde (3 pièces)', price: price('9.–') },
    { name: 'Sashimi thon (3 pièces)', price: price('12.–') }, { name: 'Sashimi noix de Saint-Jacques (3 pièces)', price: price('12.–') },
    { name: 'Assortiment sashimi (9 pièces)', price: price('28.–') }, { name: 'Nigiri saumon (2 pièces)', price: price('6.–') },
    { name: 'Nigiri saumon flambé (2 pièces)', price: price('7.–') }, { name: 'Nigiri thon (2 pièces)', price: price('7.–') },
    { name: 'Nigiri anguille grillée (2 pièces)', price: price('7.–') }, { name: 'Nigiri inari / pâte de soja (2 pièces)', price: price('6.–') },
    { name: 'Maki saumon (6 pièces)', price: price('7.–') }, { name: 'Maki thon (6 pièces)', price: price('8.–') },
    { name: 'Maki spicy thon (6 pièces)', price: price('8.–') }, { name: 'Maki avocat (6 pièces)', price: price('6.–') },
    { name: 'Futomaki (5 pièces)', price: price('16.–'), description: 'Saumon, thon, concombre, avocat, tobiko' },
    { name: 'Sushi roll vegan (8 pièces)', price: price('12.–'), description: 'Avocat, concombre, inari' },
    { name: 'Sushi roll végétarien (8 pièces)', price: price('12.–'), description: 'Omelette, avocat, concombre' },
    { name: 'California roll (8 pièces)', price: price('12.–'), description: 'Surimi, omelette, avocat, tobiko, mayonnaise' },
    { name: 'Saumon deluxe roll (8 pièces)', price: price('14.–'), description: 'Saumon, avocat, saumon flambé' },
    { name: 'Spicy thon roll (8 pièces)', price: price('14.–'), description: 'Thon, avocat, sauce épicée' },
    { name: 'Ebi fried roll (8 pièces)', price: price('14.–'), description: 'Crevettes panées, salade, mayonnaise' },
    { name: 'Fried chicken roll (8 pièces)', price: price('14.–'), description: 'Poulet pané, salade, concombre, sauce épicée' },
    { name: 'Bœuf bulgogi roll (8 pièces)', price: price('14.–'), description: 'Bœuf, salade, concombre, sauce bulgogi' },
    { name: 'Rainbow roll (8 pièces)', price: price('16.–'), description: 'Surimi, avocat, concombre, saumon, thon' },
    { name: 'Soft crab roll (8 pièces)', price: price('16.–'), description: 'Crabe mou, avocat, mayonnaise' },
    { name: 'Assortiment maki (18 pièces)', price: price('16.–') }, { name: 'Assortiment nigiri (8 pièces)', price: price('26.–') },
    { name: 'Assortiment maki (6) et nigiri (5)', price: price('25.–') }, { name: 'Plateau maki (48 pièces)', price: price('46.–') },
    { name: 'Plateau mixte', price: price('62.–'), description: '8 nigiri, 12 maki et 16 sushi rolls' },
  ],
  barbecue: [
    { name: 'Poitrine de porc nature', price: price('21.–') }, { name: 'Galbi, côtes courtes de bœuf marinées', price: price('22.–') },
    { name: 'Entrecôte parisienne de bœuf, nature ou marinée', price: price('22.–') }, { name: 'Bœuf enoki en paupiettes', price: price('22.–') },
    { name: 'Poulet, nature ou mariné', price: price('21.–') }, { name: 'Porc, nature ou mariné', price: price('21.–') },
    { name: 'Filet de porc ibérico', price: price('27.–') }, { name: 'Agneau nature', price: price('26.–') },
    { name: 'Langue de bœuf nature', price: price('21.–') }, { name: 'Filet de perches', price: price('21.–') },
    { name: 'Crevettes', price: price('25.–') }, { name: 'Queue de homard', price: price('25.–') },
    { name: 'Assortiment de fruits de mer', price: price('25.–') }, { name: 'Assortiment de légumes', price: price('17.–') },
    { name: 'Kimchi, 3 assortiments', price: price('6.–'), note: 'Accompagnement' }, { name: 'Riz nature', price: price('3.–'), note: 'Accompagnement' },
    { name: 'Feuilles d’algues', price: price('5.–'), note: 'Accompagnement' },
  ],
  bibimbap: [
    { name: 'Menu barbecue', price: price('45.– / pers.'), description: 'Poulet, porc, bœuf, crevettes, fruits de mer, légumes, kimchi et riz nature', note: 'Min. 2 pers.' },
    { name: 'Fondue', price: price('43.– / pers.'), description: 'Poulet, porc, bœuf, crevettes, fruits de mer, légumes et riz nature', note: 'Min. 2 pers.' },
    { name: 'Bibimbap aux légumes', price: price('22.–'), description: 'Légumes variés, œuf au plat' }, { name: 'Bibimbap au bœuf', price: price('24.–'), description: 'Légumes variés, bœuf, œuf au plat' },
    { name: 'Bibimbap au poulet', price: price('24.–'), description: 'Légumes variés, poulet, œuf au plat' }, { name: 'Bibimbap au porc', price: price('24.–'), description: 'Légumes variés, porc, œuf au plat' },
    { name: 'Soupe tofu et légumes', price: price('20.–') }, { name: 'Soupe bœuf et vermicelles de riz', price: price('22.–') },
    { name: 'Soupe kimchi et porc', price: price('22.–') }, { name: 'Soupe kimchi et agneau', price: price('22.–') },
  ],
  plats: [
    { name: 'Bœuf sauté à l’oignon', price: price('23.–') }, { name: 'Bœuf enoki en paupiettes', price: price('23.–') },
    { name: 'Poulpe sauté à la sauce piquante', price: price('23.–'), note: 'Épicé' }, { name: 'Poulet mariné à la sauce piquante', price: price('22.–'), note: 'Épicé' },
    { name: 'Poitrine de porc à la sauce piquante', price: price('22.–'), note: 'Épicé' }, { name: 'Crevettes sautées au poivre vert', price: price('25.–') },
    { name: 'Saumon grillé sauce soja', price: price('22.–') }, { name: 'Anguille grillée sur le riz', price: price('26.–') },
    { name: 'Porc pané japonais sur le riz', price: price('21.–') },
  ],
  nouilles: [
    { name: 'Riz sauté au poulet', price: price('21.–') }, { name: 'Riz sauté au porc et kimchi', price: price('21.–') },
    { name: 'Nouilles sautées au poulet', price: price('21.–') }, { name: 'Nouilles sautées au porc', price: price('21.–') },
    { name: 'Nouilles sautées au bœuf', price: price('21.–') }, { name: 'Ramen au bœuf et légumes', price: price('21.–') },
    { name: 'Ramen au porc et légumes', price: price('21.–') },
  ],
  boissons: [
    { name: 'Cocktail sans alcool', price: price('6.–'), description: 'Mojito, Sunrise, Blue Ocean, Lychee Soda ou Fraise Fruit Punch' },
    { name: 'Soju cocktail', price: price('8.–'), description: 'K-Bomb, Mojito, Lychee, Straw Kiss, Citrus Tea, Sunrise ou Blue Ocean' },
    { name: 'Eau gazeuse ou nature (50 cl)', price: price('4.50') }, { name: 'Fanta, Coca-Cola, Sprite ou thé froid (50 cl)', price: price('4.50') },
    { name: 'Jus de coco, litchi ou mangue (33 cl)', price: price('4.20') }, { name: 'Thé vert Oishi ou thé noir citron (50 cl)', price: price('4.50') },
    { name: 'Aloe vera ou thé citron coréen', price: price('4.50') }, { name: 'Café, espresso ou ristretto', price: price('3.60') },
    { name: 'Thé ou infusion', price: price('3.60') }, { name: 'Théière de thé', price: price('4.50') },
    { name: 'Asahi (33 cl)', price: price('6.50') }, { name: 'Bière coréenne Cass (33 cl)', price: price('7.–') },
    { name: 'Bière au verre / sans alcool', price: price('5.– à 7.–') },
  ],
  vins: [
    { name: 'Mont-sur-Rolle AOC, blanc', price: price('4.50 à 22.50') }, { name: 'Œil de Perdrix vaudois AOC, rosé', price: price('4.50 à 22.50') },
    { name: 'Œil de Perdrix valais AOC, rosé', price: price('4.50 à 22.50') }, { name: 'Pinot noir Vaud AOC, rouge', price: price('4.50 à 22.50') },
    { name: 'Epesses Lavaux AOC, rouge', price: price('5.50 à 27.50') }, { name: 'Yedam sake, 13% vol. (2.5 dl)', price: price('10.–') },
    { name: 'Makkoli, rice beer 6% vol. (75 cl)', price: price('18.–') }, { name: 'Chamisul soju 20.1% vol. (36 cl)', price: price('20.–') },
    { name: 'Martini blanc ou rouge', price: price('5.50') }, { name: 'Pastis, Campari, Grappa ou Suze', price: price('5.50') },
    { name: 'Amaretto', price: price('6.50') },
  ],
  desserts: [
    { name: 'Litchis au sirop', price: price('6.–') }, { name: 'Cheesecake au thé vert', price: price('9.–') },
    { name: 'Choux à la crème caramélisé', price: price('9.–') }, { name: 'Fraise caramélisée', price: price('9.–') },
    { name: 'Gâteau mochi au haricot rouge', price: price('4.– / pièce'), description: 'Nature, thé vert ou sésame noir' },
    { name: 'Mochi glacé', price: price('4.– / pièce'), description: 'Vanille, chocolat, thé vert ou fruit de la passion' },
    { name: 'Sorbet citron avec soju', price: price('9.–') }, { name: 'Sorbet framboise avec soju', price: price('9.–') },
    { name: 'Coupe café glacé', price: price('9.–') }, { name: 'Coupe Danemark', price: price('9.–') },
    { name: 'Boule de glace', price: price('4.–'), description: 'Thé vert, sésame noir, vanille, moka, citron ou framboise' },
  ],
}

const categories: { id: MenuKind; label: string }[] = [
  { id: 'entrees', label: 'Entrées' }, { id: 'sushi', label: 'Sushi' }, { id: 'barbecue', label: 'Barbecue' },
  { id: 'bibimbap', label: 'Bibimbap & soupes' }, { id: 'plats', label: 'Plats chauds' }, { id: 'nouilles', label: 'Riz & nouilles' },
  { id: 'boissons', label: 'Boissons' }, { id: 'vins', label: 'Vins & apéritifs' }, { id: 'desserts', label: 'Desserts & glaces' },
]

const BookingContext = createContext<() => void>(() => undefined)

function Mark() { return <span className="mark" aria-hidden="true"><i /><i /><i /><i /></span> }

function Navigation({ dark = false }: { dark?: boolean }) {
  const openBooking = useContext(BookingContext)
  return <nav className={`nav ${dark ? 'nav-dark' : ''}`} aria-label="Navigation principale">
    <Link className="brand" to="/" aria-label="Accueil Barbecue Coréen Au Gourmand"><Mark /> <span>AU GOURMAND</span></Link>
    <div className="nav-links"><a href="/#histoire">Le restaurant</a><a href="/#visite">Nous trouver</a></div>
    <div className="nav-actions"><a className="book-link" href="/menu_2026_complet.pdf">Menu</a><button className="book-link" type="button" onClick={openBooking}>Réserver</button></div>
  </nav>
}

function Footer() {
  return <footer><Link className="brand" to="/"><Mark /> <span>AU GOURMAND</span></Link><span>Barbecue Coréen Au Gourmand · Lausanne</span><div><a href="https://www.instagram.com/barbecuecoreen?igsi=d2JsY3I4MTR1N3Bx" target="_blank" rel="noreferrer">Instagram <span>↗</span></a><a href="https://www.thefork.fr/restaurant/barbecue-coreen-au-gourmand-r78528" target="_blank" rel="noreferrer">TheFork</a><a href="/#visite">Adresse</a></div></footer>
}

function Visit() {
  const openBooking = useContext(BookingContext)
  return <section className="visit-section" id="visite"><div><p className="eyebrow">Nous trouver</p><h2>À 10 minutes<br /><em>de la gare de Lausanne.</em></h2></div><div className="visit-details"><p>Du mardi au dimanche<br />11:00 — 14:30 · 18:00 — 22:00</p><p>26 avenue Louis-Ruchonnet<br />1003 Lausanne, Suisse</p><button type="button" onClick={openBooking}>Demander une réservation </button></div></section>
}

function BookingChoice({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="booking-choice" role="dialog" aria-modal="true" aria-labelledby="booking-choice-title" onMouseDown={(event) => event.stopPropagation()}><button className="close" type="button" aria-label="Fermer" onClick={onClose}>×</button><p className="eyebrow rust">Réservation</p><h2 id="booking-choice-title">Comment préférez-vous <em>réserver ?</em></h2><a className="booking-option phone-option" href="tel:+41213115474"><span>Réservation par téléphone</span><small>Plus rapide · 021 311 54 74</small><b>→</b></a><Link className="booking-option" to="/reservation" onClick={onClose}><span>Formulaire de réservation</span><small>Choisir votre date et votre créneau</small><b>→</b></Link></section></div>
}

type ReservationForm = { name: string; email: string; phone: string; date: string; time: string; guests: string; notes: string }
type Availability = { time: string; available: boolean }

function ReservationPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<ReservationForm>({ name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: '' })
  const [slots, setSlots] = useState<Availability[]>([])
  const [availabilityMessage, setAvailabilityMessage] = useState('')
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    if (!form.date) { setSlots([]); setAvailabilityMessage(''); return }
    const controller = new AbortController()
    setAvailabilityMessage('Vérification des créneaux…')
    setForm((current) => ({ ...current, time: '' }))

    fetch(`/.netlify/functions/availability?date=${encodeURIComponent(form.date)}&guests=${form.guests}`, { signal: controller.signal })
      .then(async (response) => {
        const data = await response.json() as { slots?: Availability[]; error?: string }
        if (!response.ok) throw new Error(data.error)
        setSlots(data.slots ?? [])
        setAvailabilityMessage(data.slots?.some((slot) => slot.available) ? 'Choisissez un créneau disponible.' : 'Aucun créneau disponible pour cette demande.')
      })
      .catch((error: Error) => { if (error.name !== 'AbortError') { setSlots([]); setAvailabilityMessage(error.message || 'Impossible de vérifier les créneaux.') } })

    return () => controller.abort()
  }, [form.date, form.guests])

  const updateField = (field: keyof ReservationForm, value: string) => setForm((current) => ({ ...current, [field]: value }))

  const submitReservation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitState('sending')
    setSubmitMessage('')
    try {
      const response = await fetch('/.netlify/functions/reserve', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, guests: Number(form.guests) }) })
      const data = await response.json() as { error?: string; confirmationEmailSent?: boolean }
      if (!response.ok) throw new Error(data.error)
      setSubmitState('success')
      setSubmitMessage(data.confirmationEmailSent ? 'Un e-mail de confirmation vient de vous être envoyé.' : 'Votre réservation est confirmée. Si vous ne recevez pas l’e-mail, appelez-nous au 021 311 54 74.')
      setForm({ name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: '' })
      setSlots([])
    } catch (error) {
      setSubmitState('error')
      setSubmitMessage(error instanceof Error ? error.message : 'Une erreur est survenue. Veuillez réessayer.')
    }
  }

  return <main className="reservation-page"><header className="menu-page-nav"><Navigation dark /></header><section className="reservation-section"><div className="reservation-copy"><p className="eyebrow rust">Réservation</p><h1>Votre table,<br /><em>en quelques instants.</em></h1><p>Choisissez une date et un créneau. Si celui-ci est disponible, votre réservation est confirmée immédiatement.</p><Link className="text-link" to="/">Retour à l’accueil <span>→</span></Link></div>{submitState === 'success' ? <div className="reservation-success"><p className="eyebrow rust">Réservation confirmée</p><h2>Votre table est <em>réservée.</em></h2><p>{submitMessage}</p><p>Pour des questions, n’hésitez pas d’appeler <a href="tel:+41213115474">021 311 54 74</a>.</p><button type="button" className="reservation-submit" onClick={() => navigate('/')}>Fermer le formulaire</button></div> : <form className="reservation-form" name="reservation" onSubmit={submitReservation}><a className="reservation-phone" href="tel:+41213115474">Réservation rapide par téléphone <strong>021 311 54 74</strong></a><p className="reservation-help">Les réservations sont possibles le jour même selon les créneaux restants, ainsi que les jours suivants. Le restaurant est fermé le lundi.</p><label className="honeypot">Ne pas remplir ce champ<input name="bot-field" tabIndex={-1} autoComplete="off" /></label><div className="form-grid"><label>Nom complet<input required value={form.name} onChange={(event) => updateField('name', event.target.value)} /></label><label>E-mail<input type="email" required value={form.email} onChange={(event) => updateField('email', event.target.value)} /></label><label>Téléphone<input type="tel" required value={form.phone} onChange={(event) => updateField('phone', event.target.value)} /></label><label>Nombre de personnes<select value={form.guests} onChange={(event) => updateField('guests', event.target.value)}>{Array.from({ length: 12 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1} {index === 0 ? 'personne' : 'personnes'}</option>)}</select></label><label>Date<input type="date" required min={new Date().toISOString().slice(0, 10)} value={form.date} onChange={(event) => updateField('date', event.target.value)} /></label><label>Créneau<select required disabled={!slots.length} value={form.time} onChange={(event) => updateField('time', event.target.value)}><option value="">Choisir un créneau</option>{slots.filter((slot) => slot.available).map((slot) => <option key={slot.time} value={slot.time}>{slot.time}</option>)}</select></label></div><p className="availability-message" aria-live="polite">{availabilityMessage}</p><label>Message <span>facultatif</span><textarea rows={4} value={form.notes} onChange={(event) => updateField('notes', event.target.value)} placeholder="Allergies, occasion particulière…" /></label><button className="reservation-submit" type="submit" disabled={submitState === 'sending' || !form.time}>{submitState === 'sending' ? 'Confirmation en cours…' : 'Confirmer ma réservation'}</button>{submitMessage && <p className={`form-message ${submitState}`} role="status">{submitMessage}</p>}<p className="form-note">La confirmation est envoyée directement par e-mail.</p></form>}</section><Footer /></main>
}

function MenuContent() {
  const [active, setActive] = useState<MenuKind>('entrees')
  return <section className="menu-section" id="menu"><header className="section-heading"><div><p className="eyebrow rust">La carte</p><h2>Des saveurs à placer<br /><em>au milieu de la table.</em></h2></div><p>Découvrez l’ensemble de notre carte : barbecue coréen, sushi, plats chauds, boissons et desserts.</p></header><div className="menu-layout"><aside className="menu-aside"><span>01 — 09</span><div>{categories.map((category, index) => <button key={category.id} className={active === category.id ? 'active' : ''} onClick={() => setActive(category.id)}><b>{String(index + 1).padStart(2, '0')}</b>{category.label}</button>)}</div><small>Les prix et les plats sont retranscrits à partir de la carte du restaurant.</small></aside><div className="menu-card" aria-live="polite"><div className="card-topline"><span>{categories.find(c => c.id === active)?.label}</span><span>Prix</span></div>{menu[active].map((item) => <article className="dish" key={item.name}><div><h3>{item.name} {item.note && <small>{item.note}</small>}</h3>{item.description && <p>{item.description}</p>}</div><strong>{item.price}</strong></article>)}<p className="menu-footnote">Les disponibilités et prix peuvent évoluer ; confirmez-les directement auprès du restaurant.</p></div></div></section>
}

function Home() {
  return <main><section className="hero" id="top"><Navigation /><div className="hero-content"><p className="eyebrow">Barbecue coréen · Lausanne</p><h1>Le goût du feu,<br /><em>à partager.</em></h1><p className="intro">Des grillades marinées, des plats coréens généreux et le plaisir de se retrouver autour de la table.</p><a className="round-button" href="/menu_2026_complet.pdf"><span>Découvrir la carte</span><b>→</b></a></div><div className="hero-footer"><span>Mar—Dim / 11:00—14:30 & 18:00—22:00</span><a className="scroll-note" href="#histoire" style={{ textDecoration: 'none' }}>Découvrir <i /></a><span>26 av. Louis-Ruchonnet<br />1003 Lausanne</span></div></section><section className="intro-section" id="histoire"><div className="vertical-label">Cuisine coréenne · Lausanne</div><div className="intro-copy"><p className="eyebrow rust">Notre table</p><h2>Le barbecue, au<br /><em>cœur du repas.</em></h2><p>À deux pas de la gare CFF, Au Gourmand vous invite à découvrir une cuisine coréenne conviviale : des viandes marinées à griller, des bibimbaps, des sushi et des nouilles à savourer ensemble.</p><a className="text-link" href="#visite">Nous rendre visite <span>→</span></a></div><div className="stamp">맛<br />있<br />게</div></section><Visit /><Footer /></main>
}

function MenuPage() {
  return <main className="menu-page"><header className="menu-page-nav"><Navigation dark /></header><MenuContent /><Visit /><Footer /></main>
}

function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  return <BookingContext.Provider value={() => setBookingOpen(true)}><BrowserRouter><Routes><Route path="/" element={<Home />} /><Route path="/menu" element={<MenuPage />} /><Route path="/reservation" element={<ReservationPage />} /><Route path="*" element={<Home />} /></Routes>{bookingOpen && <BookingChoice onClose={() => setBookingOpen(false)} />}</BrowserRouter></BookingContext.Provider>
}

export default App
