document.addEventListener("DOMContentLoaded", function() {
    let connexion = new MovieDB;
    connexion.requeteDernierFilm();
});

class MovieDB {
    constructor() {
        console.log("new MovieDB()");
        this.apiKey = "b0ad64ab322a00e3d4802555e89f98a2";
        this.lang = "fr-CA";
        this.baseUrl = "https://api.themoviedb.org/3/";
        this.imgPath = "https://image.tmdb.org/t/p/";
        this.nbFilm = 8; //9 dans le TP
    }

    requeteDernierFilm() {
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourDernierFilm.bind(this));
        //requete.open('GET', this.baseUrl + 'movie/now_playing?api_key='+ this.apiKey +'&language=' + this.lang + '&page=1');
        requete.open('GET', this.baseUrl + 'movie/popular?api_key='+ this.apiKey +'&language=' + this.lang + '&page=1');
        requete.send();
    }

    retourDernierFilm(event) {
        console.log('retourDernierFilm');
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).results;
        //console.log(data);
        this.afficherDernierFilm(data);
    }

    afficherDernierFilm(data) {
        console.log('afficherDernierFilm');

        let section = document.querySelector('.liste-films');
        console.log(section)

        for (let i = 0; i < this.nbFilm ; i++) {
            //console.log(data[i].title);
            //console.log(data[i].overview);
            let article = document.querySelector('.template .film').cloneNode(true);
            article.querySelector('h2').innerHTML = data[i].title;

            if(data[i].overview != "") {
                article.querySelector('.description').innerHTML = data[i].overview;
            } else {
                article.querySelector('.description').innerHTML = "Aucune description disponible.";
            }

            let image = article.querySelector('img');
            image.src = this.imgPath + "w300" + data[i].poster_path;

            //console.log(article);

            section.appendChild(article);
        }
    }
}