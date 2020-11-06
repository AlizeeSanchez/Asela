# Asela : Association Sauve Et Les Animaux

Site web pour association de protection animal avec interface gestion des animaux pour les bénévoles.

## Le brief

L'association ASELA existe depuis 2017, n'ayant aucune structure d'accueil, le site web est promordiale poiur presenter chacun de ses animaux, de plus la gestion ed l'association se fait actuellement aux moyens de drives et tableaux Exel... Pas pratique pour les benevoles....

Des chiens et chats sont proposé à l'adoption, les futur adoptant doivent remplir un questionnaire pour rencontrer l'un de ces animaux et l'adopter.
Chaque animal aura sa propre fiche de presentation, avec des photos et tous les renseignements importants a savoir a leurs sujets ( Nom, espece, race, age, Robe, ententes, une histoire et un descriptif du caractere.

L'association fait plusieurs fois par ans des evenements pour recuperer des dons ( marché au puces, opperations caddies, brocante, furum des associations ... )

Nos benevoles sont en charges de :
- Remplir de cahier entrer et sortie des animaux
- Faire la fiche des animaux a l'aide du formulaire "infos sur l'animal" recus par la famille d'accueil ou l'ancien proprietaire.
- Prendres rendez-vous avec les veterinaires partenaires qui ont tous des tarifs préférenciels differents
- Gerer le calendrier des rappels vaccins et sterilisations
- Traiter les questionnaires adoptions
- Fixer des dates de rencontres
- Faire les contrats d'adoptions
- Enlever la fiche de l'animal adopté / décedé du site web
- Prendres des nouvelles des animaux adoptés

## Pages coté visiteurs

méthode | chemin | description | retour
-------- | ------ | ---------- | -------
GET | / | Presentation de l'association, evenements à venir, animaux stars(à l'adoption depuis le plus longtemps*), chiffres des adoptions.
GET | /Nos animaux | Choix du type d'animal à l'adoption (Chien, chiot , chat, chaton) dont on veux voir la liste.
GET | /NosChiens | liste des chiens a l'adoption **actives**, chaque animal doit avoir une colonne calculée nommée _on_, un booléen qui indique si l'animal est visible a l'adoption au moment de la requête |
GET | /NosChiots | liste des chiots a l'adoption **actives**, chaque animal doit avoir une colonne calculée nommée _on_, un booléen qui indique si l'animal est visible a l'adoption au moment de la requête | 
GET | /NosChats | liste des chats a l'adoption **actives**, chaque animal doit avoir une colonne calculée nommée _on_, un booléen qui indique si l'animal est visible a l'adoption au moment de la requête | 
GET | /NosChatons | liste des chatons a l'adoption **actives**, chaque animal doit avoir une colonne calculée nommée _on_, un booléen qui indique si l'animal est visible a l'adoption au moment de la requête | 
GET | /conditions | Conditions et frais d'adoptions |
GET | /demarches | Les démarches adoptions au seint de notre association |
GET | /evenenements | liste des evenements passé et a venir |
GET | /
GET | /contact | formulaire de contact | formulaire
PUT | /contact | renvois du formulaire de contact | message de validation de l'envois
GET | /conditionsAdoptions | Tarifs et conditions d'adoptions
GET | /formulaireAdoption | formulaire pour rencontrer/ adopter un anilmal | formulaire
PUT | /formulaireAdoption | formulaire pour rencontrer/ adopter un anilmal | message de validation de l'envois
GET | /formulaireInfosAnimal | formulaire pour presenter l'animal à l'adoption | formulaire
PUT | /formulaireInfosAnimal | formulaire pour presenter l'animal à l'adoption | message de validation de l'envois
