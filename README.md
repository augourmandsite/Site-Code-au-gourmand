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

## Réservations avec Supabase

La page `/reservation` vérifie les créneaux via des fonctions Netlify, puis enregistre les demandes dans Supabase. La vérification et l’insertion sont atomiques afin d’éviter une surréservation.

1. Créez un projet Supabase, puis exécutez [supabase/schema.sql](supabase/schema.sql) dans **SQL Editor**.
2. Dans Netlify → **Site configuration** → **Environment variables**, ajoutez :

   ```text
   SUPABASE_URL=https://votre-projet.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=votre-cle-service-role
   ```

3. Ajustez si nécessaire la capacité maximale dans Supabase :

   ```sql
   update public.restaurant_settings set max_covers_per_slot = 30 where id = true;
   ```

Ne placez jamais la clé `SUPABASE_SERVICE_ROLE_KEY` dans le code frontend ou dans GitHub. Après ajout des variables, redéployez le site dans Netlify.

Pour tester les fonctions localement, créez un fichier `.env` à partir de `.env.example`, ajoutez vos clés, puis lancez :

```bash
npx netlify dev
```

## E-mails de réservation avec Resend

Après avoir vérifié le domaine d’envoi dans Resend, ajoutez ces variables dans Netlify → **Project configuration** → **Environment variables** :

```text
RESEND_API_KEY=re_...
RESEND_FROM=Au Gourmand <reservations@au-gourmand.ch>
RESERVATION_HOST_EMAIL=augourmandsite@gmail.com
```

Chaque réservation enregistrée envoie alors un récapitulatif à l’équipe et un e-mail de confirmation au client. Ces clés doivent être ajoutées uniquement dans Netlify, jamais dans GitHub.

## GitHub

Le dépôt distant est :

```text
git@github-augourmand:augourmandsite/Site-Code-au-gourmand.git
```
