# 🚗 Auto-Loc - Plateforme de Location de Véhicules

Bienvenue sur le code source de **Auto-Loc** ! Ce projet a été réalisé par **[Ton Prénom Nom]** et **[Prénom Nom de ton binôme]** dans le cadre de notre projet "Build & Ship" (Architecture Cloud). 

Notre objectif ici a été d'utiliser le "Vibe Coding" pour prototyper rapidement une application fonctionnelle et la déployer dans le Cloud.

---

## 🗺️ 1. Le Mapping de notre Thème
Pour notre application de location de voitures, voici comment nous avons structuré notre base de données sur Supabase :

* **Table A (Les Utilisateurs) :** Ce sont nos **Clients**. Ils sont gérés de manière sécurisée via l'authentification de Supabase (Supabase Auth).
* **Table B (Les Ressources) :** Ce sont nos **Voitures** à louer. La table contient toutes les infos (marque, modèle, prix de location par jour, disponibilité).
* **Table C (Les Interactions) :** Ce sont les **Réservations**. C'est la table qui fait le lien entre un Client et une Voiture, en précisant les dates de location et le statut.
* **Le Fichier (Storage) :** C'est la **Photo du permis de conduire**. Le client doit obligatoirement l'uploader au moment de sa réservation.

---

## 🏗️ 2. Notre Analyse d'Architecture Cloud

### Pourquoi Vercel + Supabase est un choix financier plus logique ?
Si nous avions voulu lancer "Auto-Loc" avec un serveur physique classique, nous aurions dû acheter le matériel nous-mêmes avant même d'avoir notre premier client. C'est ce qu'on appelle le **CAPEX** (dépenses d'investissement). C'est très risqué et coûteux pour un lancement.

En choisissant Vercel et Supabase, nous fonctionnons sur un modèle **OPEX** (dépenses opérationnelles). C'est du "Pay-as-you-go" : on ne paie que ce que l'application consomme réellement. S'il n'y a pas de trafic, le coût est de zéro. C'est le moyen le plus logique et le plus sûr financièrement pour tester une idée sur le marché.

### La gestion de la scalabilité : Vercel vs Data Center local
Imaginons que notre site fasse le buzz pendant les vacances d'été. Avec un vrai **Data Center physique**, nous aurions un gros problème : il faudrait commander de nouveaux serveurs en urgence, les brancher dans des racks, et s'assurer que la **climatisation** est assez forte pour éviter la surchauffe. C'est lent et compliqué.

À l'inverse, **Vercel** utilise une architecture "Serverless" et gère la scalabilité automatiquement. Si beaucoup d'utilisateurs se connectent d'un coup, le Cloud alloue instantanément plus de puissance à notre site, sans que nous n'ayons rien à configurer. L'application s'adapte toute seule.

### Données Structurées et Non-structurées dans Auto-Loc
* **La donnée structurée :** Ce sont toutes les informations textuelles et numériques rangées dans nos Tables (les noms des clients, les modèles de voitures, les dates de réservation). Elles sont faciles à classer et à rechercher.
* **La donnée non-structurée :** C'est la **photo du permis de conduire**. Une image est un fichier lourd qui n'a pas de structure de texte fixe (c'est un ensemble de pixels). On ne peut pas la mettre dans une case de tableau classique, c'est pour cela qu'on utilise un espace de stockage dédié (Supabase Storage) pour l'héberger.
