"use strict";

function listSongsInAlbum(which) {
    console.log("Invoked listSongsInAlbum");
    const url = "/songs/listForAlbum/";
    fetch(url + which, {
        method: "GET",
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            formatSongs(response);
        }
    })
}

function formatSongs(myJSONArray) {
    let dataHTML = "";
    for (let item of myJSONArray) {
        dataHTML += "<tr><td>" + item.Name + "</td><td>" + item.Length_ + "<tr><td>";
    }
    document.getElementById("SongsList").innerHTML = dataHTML;
}

