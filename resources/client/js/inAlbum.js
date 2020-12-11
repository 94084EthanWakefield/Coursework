"use strict";

function listSongsInAlbum() {
    console.log("Invoked listForGenre()");
    const url = "/songs/listForAlbum/";
    const albumName = "def";
    fetch(url + albumName, {
        method: "GET",
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            formatSongs(response);
            window.open("inAlbum.html", "_self");
        }
    })
}

function formatSongs(myJSONArray) {
    let dataHTML = "";
    for (let item of myJSONArray) {
        dataHTML += "<tr><td>" + item.Name + "<td><td>" + item.Length_ + "<tr><td>";
    }
    document.getElementById("SongsList").innerHTML = dataHTML;
}

