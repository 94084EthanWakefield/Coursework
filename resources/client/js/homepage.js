"use strict";
function listForGenre() {
    console.log("Invoked listForGenre()");
    const url = "/albums/listforgenre";
    fetch(url, {
        method: "GET",
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            formatAlbums(response, "genre");
        }
    });
}

window.addEventListener("scroll", function(){
    let nav = document.querySelector("nav");
    nav.classList.toggle("sticky", window.scrollY > 127);
});

function listLatest() {
    console.log("Invoked listLatest()");
    const url = "/albums/listlatest";
    fetch(url, {
        method: "GET",
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            formatAlbums(response, "latest");
        }
    });
}

function formatAlbums(myJSONArray, type) {
    let i = 0;
    let j = 5;
    for (let item of myJSONArray) {
        let dynamicHTML = "<div class='card'>" + "<input class='image' type='image' height='250px' width='250px' id='cover' src=# alt='image' onclick=# >" + "<div class='details'>" + "<p>" + item.AlbumName + "</p>" + "<p>" + item.Artist + "</p>" + "</div>" + "</div>";
        switch (type) {
            case "latest": {
                if (i > 4) {
                    break;
                } else {
                    document.getElementById("DisplayAlbumsRecent").innerHTML += dynamicHTML;
                    changeImage(i, item);
                    i++;
                }
                break;
            }
            case "genre": {
                if (j > 9) {
                    break;
                } else {
                    document.getElementById("DisplayAlbumsGenre").innerHTML += dynamicHTML;
                    changeImage(j, item);
                    j++;
                }
                break;
            }
        }
    }
}

function changeImage(choice, item) {
    document.getElementById("cover").setAttribute("id", choice);
    document.getElementById(choice).setAttribute("src", item.Cover);
    let whichID = item.AlbumID;
    document.getElementById(choice).setAttribute("onclick", `listSongsInAlbum(${whichID})`);
}

function start() {
    listLatest();
    listForGenre();
}

function swapsheet(sheet) {
    document.getElementById('pageStyle').setAttribute('href', sheet)
}








