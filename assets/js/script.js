// clicker game

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
        // Elle est séparé de buy car un bonus acheté ou débloqué pourrait entrainer un recalcul 
        this.recalculationProdPerSec = () => {
            this.totalProductionPerSec = this.baseProduction * this.multiplicateur * this.nbr;

            // lance la fonction recalculant la variable globale cookiePerSec
            getCookiePerSec();
        }

        // Methode permettant d'acheter un producer et d'augmenter son prix
        // Et d'appeler la fonction recalculant la variable cookie seconde
        this.buy = () => {

            // ne lance le contenu de la methode que s'il y a de quoi payer
            // Au lieu de faire ça, il serait aussi possible de prévoir de désactiver le 
            // bouton d'achat, voir de faire les 2 pour être sûr. (et de le griser au passage)
            if (cookie >= this.price) {

                // Paiement du prix en cookie
                cookie -= this.price;

                // Achat donc augmentation du nbr de producer de ce type
                this.nbr += 1;

                // Augmentation du prix du prochain producer
                this.price = this.basePrice * Math.pow(2, this.nbr); // Il faut remplacer 1 par le logarithme neperien

                // Appel la méthode recalculant la propriété totalProductionPerSec de ce producer
                // La fonction de recalcul amène appel directement la fonction global getCookiePerSec()
                this.recalculationProdPerSec ////////!!!!\\\\\\\  Je ne sais plus s'il faut les () ou pas.
            }
        }
        // Une fois le type de producteur instancié, stock l'instance dans une array
        // Afin de pouvoir itérer facilement sur chaque objet pour calculer
        // le nombre de cookie à la seconde total
        arrTypeOfProducer.push(this);
    }
}

// Fonction globale permettant de calculer le nombre de cookie par seconde pour le setInterval
const getCookiePerSec = () => {
    // remise à zéro
    cookiePerSec = 0;
    // Somme de toutes les productions par seconde
    arrTypeOfProducer.forEach(producer => {
        cookiePerSec += producer.totalProductionPerSec
    })
}

const cookieGetter = () => {
    cookie += cookiePerSec;
}

// Initialisation des variables nécessaire au jeu
// à faire: vérifier s'il existe une sauvegarde dans le local storage pour l'initialisation des variables
// Si oui, variable = reprises de sauvegarde, si non, variable = créé
// Pour ce point, Je sais que Terence l'a fait sur son pioupiou

let cookie = 0;         // Les cookies sont à la fois le score et la monnaie du jeu

// Pour le moment cette variable n'est pas utilisée.
// Si le jeu explose à cause d'un nombre trop grand
// Il faudra soit traiter les nombres via un bigInt (plus propre)
// Ou alors décomposer le nombre en le stockant dans plusieurs variables
// à la manière d'un abaque
let millionCookie = 0;  
// C'est le nombre de cookie gagné par interval de temps
let cookiePerSec = 0.1;
// L'interval de temps choisi en millisecondes
const timeInterval = 500;
// Array qui contiendra la totalité des objets instanciés
const arrTypeOfProducer = [];

// cette array doit être remplie manuellement par les types de producer que l'on veut.
// Il s'agira d'itérer dessus pour construire les objets automatiquement à partir de ces 3 valeurs
const arrProducerModel = [
    ["click", 0.1, 2],
    ["grand-mother", 5, 10]
];

// Cette ligne instancie chaque type de producer se trouvant dans l'arrProduceModel
arrProducerModel.forEach(model => new Producer(model[0], model[1], model[2]))

// SetInterval augmentant le nombre de cookie constament
// setInterval(cookieGetter, timeInterval);
