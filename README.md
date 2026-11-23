# EscapeStress — Fragment de rêve 2

Prototype V1 d’une messagerie de travail interactive pour le fragment de rêve 2. Le module est autonome et fournit les indices de l’énigme 11 ; la saisie et la validation de la réponse restent dans le jeu principal.

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Ouvrir l’URL indiquée par Vite.

Le projet utilise le chargeur de configuration `runner` de Vite pour rester compatible avec certains dossiers synchronisés OneDrive.

Le workflow GitHub Pages publie automatiquement le dossier `dist` à chaque push sur `main`. L’URL attendue sera `https://colibriou.github.io/EscapeStress/` une fois le premier déploiement terminé.

## Build de production

```bash
npm run build
npm run preview
```

## URL de retour optionnelle

Le lien `Retourner dans le jeu principal` est masqué par défaut. Pour l’afficher, ajouter un paramètre `returnUrl` à l’URL du fragment :

```text
https://exemple.test/fragment-2/?returnUrl=https%3A%2F%2Fexemple.test%2Fsalle-2
```

Les URL `http`, `https` et les chemins relatifs sont acceptés. Aucune fermeture automatique de la page n’est effectuée.

## Contenu

Les conversations et les textes pédagogiques sont centralisés dans [src/config/conversations.ts](./src/config/conversations.ts). Les paramètres d’application et la gestion de l’URL de retour sont dans [src/config/appConfig.ts](./src/config/appConfig.ts).

## Vérifications manuelles prévues

- ouverture de la messagerie depuis l’introduction ;
- consultation libre des trois conversations et du brouillon ;
- présence textuelle des états « Consulté » et « Non consulté » ;
- navigation clavier et focus visible ;
- affichage mobile et défilement des messages ;
- réduction des effets visuels ;
- affichage conditionnel du lien de retour avec et sans `returnUrl` ;
- absence de champ de réponse et de validation locale ;
- build TypeScript et production sans erreur.
