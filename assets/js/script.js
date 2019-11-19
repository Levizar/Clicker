// clicker game

// Initialisation des variables nécessaire au jeu
////// à faire: vérifier s'il existe une sauvegarde dans le local storage pour l'initialisation des variables
////// Si oui, variable = reprises de sauvegarde, si non, variable = créé
let cookie = 0; // Les cookies sont à la fois le score et la monnaie du jeu
let millionCookie = 0;
let cookiePerSec = 0.1;
let arrTypeOfProducer = [];


// Création d'une classe et d'un constructor afin de créer autant de producer que l'on veut via une boucle
class Producer {
    // Permet d'initialiser un proucer avec un nom, une production de base et un prix de base
    constructor(name, baseProduction, baseprice) {
        this.name = name; // Nom de ce type de producteur
        this.baseProduction = baseProduction; // Cookie par seconde de base que produit le producer
        this.nbr = 0; // Le nombre de producer de ce type
        this.multiplicateur = 1; // Le multiplicateur actuel de ce producer
        this.totalProductionPerSec = 0; // Production totale de ce type de producer
        this.baseprice = baseprice; // Le prix de base de ce producer
        this.price = basePrice; // Le prix actuel de ce producer
        // Methode permettant d'acheter un producer et d'augmenter son prix
        // Et d'appeler la fonction recalculant la variable cookie seconde
        this.buy = () => { 
            this.nbr += 1;
            this.totalProductionPerSec = this.baseProduction * this.multiplicateur * this.nbr;
            this.price = this.basePrice * Math.pow(1, this.nbr); // Il faut remplacer 1 par le logarithme neperien
            getCookiePerSec();
        }
        arrTypeOfProducer.push(this);
    }
}

const getCookiePerSec = () => {
    cookiePerSec = 0;
    arrTypeOfProducer.forEach(producer => {
        cookiePerSec += producer.totalProductionPerSec
    })
}

new Producer("grand-mère", 10) // exemple