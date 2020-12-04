document.addEventListener("DOMContentLoaded", function() {
    let connexion = new MovieDB;

    if(document.location.pathname.search('fiche-film.html') > 0) {
        let params = new URL (document.location).searchParams;
        console.log(params);
        connexion.requeteInfoFilm(params.get('id'));
    } else {
        connexion.requeteDernierFilm();  
    }

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
        requete.open('GET', this.baseUrl + 'movie/now_playing?api_key='+ this.apiKey +'&language=' + this.lang + '&page=1');
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
            image.alt = data[i].title;

            //Changer le href du lien a pour ajouter le id du film
            article.querySelector('a').href = "fiche-film.html?id=" + data[i].id;

            //console.log(article);

            section.appendChild(article);
        }
    }


    requeteInfoFilm(movieId) {
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourRequeteInfoFilm.bind(this));
        //requete.open('GET', this.baseUrl + 'movie/now_playing?api_key='+ this.apiKey +'&language=' + this.lang + '&page=1');
        requete.open('GET', this.baseUrl + 'movie/' + movieId + '?api_key=' + this.apiKey +'&language=' + this.lang);
        //14?api_key=b22f9b20c68ad36893d3c8b75f29771a&language=en-US
        requete.send();
    }

    retourRequeteInfoFilm(event) {
        console.log('retourRequeteInfoFilm');
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText);
        console.log(data);

        this.afficherInfoFilm(data);
    }

    afficherInfoFilm(data) {
        console.log('afficherInfoFilm');
        //this.requeteActeur();

        document.querySelector('h1').innerHTML = data.title;
    }

    requeteActeur() {
        //requete vers GET credit(movieDB)
    }

    retourRequeteActeur() {
        //faire attention JSON.parse
    }

    afficheActeur() {
        //Boucle for et clone de div.acteur
    }
}