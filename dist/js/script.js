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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgY29ubmV4aW9uID0gbmV3IE1vdmllREI7XHJcblxyXG4gICAgaWYoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuc2VhcmNoKCdmaWNoZS1maWxtLmh0bWwnKSA+IDApIHtcclxuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IFVSTCAoZG9jdW1lbnQubG9jYXRpb24pLnNlYXJjaFBhcmFtcztcclxuICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xyXG4gICAgICAgIGNvbm5leGlvbi5yZXF1ZXRlSW5mb0ZpbG0ocGFyYW1zLmdldCgnaWQnKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbm5leGlvbi5yZXF1ZXRlRGVybmllckZpbG0oKTsgIFxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5jbGFzcyBNb3ZpZURCIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibmV3IE1vdmllREIoKVwiKTtcclxuICAgICAgICB0aGlzLmFwaUtleSA9IFwiYjBhZDY0YWIzMjJhMDBlM2Q0ODAyNTU1ZTg5Zjk4YTJcIjtcclxuICAgICAgICB0aGlzLmxhbmcgPSBcImZyLUNBXCI7XHJcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL1wiO1xyXG4gICAgICAgIHRoaXMuaW1nUGF0aCA9IFwiaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3AvXCI7XHJcbiAgICAgICAgdGhpcy5uYkZpbG0gPSA4OyAvLzkgZGFucyBsZSBUUFxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVldGVEZXJuaWVyRmlsbSgpIHtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJEZXJuaWVyRmlsbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAvL3JlcXVldGUub3BlbignR0VUJywgdGhpcy5iYXNlVXJsICsgJ21vdmllL25vd19wbGF5aW5nP2FwaV9rZXk9JysgdGhpcy5hcGlLZXkgKycmbGFuZ3VhZ2U9JyArIHRoaXMubGFuZyArICcmcGFnZT0xJyk7XHJcbiAgICAgICAgcmVxdWV0ZS5vcGVuKCdHRVQnLCB0aGlzLmJhc2VVcmwgKyAnbW92aWUvbm93X3BsYXlpbmc/YXBpX2tleT0nKyB0aGlzLmFwaUtleSArJyZsYW5ndWFnZT0nICsgdGhpcy5sYW5nICsgJyZwYWdlPTEnKTtcclxuICAgICAgICByZXF1ZXRlLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXRvdXJEZXJuaWVyRmlsbShldmVudCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXRvdXJEZXJuaWVyRmlsbScpO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KS5yZXN1bHRzO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgdGhpcy5hZmZpY2hlckRlcm5pZXJGaWxtKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFmZmljaGVyRGVybmllckZpbG0oZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhZmZpY2hlckRlcm5pZXJGaWxtJyk7XHJcblxyXG4gICAgICAgIGxldCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3RlLWZpbG1zJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2VjdGlvbilcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5iRmlsbSA7IGkrKykge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGFbaV0udGl0bGUpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGFbaV0ub3ZlcnZpZXcpO1xyXG4gICAgICAgICAgICBsZXQgYXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wbGF0ZSAuZmlsbScpLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdoMicpLmlubmVySFRNTCA9IGRhdGFbaV0udGl0bGU7XHJcblxyXG4gICAgICAgICAgICBpZihkYXRhW2ldLm92ZXJ2aWV3ICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJykuaW5uZXJIVE1MID0gZGF0YVtpXS5vdmVydmlldztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJykuaW5uZXJIVE1MID0gXCJBdWN1bmUgZGVzY3JpcHRpb24gZGlzcG9uaWJsZS5cIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGltYWdlID0gYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWdQYXRoICsgXCJ3MzAwXCIgKyBkYXRhW2ldLnBvc3Rlcl9wYXRoO1xyXG4gICAgICAgICAgICBpbWFnZS5hbHQgPSBkYXRhW2ldLnRpdGxlO1xyXG5cclxuICAgICAgICAgICAgLy9DaGFuZ2VyIGxlIGhyZWYgZHUgbGllbiBhIHBvdXIgYWpvdXRlciBsZSBpZCBkdSBmaWxtXHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignYScpLmhyZWYgPSBcImZpY2hlLWZpbG0uaHRtbD9pZD1cIiArIGRhdGFbaV0uaWQ7XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGFydGljbGUpO1xyXG5cclxuICAgICAgICAgICAgc2VjdGlvbi5hcHBlbmRDaGlsZChhcnRpY2xlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlcXVldGVJbmZvRmlsbShtb3ZpZUlkKSB7XHJcbiAgICAgICAgbGV0IHJlcXVldGUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VyUmVxdWV0ZUluZm9GaWxtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIC8vcmVxdWV0ZS5vcGVuKCdHRVQnLCB0aGlzLmJhc2VVcmwgKyAnbW92aWUvbm93X3BsYXlpbmc/YXBpX2tleT0nKyB0aGlzLmFwaUtleSArJyZsYW5ndWFnZT0nICsgdGhpcy5sYW5nICsgJyZwYWdlPTEnKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oJ0dFVCcsIHRoaXMuYmFzZVVybCArICdtb3ZpZS8nICsgbW92aWVJZCArICc/YXBpX2tleT0nICsgdGhpcy5hcGlLZXkgKycmbGFuZ3VhZ2U9JyArIHRoaXMubGFuZyk7XHJcbiAgICAgICAgLy8xND9hcGlfa2V5PWIyMmY5YjIwYzY4YWQzNjg5M2QzYzhiNzVmMjk3NzFhJmxhbmd1YWdlPWVuLVVTXHJcbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0b3VyUmVxdWV0ZUluZm9GaWxtKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JldG91clJlcXVldGVJbmZvRmlsbScpO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZmZpY2hlckluZm9GaWxtKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFmZmljaGVySW5mb0ZpbG0oZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhZmZpY2hlckluZm9GaWxtJyk7XHJcbiAgICAgICAgLy90aGlzLnJlcXVldGVBY3RldXIoKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDEnKS5pbm5lckhUTUwgPSBkYXRhLnRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVldGVBY3RldXIoKSB7XHJcbiAgICAgICAgLy9yZXF1ZXRlIHZlcnMgR0VUIGNyZWRpdChtb3ZpZURCKVxyXG4gICAgfVxyXG5cclxuICAgIHJldG91clJlcXVldGVBY3RldXIoKSB7XHJcbiAgICAgICAgLy9mYWlyZSBhdHRlbnRpb24gSlNPTi5wYXJzZVxyXG4gICAgfVxyXG5cclxuICAgIGFmZmljaGVBY3RldXIoKSB7XHJcbiAgICAgICAgLy9Cb3VjbGUgZm9yIGV0IGNsb25lIGRlIGRpdi5hY3RldXJcclxuICAgIH1cclxufSJdLCJmaWxlIjoic2NyaXB0LmpzIn0=
