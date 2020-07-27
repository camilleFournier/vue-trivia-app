# vue-trivia-app

Ce projet utilise vue-cli et dépend de 5 librairies:
    * axios: pour les requêtes API
    * vuetify: pour les éléments graphiques
    * vue-i18n: pour traduire les textes statiques de l'application
    * vuex: pour maintenir un état centralisé de l'application (similaire à Redux pour React)
    * vue-router: pour permettre le routage dans l'application

Il fait appel à 2 API:
    * OpenTrivia (https://opentdb.com): pour récupérer les catégories et questions de quizz
    * My Memory (https://rapidapi.com/translated/api/mymemory-translation-memory/details): pour traduire les catégories et questions de quizz

Pour faire fonctionner l'application en local, il faudra une clé pour l'API de My Memory: connectez-vous à RapidApi, prenez un abonnement gratuit à MyMemory, copiez la clé et définissez la variable d'environnement VUE_APP_MM_API_KEY.

Vous pouvez aussi tester l'application déployée sur : https://nervous-roentgen-f870a0.netlify.app/

## Description de l'application

L'application contient 3 écrans différents: Home, Quizz et Score.

Dans Home, l'utilisateur peut paramétrer dans Home la catégorie et la langue utilisée pour les questions. En changeant le paramètre de langue, le texte de l'application change automatiquement. Un bouton permet de commencer le quizz.

Dans Quizz, l'utilisateur répond une par une à une série de 10 questions. Chaque question comporte 4 réponses possibles. L'application passe automatiquement à la question suivante au bout de 10s. Une barre de progression linéaire (et le numéro de la question) indique de l'avancement du quizz. Un cercle de progression (et un chiffre) indique le temps restant pour répondre. 

Dans Score, l'utilisateur visualise son score, le détails des questions posées et les bonnes réponses. Les bonnes réponses apparaissent en vert si l'utilisateur avait juste et rouge sinon. 2 boutons permettent de refaire un quizz: un bouton redirige l'utilisateur vers l'accueil pour changer les paramètres, et l'autre recommence un nouveau quizz directemnt.  


## Difficultées rencontrées

### VueJS

La plus grande difficulté a été l'apprentissage de Vue.js et de Vuex et leurs concepts. Etant similaire à ReactJS, il est tentant d'appliquer directement la logique de React sur Vue (le state de React = data de Vue, les méthodes de React.component = methods de Vue). Cependant, cela ne permet pas d'exploiter tout le potentiel de VueJS (e.g. lier un input et un data avec un simple v-model sans coder la mise à jour du data).

Cette application est une première approche du framework et essaie d'exploiter les fonctionnalités offertes par VueJS et Vuex, bien qu'elle pourrait sûrement être améliorée avec plus de temps et d'expertise.

### Librairie Graphique

La première bibliothèque utilisée pour les éléments graphiques était vue-material. Cependant, je n'ai pas réussi à définir un thème de couleur personnalisé. Ce problème vient apparement d'un problème de compatibilité entre les versions actuelles de vue-material et node-sass que je n'ai pas pu résoudre. Je suis donc passée sous Vuetify.

### Vuetify

Au cours de son utilisation, j'ai remarqué 2 problèmes avec Vuetify. Ceux-ci n'empêche pas son bon fonctionnement, mais une autre bibbliothèque pourrait être mieux adaptée.

Tout d'abord, toute la bibliothèque d'icones est téléchargée au lancement de l'application même lorsqu'une petite partie est utilisée, ce qui entraîne une baisse de performance au démarrage.

Ensuite, les évenements générés par le clavier ne semble pas disponible pour les différents éléments inputs de Vuetify. J'ai essayé d'ajouter un raccourci clavier 'Enter' pour passer à la question suivante du quizz (avec la méthode Vue, ou directement element.addEventListener) mais sans succès. Cependant, le temps manquait pour étudier ce problème en profondeur. Il existe peut-etre un moyen détourné. 


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
