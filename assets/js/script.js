// clicker game

let cookie = 0; // Cookies are the score game
let millionCookie = 0;
let cookiePerSec = 0.1;
let arrOfProducteur = []

class Producteur {
    constructor(name, baseProduction){
        this.name = name;
        this.baseProduction = baseProduction; // cookie par seconde
        this.nbr = 0;
        this.multiplicateur = 2;
        arrOfProducteur.push(this);
    }
}

new Producteur("grand-mère", 10)