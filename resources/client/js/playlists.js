"use strict";

function listPlaylists() {
    console.log("Invoked listForGenre()");
    const url = "/playlists/listUserPlaylists/";
    fetch(url, {
        method: "GET",
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            formatPlaylists(response);
        }
    })
}

function formatPlaylists(myJSONArray) {
    let dataHTML = "";
    for (let item of myJSONArray) {
        dataHTML += "<button id='playlist' name='whichPlaylist' onclick='inPlaylist()' value='item'>" + item.PlaylistName + "</button>";
    }
    document.getElementById("PlaylistDisplay").innerHTML = dataHTML;
}