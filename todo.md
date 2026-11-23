# Projet — Fragment de rêve 2 : fenêtre de messagerie

## Objectif général

Créer, en **Three.js**, le contenu du fragment de rêve 2 sous la forme d’une fenêtre d’ordinateur contenant une messagerie. Le jeu sérieux principal permet déjà d’atteindre ce fragment grâce à un lien cliquable. Cette expérience doit donc aider les joueurs à découvrir la réponse de l’énigme ; ils la recopieront ensuite au format texte dans le jeu principal, qui assure la validation.

## Énigme 11 — Salle 2

### Objectif pédagogique

Identifier le recours au soutien comme une ressource et reconnaître que demander de l’aide ne signifie pas être incapable.

### Idée retenue

Face à une situation stressante, on peut chercher des informations et du soutien au-delà de ses propres ressources.

### Mise en situation

Dans son rêve, Mélissa pense devoir tout gérer seule. Les difficultés s’accumulent et la pression monte. Pour avancer, le joueur doit mobiliser une ressource extérieure, comme il pourrait le faire dans la vraie vie.

### Question affichée dans la messagerie

> « Je dois me débrouiller seule… » Cette pensée retient Mélissa dans son rêve. Quelle ressource pourrait-elle mobiliser pour avancer ?

### Réponse à découvrir et à saisir dans le jeu principal

La réponse attendue est une réponse textuelle ouverte autour de la notion de **soutien** :

- soutien ;
- le soutien ;
- aide ;
- demander de l’aide.

Le fragment 2 ne valide pas la réponse et ne demande pas au joueur de la saisir. Il doit seulement fournir suffisamment d’indices pour que le joueur identifie la réponse, la mémorise ou la recopie, puis la renseigne dans le champ prévu par le jeu sérieux principal.

### Feedback pédagogique à afficher dans le fragment

**Mélissa n’a pas à tout porter seule.**

Quand les difficultés s’accumulent, penser que l’on doit tout gérer seul peut ajouter de la pression. Demander du soutien permet de chercher des ressources pour faire face à la situation : clarifier ce qui est attendu, partager une tâche ou discuter d’un délai. Cela ne supprime pas forcément le stress, mais peut rendre la situation plus facile à gérer.

### Débriefing

Prévoir une question finale :

> Dans une situation stressante, quel soutien pourrais-tu mobiliser ?

Prévoir une réponse libre ou quelques exemples de ressources : proche, collègue, enseignant, professionnel, information fiable ou répartition d’une tâche.

## Direction artistique et expérience

- [ ] Représenter l’expérience comme une fenêtre d’ordinateur ouverte sur une application de messagerie.
- [ ] Créer une fenêtre principale avec barre de titre, boutons réduire/agrandir/fermer et zones de conversation.
- [ ] Concevoir le fragment comme une expérience autonome ouverte depuis un lien du jeu principal.
- [ ] Afficher clairement qu’il s’agit du **fragment de rêve 2**.
- [ ] Afficher la conversation de Mélissa avec un ou plusieurs messages qui installent la situation stressante.
- [ ] Ajouter les interactions de messagerie nécessaires à la consultation des indices.
- [ ] Prévoir un état visuel pour les messages reçus, envoyés, non lus et déverrouillés.
- [ ] Utiliser des graphiques 2D avancés pour les éléments d’interface : panneaux, indicateur de pression, transitions et effets de messagerie.
- [ ] Prévoir une ambiance visuelle cohérente avec un rêve : légère distorsion, halos, particules ou arrière-plan animé, sans nuire à la lisibilité.
- [ ] Garantir un contraste suffisant et une taille de texte lisible.

## Scénario de jeu

- [ ] Afficher un écran d’introduction court expliquant que Mélissa pense devoir tout gérer seule.
- [ ] Prévoir l’ouverture du fragment depuis le lien fourni par le jeu principal.
- [ ] Afficher les messages nécessaires pour comprendre le problème.
- [ ] Mettre en scène des indices qui conduisent à la notion de soutien ou d’aide.
- [ ] Permettre au joueur de relire les messages et de retrouver facilement l’information importante.
- [ ] Afficher explicitement ou progressivement la phrase « Mélissa n’a pas à tout porter seule ».
- [ ] Indiquer que la réponse doit être reportée dans le jeu principal.
- [ ] Prévoir un lien ou un bouton de retour vers le jeu principal si son intégration le permet.
- [ ] Ne pas implémenter de validation de réponse dans le fragment 2.
- [ ] Ne pas implémenter de progression locale indépendante du jeu principal.

## Architecture Three.js

- [ ] Initialiser la scène, la caméra et le renderer.
- [ ] Choisir une caméra orthographique ou une caméra perspective adaptée à une interface 2D dans un espace 3D.
- [ ] Créer un système de calques pour séparer : fond, fenêtre, messages, indices, feedback et effets.
- [ ] Créer les composants visuels réutilisables : `Window`, `Panel`, `MessageBubble`, `Button`, `Hint`, `TextBlock`.
- [ ] Mettre en place le redimensionnement responsive du renderer.
- [ ] Gérer le pointeur, le clic et le survol des éléments interactifs.
- [ ] Ajouter un système de scènes ou d’états : introduction, conversation, indices et conclusion.
- [ ] Centraliser les textes de l’énigme dans une configuration de données plutôt que dans le code d’affichage.
- [ ] Prévoir une couche d’accessibilité HTML au-dessus ou à côté du canvas pour les boutons essentiels et les textes lisibles.
- [ ] Prévoir un mécanisme d’ouverture depuis le jeu principal et, si nécessaire, un retour vers celui-ci.

## Validation fonctionnelle du fragment 2

- [ ] La question est compréhensible sans explication orale supplémentaire.
- [ ] Le joueur peut identifier la notion de soutien ou d’aide à partir des messages.
- [ ] Le joueur comprend que la réponse est à reporter dans le jeu principal.
- [ ] Le fragment ne comporte aucun champ de réponse ni validation locale.
- [ ] Le feedback explique pourquoi le soutien est une ressource.
- [ ] Le joueur sait quand il a obtenu l’information nécessaire.
- [ ] Le lien de retour vers le jeu principal fonctionne, si prévu dans l’intégration.
- [ ] L’interface reste utilisable sur différentes tailles d’écran.
- [ ] Les animations peuvent être réduites ou désactivées si nécessaire.

## Livrables

- [ ] Prototype Three.js fonctionnel.
- [ ] Interface de messagerie du fragment 2.
- [ ] Fragment 2 autonome accessible depuis le lien du jeu principal.
- [ ] Indices textuels permettant de trouver la réponse.
- [ ] Indication claire de report de la réponse dans le jeu principal.
- [ ] Feedback pédagogique intégré à la messagerie.
- [ ] Données de l’énigme séparées de la logique d’interface.
- [ ] README avec instructions d’installation et de lancement.
- [ ] Tests manuels documentés, notamment l’ouverture depuis le jeu principal et le retour vers celui-ci.

## Questions à préciser

- [ ] Confirmer si le jeu principal transmet une URL, un identifiant de fragment ou un paramètre d’ouverture.
- [ ] Confirmer le comportement attendu du lien de retour vers le jeu principal.
- [ ] Définir le style graphique : réaliste, néon, rêve éveillé ou interface rétro.
- [ ] Confirmer si le feedback pédagogique est entièrement affiché dans le fragment ou en partie dans le jeu principal.
- [ ] Définir le mode technique d’intégration : page autonome, nouvelle route ou module embarqué.
