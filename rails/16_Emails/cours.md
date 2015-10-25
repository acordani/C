##Mailing

###Mailing Transactionnel
Mail envoyé à une personne

On va utiliser un protocole SMTP(Simple Mail Transfert Protocol).

C'est un protocole au même titre que HTML est un protocole

HTTP est une facon de parler entre un client et un serveur. Le client c'est le navigateur web(chrome ou firefox). Et le serveur est un serveur web(application Ruby on rails).
SMTP, c'est le meme principe. Le client est par exemple gmail ou outlook et le serveur mail c'est quelquechose qui recoit les demandes d'email et qui va les traiter.

Pour envoyer des mails avec Rails, ca s'appelle Action Mailer.

On va avoir une premiere chose qui va jouer le role de controller. qui va definir les parametres d'expedition du mail et le contenu de l'email va etre rendu dans une vue.

On va d'abord generer un mailer

rails g mailer Usermailer welcome

Usermailer est le nom
welcome est l'action (1er mail)

On aurait pu mettre plusieurs actions comme welcome goodbye

5:40
###Mailing Marketing
Mail envoyé à plein de personne
