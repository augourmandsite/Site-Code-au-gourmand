import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
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

function Mark() { return <span className="mark" aria-hidden="true"><i /><i /><i /><i /></span> }

function Navigation({ dark = false }: { dark?: boolean }) {
  return <nav className={`nav ${dark ? 'nav-dark' : ''}`} aria-label="Navigation principale">
    <Link className="brand" to="/" aria-label="Accueil Barbecue Coréen Au Gourmand"><Mark /> <span>AU GOURMAND</span></Link>
    <div className="nav-links"><a href="/#histoire">Le restaurant</a><a href="/#visite">Nous trouver</a></div>
    <div className="nav-actions"><Link className="menu-link" to="/menu">Menu</Link><a className="book-link" href="https://www.thefork.fr/restaurant/barbecue-coreen-au-gourmand-r78528" target="_blank" rel="noreferrer">Réserver <span>↗</span></a></div>
  </nav>
}

function Footer() {
  return <footer><Link className="brand" to="/"><Mark /> <span>AU GOURMAND</span></Link><span>Barbecue Coréen Au Gourmand · Lausanne</span><div><a className="instagram-link" href="https://www.instagram.com/barbecuecoreen?igsi=d2JsY3I4MTR1N3Bx" target="_blank" rel="noreferrer">Instagram <span>↗</span></a><a href="https://www.thefork.fr/restaurant/barbecue-coreen-au-gourmand-r78528" target="_blank" rel="noreferrer">TheFork</a><a href="/#visite">Adresse</a></div></footer>
}

function Visit() {
  return <section className="visit-section" id="visite"><div><p className="eyebrow">Nous trouver</p><h2>À deux pas<br /><em>de la gare.</em></h2></div><div className="visit-details"><p>Du mardi au samedi<br />11:00 — 14:30 · 18:00 — 22:00</p><p>26 avenue Louis-Ruchonnet<br />1003 Lausanne, Suisse</p><a href="https://www.thefork.fr/restaurant/barbecue-coreen-au-gourmand-r78528" target="_blank" rel="noreferrer">Réserver sur TheFork <span>↗</span></a></div><div className="visit-mark"><Mark /></div></section>
}

function MenuContent() {
  const [active, setActive] = useState<MenuKind>('entrees')
  return <section className="menu-section" id="menu"><header className="section-heading"><div><p className="eyebrow rust">La carte</p><h2>Des saveurs à placer<br /><em>au milieu de la table.</em></h2></div><p>Découvrez l’ensemble de notre carte : barbecue coréen, sushi, plats chauds, boissons et desserts.</p></header><div className="menu-layout"><aside className="menu-aside"><span>01 — 09</span><div>{categories.map((category, index) => <button key={category.id} className={active === category.id ? 'active' : ''} onClick={() => setActive(category.id)}><b>{String(index + 1).padStart(2, '0')}</b>{category.label}</button>)}</div><small>Les prix et les plats sont retranscrits à partir de la carte du restaurant.</small></aside><div className="menu-card" aria-live="polite"><div className="card-topline"><span>{categories.find(c => c.id === active)?.label}</span><span>Prix</span></div>{menu[active].map((item) => <article className="dish" key={item.name}><div><h3>{item.name} {item.note && <small>{item.note}</small>}</h3>{item.description && <p>{item.description}</p>}</div><strong>{item.price}</strong></article>)}<p className="menu-footnote">Les disponibilités et prix peuvent évoluer ; confirmez-les directement auprès du restaurant.</p></div></div></section>
}

function Home() {
  return <main><section className="hero" id="top"><Navigation /><div className="hero-content"><p className="eyebrow">Barbecue coréen · Lausanne</p><h1>Le goût du feu,<br /><em>à partager.</em></h1><p className="intro">Des grillades marinées, des plats coréens généreux et le plaisir de se retrouver autour de la table.</p><Link className="round-button" to="/menu"><span>Découvrir la carte</span><b>→</b></Link></div><div className="hero-footer"><span>Mar—Sam / 11:00—14:30 & 18:00—22:00</span><span className="scroll-note">Découvrir <i /></span><span>26 av. Louis-Ruchonnet<br />1003 Lausanne</span></div></section><section className="intro-section" id="histoire"><div className="vertical-label">Cuisine coréenne · Lausanne</div><div className="intro-copy"><p className="eyebrow rust">Notre table</p><h2>Le barbecue, au<br /><em>cœur du repas.</em></h2><p>À deux pas de la gare CFF, Au Gourmand vous invite à découvrir une cuisine coréenne conviviale : des viandes marinées à griller, des bibimbaps, des sushi et des nouilles à savourer ensemble.</p><a className="text-link" href="#visite">Nous rendre visite <span>→</span></a></div><div className="stamp">맛<br />있<br />게</div></section><Visit /><Footer /></main>
}

function MenuPage() {
  return <main className="menu-page"><header className="menu-page-nav"><Navigation dark /></header><MenuContent /><Visit /><Footer /></main>
}

function App() {
  return <BrowserRouter><Routes><Route path="/" element={<Home />} /><Route path="/menu" element={<MenuPage />} /><Route path="*" element={<Home />} /></Routes></BrowserRouter>
}

export default App
