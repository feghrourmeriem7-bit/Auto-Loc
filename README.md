# Auto-Loc - Plateforme de Location de voitures

Dans le cadre de **Projet de Fin de Module : "Build & Ship" - Architecture Cloud & Vibe Programming**, on a développées **Auto-Loc** une platforme de location de véhicule selon leurs disponibilités. Le projet est réalisé par **Bouzena Imane** , **Feghrour Meryem** et **Mouloud Zoubida** 


---

## 1. Le Mapping de notre Thème

Notre projet **Auto-Loc consiste** à développer une plateforme de location de voiture en respectant une architecture relationnelle, où les clients peuvent consulter et réserver une voiture disponible, tout en accédant à un espace personnel sécurisé permettant la gestion de leurs réservations et documents (Ce qu'on appelle l'Extranet).

* **Table A (Profiles) :** Contient les ID des clients et l'admin, géré par Supabase Auth.
* **Table B (Cars) :** Contient les voitures disponible à la location et leurs caractéristiques(modéle, prix, disponibilité).
* **Table C (Reservations) :** Table de jointure entre Profiles et Cars, contenant les clés étrangères (user_id, car_id) ainsi que les informations liées à la réservation (date, statut…).
* **Le Fichier (Storage) :** Stocke la photo du permis de conduire uploadée par le client dans Supabase Storage.
* **Tables Supplémentaire** pour garantire un fonctionement de qualitée de la plateforme:
  * **Tables de Favorites:** permet à un utilisateur de sauvegarder les voitures.
  * **Tables de notifications:** permet de gérer les messages liés aux actions de l’utilisateur.

---

##  2. Notre Analyse d'Architecture Cloud

 ## 2.1 Pourquoi l'utilisation de Vercel + Supabase est financièrement plus logique pour lancer ce projet qu'un serveur classique:
   Vercel et Supabase est le choix idéale pour lancer ce projet car tout d'abord on paie ce qu'on utilise seulement et ça illustre le fait OPEX on dépense régulièrement selon l'état d'avancement de projet. C'est ce qu'on a vu dans le cours sur les objectifs business du SI : privilégier l'efficacité opérationnelle et réduire les pertes. 
   
  En revanche, si on achète un serveur classique on dépense de l'argent une fois  pour acheter du matériels (climatisation, onduleur, sécurité...) sans savoir si le projet va réussir ou non c'est ce qu'on n'appelle du CAPEX. Et pour un projet comme Auto-Loc, le choix du OPEX est le meilleure choix économique et flexible.

   
  ## 2.2 Gestion de la scalabilité: Vercel VS Data Center physique local :
  
   En ce qui concerne la scalabilité, si on a travaillé avec un Data Center physique local pour un projet comme Auto-Loc , il nous faut toujours de vérifier la capacités des serveurs quand le nombre d'utilisateurs augmente  si on aura besoin d'autres puis gérer le matériels (espace, chaleur, maintenance). Dans le cours sur les Data Centers, on a vu qu'il faut de la climatisation, des onduleurs, une sécurité physique et une surveillance. Tout cela coûte cher et demande du temps. 
   
   Avec Vercel on a rien à gérer c'est lui qui s'occupe de la gestion des utilisateurs. Cela permet une scalabilité automatique, sans intervention humaine ni gestion d’infrastructure physique.
  Donc **Vercel** est moins cher et permet de garder de l'argent pour investir dans d'autres parties du projet comme le marketing et l'amélioration de l'application.
   
   ## 2.3 Données Structuré et Non Structurés:
   Dans notre application ce qui **représentent la données structuré** c'est à dire les données **des tables SQL** qui sont : les id d'utilisateurs et des voitures **des clés étrangères, conformément aux principes des SGBD**, les information des clients (nom, prénom), les caractéristiques de chaque véhicule (modèle, brand, prix). Elles ont un format fixe et sont faciles à ranger dans des colonnes.         
   
   Pour **les données non structurées** qui se situe dans Supabase Storage on a la photo du permis de conduite car l'image **n'as pas un format fixe** c'est une données **sous forme de fichiers** et ne suivent pas une structure tabulaire **on garde seulement son lien** dans la table de réservation, ce qui fait le pont entre le stockage des fichiers et la base de données relationnelle.
   

