// clicker game

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
/////////                                                        /////////
/////////            Variables manuelles du jeu                  /////////
/////////                                                        /////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


// Initialisation des variables nécessaires au jeu
let cookie = 0; // Les cookies sont à la fois le score et la monnaie du jeu
// C'est le nombre de cookie gagné par interval de temps
let cookiePerSec = 0;
// L'interval de temps choisi en millisecondes
const timeInterval = 500;

// cette array doit être remplie manuellement par les types de producer que l'on veut.
// Il s'agira d'itérer dessus pour construire les objets automatiquement à partir de ces 3 valeurs
const arrProducerModel = [
    ["click", 0.1, 2],
    ["ouvrier délocalisé", 0.5, 3],
    ["Patissier", 5, 10],
    ["Patisserie", 10, 20],
    ["Fabrique", 15, 25],
    ["Arnaud", 100, 350]
];


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
/////////                                                        /////////
/////////               Classes et fonctions du jeu              /////////
/////////                                                        /////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// Array qui contiendra la totalité des objets instanciés
// Les objets seront push et éventuellement mis à jour s'il existe une sauvegarde
let arrTypeOfProducer = [];

// Création d'une classe et d'un constructor afin de créer autant de producer que l'on veut via une boucle
class Producer {
    // Permet d'initialiser un proucer avec un nom, une production de base et un prix de base
    constructor(name, baseProduction, basePrice) {
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
        this.basePrice = basePrice;
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
            console.log("click sur buy");
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
                this.recalculationProdPerSec() ////////!!!!\\\\\\\  Je ne sais plus s'il faut les () ou pas. n.b  : il les faut
            } else {
                console.log("not enough cookie");
            }
        }
        // Une fois le type de producteur instancié, stock l'instance dans une array
        // Afin de pouvoir itérer facilement sur chaque objet pour calculer
        // le nombre de cookie à la seconde total
    }
}

// Fonction globale permettant de calculer le nombre de cookie par seconde pour le setInterval
const getCookiePerSec = () => {
    // remise à zéro
    cookiePerSec = 0;
    // Somme de toutes les productions par seconde
    arrTypeOfProducer.forEach(prod => {
        cookiePerSec += prod.totalProductionPerSec
    })
}

const updateCookie = () => {
    let cookieNbrFun = document.getElementById("cookiesNumberFun");
    let cookieNbr = document.getElementById("cookiesNumber");
    cookieNbrFun.innerText = cookie;
    cookieNbr.innerText = cookie.toFixed(2);
}

// Fonction de base pour incrémenter le click
const clicker = () => {
    let click = arrTypeOfProducer[0]; // Recupere l'objet Click dans une variable pour l'utiliser de façon plus simple
    cookie += (click.baseProduction * click.multiplicateur);
    console.log(cookie);
}

// Fonction permettant d'incrémenter les cookies
const cookieGetter = () => {
    cookie += cookiePerSec;
}

// Fonction créeant un objet avec les stats du jeu et les plaçant dans le local storage
const save = () => {
    const saveGame = {
        producer: arrTypeOfProducer,
        cookie: cookie
    };
    localStorage.setItem("saveGame", JSON.stringify(saveGame));
}

// Fonction permettant charger une sauvegarde antérieure depuis le localStorage
const loadSaveGame = () => {
    if (localStorage.getItem("saveGame") != null) {
        saveGame = JSON.parse(localStorage.getItem("saveGame"))
        cookie = saveGame.cookie;
        recupArrProd = saveGame.producer;
        recupArrProd.forEach((objProducer, index) => {
            let recupObject = Object.entries(objProducer);
            recupObject.forEach(([key, value]) => {
                arrTypeOfProducer[index][key] = value;
            });
        })
        getCookiePerSec();
    } else {
        console.log("Pas de sauvegarde antérieure à restaurer !");
    }
}


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
/////////                                                        /////////
/////////              Lancement du code du jeu                  /////////
/////////                          &                             /////////
/////////                 appel des fonctions                    /////////
/////////                                                        /////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


// Cette boucle forEach instancie chaque type de producer se trouvant dans l'arrProduceModel
// Et crée les boutons correspondants en les injectants directement dans le DOM
arrProducerModel.forEach((model, index) => {
    let newProducer = new Producer(model[0], model[1], model[2]);
    arrTypeOfProducer.push(newProducer);
    let templateBtn = document.getElementById("template").cloneNode(true);
    let cloneBtn = document.importNode(templateBtn.content, true);
    let button = cloneBtn.querySelector("button")
    button.innerText = model[0];
    let target = document.getElementById("target");
    target.appendChild(cloneBtn);                       // sera dans une ul li
    button.id = model[0]
    button.addEventListener("click", () => {
        arrTypeOfProducer[index].buy()
    })
});
// Une fois le bloc ci-dessus executé, lancement de la fonction loadSaveGame
window.addEventListener("load", loadSaveGame);

// SetInterval augmentant le nombre de cookie constament
setInterval(() => {
        cookieGetter();
        updateCookie();
    }, timeInterval);

// Lance la fonction de base en clickant sur le cookie
document.getElementById("clicker").addEventListener("click", clicker);

// Lance une sauvegarde dans le local storage toute les 30 secondes
//to fix
setInterval(() => {
    save();
    console.log("saved");
}, 30000);




//////////////////////////////////
////// Fonction en chantier //////
//////////////////////////////////


// fonction lançant UN petit biscuit supplémentaire: à faire lorsque "buy cursor est lancé"
setTimeout(() => {
    let testii = document.createElement("img");
    testii.id = "testii"
    testii.src = "assets/img/petitBis.png"
    testii.class = "testi"
    let scaling = document.getElementById("scaling");
    scaling.appendChild(testii);
}, 1000)