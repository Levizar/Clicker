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
        // Nom de ce type de producteur
        this.name = name; 
        // Cookie par seconde de base que produit le producer
        this.baseProduction = baseProduction; 
        // Le nombre de producer de ce type
        this.nbr = 0; 
        // Le multiplicateur actuel de ce producer
        this.multiplicateur = 1; 
        // Production totale de ce type de producer
        this.totalProductionPerSec = 0; 
        // Le prix de base de ce producer
        this.baseprice = baseprice; 
        // Le prix actuel de ce producer
        this.price = basePrice; 
        // Methode recalculant la valeur de totalProductionPerSec
        this.recalculationProdPerSec = () => {
            this.totalProductionPerSec = this.baseProduction * this.multiplicateur * this.nbr;
        }
        
        // Methode permettant d'acheter un producer et d'augmenter son prix
        // Et d'appeler la fonction recalculant la variable cookie seconde
        this.buy = () => {
            // ne lance le contenu de la methode que s'il y a de quoi payer
            // Au lieu de faire ça, il serait aussi possible de prévoir de désactiver le 
            // bouton d'achat, voir de faire les 2 pour être sûr. (et de le griser au passage)
            if ( cookie >= this.price ){
                // Paiement du prix en cookie
                cookie -= this.price;
                // Achat donc augmentation du nbr de producer de ce type
                this.nbr += 1;
                // Augmentation du prix du prochain producer
                this.price = this.basePrice * Math.pow(2, this.nbr);   // Il faut remplacer 1 par le logarithme neperien
                // Appel la méthode recalculant la propriété totalProductionPerSec de ce producer
                this.recalculationProdPerSec    ////////!!!!\\\\\\\  Je ne sais pas s'il faut les () ou pas.
                // lance la fonction recalculant la variable globale cookiePerSec
                getCookiePerSec();   
            }
        }
        // Une fois le type de producteur instancié, stock l'instance        
        arrTypeOfProducer.push(this);
    }
}

// Fonction globale permettant de calculer le nombre de cookie par second pour le setInterval
const getCookiePerSec = () => {
    cookiePerSec = 0;
    arrTypeOfProducer.forEach(producer => {
        cookiePerSec += producer.totalProductionPerSec
    })
}

new Producer("grand-mère", 10) // exemple