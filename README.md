# Barbecue Coréen Au Gourmand

Site vitrine du restaurant, construit avec React, TypeScript et Vite.

## Lancer le site

Pré-requis : Node.js 20 ou plus récent.

```bash
npm install
npm run dev
```

Ouvrez ensuite l’adresse indiquée dans le terminal, généralement `http://localhost:5173`.

Autres commandes utiles :

```bash
npm run build    # vérifie TypeScript et génère le site dans dist/
npm run preview  # affiche localement la version générée
npm run lint     # contrôle rapide du code
```

## Modifier le site

- `src/App.tsx` : textes, horaires, liens, carte, prix et navigation.
- `src/App.css` : couleurs, mise en page et style responsive.
- `public/restaurant.png` : photo d’ouverture du site.
- `public/_redirects` : redirection nécessaire pour que la page `/menu` fonctionne sur Netlify.

La page d’accueil est disponible sur `/` et la carte complète sur `/menu`.

## Déploiement sur Netlify

Le projet contient déjà la configuration dans `netlify.toml` :

- Build command : `npm run build`
- Publish directory : `dist`

Pour déployer :

1. Connectez le dépôt GitHub dans Netlify.
2. Choisissez la branche `main`.
3. Cliquez sur **Deploy site**.

Chaque `git push` sur `main` déclenche ensuite un nouveau déploiement automatiquement.

## GitHub

Le dépôt distant est :

```text
git@github-augourmand:augourmandsite/Site-Code-au-gourmand.git
```
