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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgY29ubmV4aW9uID0gbmV3IE1vdmllREI7XHJcbiAgICBjb25uZXhpb24ucmVxdWV0ZURlcm5pZXJGaWxtKCk7XHJcbn0pO1xyXG5cclxuY2xhc3MgTW92aWVEQiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm5ldyBNb3ZpZURCKClcIik7XHJcbiAgICAgICAgdGhpcy5hcGlLZXkgPSBcImIwYWQ2NGFiMzIyYTAwZTNkNDgwMjU1NWU4OWY5OGEyXCI7XHJcbiAgICAgICAgdGhpcy5sYW5nID0gXCJmci1DQVwiO1xyXG4gICAgICAgIHRoaXMuYmFzZVVybCA9IFwiaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9cIjtcclxuICAgICAgICB0aGlzLmltZ1BhdGggPSBcImh0dHBzOi8vaW1hZ2UudG1kYi5vcmcvdC9wL1wiO1xyXG4gICAgICAgIHRoaXMubmJGaWxtID0gODsgLy85IGRhbnMgbGUgVFBcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXRlRGVybmllckZpbG0oKSB7XHJcbiAgICAgICAgbGV0IHJlcXVldGUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VyRGVybmllckZpbG0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgLy9yZXF1ZXRlLm9wZW4oJ0dFVCcsIHRoaXMuYmFzZVVybCArICdtb3ZpZS9ub3dfcGxheWluZz9hcGlfa2V5PScrIHRoaXMuYXBpS2V5ICsnJmxhbmd1YWdlPScgKyB0aGlzLmxhbmcgKyAnJnBhZ2U9MScpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbignR0VUJywgdGhpcy5iYXNlVXJsICsgJ21vdmllL3BvcHVsYXI/YXBpX2tleT0nKyB0aGlzLmFwaUtleSArJyZsYW5ndWFnZT0nICsgdGhpcy5sYW5nICsgJyZwYWdlPTEnKTtcclxuICAgICAgICByZXF1ZXRlLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXRvdXJEZXJuaWVyRmlsbShldmVudCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXRvdXJEZXJuaWVyRmlsbScpO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KS5yZXN1bHRzO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgdGhpcy5hZmZpY2hlckRlcm5pZXJGaWxtKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFmZmljaGVyRGVybmllckZpbG0oZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhZmZpY2hlckRlcm5pZXJGaWxtJyk7XHJcblxyXG4gICAgICAgIGxldCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3RlLWZpbG1zJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2VjdGlvbilcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5iRmlsbSA7IGkrKykge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGFbaV0udGl0bGUpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGFbaV0ub3ZlcnZpZXcpO1xyXG4gICAgICAgICAgICBsZXQgYXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wbGF0ZSAuZmlsbScpLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdoMicpLmlubmVySFRNTCA9IGRhdGFbaV0udGl0bGU7XHJcblxyXG4gICAgICAgICAgICBpZihkYXRhW2ldLm92ZXJ2aWV3ICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJykuaW5uZXJIVE1MID0gZGF0YVtpXS5vdmVydmlldztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJykuaW5uZXJIVE1MID0gXCJBdWN1bmUgZGVzY3JpcHRpb24gZGlzcG9uaWJsZS5cIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGltYWdlID0gYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWdQYXRoICsgXCJ3MzAwXCIgKyBkYXRhW2ldLnBvc3Rlcl9wYXRoO1xyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhhcnRpY2xlKTtcclxuXHJcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYXJ0aWNsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0sImZpbGUiOiJzY3JpcHQuanMifQ==
