"use strict";
function listForGenre() {
    console.log("Invoked listForGenre()");
    const Username = document.getElementById("Username").value;
    const url = "/albums/listforgenre/";
    fetch(url + Username, {
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

function listLatest() {
    console.log("Invoked listLatest()");
    const Username = document.getElementById("Username").value;
    const url = "/albums/listlatest/";
    fetch(url + Username, {
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

function formatAlbums(myJSONArray, type){
    let data = "";
    let count = 0;
    for (let item of myJSONArray) {
        data += "<div class='card'>" + item.AlbumName + item.Artist + "<img id='cover' src='https://picsum.photos/100' alt='image'>" + "</div>";
        count++;
        if (count === 5) {
            break;
        }
    }
    if (type === "latest") {
        document.getElementById("DisplayAlbumsRecent").innerHTML += data;
        for (let i = 0; i < 5; i++) {
            document.getElementById("cover").setAttribute("id", i);
            document.getElementById(i).setAttribute("src", myJSONArray[i].Cover)
        }
    } else {
        document.getElementById("DisplayAlbumsGenre").innerHTML += data;
        for (let i = 0; i < 5; i++) {
            document.getElementById("cover").setAttribute("id", i);
            document.getElementById(i).setAttribute("src", myJSONArray[i].Cover)
        }
    }
}








